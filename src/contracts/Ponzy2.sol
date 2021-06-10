pragma solidity >=0.4.21 <0.6.0;

contract Ponzy2 {
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

contract GradualPonzi {
  address[] public investors;
  mapping(address => uint256) public balances;
  uint256 public constant MINIMUM_INVESTMENT = 1e15;

  constructor() public {
    investors.push(msg.sender);
  }

  function() external payable {
    require(msg.value >= MINIMUM_INVESTMENT);
    uint256 eachInvestorGets = msg.value / investors.length;
    for (uint256 i = 0; i < investors.length; i++) {
      balances[investors[i]] += eachInvestorGets;
    }
    investors.push(msg.sender);
  }

  function withdraw() public {
    uint256 payout = balances[msg.sender];
    balances[msg.sender] = 0;
    msg.sender.transfer(payout);
  }
}
