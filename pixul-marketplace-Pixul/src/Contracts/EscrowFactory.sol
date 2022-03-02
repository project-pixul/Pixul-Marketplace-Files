//Custom Contract factory, will deploy Custom Escrow contracts
pragma solidity ^0.8.4;
import "./DecentralizedMarketplaceEscrowsBEP20.sol";


contract TCCFactory{

    TheCollectiveEscrow[] public existingContracts;
    event newOrderCreated(TheCollectiveEscrow escrow);

    address private escrowMediator = 0xb8D23FcF7a399898aE9D7a070025CBc774a39b4C;
    bool payeeSet = false;

    constructor(address _escrowMediator) {
        escrowMediator = _escrowMediator;
    }
    function createEscrow(address payable payer, address payable payee, IERC20 paymentToken) external{
        TheCollectiveEscrow escrow = new TheCollectiveEscrow(payer,payee,paymentToken);
        existingContracts.push(escrow);
        emit newOrderCreated(escrow);
    }

    function queryEscrows() external view returns (TheCollectiveEscrow[] memory){
        return existingContracts;
    }
}
