const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Read contract ABI
const contractPath = path.join(__dirname, '../artifacts/contracts/CryptoPerformance.sol/CryptoPerformance.json');
const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const abi = contractJson.abi;

// Read contract Address
let contractAddress = "";
try {
    contractAddress = fs.readFileSync(path.join(__dirname, '../contractAddress.txt'), 'utf8').trim();
} catch (e) {
    console.error("Contract address file not found. Ensure you have deployed the contract.");
}

// Connect to local Hardhat node
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8546");
// Hardhat's default first account private key
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

// Instantiate contract
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeHash(hashString) {
    try {
        console.log("Storing hash on blockchain:", hashString);
        const tx = await contract.storeHash(hashString);
        await tx.wait(); // Wait for transaction to be mined
        return tx.hash;
    } catch (error) {
        console.error("Error storing hash:", error);
        throw error;
    }
}

module.exports = {
    storeHash
};
