pragma solidity ^0.4.24;


contract Stock {

    struct stock {
        uint256 cookies;
    }
    stock S;
    
    constructor(uint256 count) public{
         for (uint256 i = 0; i < count; i++) {
          S.cookies++;
        }
    }
    
     function transferCookies(uint256 count) public returns(uint256){
        uint256 cookies = S.cookies;
         S.cookies-= count;
         return cookies;
    }
}


contract Bakery {

    address public  baker;
    address[] public cookies;
    
    event Baked(address _theNewCookie);
   
     uint256 public cookieCount;
    
    constructor() public {
      baker = msg.sender;
    }
    
    function addCookie(address newCookie) public {
        cookies.push(newCookie);
        emit Baked(newCookie);
    }
    
    function stockUp(uint256 count) public{
        require(count<20);
        Stock stock = new Stock(count);
        bakeCookie(stock.transferCookies(count));
    }

    function bakeCookie(uint256 count) public returns(uint256){
        for (uint256 i = 0; i < count; i++) {
          cookieCount++;
        }
        return cookieCount;
    }
}