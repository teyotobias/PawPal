# PawPal
A sleek, easy-to-use web app for managing your favorite dogs. Search, sort, add, edit, and delete dog profiles with ease.


<img width="1168" alt="Screenshot 2024-09-18 at 11 58 24" src="https://github.com/user-attachments/assets/013ad173-c599-4d9d-a282-d823f0369f7d">

<img width="1168" alt="Screenshot 2024-09-18 at 11 59 23" src="https://github.com/user-attachments/assets/ff6aa1af-7f53-4b5a-965c-599c01f41a8b">


## App Features:

### Backend:
* Full CRUD functionality: Create, Read, Update, and Delete operations for managing dog profiles in the database.
* Modular Architecture: Backend is organized into separate models, controllers, and routes for scalability and maintainability.
* RESTful API: API endpoints to interact with dog data via server.js
* Data Validation and Error Handling: Validation for dog input fields and structured error handling to ensure robust backend operations.

### Frontend:
* React Router Integration: Seamless navigation between different pages of the app using react-router-dom
* Search and Sorting: Seach bar for filtering dogs by name in real-time and a dropdown menu for sorting dogs by name or breed.
* Dog Gallery: Display a list of random dog images fetched from an external API (dog.ceo)
* Dog Management: A form for adding new dogs, dynamically updating the dog list without refreshing the page. Edit and delete existing dogs directly from the list.
* Real Time Updates: The UI automatically reflects changes (add, update, delete) to the dog data in real time.
* Responsive Design

## Technologies used:
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

```markdown
## Installation Instructions

### Step 1: Clone the Repository
Clone this repository to your local machine using the following command:
```bash
git clone https://github.com/teyotobias/PawPal.git
```
Navigate to the project directory:
```bash
cd PawPal
```

### Step 2: Install Backend Dependencies
Navigate to the backend directory:
```bash
cd backend
```
Install the required dependencies:
```bash
npm install
```

### Step 3: Install Frontend Dependencies
Navigate to the frontend directory:
```bash
cd ../frontend
```
Install the required dependencies:
```bash
npm install
```

### Step 4: Set Up Environment Variables
Create a `.env` file in the backend directory and add the following environment variables:
```
PORT=4000
MONGO_URI='your-mongodb-connection-string'
```

### Step 5: Run the Application
To run the backend server, navigate back to the backend directory and run:
```bash
nodemon server.js
```
To run the frontend server, open a new terminal, navigate to the frontend directory, and run:
```bash
npm run dev
```
This will start the Vite development server for the frontend.

### Step 6: Access the Application
Open your web browser and navigate to `http://localhost:4000` to access the PawPal application.
```

