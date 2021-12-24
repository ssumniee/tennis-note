const dotenv = require("dotenv");

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

module.exports = {
  jwt: {
    secretKey: required("ACCESS_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 10800)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12), 10),
  },
  port: parseInt(required("PORT", 8080), 10),
  db: {
    host: required("DB_HOST"),
    username: required("DB_USERNAME"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
    port: required("DB_PORT"),
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  coolsms: {
    apiKey: required("COOLSMS_API_KEY"),
    apiSecret: required("COOLSMS_API_SECRET"),
    callingNumber: required("COOLSMS_CALLING_NUMBER"),
  },
};
