import React, { useState } from "react";

const Main = ({ createProduct, products, purchaseProduct }) => {
  const [values, setValues] = useState({ name: "", price: "" });
  return (
    <div className="content mr-auto ml-auto">
      <h1>Add Product</h1>
      <form
        onSubmit={event => {
          event.preventDefault();
          const priceWei = window.web3.utils.toWei(
            values.price.toString(),
            "Ether",
          );
          createProduct(values.name, priceWei);
        }}
      >
        <div className="form-group mr-sm-2">
          <input
            id="productName"
            type="text"
            value={values.name}
            onChange={e => setValues({ ...values, name: e.target.value })}
            className="form-control"
            placeholder="Product Name"
            required
          />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productPrice"
            type="number"
            value={values.price}
            onChange={e => setValues({ ...values, price: e.target.value })}
            className="form-control"
            placeholder="Product Price"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
      <p> </p>

      <h2>Buy Product</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="productList">
          {products.map((i, index) => (
            <tr key={index}>
              <th scope="row">{i.id.toString()}</th>
              <td>{i.name}</td>
              <td>{window.web3.utils.fromWei(i.price.toString())} Ether</td>
              <td>{i.owner}</td>
              <td>
                {!i.purchased && (
                  <button
                    onClick={() => purchaseProduct(i.id, i.price)}
                    //className="buyButton"
                  >
                    Buy
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
