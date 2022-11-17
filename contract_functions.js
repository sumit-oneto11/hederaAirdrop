require("dotenv").config();
const {
	AccountId,
	PrivateKey,
	Client,
	AccountBalanceQuery,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	ContractCallQuery,
	Hbar,
} = require("@hashgraph/sdk");
const fs = require("fs");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
	//const contractId = '0.0.47909773';
	const newAccountId = '0.0.47858390';
	const newAccountIdd = '0.0.34893205';
	const getNewBalance = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
		.setAccountId(newAccountIdd)
        .execute(client);

	console.log("Balance="+getNewBalance);
return;
	// Call contract function to update the state variable
	const contractExecuteTx = new ContractExecuteTransaction()
	.setContractId(contractId)
	.setGas(100000)
	.setPayableAmount(new Hbar(1))
	.setFunction("Deposit");
	const contractExecuteSubmit = await contractExecuteTx.execute(client);
	const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
	console.log(`- Contract function call status: ${contractExecuteRx.status} \n`);

	return;
	// Query the contract to check changes in state variable
	const contractQueryTx = new ContractCallQuery()
		.setContractId(contractId)
		.setGas(100000)
		.setFunction("getMobileNumber", new ContractFunctionParameters().addString("Alice"));
	const contractQuerySubmit = await contractQueryTx.execute(client);
	const contractQueryResult = contractQuerySubmit.getUint256(0);
	console.log(`- Here's the phone number that you asked for: ${contractQueryResult} \n`);



	// Query the contract to check changes in state variable
	const contractQueryTx1 = new ContractCallQuery()
		.setContractId(contractId)
		.setGas(100000)
		.setFunction("getMobileNumber", new ContractFunctionParameters().addString("Bob"));
	const contractQuerySubmit1 = await contractQueryTx1.execute(client);
	const contractQueryResult1 = contractQuerySubmit1.getUint256(0);
	console.log(`- Here's the phone number that you asked for: ${contractQueryResult1} \n`);
}
main();