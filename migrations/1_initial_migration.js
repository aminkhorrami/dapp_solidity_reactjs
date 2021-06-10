// sol files to deploy
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  // unlock account for geth
  // if (network == "rinkeby" || network == "mainnet") {
  //   var password = fs.readFileSync("password", "utf8").split("\n")[0];
  //   web3.personal.unlockAccount(web3.eth.accounts[0], password);
  // }
  deployer.deploy(Migrations);
};
