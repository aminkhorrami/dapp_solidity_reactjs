pragma solidity >=0.4.21 <0.6.0;

contract Ponzy {
  address payable public currentInvestor;
  uint256 public currentInvestment = 0;

  function() external payable {
    // new investments must be 10% greater than current
    uint256 minimumInvestment = (currentInvestment * 11) / 10;
    require(msg.value > minimumInvestment);
    // document new investor
    address payable previousInvestor = currentInvestor;
    currentInvestor = msg.sender;
    currentInvestment = msg.value;
    // payout previous investor
    previousInvestor.transfer(msg.value);
  }
}
