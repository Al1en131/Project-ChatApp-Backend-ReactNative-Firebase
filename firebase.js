const admin = require('firebase-admin');

// Load your Firebase service account key JSON file
const serviceAccount = require('./firebase-service.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;