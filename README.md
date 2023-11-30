# ACIT-3475

## Front End

### Setup
Step 1: Install Node.js  
Step 2: Change directory to the front end folder  
```bash
cd my-react-app
```
Step 3: Install the dependencies  
```bash
npm install
```
Step 4: Run the application  
```bash
npm run dev
```
Step 5: Get a key from https://platform.openai.com/api-keys

Step 6: Create an .env file
```ini
VITE_API=openaiKey
VITE_API_URL= route here 
```

## Back End

### Setup
Step 1: Install Node.js and MongoDB  
Step 2: Change directory to the back end folder  
```bash
cd my-express-app
```
Step 3: Install the dependencies  
```bash
npm install
```
Step 4: Start the app  
```bash
npm start
```
### env file
Create a new file in the express directory called `.env` and add the following lines:
```ini
DATABASE_URL=""

AWS_BUCKET_NAME=""
AWS_BUCKET_REGION=""
AWS_ACCESS_KEY=""
AWS_SECRET_ACCESS_KEY=""
```
Replace the placeholders with your actual configuration values.

