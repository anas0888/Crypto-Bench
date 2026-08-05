const crypto = require('crypto');

function runAES(text) {
    const key = crypto.randomBytes(32); // AES-256
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Generate RSA keys once (for performance testing purposes)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

function runRSA(text) {
    // Encrypt the text using the public key
    const encrypted = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(text)
    );
    return encrypted.toString('base64');
}

module.exports = {
    runAES,
    runRSA
};
