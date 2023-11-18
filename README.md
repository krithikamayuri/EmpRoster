# EmpRoster
 
### Introduction

The Employee Scheduling Application is a powerful tool designed to simplify and streamline the process of scheduling employees' shifts in a cleaning company. It leverages automation to intelligently assign shifts based on employee availability, preferences, and business requirements. This application is ideal for small businesses looking to optimize their workforce scheduling.

### Key Features

- Automatic Assign Employees: The application can automatically assign shifts to employees based on their availability.
- Employee Management: Easily add employees to the system, including their contact information and employee type.
- Shift Management: Create, update, and delete shifts with ease, specifying shift timings, roles required, and other details.
- Availability Tracking: Employees can input their availability, making it easier for the system to assign shifts that align with their schedules.
- Notifications: Automatically notify employees of their assigned shifts via email or in-app notifications.
- Reporting: Generate reports on employee schedules, attendance, and more for better workforce management.

### Getting Started

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed.
- A database system (MySQL) for storing employee and shift data.

### Installation

1. Clone this repository to your local machine:
https://github.com/ribenaa/EmpRoster.git

2. Run 'npm install' in the root directory \EmpRoster
  
3. Navigate into the server directory and set up the database
   - cd server
   - npm run dev

4. Open new terminal
   
5. Run the application in the root directory \EmpRoster
   - npm start 

6. Access the application in your web browser at http://localhost:3000.

### Usage

#### User Roles
- Admin: Can manage manager accounts.
- Manager: Can automatically assign shifts, view schedules, and create employees.
- Employee: Can view their own schedule and update their availability.
