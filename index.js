// there's a bank, multiple people will go to the bank and create an account, store their money, deposit, transfer, request a loan, and if the user doesn't have a bank account then you can't transfer.

const bank = {
  bankName: "Viktrified Central Bank Of Planet Earth",
  bankLoanAccount: 1000000000,
  usersMoney: 0,
};

let users = [];

const generateAccountNumber = () => {
  let accountNumber = "83";
  for (i = 0; i < 8; i++) {
    accountNumber += Math.floor(Math.random() * 10);
  }
  return accountNumber;
};

const createBankAccount = (
  firstName,
  lastName,
  age,
  residentialAddress,
  phoneNumber
) => {
  if (age < 18) {
    console.log("wait till you're 18");
  } else {
    let accountNumber = generateAccountNumber();

    users.push({
      accountNumber: accountNumber,
      accountBalance: 0,
      loanBalance: 0,
      firstName: firstName,
      lastName: lastName,
      age: age,
      residentialAddress: residentialAddress,
      phoneNumber: phoneNumber,
    });
  }
};

console.log("Creating accounts...");
createBankAccount(
  "Victory",
  "Ezeokafor",
  21,
  "Gwarandok, Jos, Nigeria",
  "38389239281"
);
createBankAccount(
  "Dev",
  "Longs",
  27,
  "Blockfuselabs Headquaters Rayfield, Jos, Nigeria",
  "382838727281"
);
createBankAccount("John", "Deo", 35, "nil", "38389239283");
console.log(users);

function depositMoney(user, amount) {
  // user must have an account with the bank to deposit money

  for (i = 0; i < users.length; i++) {
    if (users[i].accountNumber === user.accountNumber) {
      users[i].accountBalance += amount;
      bank.usersMoney += amount;
    }
  }
}

console.log("Deposit money to first account...");
depositMoney(users[0], 5000);
console.log(`Total users money in bank: ${bank.usersMoney}`);
console.log(users);

function transferMoney(sender, receiver, amount) {
  // sender and receiver must have an account with the bank
  // sender must have more amount he wants to send

  for (i = 0; i < users.length; i++) {
    if (sender.accountBalance <= amount) {
      console.log("insufficient funds!");
      return false;
    }

    if (users[i].accountNumber === sender.accountNumber) {
      users[i].accountBalance -= amount;
    }

    if (users[i].accountNumber === receiver.accountNumber) {
      users[i].accountBalance += amount;
      console.log("Transfer Succesful!");
    }
  }
}

console.log("Transfer money from first account to second account...");
transferMoney(users[0], users[1], 2000);
console.log(users);

const loanRequest = (borrower, amount) => {
  // loan request will fail if the bank doesn't have more than 500,000,000
  // user can't borrow more than 500,000.
  // user must have an account with the bank to request loan

  if (bank.bankLoanAccount < 500000000) {
    console.log("You can't borrow at the moment!");
    return false;
  }

  if (amount > 500000) {
    console.log("You can't borrow more than 500,000!");
    return false;
  }

  for (i = 0; i < users.length; i++) {
    if (users[i].accountNumber === borrower.accountNumber) {
      bank.bankLoanAccount -= amount;
      users[i].accountBalance -= amount;
      users[i].loanBalance += amount;
    }
  }
};

console.log("Loan Requested!");
loanRequest(users[2], 500000);
console.log(`Bank Loan Balance: ${bank.bankLoanAccount}`);
console.log(users);
