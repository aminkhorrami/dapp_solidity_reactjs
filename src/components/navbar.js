import React from "react";
const Navbar = ({ account }) => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        style={{ color: "white" }}
        className="navbar-brand red col-sm-3 col-md-2 mr-0"
        target="_blank"
        rel="noopener noreferrer"
      >
        MarketPlace
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small className="text-white">
            <span id="account">{`your public address : ${account}`}</span>
          </small>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
