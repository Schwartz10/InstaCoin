pragma solidity ^0.4.18;

contract CapCoin {

  event NewUser(string name);
  // event BoughtCoins()

  uint coinSupply = 1000000;
  uint coinsBought = 0;

  struct User {
    string name;
    uint coinBalance;
  }

  mapping (address => User) public addressToUser;
  address[] public users;

  function createUser(string name) public {
    var user = addressToUser[msg.sender];

    user.name = name;
    user.coinBalance = 0;

    users.push(msg.sender) - 1;
    NewUser(name);
  }

  function getUsers() public view returns (address[]) {
    return users;
  }

  function getUser() public view returns (string, uint) {
    return (addressToUser[msg.sender].name, addressToUser[msg.sender].coinBalance);
  }

  function buyTokens(uint tokens) public {
    addressToUser[msg.sender].coinBalance += tokens;
    // BoughtCoins(addressToUser[msg.sender].coinBalance);
  }
}
