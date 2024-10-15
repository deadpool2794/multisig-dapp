//SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

error NeedAtleastTwoOwners();
error InvalidValueForRequiredSignatures();
error NoDuplicateOwners();
error NotOwner(address);
error InvalidTransaction(uint256);
error TransactionNotConfirmed();
error TransactionAlreadyConfirmed(uint256);
error TransactionCannotBeExecuted(uint256);
error TransactionAlreadyExecuted(uint256);

contract MultiSigWallet {
    event Deposit(address indexed sender, uint256 amount, uint256 balance);
    event SubmitTransaction(
        address indexed owner,
        uint256 indexed txIndex,
        address indexed to,
        uint256 value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint256 indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);

    mapping(address => bool) private uniqueOwners;
    address[] public owners;
    uint256 public immutable signaturesRequired;
    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 numConfirmations;
    }

    Transaction[] public transactions;

    modifier onlyOwner() {
        if (!uniqueOwners[msg.sender]) revert NotOwner(msg.sender);
        _;
    }

    modifier txExists(uint256 _txIndex) {
        if (_txIndex >= transactions.length)
            revert InvalidTransaction(_txIndex);
        _;
    }

    modifier notExecuted(uint256 _txIndex) {
        if (transactions[_txIndex].executed)
            revert TransactionAlreadyExecuted(_txIndex);
        _;
    }

    modifier notConfirmed(uint256 _txIndex) {
        if (isConfirmed[_txIndex][msg.sender])
            revert TransactionAlreadyConfirmed(_txIndex);
        _;
    }

    constructor(address[] memory _owners, uint256 _signaturesRequired) {
        if (_owners.length <= 1) revert NeedAtleastTwoOwners();

        if (!(_signaturesRequired > 0 && _signaturesRequired <= _owners.length))
            revert InvalidValueForRequiredSignatures();

        if (!noDuplicateOwners(_owners)) revert NoDuplicateOwners();

        signaturesRequired = _signaturesRequired;
        for (uint256 i = 0; i < _owners.length; ++i) {
            owners.push(_owners[i]);
        }
    }

    function noDuplicateOwners(
        address[] memory _owners
    ) private returns (bool) {
        for (uint256 i = 0; i < _owners.length; ++i) {
            if (uniqueOwners[_owners[i]]) return false;
            uniqueOwners[_owners[i]] = true;
        }
        return true;
    }

    function deposit() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(
        address _to,
        uint256 _value,
        bytes memory _data
    ) public onlyOwner {
        uint256 txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTransaction(
        uint256 _txIndex
    )
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(
        uint256 _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];

        if (transaction.numConfirmations < signaturesRequired)
            revert TransactionCannotBeExecuted(transaction.numConfirmations);

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(
        uint256 _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];

        if (!isConfirmed[_txIndex][msg.sender])
            revert TransactionNotConfirmed();

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getTransaction(
        uint256 _txIndex
    )
        public
        view
        returns (
            address to,
            uint256 value,
            bytes memory data,
            bool executed,
            uint256 numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }
}
