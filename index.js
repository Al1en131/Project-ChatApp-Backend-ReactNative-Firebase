const admin = require("./firebase");
const data = require("./data.json");

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
const deviceToken = "YOUR_DEVICE_FCM_TOKEN_HERE";
sendNotificationToDevice(
  data.token,
  "Code Caty",
  "This is a test notification."
);
