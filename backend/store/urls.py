from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, home_view, PasswordResetConfirmView, PasswordResetRequestView
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', home_view, name='home'),
    path('api/', include(router.urls)),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/password_reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
