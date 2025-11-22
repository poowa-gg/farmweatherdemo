// Simple script to generate a secure JWT secret
const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');

console.log('\n===========================================');
console.log('Your JWT Secret (copy this):');
console.log('===========================================');
console.log(secret);
console.log('===========================================\n');
console.log('Add this to your .env file as:');
console.log(`JWT_SECRET=${secret}`);
console.log('\n');
