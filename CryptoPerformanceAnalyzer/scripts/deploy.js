const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("Connecting to local Hardhat node...");
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8546");
    
    // Hardhat's default first account private key
    const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

    const contractPath = path.join(__dirname, "../artifacts/contracts/CryptoPerformance.sol/CryptoPerformance.json");
    const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));

    console.log("Deploying contract...");
    const factory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    console.log("Contract deployed to:", address);

    // Save the address to a file so backend can read it
    fs.writeFileSync(path.join(__dirname, "../contractAddress.txt"), address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
