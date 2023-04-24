// const eurToUsd = 1.1;

// const movements = [200, 450, 3000, 70, 1300];

// console.log(movements.every(mov => mov > 0));

// console.log(movements.some(mov => mov > 0));

// console.log(movements.includes(-130));

// console.log(
//   movements.find(mov => {
//     return mov < 0;
//   })
// );

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, val) => acc + val);

// console.log(totalDepositsUSD);

// // const desposits = movements.filter((mov) => {
// //   return mov > 0
// // });

// // console.log(desposits);

// // const widrawals = movements.filter((mov) => mov < 0);
// // console.log(widrawals);

// // const balance = movements.reduce((acc, cur, i, arr) => {
// //   console.log(acc);
// //   return acc + cur;
// // }, 0);

// // console.log(balance);

// const max = movements.reduce((acc, mov) => {
//   return mov > acc ? mov : acc;
// }, movements[0]);

// console.log(max);

// const calcAverageHumanAge = ages => {
//   const avgHumanAge = ages
//     .map(age => {
//       if (age <= 2) return 2 * age;
//       else return 16 + age * 4;
//     })
//     .filter(age => age > 18)
//     .reduce((acc, val, _, arr) => acc + (val / arr.length), 0);

//   console.log(avgHumanAge);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

// console.log(arrDeep.flat(2));

// const owners = ['jonas', 'zach', 'adam', 'marha'];

// console.log(owners.sort());

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(
//   movements.sort((a, b) => {
//     return a - b;
//   })
// );

// const overallBalance = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance);
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const x = new Array(7);

// x.fill(1);
// x.fill(1, 3, 5);

// console.log(x);

// arr.fill(23, 4, 6);
// console.log(arr);

// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 100 }, (cur, i) =>
//   Math.trunc(Math.random() * 6 + 1)
// );
// console.log(z);

const arr = [1, 2, 3, 8, 5];

console.log(arr.findIndex((element) => element === 8));
