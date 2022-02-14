var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSales = artifacts.require("./MyTokenSale.sol");
var MyKycContract = artifacts.require("./KycContract.sol");
require('dotenv').config({path: '../.env'});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(MyKycContract);
    await deployer.deploy(MyTokenSales, 1, addr[0], MyToken.address, MyKycContract.address);
    let instance = await MyToken.deployed();
    await instance.transfer(MyTokenSales.address,  process.env.INITIAL_TOKENS);
};
