# Store Site

**Store Site** is a fully-featured e-commerce platform built using modern web technologies. This project demonstrates my skills in web development, front-end and back-end integration, and handling user interactions securely.

## Features

- **User Authentication**: Sign up, login, and secure password reset via email.
- **Popular Products**: Tracks and displays the most visited products.
- **Shopping Cart**: Includes products added by the user and calculates the total purchase amount.
- **Product Reviews**: Allows users to submit comments and ratings using AJAX.
- **Dynamic Banners**: Ad banners that update based on current promotions or user preferences.
- **Multilingual Support**: Switches between languages seamlessly.
- **API**: Exposes a RESTful API with serialized fields, secured with JWT.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Nafisioo/Store_site.git
    cd Store_site
    ```

2. Create a virtual environment:

    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the dependencies:

    ```sh
    pip install -r requirements.txt
    ```

4. Set up environment variables for sensitive information, such as database credentials and JWT secrets.

5. Initialize the database:

    ```sh
    flask db init
    flask db migrate
    flask db upgrade
    ```

6. Run the application:

    ```sh
    flask run
    ```

## Usage

After running the application, navigate to `http://127.0.0.1:5000/` in your web browser. From there, you can:

- Register a new user and log in.
- Browse popular products.
- Add items to the shopping cart.
- Submit comments and reviews.
- Explore multilingual features.

## API Documentation

The API is documented using Swagger. Access the API documentation at `http://127.0.0.1:5000/api/docs`.

### Authentication

The API uses JSON Web Tokens (JWT) for authentication. Obtain a token by sending a POST request to `/api/auth/login` with your credentials.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

If you have any questions or suggestions, feel free to contact me at nafisebahoosh3@gmail.com
