const Ponzy2 = artifacts.require("Ponzy2");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer, network) {
  if (network === "development") {
    deployer.deploy(Ponzy2);
    deployer.deploy(MarketPlace);
  }
};
