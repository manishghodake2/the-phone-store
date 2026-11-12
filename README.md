# The Phone Store – Full Stack E-commerce Application

The Phone Store is a full-stack e-commerce web application developed for online mobile phone shopping. It allows users to register, log in, browse mobile phones, view product details, apply filters, and manage their shopping cart.

The application is built using React.js for the frontend, Spring Boot for the backend, and MySQL for database management.

## Technologies Used

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router
- React Context API

### Backend

- Java
- Spring Boot
- Spring Security
- REST APIs
- JWT Authentication
- Maven

### Database

- MySQL

### Tools

- Visual Studio Code
- IntelliJ IDEA
- Postman
- MySQL Workbench
- Git & GitHub

## Features

- User Registration
- User Login and Authentication
- JWT-based authentication
- Product Listing
- Product Details
- Product Search
- Product Filtering by Brand, Price, and RAM
- Shopping Cart
- Add and Remove Cart Items
- Increase and Decrease Product Quantity
- Cart Subtotal and Total Price Calculation
- Protected Routes for Authenticated Users

## Project Structure

```text
The-Phone-Store/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── .gitignore
└── README.md
```

_Note: Update the folder names above if your actual project structure is different._

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/the-phone-store.git
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

### 3. Backend Setup

Open the backend project in your Java IDE.

Configure your MySQL database connection in `application.properties`.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Use your local database credentials. Do not commit actual passwords or secrets to GitHub.

Run the Spring Boot application.

### 4. Database Setup

- Install MySQL.
- Create the required database.
- Configure database credentials.
- Run the Spring Boot backend.

## API Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | User Registration |
| POST   | /api/auth/login    | User Login        |
| GET    | /api/products      | Retrieve Products |

## Learning Outcomes

- Developed a full-stack application using React.js and Spring Boot.
- Implemented REST API integration using Axios.
- Worked with JWT-based authentication.
- Used React Context API for state management.
- Integrated MySQL with Spring Boot.
- Implemented shopping cart functionality and product filtering.

## Author

**Manish Ghodake**

GitHub: https://github.com/manishghodake2

LinkedIn: https://www.linkedin.com/in/manish-ghodake-0a81521b1

---

⭐ If you find this project useful, feel free to explore the repository!
