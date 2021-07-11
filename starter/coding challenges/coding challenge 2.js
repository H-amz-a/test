`use strict`;
// Coding Challenge #2
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages �)
// 4. Run the function for both test datasets
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK �

function calcHoomanAge(ages) {
  // calculating ages
  let humanAge = ages.map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4));
  //   filtering ages
  humanAge = humanAge.filter(age => age > 18);
  const filteredLength = humanAge.length;
  //   calculating average ages
  humanAge = humanAge.reduce((acc, age) => acc + age);
  return humanAge / filteredLength;
}
console.log(calcHoomanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcHoomanAge([16, 6, 10, 5, 6, 1, 4]));

// console.log([16, 6, 10, 5, 6, 1, 4].length);
// [16, 6, 10, 5, 6, 1, 4].map();

// CC3

let calcHumanAge = ages =>
  (ages = ages
    .map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4))
    .filter(age => age > 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0));

console.log(calcHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcHumanAge([16, 6, 10, 5, 6, 1, 4]));
