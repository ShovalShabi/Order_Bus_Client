# Project Overview

This project is a **React-based Passenger Bus Ordering System** built using **Vite** for a fast development environment and deployment process. The system integrates with backend microservices that include **Auth**, **Feedback**, **OrderBus**, and **Routes** services. This web client allows passengers to plan their bus rides, choose between bus options, provide feedback on bus services, and interact with drivers through WebSocket-based communication.

The frontend interacts with multiple backend microservices that need to be set up and running before the client can be fully functional. This README provides steps to configure and run the frontend along with the necessary backend services.

---

## Project Summary

This web application is designed to improve bus services by providing passengers with an easy-to-use interface to plan and order rides. The backend microservices focus on:

- **Auth Service**: Managing user authentication for bus drivers and administrators.
- **Feedback Service**: Collecting feedback and ratings from passengers.
- **OrderBus Service**: Handling communication between passengers and bus drivers via WebSockets.
- **Routes Service**: Fetching and displaying routes from the Google Maps API.

---

## Prerequisites

Before running the project, ensure you have the following tools installed:

1. [Node.js](https://nodejs.org/en/) (version 16.x or higher)
2. [Vite](https://vitejs.dev/guide/) for building and serving the React application.
3. [Docker](https://docs.docker.com/get-docker/) (optional, for running the backend services in containers).

You will also need to clone the backend services from the repository:

```bash
git clone https://github.com/ShovalShabi/smartBUS_Microservices.git
```

Follow the instructions in the backend's README to set up and run the microservices.

---

## Running the Project via Vite

### Step 1: Clone the Frontend Project

Clone the frontend repository to your local machine:

```bash
git clone https://github.com/ShovalShabi/Order_Bus_Client.git
cd Order_Bus_Client
```

### Step 2: Install Dependencies

Install all necessary dependencies using the following command:

```bash
npm install
```

### Step 3: Running the Development Server

To run the project in development mode:

```bash
npm run dev
```

This will start the Vite development server on the port defined in your `.env` file (default is `5173`).

### Step 4: Running in Production Mode

To build the project for production:

```bash
npm run build
```

After building, you can preview the production build using:

```bash
npm run preview
```

---

## Backend Setup

You need to run the backend services before launching the frontend application. Make sure you have the backend repository set up and services like **Auth**, **Feedback**, **OrderBus**, and **Routes** running. These services are essential for the application to work properly.

To run the backend services via Docker, use the provided `compose-dev.yaml`/`compose-prod.yaml` in the backend repository:

```bash
docker-compose -f {compose_file_name} up --build -d
```

Make sure the backend services are running on the following ports:

- **Auth Service**: `http://localhost:3804`
- **Feedback Service**: `http://localhost:5003`
- **OrderBus Service**: `http://localhost:6936`
- **Routes Service**: `http://localhost:6924`

---

## Environment Variables

You will need the environment variables to connect the frontend to the backend services. For the `.env` file, send an email to request the necessary keys:

- Send an email to:
  - [shovalshabi@gmail.com](mailto:shovalshabi@gmail.com?subject=Requesting%20.env%20files%20for%20smartBUS%20project)
  - [tamir303@gmail.com](mailto:tamir303@gmail.com?subject=Requesting%20.env%20files%20for%20smartBUS%20project)

---

## Running Tests

To run tests locally, use the following command:

```bash
npm run test
```

This will execute the test suite using Vite's test runner.

---

## Docker Setup for Frontend

To run the backend services via Docker, use the provided compose-dev.yaml/compose-prod.yaml in the backend repository:

To run the frontend in a Docker container, use the following commands:

```bash
docker-compose up --build -d
```

### Development Mode:

```bash
npm run docker-dev
```

### Production Mode:

```bash
npm run docker-prod
```

Ensure that the backend services are running before starting the frontend in Docker mode.

---

## Contact

If you encounter any issues or have questions about the project, feel free to reach out via email to [shovalshabi@gmail.com](mailto:shovalshabi@gmail.com?subject=Request%20for%20ENV%20files) and [tamir303@gmail.com](mailto:tamir303@gmail.com?subject=Request%20for%20ENV%20files).

#### © All rights reserved to Shoval Shabi and Tamir Spilberg
