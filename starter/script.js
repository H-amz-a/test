'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const master = {
  owner: 'Hamza',
  movements: [2000, 4500, -4000, 30000, -6500, -1300, 700, -13000],
  interestRate: 7, // %
  pin: 0,
};
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'Robert Edward Oliver Speedwagon',
  movements: [-500000, 300000, 4012441, -1000000, 120310],
  interestRate: 5,
  pin: 1863,
};

const accounts = [master, account1, account2, account3, account4, account5];
// const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//
function init() {
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = '0';

  computeUserNames(accounts);
}
init();
function displayMovement(movement) {
  containerMovements.innerHTML = '';
  movement.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // console.log(type);
    const html = `        
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">x days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function computeUserNames(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
}

function calcDisplaySummary(account) {
  const income = account.movements
    .filter(mov => mov > 0, 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income} €`;

  const outgoing = account.movements
    .filter(mov => mov < 0, 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(outgoing)} €`;

  const intrest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${intrest} €`;
}

function calcBalance(acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);

  labelBalance.textContent = `${acc.balance} €`;
  // return balance;
}
function updateUi(currentAccount) {
  // Display Movements
  displayMovement(currentAccount.movements);
  // Display Balance
  calcBalance(currentAccount);
  // Display Summary
  calcDisplaySummary(currentAccount);
}
let currentAccount;
//  Event handler

// Login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = '100';
    // clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    updateUi(currentAccount);
  } else {
    labelWelcome.textContent = `Incorrect account details, please try again.`;
  }
});
//  Transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const ammount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    currentAccount.balance >= ammount &&
    reciverAcc &&
    ammount > 0 &&
    reciverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-ammount);
    reciverAcc.movements.push(ammount);
    updateUi(currentAccount);
  }
});
// Recieve Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(inputLoanAmount.value);
  const LoanAmmount = Number(inputLoanAmount.value);
  const LoanConditions = currentAccount.movements.some(
    mov => mov >= LoanAmmount * 0.1
  );

  if (LoanConditions && LoanAmmount > 0) {
    currentAccount.movements.push(LoanAmmount);
    updateUi(currentAccount);
    // console.log(Loan);
  }
});

// Close acc

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    init();
    inputClosePin.value = inputCloseUsername.value = '';
  }
  console.log(`delete`);
});
// console.log(accounts);
// console.log(computeUserNames(`hamza salman`));
// console.log();
// accounts.forEach(function (name) {
//   return (name.user = computeUserNames(name.owner));
// });
// console.log(account1, account2, account3, account4);
// console.log(username);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let depo = [0];
// let withdrawl = [0];
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements) {
//   if (movement > 0) {
//     depo[0] = depo[0] + movement;

//     console.log(`Deposited ${movement}`);
//   } else {
//     withdrawl[0] = withdrawl[0] + Math.abs(movement);

//     console.log(`Withdrawed ${Math.abs(movement)}`);
//   }
// }

// console.log(`Total Deposited ${depo}`);
// console.log(`Total Withdrawed ${withdrawl}`);

// movements.forEach((movement, index, arr) => {
//   if (movement > 0) {
//     depo[0] = depo[0] + movement;

//     console.log(`Movement ${index}: \n Deposited ${movement}`);
//   } else {
//     withdrawl[0] = withdrawl[0] + Math.abs(movement);

//     console.log(`Movement ${index}: \n Withdrawed ${Math.abs(movement)}`);
//   }
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${value}: ${key} `);
//   // console.log(map);
// });
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, set) {
//   console.log(key, value);
//   console.log(set);
// });

//////////////////////////////////////////////////////

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');

// console.log(account);

// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     console.log(acc);
//   }
// }

// const overallBal = accounts
//   .flatMap(mov => mov.movements)
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(overallBal);
