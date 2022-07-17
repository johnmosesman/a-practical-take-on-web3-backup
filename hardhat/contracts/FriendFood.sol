//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "hardhat/console.sol";

contract FriendFood {
    struct Dinner {
        string name;
        uint256 price;
    }

    uint256 public constant maxReservations = 5;
    mapping(address => Dinner) public dinners;
    mapping(address => address[]) public reservations;

    event DinnerCreated(
        address indexed chef,
        string indexed name,
        uint256 indexed price
    );

    event ReservationMade(address indexed chef, address indexed diner);

    function createDinner(string memory name, uint256 price) public {
        // console.log("price", price);
        require(price > 0, "Invalid price");

        dinners[msg.sender] = Dinner({name: name, price: price});

        emit DinnerCreated(msg.sender, name, price);
    }

    function reserve(address chef) public payable {
        Dinner memory dinner = dinners[chef];

        require(dinner.price > 0, "Dinner doesn't exist");
        require(msg.value == dinner.price, "Payment required");

        // TODO: require not a duplicate reservation

        reservations[chef].push(msg.sender);

        emit ReservationMade(chef, msg.sender);
    }
}
