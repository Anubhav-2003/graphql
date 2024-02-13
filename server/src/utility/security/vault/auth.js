const Vault = require('node-vault');
const axios = require('axios')

const vault = Vault({ token: '' });
const VAULT_TOKEN = process.env.VAULT_TOKEN;

/**
 * Encrypts file data using Vault's transit encryption engine.
 * 
 * @param {Buffer} fileData The file data to be encrypted.
 * @returns {Promise<Buffer>} A Promise that resolves to the encrypted file data in Buffer format.
 * @throws {Error} If encryption fails or an error occurs during the process.
 */
async function encryptFileData(fileData) {
    try {   
        // Make a POST request to Vault API for encryption
        console.log(fileData)
        const response = await vault.write('transit/encrypt/upload-key', { plaintext: Buffer.from(fileData).toString('base64') });

        // Extract and return the encrypted data from the response
        console.log('Vault encryption response:', response);
        return Buffer.from(response.data.ciphertext, 'base64');
    } catch (error) {
        console.error('Error encrypting file data:', error);
        throw new Error('Failed to encrypt file data.');
    }
}

module.exports = encryptFileData