# Medical Appointment Management App

Welcome to the Medical Appointment Management App repository!

This application allows medical professionals to efficiently manage their appointments by creating accounts and scheduling appointments for their patients. It provides a user-friendly interface for doctors to input appointment dates and patient information, such as phone numbers, emails, names, and previous medical conditions. This version of the app utilizes MySQL as the database, with a backend implemented in Node.js and Express.

## Features

- **User Authentication**: Secure user authentication system for doctors to create accounts and log in securely.
- **Appointment Scheduling**: Simple interface for doctors to schedule appointments with patient information.
- **Patient Information Management**: Ability to store and update patient details, including contact information and medical history.
- **Data Persistence**: Utilizes MySQL database for storing appointment and patient data, ensuring data persistence and reliability.

## Usage

1. **Sign Up/Login**: Doctors can sign up for a new account or log in with existing credentials.
2. **Appointment Creation**: Once logged in, doctors can schedule new appointments by providing the appointment date and patient information.
3. **Patient Management**: Doctors can view and manage patient details, including contact information and medical history.

## Installation

1. **Clone Repository**: Clone this repository to your local machine using `git clone https://github.com/your-username/sta-mysql.git`.
2. **Install Dependencies**: Navigate to the project directory and install dependencies using `npm install`.
3. **Set Up MySQL Database**: Set up MySQL database and configure credentials. Update MySQL configuration in `config/db.js` with your credentials.
4. **Start Backend Server**: Start the backend server using `npm run start:server`. The server will be hosted at `http://localhost:3001`.
5. **Start Frontend Application**: Start the frontend application using `npm start`. The app will be served at `http://localhost:3000`.

## Notes

- **Modularization**: The modularization of the application is a work in progress and may require further refinement for better organization and scalability.

Feel free to explore and use the Medical Appointment Management App for your practice or project needs. Contributions and feedback are welcome!
