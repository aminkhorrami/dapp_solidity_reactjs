const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer, network) {
  if (network === "development") {
    deployer.deploy(MarketPlace);
  }
};
