const IsContractABI = [{ "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }], "name": "isContractMethod1", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "isContractMethod2", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }], "name": "isContractMethod3", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "thisAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]

const IsContract_Contract = (web3) => {
    return new web3.eth.Contract(
        IsContractABI,
        "0x9622013025CC155Cd632deaB68a776bEd003cd96"
    )
}

export default IsContract_Contract