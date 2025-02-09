
   const test1 = [false, false, false, false];
   const test2 = [false, false, false, true];
   const test3 = [false, false, true, false];
   const test4 = [false, false, true, true];
   const test5 = [false, true, false, false];
   const test6 = [false, true, false, true];
   const test7 = [false, true, true, false];
   const test8 = [false, true, true, true];
   const test9 = [true, false, false, false];
   const test10 = [true, false, false, true];
   const test11 = [true, false, true, false];
   const test12 = [true, false, true, true];
   const test13 = [true, true, false, false];
   const test14 = [true, true, false, true];
   const test15 = [true, true, true, false];
   const test16 = [true, true, true, true];







function canFreePrisoner(arr) {
    let  knightIsAwake = arr[0];
    let  archerIsAwake = arr[1];
    let  prisonerIsAwake = arr[2];
    let  petDogIsPresent = arr[3];

    return  !knightIsAwake && (archerIsAwake && prisonerIsAwake && petDogIsPresent);
  }

const testResult1 = canFreePrisoner(test1);
const testResult2 = canFreePrisoner(test2);
const testResult3 = canFreePrisoner(test3);
const testResult4 = canFreePrisoner(test4);
const testResult5 = canFreePrisoner(test5);
const testResult6 = canFreePrisoner(test6);
const testResult7 = canFreePrisoner(test7);
const testResult8 = canFreePrisoner(test8);
const testResult9 = canFreePrisoner(test9);
const testResult10 = canFreePrisoner(test10);
const testResult11 = canFreePrisoner(test11);
const testResult12 = canFreePrisoner(test12);
const testResult13 = canFreePrisoner(test13);
const testResult14 = canFreePrisoner(test14);
const testResult15 = canFreePrisoner(test15);
const testResult16 = canFreePrisoner(test16);

console.log(testResult1);
console.log(testResult2);
console.log(testResult3);
console.log(testResult4);
console.log(testResult5);
console.log(testResult6);
console.log(testResult7);
console.log(testResult8);
console.log(testResult9);
console.log(testResult10);
console.log(testResult11);
console.log(testResult12);
console.log(testResult13);
console.log(testResult14);
console.log(testResult15);
console.log(testResult16);