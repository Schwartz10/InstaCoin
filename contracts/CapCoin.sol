pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract CapCoin is Ownable {

  event NewUser(string name);
  event BoughtTokens(uint coinBalance);
  event CreatedPost(string url, string caption);
  event LikedPost(int lotteryAmount, string posterName,
    address poster, uint posterCoinbalance, string likerName,
    address liker, uint likerCoinbalance);
  event CashedOut(uint newCoinbalance, address user);

  uint coinSupply = 1000000;
  uint coinsBought = 0;
  address owner;
  uint value;

  function CapCoin () {
    owner = msg.sender;
  }

  struct User {
    string name;
    uint coinBalance;
  }

  struct Post {
    string url;
    string userName;
    int lotteryAmount;
    address owner;
    string caption;
  }

  mapping (address => User) public addressToUser;
  mapping (address => Post) public addressToPost;
  address[] public posts;

  function createUser(string name) public {
    var user = addressToUser[msg.sender];
    user.name = name;
    user.coinBalance = 0;
    NewUser(name);
  }

  function getUser() public view returns (string, uint, string, int, address) {
    return (addressToUser[msg.sender].name,
      addressToUser[msg.sender].coinBalance,
      addressToPost[msg.sender].url,
      addressToPost[msg.sender].lotteryAmount,
      msg.sender);
  }

  // need to add economics
  function buyTokens(uint amount) payable public {
    addressToUser[msg.sender].coinBalance += amount;
    coinsBought += amount;
    coinSupply -= amount;
    value += msg.value;
    BoughtTokens(addressToUser[msg.sender].coinBalance);
  }

  function createPost(string url, string caption) public {
    // 5 coins per post
    var post = addressToPost[msg.sender];
    post.url = url;
    post.lotteryAmount -= 5;
    post.userName = addressToUser[msg.sender].name;
    post.owner = msg.sender;
    post.caption = caption;

    posts.push(msg.sender) -1;
    addressToUser[msg.sender].coinBalance -= 5;
    CreatedPost(url, caption);
  }

  function likePost(address post, uint amount) public {
    addressToPost[post].lotteryAmount += int(amount);
    addressToUser[post].coinBalance += amount;
    addressToUser[msg.sender].coinBalance -= amount;
    LikedPost(addressToPost[post].lotteryAmount,
      addressToUser[post].name, post, addressToUser[post].coinBalance,
      addressToUser[msg.sender].name, msg.sender, addressToUser[msg.sender].coinBalance);
  }

  function getPosts() public view returns (address[]) {
      return posts;
  }

  function seed(string name, string url, uint amount, string caption) public {
      createUser(name);
      buyTokens(amount);
      createPost(url, caption);
  }

  function cashOut(uint weiAmount, uint coinAmount) public {
      assert(addressToUser[msg.sender].coinBalance > coinAmount);
      addressToUser[msg.sender].coinBalance -= coinAmount + 1;
      value -= weiAmount;
      msg.sender.transfer(weiAmount);
      CashedOut(addressToUser[msg.sender].coinBalance, msg.sender);
  }

  function getContractBal() public view returns (uint) {
      return value;
  }

    function kill() {
      if (msg.sender == owner) {
        selfdestruct(owner);
      }
    }

  function() payable {}
}
