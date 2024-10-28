from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status, views
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import logging
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
import logging

logging.basicConfig(level=logging.DEBUG)

# Initialize logger
logger = logging.getLogger(__name__)

class PasswordResetRequestView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        if not email:
            logger.warning("Password reset request with missing email field.")
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            logger.warning(f"Password reset requested for non-existent email: {email}")
            return Response({"detail": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error retrieving user for email {email}: {e}")
            return Response({"detail": "An error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        # Construct reset link using frontend URL
        frontend_url = getattr(settings, 'FRONTEND_URL', "http://localhost:3000")
        reset_link = f"{frontend_url}/reset-password/{uid}/{token}/"

        try:
            send_mail(
                "Password Reset Request",
                f"Click the link to reset your password: {reset_link}",
                settings.DEFAULT_FROM_EMAIL,
                [email],
            )
            logger.info(f"Password reset link sent to {email}")
        except Exception as e:
            logger.error(f"Failed to send password reset email to {email}: {e}")
            return Response({"detail": "Failed to send email. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"detail": "Password reset link has been sent."}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
            logger.error(f"Invalid password reset link: {e}")
            return Response({"detail": "Invalid link"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            logger.error("Invalid or expired token for password reset")
            return Response({"detail": "Token is invalid or expired"}, status=status.HTTP_400_BAD_REQUEST)

        new_password1 = request.data.get("new_password1")
        new_password2 = request.data.get("new_password2")

        if not new_password1 or not new_password2:
            logger.warning("Password reset attempt with missing password fields")
            return Response({"detail": "Both password fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if new_password1 != new_password2:
            logger.warning("Password reset attempt with mismatched passwords")
            return Response({"detail": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate the password
        from django.core.exceptions import ValidationError
        from django.contrib.auth.password_validation import validate_password

        try:
            validate_password(new_password1, user=user)
        except ValidationError as e:
            logger.warning("Password does not meet validation requirements")
            return Response({"detail": e.messages}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(new_password1)
        user.save()
        logger.info(f"Password reset successfully for user ID {user.id}")

        return Response({"detail": "Password has been reset successfully."}, status=status.HTTP_200_OK)
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer