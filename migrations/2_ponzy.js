const Ponzy = artifacts.require("Ponzy");

module.exports = function (deployer, network) {
  if (network === "development") {
    deployer.deploy(Ponzy);
  }
};
