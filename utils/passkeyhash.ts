import * as CryptoJS from "crypto-js";

// Function to hash a password using PBKDF2
export const hashPassword = (password: string, salt: string): string => {
  return CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32 }).toString();
};

// Function to verify if the provided password matches the hashed password
export const verifyPassword = (
  providedPassword: string,
  salt: string,
  storedHash: string
): boolean => {
  const hashedProvidedPassword = hashPassword(providedPassword, salt);
  return hashedProvidedPassword === storedHash;
};
