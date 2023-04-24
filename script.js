'use strict';

//Elements
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

// Data
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

const accounts = [account1, account2, account3, account4];

// movements list
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// balance
const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => acc + mov);
  account.balance = balance;

  labelBalance.innerHTML = `${account.balance}€`;
};

// summary values (in/out)
const calcDisplaySummary = account => {
  const summaryIN = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${summaryIN}€`;

  const summaryOUT = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(summaryOUT)}€`;
};

// interest rate
const calcDisplayInterest = account => {
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov);

  labelSumInterest.textContent = `${interest}€`;
};

// create user names for accs
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = acc => {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
  calcDisplayInterest(acc);
};

// login event handlers
let currentAccount;

btnLogin.addEventListener('click', event => {
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }!`;

    containerApp.style.opacity = '100';

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    updateUI(currentAccount);
  }
});

// transfer
btnTransfer.addEventListener('click', event => {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverUsername = inputTransferTo.value;
  const receiverAcc = accounts.find(acc => acc.username === receiverUsername);

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username &&
    receiverAcc
  ) {
    // transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

//request loan
btnLoan.addEventListener('click', event => {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

//delete account
btnClose.addEventListener('click', event => {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    accounts.splice(
      accounts.findIndex(acc => acc.username === currentAccount.username),
      1
    );

    containerApp.style.opacity = '0';
  }

  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

// sort
let isSorted = false;

btnSort.addEventListener('click', event => {
  event.preventDefault();
  displayMovements(currentAccount.movements, !isSorted);
  isSorted = !isSorted;
});

//ex

labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    mov => Number(mov.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});

// 1.
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(dep => dep > 1000).length;
// console.log(numDeposits1000);

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => {
//     if (mov >= 1000) return ++acc;
//     else return acc;
//   }, 0);
// console.log(numDeposits1000);

// 3.
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acc, mov) => {
//       acc[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
//       return acc;
//     },
//     {
//       deposits: 0,
//       withdrawals: 0,
//     }
//   );
// console.log(deposits, withdrawals);

// 4.
// const convertTitleCase = title => {
//   const lowercaseTitle = title.toLowerCase();
//   const titleWords = lowercaseTitle.split(' ');

//   const newTitle = [];

//   titleWords.forEach(element => {
//     if (element.length > 1)
//       newTitle.push(element.replace(element[0], element[0].toUpperCase()));
//     else newTitle.push(element);
//   });

//   console.log(newTitle.join(' '));
// };

// convertTitleCase('this is a nice title');
// convertTitleCase('this is a NICE title');

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});

// 2. better with 'find'
const dogIndex = dogs.findIndex(element => element.owners.includes('Sarah'));

if (
  dogs[dogIndex].curFood > dogs[dogIndex].recommendedFood
    ? console.log('The dog is eating too much.')
    : console.log('The dog is eating too little.')
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4. better with join
const ownersEatTooMuchStr =
  ownersEatTooMuch.reduce((acc, val) => acc + ` and ${val}`) +
  "'s dogs eat too much!";

const ownersEatTooLittleStr =
  ownersEatTooLittle.reduce((acc, val) => acc + ` and ${val}`) +
  "'s dogs eat too little!";

console.log(ownersEatTooMuchStr);
console.log(ownersEatTooLittleStr);

// 5.
console.log(
  '5',
  dogs.some(dog => dog.curFood === dog.recommendedFood)
);

// 6.
console.log(
  '6',
  dogs.some(
    dog =>
      Math.abs(dog.curFood - dog.recommendedFood) <= dog.recommendedFood * 0.1
  )
);

// 7.

const okDogs = dogs.filter(
  dog =>
    Math.abs(dog.curFood - dog.recommendedFood) <= dog.recommendedFood * 0.1
);

console.log('ok dogs:', okDogs);

// 8.
console.log('8:');
console.log(dogs);
const sortedDogs = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sortedDogs);
