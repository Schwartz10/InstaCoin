pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';


contract CapCoin is Ownable {

  event NewUser(string name);
  event BoughtTokens(uint coinBalance);
  event CreatedPost(string url);
  event CreatedCaption(string caption);

  uint coinSupply = 1000000;
  uint coinsBought = 0;
  uint contractNum;

  struct User {
    string name;
    uint coinBalance;
  }

  struct Post {
    string url;
    string userName;
    uint lotteryAmount;
  }

  struct Caption {
    string caption;
    address owner;
    address post;
  }

  mapping (address => User) public addressToUser;
  mapping (address => Post) public addressToPost;
  address[] public users;
  address[] public posts;

  function getUsers() public view returns (address[]) {
    return users;
  }

  function getUser() public view returns (string, uint, string, uint, address) {
    return (addressToUser[msg.sender].name,
      addressToUser[msg.sender].coinBalance,
      addressToPost[msg.sender].url,
      addressToPost[msg.sender].lotteryAmount,
      msg.sender);
  }

  function buyTokens(uint amount) public {
    addressToUser[msg.sender].coinBalance += amount;
    coinsBought += amount;
    coinSupply -= amount;
    BoughtTokens(addressToUser[msg.sender].coinBalance);
  }

  function createPost(string url) public {
    // 5 coins per post
    var post = addressToPost[msg.sender];
    post.url = url;
    post.lotteryAmount = 5;
    post.userName = addressToUser[msg.sender].name;

    posts.push(msg.sender) -1;
    addressToUser[msg.sender].coinBalance -= 5;
    CreatedPost(url);
  }

  function getPosts() public view returns (address[]) {
      return posts;
  }

  function seed(string name, string url, uint amount) public {
      createUser(name);
      buyTokens(amount);
      createPost(url);
  }

  function() internal payable {}
}
