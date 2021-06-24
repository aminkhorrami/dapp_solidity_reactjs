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

contract SimplePyramid {
  uint256 public constant MINIMUM_INVESTMENT = 1e15; // 0.001 ether
  uint256 public numInvestors = 0;
  uint256 public depth = 0;
  address[] public investors;
  mapping(address => uint256) public balances;

  constructor() public payable {
    require(msg.value >= MINIMUM_INVESTMENT);
    investors.length = 3;
    investors[0] = msg.sender;
    numInvestors = 1;
    depth = 1;
    balances[address(this)] = msg.value;
  }

  function() external payable {
    require(msg.value >= MINIMUM_INVESTMENT);
    balances[address(this)] += msg.value;

    numInvestors += 1;
    investors[numInvestors - 1] = msg.sender;

    if (numInvestors == investors.length) {
      // pay out previous layer
      uint256 endIndex = numInvestors - 2**depth;
      uint256 startIndex = endIndex - 2**(depth - 1);
      for (uint256 i = startIndex; i < endIndex; i++)
        balances[investors[i]] += MINIMUM_INVESTMENT;

      // spread remaining ether among all participants
      uint256 paid = MINIMUM_INVESTMENT * 2**(depth - 1);
      uint256 eachInvestorGets = (balances[address(this)] - paid) /
        numInvestors;
      for (uint256 i = 0; i < numInvestors; i++)
        balances[investors[i]] += eachInvestorGets;

      // update state variables
      balances[address(this)] = 0;
      depth += 1;
      investors.length += 2**depth;
    }
  }

  function withdraw() public {
    uint256 payout = balances[msg.sender];
    balances[msg.sender] = 0;
    msg.sender.transfer(payout);
  }
}
