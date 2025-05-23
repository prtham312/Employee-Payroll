# Employee Payroll App
This is a simple and responsive web application to manage employee payroll data. It allows you to add, edit, delete, and view employee details, including their name, email, phone number, and salary. The app uses a clean UI with a mobile-first design approach, ensuring a smooth experience across devices.

Features
* Add New Employee: Enter employee details with validation to avoid duplicates and ensure data integrity.

* Edit Employee: Update employee information without unnecessary validation errors.

* Delete Employee: Remove employees with a confirmation prompt to prevent accidental deletions.

* Dashboard Overview: View active employees count, total salary paid, and a payroll amount summary.

* Responsive Design: The layout adapts to different screen sizes, optimized for mobile devices.

* Data Persistence: Employee data is stored and fetched via a local JSON server (JSONServer), enabling easy testing and development.

Technologies Used
* HTML5 & CSS3 for structure and styling

* JavaScript (ES9+) & jQuery for interactivity and DOM manipulation

* AJAX for asynchronous server communication

* JSONServer for simulating a backend REST API

Setup Instructions
* Clone or download this repository.
```bash
https://github.com/prtham312/Employee-Payroll.git
```

* Install JSONServer globally if you haven’t already:


``` bash
npm install -g json-server
```
* Start the JSONServer:

```bash
json-server --watch db.json --port 3000
```

* Open index.html in your favorite browser.

* Use the Add User button to start adding employee data.

Project Structure
* index.html — Main HTML file containing the app layout and modal form

* style.css — Stylesheet for UI design and responsiveness

* script.js — JavaScript file handling all logic including CRUD operations and validation

* db.json — JSON file used by JSONServer to store employee data

Screenshot

![image](https://github.com/user-attachments/assets/97d2fee3-b2e9-4b66-92b9-a668b7747a0b)
