import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: '.env.local' });

const rawKey = process.env.PRIVATE_KEY;
if (!rawKey) {
    console.error("PRIVATE_KEY not found in .env.local");
    process.exit(1);
}

// Emulate my normalization logic
const normalizePem = (key) => {
    let cleaned = key.trim().replace(/^"|"$/g, "").replace(/\\n/g, "\n").trim();
    const header = "-----BEGIN PRIVATE KEY-----";
    const footer = "-----END PRIVATE KEY-----";
    const base64Body = cleaned.replace(header, "").replace(footer, "").replace(/\s/g, "");
    const wrappedBody = base64Body.match(/.{1,64}/g)?.join("\n") || base64Body;
    return `${header}\n${wrappedBody}\n${footer}\n`;
};

const pem = normalizePem(rawKey);
console.log("--- Normalized PEM ---");
console.log(pem.substring(0, 50) + "...");
console.log("...");
console.log(pem.substring(pem.length - 50));

try {
    // Pipe the PEM to openssl to check if it's valid
    const output = execSync('openssl rsa -in - -noout -check', {
        input: pem,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
    });
    console.log("✅ OpenSSL: Key is VALID.");
} catch (error) {
    console.error("❌ OpenSSL: Key is INVALID.");
    console.error(error.stderr || error.message);
}
