// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract isContract{

    function isContractMethod1(address addr) public view returns(bool) {
        return addr.code.length > 0;
    }

    function isContractMethod2(address _addr) public view returns (bool){
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return size > 0;
    }

    function isContractMethod3(address addr) public view returns (bool) {
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;

        bytes32 codehash;
        assembly {
            codehash := extcodehash(addr)
        }
        return (codehash != 0x0 && codehash != accountHash);
    }

    function thisAddress() public view returns(address) {
        return address(this);
    }
}