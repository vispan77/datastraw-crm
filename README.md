# DATASTRAW - CRM

This project is a Customer Relationship Management (CRM) application built with a microservice architecture. It features a React-based frontend and several backend services for handling authentication, tickets, and messages.

## Microservice Architecture

The application is divided into the following services:

-   **Client:** A React application that provides the user interface.
-   **API Gateway:** A single entry point for all client requests. It routes requests to the appropriate backend service.
-   **Auth Service:** Handles user authentication and authorization.
-   **Ticket Service:** Manages support tickets and associated notes.
-   **Messages Service:** Manages messages related to support tickets.

## Getting Started

### Prerequisites

-   Node.js and npm
-   MongoDB database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd DATASTRAW-CRM
    ```

2.  **Install dependencies for each service:**
    Navigate into each service's directory (`client`, `server/gateway`, `server/services/auth`, `server/services/messages`, `server/services/tiket`) and run:
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in each service's directory and add the required environment variables as listed below.

4.  **Run each service:**
    In each service's directory, run:
    ```bash
    npm run dev
    ```

## Environment Variables

### API Gateway (`server/gateway`)

| Variable          | Description                                | Example                               |
| ----------------- | ------------------------------------------ | ------------------------------------- |
| `PORT`            | Port for the gateway service               | `8000`                                |
| `FRONTEND_URL`    | URL of the frontend application            | `http://localhost:5173`               |
| `AUTH_SERVICE`    | URL of the authentication service          | `http://localhost:8001`               |
| `TICKET_SERVICE`  | URL of the ticket service                  | `http://localhost:8002`               |
| `MESSAGES_SERVICE`| URL of the messages service                | `http://localhost:8003`               |

### Auth Service (`server/services/auth`)

| Variable        | Description                           | Example                                             |
| --------------- | ------------------------------------- | --------------------------------------------------- |
| `PORT`          | Port for the auth service             | `8001`                                              |
| `MONGODB_URL`   | MongoDB connection string             | `mongodb://localhost:27017/auth_db`                 |

### Ticket Service (`server/services/tiket`)

| Variable        | Description                           | Example                                             |
| --------------- | ------------------------------------- | --------------------------------------------------- |
| `PORT`          | Port for the ticket service           | `8002`                                              |
| `MONGODB_URL`   | MongoDB connection string             | `mongodb://localhost:27017/ticket_db`               |

### Messages Service (`server/services/messages`)

| Variable        | Description                           | Example                                             |
| --------------- | ------------------------------------- | --------------------------------------------------- |
| `PORT`          | Port for the messages service         | `8003`                                              |
| `MONGODB_URL`   | MongoDB connection string             | `mongodb://localhost:27017/messages_db`             |

## API Routes

All routes are prefixed by the API Gateway.

### Auth Service (`/api/auth`)

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| `POST` | `/google-auth`   | Authenticate user with Google. |
| `GET`  | `/logout`        | Log out the current user.      |
| `GET`  | `/getme`         | Get current user details.      |

### Ticket Service (`/api/ticket`)

| Method   | Endpoint                | Description                            |
| -------- | ----------------------- | -------------------------------------- |
| `POST`   | `/create-ticket`        | Create a new support ticket.           |
| `GET`    | `/get-all-ticket`       | Get all support tickets.               |
| `GET`    | `/:ticketId`            | Get a ticket by its ID.                |
| `PUT`    | `/:ticketId`            | Update the status of a ticket.         |
| `DELETE` | `/:ticketId`            | Delete a ticket.                       |
| `POST`   | `/notes/:ticketId`      | Add a note to a ticket.                |
| `GET`    | `/notes/:ticketId`      | Get all notes for a ticket.            |

### Messages Service (`/api/message`)

| Method   | Endpoint           | Description                      |
| -------- | ------------------ | -------------------------------- |
| `POST`   | `/create/:ticketId`| Create a message for a ticket.   |
| `GET`    | `/:ticketId`       | Get all messages for a ticket.   |
| `DELETE` | `/delete/:ticketId`| Delete all messages for a ticket.|

