pragma solidity ^0.4.24;

contract Bakery {

    address public  baker;
    address[] public cookies;

    event Baked(address _theNewCookie);
    
    constructor() public {
      baker = msg.sender;
    }
    
    function addCookie(address newCookie) public {
        cookies.push(newCookie);
        emit Baked(newCookie);
    }
}