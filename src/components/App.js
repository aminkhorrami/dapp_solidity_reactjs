import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Navbar from "./navbar";
import Marketplace from "../abis/Marketplace.json";
import Main from "./main.js";
import "./App.css";

const App = () => {
  const [stateTx, setStateTx] = useState({
    account: "",
    productCount: 0,
    products: [],
    loading: true,
    marketplace: null,
  });
  const loadWeb3 = async () => {
    // from
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    // modern app browser
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!",
      );
    }
  };
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // load account. it's a [array]
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      // for loading a smartcontact from a blockchain
      // we need to use the below util with abi abd the address which it
      // could be found on the smartcontract , .json file!
      const marketplace = web3.eth.Contract(
        Marketplace.abi,
        networkData.address,
      );
      let products = [];
      const productCount = await marketplace.methods.productCount().call();
      console.log("1:", productCount.toString());
      for (let i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        products.push(product);
      }
      setStateTx({
        ...stateTx,
        productCount,
        products: products,
        account: accounts[0],
        marketplace,
        loading: false,
      });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  };
  const createProduct = (name, price) => {
    setStateTx({ ...stateTx, loading: true });
    stateTx.marketplace.methods
      .createProduct(name, price)
      .send({ from: stateTx.account })
      .once("receipt", receipt => {
        setStateTx({ ...stateTx, loading: false });
      });
  };
  const purchaseProduct = (id, price) => {
    setStateTx({ ...stateTx, loading: true });
    stateTx.marketplace.methods
      .purchaseProduct(id)
      .send({ from: stateTx.account, value: price })
      .once("receipt", receipt => {
        setStateTx({ ...stateTx, loading: false });
      });
  };

  useEffect(() => {
    loadWeb3();
    console.log("WEB3", window.web3);
    loadBlockchainData();
  }, []);
  return (
    <div>
      <Navbar account={stateTx.account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            {stateTx.loading ? (
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
            ) : (
              <Main
                products={stateTx.products}
                purchaseProduct={purchaseProduct}
                createProduct={createProduct}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
