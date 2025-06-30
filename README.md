# finance-tracker-backend
Finance Tracker
A simple full-stack finance tracker web app built with React, Node.js, and MongoDB. It allows users to track income and expenses, view summaries and recent transactions.
 Features
1. User registration & login (JWT auth)
2. Add/update/delete transactions (Income & Expense)
3.Dashboard summary (income, expense, balance)
4. Analytics by category (chart-ready)
5. Search & filter transactions
6.Responsive UI
7.MongoDB storage
8.Secure backend with validations & auth middleware.

Frontend:
React
Axios
React Router

Backend:
Node.js
Express
MongoDB
Mongoose
JWT for Auth
Helmet, CORS, express-validator
/finance-tracker-backend
  |-- controllers/
  |-- models/
  |-- routes/
  |-- middleware/
  |-- .env
  |-- server.js

/finance-tracker-client(frontend)
  |-- src/
      |-- pages/
      |-- components/
      |-- context/
How to run
Backend:
cd finance-tracker-backend
npm install
npx nodemon server.js

Frontend:
cd finance-tracker-client
npm install
npm start








