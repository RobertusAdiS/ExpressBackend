# Project Documentation

## Overview

This project is a RESTful API built with Node.js, Express, and MongoDB. It provides endpoints for user authentication and CRUD operations on products.

## Table of Contents

- [Installation](##installation)
- [Environment Variables](##environment-variables)
- [API Endpoints](##api-endpoints)
  - [User Endpoints](###user-endpoints)
  - [Auth Endpoints](###auth-endpoints)
  - [Product Endpoints](###product-endpoints)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
2. Install dependencies:
   ```sh
   npm install
3. Set up environment variables:
   -Create a .env file in the root directory.
   -Add the following environment variables:
   ```sh
   PORT=8080
   MONGODB_URI=your_mongodb_uri
   JWTPRIVATEKEY=your_jwt_private_key
   SALT_ROUNDS=10
 4. Start the server:
    ```sh
    npm start

## Environment Variables

- PORT: The port on which the server will run.
- MONGODB_URI: The URI for connecting to the MongoDB database.
- JWTPRIVATEKEY: The private key for signing JWT tokens.
- SALT_ROUNDS: The number of salt rounds for hashing passwords.

## API Endpoints
### User Endpoints
1. Register a new user
   - Method: POST
   - URL: /api/users
   - Request Body:
     ```sh
     {
     "name": "John Doe",
     "gender": "Male",
     "email": "john.doe@example.com",
     "password": "Password123!"
     }
  - Response
      ```sh
      {
      "token": "your_jwt_token"
      }

2. Get current user details
    - Method: GET
    - URL: /api/users/me
    - Headers:
        - Authorization: your_jwt_token
    - Response:
    ```sh
      {
        "_id": "user_id",
        "name": "John Doe",
        "gender": "Male",
        "email": "john.doe@example.com"
      }

### Auth Endpoints
1. Register a new user
   - Method: POST
   - URL: /api/users
   - Request Body:
     ```sh
     {
      "email": "john.doe@example.com",
      "password": "Password123!"
      }
  - Response
      ```sh
      {
        "data": "your_jwt_token",
        "message": "Logged in successfully"
      }
### Product Enpoint
1. Create a new product
   - Method: POST
   - URL: /api/products
   - Request Body:
     ```sh
     {
        "title": "Product Title",
        "description": "Product Description",
        "price": 100,
        "imageUrl": "http://example.com/image.jpg"
      }
    - Response
      ```sh
      {
        "_id": "product_id",
        "title": "Product Title",
        "description": "Product Description",
        "price": 100,
        "imageUrl": "http://example.com/image.jpg"
      }
2. Get all products
   - Method: Get
   - URL: /api/products
    - Response
      ```sh
      {
        "_id": "product_id",
        "title": "Product Title",
        "description": "Product Description",
        "price": 100,
        "imageUrl": "http://example.com/image.jpg"
      }
3. Get a product by ID
   - Method: Get
   - URL: /api/products/:id
    - Response
      ```sh
      {
        "_id": "product_id",
        "title": "Product Title",
        "description": "Product Description",
        "price": 100,
        "imageUrl": "http://example.com/image.jpg"
      }
4. Update a product by ID
   - Method: PUT
   - URL: /api/products/:id
   - Request Body:
     ```sh
     {
        "title": "Updated Product Title",
        "description": "Updated Product Description",
        "price": 150,
        "imageUrl": "http://example.com/updated-image.jpg"
      }
    - Response
      ```sh
      {
        "_id": "product_id",
        "title": "Updated Product Title",
        "description": "Updated Product Description",
        "price": 150,
        "imageUrl": "http://example.com/updated-image.jpg"
      }
5. Delete a product by ID
   - Method: DELETE
   - URL: /api/products/:id
    - Response
      ```sh
      {
        "message": "Product deleted successfully"
      }
