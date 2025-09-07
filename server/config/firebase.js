// config/firebase.js
const admin = require("firebase-admin");

let serviceAccount;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // ✅ Decode base64 encoded JSON
    const decoded = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT,
      "base64"
    ).toString("utf8");
    serviceAccount = JSON.parse(decoded);
    console.log("✅ Loaded Firebase service account from BASE64 env variable.");
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // ⚠️ Fallback: direct JSON string (must be properly escaped with \\n in .env)
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log("✅ Loaded Firebase service account from raw JSON env variable.");
  } else {
    throw new Error(" No Firebase service account found in environment variables.");
  }
} catch (error) {
  console.error(" Failed to parse FIREBASE_SERVICE_ACCOUNT:", error);
  process.exit(1);
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin initialized successfully.");
} catch (error) {
  console.error("❌ Firebase Admin initialization failed:", error);
  process.exit(1);
}

const db = admin.firestore();

module.exports = { admin, db };
