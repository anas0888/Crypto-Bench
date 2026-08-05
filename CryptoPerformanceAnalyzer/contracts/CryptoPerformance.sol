// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPerformance {
    string public storedHash;
    uint256 public timestamp;

    function storeHash(string memory _hash) public {
        storedHash = _hash;
        timestamp = block.timestamp;
    }
}
