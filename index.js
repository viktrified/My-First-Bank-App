// there's a bank, multiple people will go to the bank and create an account, store their money,deposit, transfer,request a loan, and if the user doesn't have a bank account then you can't transfer.

const bank = {
  bankName: "Viktrified Central Bank Of Planet Earth",
  bankLoanAccount: 1000000000,
  usersMoney: 0,
};

let users = [];

function checkUserData(dataKey, data) {
  let exist = false;
  users.forEach((user) => {
    if (user[dataKey] == data) {
      exist = true;
    }
  });

  return exist;
}

function getUserData(dataKey, data) {
  let userData = false;
  users.forEach((user) => {
    if (user[dataKey] == data) {
      data = user;
    }
  });

  return userData;
}

function getUserIndexByAccountNumber(accountNumber) {
  return users.findIndex((account) => account.accountNumber === accountNumber);
}

// to create account push an object to the users[]
// accountNumber, firstAndLastName, DOB, residential address, phone number, accountType(savings, current), balance, loan balance.

const generateAccountNumber = () => {
  let accountNumber = "83";
  for (let i = 0; i < 8; i++) {
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
  let phoneExist = checkUserData("phoneNumber", phoneNumber);
  if (phoneExist) {
    console.log("you already have an account with us!");
    return false;
  }
  // {
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
  // }
};

console.log("Creating accounts...");
createBankAccount("Victory", "slls", 45, "aldaefnadaflaf", "38389239282");
createBankAccount("Victory", "slls", 25, "aldaefnadaflaf", "38389239281");
createBankAccount("Victory", "slls", 35, "aldaefnadaflaf", "38389239283");
console.log(users);

function depositMoney(accountNumber, amount) {
  let accountExist = checkUserData("accountNumber", accountNumber);
  if (!accountExist) {
    console.log("Account does not exist!");
    return false;
  }

  bank.usersMoney += amount;
  users[getUserIndexByAccountNumber(accountNumber)].accountBalance += amount;
}

console.log("Deposit money to first account...");
depositMoney(users[0].accountNumber, 500);
console.log(`Total users money in bank: ${bank.usersMoney}`);
console.log(users);

function transferMoney(from, to, amount) {
  let accountExist = checkUserData("accountNumber", from);
  if (!accountExist) {
    console.log("Account does not exist!");
    return false;
  }

  let toAccountExist = checkUserData("accountNumber", to);
  if (!toAccountExist) {
    console.log("Invalid account number!");
    return false;
  }

  if (users[getUserIndexByAccountNumber(from)].accountBalance >= amount) {
    users[getUserIndexByAccountNumber(from)].accountBalance -= amount;
    users[getUserIndexByAccountNumber(to)].accountBalance += amount;
    console.log("Transfer successfull");
    return true;
  }

  console.log("Insufficient balance!");
  return false;
}

console.log("Transfer money from first account to second account...");
transferMoney(users[0].accountNumber, users[1].accountNumber, 100);
console.log(users);

const loanRequest = (accountNumber, amount) => {
  // if borrower has accountNumber
  // borrower can only borrow a maximum of 500000

  let accountExist = checkUserData("accountNumber", accountNumber);
  if (!accountExist) {
    console.log("Account does not exist!");
    return false;
  }
  bank.bankLoanAccount -= amount;
  users[getUserIndexByAccountNumber(accountNumber)].accountBalance -= amount;
  users[getUserIndexByAccountNumber(accountNumber)].loanBalance += amount;
};

console.log("Loan Requested!");
loanRequest(users[2].accountNumber, 500000);
console.log(`Bank Loan Balance: ${bank.bankLoanAccount}`);
console.log(users);
