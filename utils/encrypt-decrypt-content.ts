import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

// Function to derive encryption key using PBKDF2
export const deriveEncryptionKey = (passkey: string, salt: Buffer): Buffer => {
  return crypto.pbkdf2Sync(passkey, salt, 100000, 32, "sha256");
};

// Encrypt content
export const encryptContent = (
  content: string,
  key: Buffer
): { iv: string; encrypted: string } => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(content, "utf8", "base64");
  encrypted += cipher.final("base64");
  return { iv: iv.toString("base64"), encrypted };
};

// Decrypt content
export const decryptContent = (
  ivBase64: string,
  encryptedBase64: string,
  key: Buffer
): string => {
  const iv = Buffer.from(ivBase64, "base64");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedBase64, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
