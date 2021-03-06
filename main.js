// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

//Check credit card number to see if it's valid
const validateCred = credNumber => {
  //As you iterate to the left, every other digit is doubled (the check digit is not doubled). If the number is greater than 9 after doubling, subtract 9 from its value.
  i = credNumber.length-2
  while (i>=0){
    credNumber[i] *= 2;
    if (credNumber[i] > 9) {
      credNumber[i] -= 9;
    }
    i = i-2;
  }
  //Sum up all the digits in the credit card number. If the sum modulo 10 is 0 (if the sum divided by 10 has a remainder of 0) then the number is valid, otherwise, it’s invalid.
  total = credNumber.reduce(function(a, b){
        return a + b;
    }, 0)
  if (total%10 == 0){
    return 'valid'
  }
  return 'invalid'
}

//Should return valid
console.log(validateCred(valid1))

//Should return invalid
console.log(validateCred(invalid1))

//Find invalid cards in a batch of credit card numbers
const findInvalidCards = cardBatch => {
  invalidCards = []
  for (idx in cardBatch)
    if (validateCred(cardBatch[idx]) == 'invalid') {
      invalidCards.push(cardBatch[idx])
    }
    return invalidCards;
} 
console.log(findInvalidCards(batch))

//Create a list of invalid cards using the findInvalidCards and validateCred functions
let invalidCardList = findInvalidCards(batch)

//Should return an array of invalid card numbers in the batch array
console.log(invalidCardList)

//Iterate through the list of invalid Credit Card numbers and identify the issuing company
const idInvalidCardCompanies = invalidCards => {
  cardCompanies = [];
  for (idx in invalidCards){
    if (invalidCards[idx][0] == 3 && !cardCompanies.includes('Amex (American Express)')) {
      cardCompanies.push('Amex (American Express)')
    }
    else if (invalidCards[idx][0] == 4 && !cardCompanies.includes('Visa')) {
      cardCompanies.push('Visa')
    }
    else if (invalidCards[idx][0] == 5 && !cardCompanies.includes('Mastercard')) {
      cardCompanies.push('Mastercard')
    }
    else if (invalidCards[idx][0] == 6 && !cardCompanies.includes('Discover')) {
      cardCompanies.push('Discover')
    }
  }
  return cardCompanies;
}

//Should return an array of companies with invalid card numbers
console.log(idInvalidCardCompanies(invalidCardList))
