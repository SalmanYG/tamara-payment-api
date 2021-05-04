# Tamara's Technical Assessment
**Tamara Payment API** is a RESTful API that handles all payment-related requests from querying all payments to creating a new one to modifying and deleting payments. Another API has been implemented as well to remind the customer that the payment is overdue.

## Getting Started
**Tamara Payment API** is not hosted on any domain. These steps will help you get the project running locally on your machine.

### Prerequisites
* **MongoDB URI**: You need an active database with an authorized user and password to access/modify the database.
* **Gmail Account**: Since the reminder is set to be sent using email, an email account is required to send the reminders to the customers. More details will follow.
* **Docker**: To run the API locally. *(Optional)*

### Installing
First, clone this repository to you computer
```
git clone https://github.com/SalmanYG/tamara-payment-api.git
```
After that, head to the root directory and create an .env file
```
cd tamara-payment-api
touch .env
```
After that, open the .env file and add the necessary information to run the API.
```
PORT=<port_number>
DB_URI=<mongoDB_URI>
EMAIL_USER=<your_gmail_account>
EMAIL_PASS=<your_gmail_password>
```

## Running
First, run the following command
```
npm install
```
Then run
```
npm start
```
After that, the API will boot up and be ready to operate.

If you prefer using a Docker, you can first run this command
```
docker build .
```
After that, map any port number of your choice to the port number exposed in the container *(which is written in the dockerfile)*.
```
docker run -p <port_number>:5000 <image_id>
```

## API Documentation
There are 3 APIs in this project:
* **Users CRUD REST API**, which is responsible for creating and managing users.
* **Payments CRUD REST API**, which is responsible for creating and managing payments.
* **Reminder API**, which is responsible for sending a reminder to the customer's email when their payment is overdue.

|METHODS   |GET /   |POST /   |GET /:id   |PATCH /:id   |DELETE /:id   |
|---|---|---|---|---|---|
|/users   |✅   |✅   |✅   |   |✅   |
|/payments   |✅   |✅   |✅   |✅   |✅   |

Use **any internet browser** or **Postman** to make GET requests to these APIs, to POST, PATCH, and DELETE, we recommend using **Postman**.

When developing these APIs, the principles of *clean code* and *SOLID* were followed as much as possible. The project was structured using MVC framework, and the code has been refactored multiple times to ensure that it follows the principles.

## Resources
* [Clean Code concepts adapted for Javascript](https://github.com/ryanmcdermott/clean-code-javascript#solid)
* [Uncle Bob's lectures about Clean Code and Clean Architecture](https://www.youtube.com/watch?v=7EmboKQH8lM)
* And multiple documentations/blogs/tutorials that I read/watched during the development process. 
