const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  let MyNFT, myNFT, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy("TestNFT", "TNFT", "https://example.com/metadata/");
    await myNFT.deployed();
  });

  it("Should deploy with correct name and symbol", async function () {
    expect(await myNFT.name()).to.equal("TestNFT");
    expect(await myNFT.symbol()).to.equal("TNFT");
  });

  it("Should mint NFT to address", async function () {
    await myNFT.mint(addr1.address);
    expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
  });

  it("Should increment tokenId after minting", async function () {
    await myNFT.mint(addr1.address);
    expect(await myNFT.nextTokenId()).to.equal(1);
  });

  it("Should return correct base URI", async function () {
    expect(await myNFT.baseTokenURI()).to.equal("https://example.com/metadata/");
  });
});
