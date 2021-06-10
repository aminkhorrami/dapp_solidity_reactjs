require("babel-register");
require("babel-polyfill");

// • host: This is localhost for our local RPC node. An external IP or domain for a hosted node.
// • port: The HTTP RPC port for the running node. TestRPC and geth use 8545 by default. If geth uses a custom port with the --rpcport flag, this configuration has to be updated to match.
// • network_id: The network ID of the network—1 for mainnet, 4 for Rinkeby, and * to match any network.
// • gas (optional): The default gas value to specify for transactions. Individual transactions can override this value. Default: 90000.
// • gasPrice (optional): The default gas price for transactions in wei. Defaults to the mean network gas price. A good value if you wish to set this is 20 Gwei (1Gwei = 109 wei). You can go as low as 1 Gwei and still have transactions clear within 10 minutes.
// • provider (optional): An advanced configuration used to pass in a web3 provider. You will likely never use this.

module.exports = {
  networks: {
    // Ganache
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 1001, // Match any network id
    },
    // rinkeby: {
    //   host: "localhost",
    //   port: 8545,
    //   network_id: 4,
    // },
    // mainnet: {
    //   host: "localhost",
    //   port: 8545,
    //   network_id: 1,
    // },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      solc: {
        version: "0.5.16", // ex:  "0.4.20". (Default: Truffle's installed solc)
      },
      // •By default, Truffle will not use the solc optimizer when compiling Solidity contracts.
      // The optimizer reduces the size of contracts significantly to help you save on gas costs.
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
