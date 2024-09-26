Getting Started
1 Installation
Clone the repository from GitHub:
bash
Copy code
git clone <repository-url>
Navigate to the project directory:
bash
Copy code
cd <project-directory>
Install the necessary dependencies:
bash
Copy code
npm install
Set up your MongoDB database and create a .env file in the root directory with the following variables:
makefile
Copy code
MONGODB_URI=<your_mongodb_connection_string>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
2 Configuration
Start the server:
bash
Copy code
npm start
Open your web browser and navigate to http://localhost:5173.
