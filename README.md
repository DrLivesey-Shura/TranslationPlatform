# Translation Platform - File Translation Management System

## Overview

**Translation Platform** is a file translation management system built using the MERN stack. It allows users to upload files for translation, handle payments through Braintree, and download the translated files once completed. Administrators can manage translation requests, upload the translated documents, and oversee the entire translation process.

### Features

- **User Panel**:
  - Upload files for translation.
  - Select the target language for the translation.
  - Securely process payments via Braintree.
  - Receive notifications when the translation is completed.
  - Download the translated file from the platform.

- **Admin Panel**:
  - View all translation requests.
  - Download uploaded files for translation.
  - Upload translated files for users to download.
  - Track payment status and user transactions.

- **Payment System**:
  - Integrated Braintree payment gateway for secure transactions.
  - Users can pay for translation services directly on the platform.

- **Real-time Status Updates**:
  - Users are notified when their translated file is ready.
  - Admins can update the translation status and manage the workflow.

### Tech Stack

- **Frontend**:  
  React.js with Chakra UI for styling.

- **Backend**:  
  Node.js with Express.js for handling APIs and the core application logic.

- **Database**:  
  MongoDB for managing users, translation requests, files, and transactions.

- **Payment Integration**:  
  Braintree for handling secure payments and transactions.

### Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DrLivesey-Shura/TranslationPlatform.git
   cd TranslationPlatform
   ```

2. Install dependencies for both client and server:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - MongoDB connection string
   - Braintree API credentials
   - JWT secret for authentication

4. Start the servers:
   - **Backend**: 
     ```bash
     cd server
     npm start
     ```
   - **Frontend**: 
     ```bash
     cd client
     npm start
     ```

### Usage

- **Users**:
  - Register and log in to the platform.
  - Upload a file, specify translation details, and complete the payment.
  - Download the translated file once notified by email.

- **Admins**:
  - Manage translation requests and oversee payments.
  - Upload translated files for user access.

### Contributing

Feel free to open issues or submit pull requests for feature suggestions and improvements. Contributions are always welcome!
