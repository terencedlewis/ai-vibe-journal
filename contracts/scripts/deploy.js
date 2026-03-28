require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const MyNFT = await ethers.getContractFactory("MyNFT");
  const name = "TestNFT";
  const symbol = "TNFT";
  const baseURI = "https://example.com/metadata/"; // Change as needed
  const myNFT = await MyNFT.deploy(name, symbol, baseURI);
  await myNFT.deployed();

  console.log("MyNFT deployed to:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
