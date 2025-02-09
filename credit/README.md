# Credit Report System

A full-stack application for managing and viewing credit reports, built with React, TypeScript, and Node.js.

## Features

- Upload XML credit reports
- View all reports in a searchable, sortable table
- Detailed report view with sections for:
  - Basic Details
  - Report Summary
  - Credit Accounts Information
- Download reports as JSON
- Print reports
- Share reports (using Web Share API)
- Responsive design
- TypeScript support
- Loading states and error handling

## Prerequisites

- Node.js 16.x or higher
- MongoDB database
- Modern web browser

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd credit
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
npm install 

# Install backend dependencies
cd backend
npm install
npm install mongodb
npm install cors  
```

3. Configure MongoDB:
   - Create a MongoDB database in mongodb atlas
   - Update the connection string in `backend/server.js`

4. Environment Setup:
   - Frontend runs on port 5173 (Vite default)
   - Backend runs on port 5000

## Running the Application

1. Start the backend server:
```bash
cd backend
node server.js
```

2. Start the frontend development server:
```bash
# From the root directory
npm run dev
```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Testing

### Sample XML Format
Use this format for testing the upload functionality:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<report>
  <basicDetails>
    <name>John Doe</name>
    <mobilePhone>+91-9876543210</mobilePhone>
    <pan>ABCDE1234F</pan>
    <creditScore>750</creditScore>
  </basicDetails>
  <summary>
    <totalAccounts>5</totalAccounts>
    <activeAccounts>3</activeAccounts>
    <closedAccounts>2</closedAccounts>
    <currentBalanceAmount>125000.00</currentBalanceAmount>
    <securedAccountsAmount>75000.00</securedAccountsAmount>
    <unsecuredAccountsAmount>50000.00</unsecuredAccountsAmount>
    <lastSevenDaysEnquiries>2</lastSevenDaysEnquiries>
  </summary>
  <creditAccounts>
    <account>
      <creditCard>HDFC Bank Platinum</creditCard>
      <bank>HDFC Bank</bank>
      <address>123 Main Street, Mumbai, Maharashtra 400001</address>
      <accountNumber>XXXX-XXXX-1234</accountNumber>
      <amountOverdue>0.00</amountOverdue>
      <currentBalance>25000.00</currentBalance>
    </account>
  </creditAccounts>
</report>
```

## API Endpoints

### Reports
- `GET /api/reports` - Get all reports
- `GET /api/reports/:id` - Get a specific report
- `POST /api/reports/upload` - Upload a new report (XML file)
