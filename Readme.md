## README: Setting Up Firebase Admin SDK and Sending Notifications

### Prerequisites
1. **Firebase Project Setup**: 
   - Ensure you have created a Firebase project. 
   - Navigate to **Project Settings > Service Accounts** in the Firebase Console.
   - Click "Generate new private key" to download the `firebase-service.json` file.

2. **Install Dependencies**: 
   - Make sure you have Node.js installed.
   - Run the following command to install the required packages:
     ```bash
     npm install firebase-admin nodemon
     ```

---

### Step 1: Add Firebase Service File

- Place the `firebase-service.json` file in the root directory of your project.
- Ensure the file contains the private key details of your Firebase project. **Do not share this file publicly**.

---

### Step 2: Firebase Admin Setup

- Create a file named `firebase.js` in your project directory:
  ```javascript
  const admin = require('firebase-admin');

  // Load your Firebase service account key JSON file
  const serviceAccount = require('./firebase-service.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  module.exports = admin;
  ```

---

### Step 3: Sending Push Notifications

- Add the following code to a new file, `sendNotification.js`:
  ```javascript
  const admin = require('./firebase');
  const data = require('./data.json');

  async function sendNotificationToDevice(deviceToken, title, body) {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: { name: "CODE_CATY" },
      token: deviceToken, // FCM device token
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("Notification sent successfully:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  // Example usage
  const deviceToken = data.token; // Replace with your FCM token
  sendNotificationToDevice(
    deviceToken,
    "Code Caty",
    "This is a test notification."
  );
  ```

- **data.json** Example:
  ```json
  {
    "token": "YOUR_DEVICE_FCM_TOKEN_HERE"
  }
  ```

---

### Step 4: Auto-Reload with Nodemon

- Install `nodemon` globally if not already installed:
  ```bash
  npm install -g nodemon
  ```

- Update the `package.json` file to include a script for running `nodemon`:
  ```json
  "scripts": {
    "start": "nodemon sendNotification.js"
  }
  ```

- Run the script:
  ```bash
  npm run start
  ```

---

### How It Works

1. Whenever you save the `sendNotification.js` file, `nodemon` will automatically reload and send the notification.
2. The `sendNotificationToDevice` function uses the Firebase Admin SDK to send a push notification to the specified device token.

---

### Important Notes

1. **Secure Your Keys**: 
   - Never commit the `firebase-service.json` file to public version control systems like GitHub.
   - Use environment variables for production setups.

2. **Testing**: 
   - Use a valid FCM device token for testing.
   - Ensure the Firebase Messaging API is enabled in your Firebase project.

3. **Logs**: 
   - View the logs in your terminal for success or error messages during notification delivery.