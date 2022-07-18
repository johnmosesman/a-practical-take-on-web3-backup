//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "hardhat/console.sol";

contract FriendFood {
    struct Dinner {
        string name;
        uint256 price;
        uint256 balance;
    }

    uint256 public constant maxReservations = 5;
    mapping(address => Dinner) public dinners;
    mapping(address => address[]) public reservations;
    address[] public hosts;

    event DinnerCreated(
        address indexed chef,
        string indexed name,
        uint256 indexed price
    );

    event ReservationMade(address indexed chef, address indexed diner);

    function createDinner(string memory name, uint256 price) public {
        require(price > 0, "Invalid price");

        dinners[msg.sender] = Dinner({name: name, price: price, balance: 0});
        hosts.push(msg.sender);

        emit DinnerCreated(msg.sender, name, price);
    }

    function getHosts() public view returns (address[] memory _hosts) {
        return hosts;
    }

    function reserve(address chef) public payable {
        Dinner storage dinner = dinners[chef];

        require(dinner.price > 0, "Dinner doesn't exist");
        require(msg.value == dinner.price, "Payment required");

        // TODO: require not a duplicate reservation

        reservations[chef].push(msg.sender);
        dinner.balance += msg.value;

        emit ReservationMade(chef, msg.sender);
    }

    function withdraw() public {
        Dinner storage dinner = dinners[msg.sender];

        require(dinner.price > 0, "Dinner doesn't exist");
        require(dinner.balance > 0, "No balance");

        uint256 amount = dinner.balance;
        dinner.balance = 0;

        (bool sent, bytes memory data) = msg.sender.call{value: amount}("");
        require(sent, "Withdraw failed");
    }
}
