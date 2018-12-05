## Compose Sort

Simple package for composing multiple sorting functions. This allows for sorting to be done by "importance" by simply pputting the sorting functions in order.

### Example

```
import composeSort from 'compose-sort';

const myNums = [2, 5, 1, 8, 0, 9, 3, 7, 4, 6];
// Helper function
const isEven = num => num % 2 === 0;

const evenNumsFirst = (numA, numB) => {
  if (isEven(numA)) {
    if (isEven(numB)) {
      // Both numbers are even
      return 0;
    } else {
      // Only numA is even
      return -1;
    }
  } else if (isEven(numB)) {
    // Only numB is even
    return 1;
  }
  // Neither number is even
  return 0;
};

const descendingNums = (numA, numB) => (numB - numA);

const descendingEvenFirst = composeSort(evenNumsFirst, descendingNums);

console.log(myNums.sort(descendingEvenFirst));
/*
Outputs:
[8, 6, 4, 2, 0, 9, 7, 5, 3, 1]
*/
```

### Detailed Example

We want to sort a list of people objects by sex, age, and then by last name.
```
import composeSort from 'compose-sort';

const sortByPreferredSex = (preferredSex) => (personA, personB) => {
  if (personA.sex === preferredSex) {
    if (personB.sex === preferredSex) {
      return 0;
    } else {
      return -1;
    }
  } else if (personB.sex === preferredSex) {
    return 1;
  }
  return 0;
};

const sortByAge = (ascending) => (personA, personB) => ascending ?
  personA.age - personB.age :
  personB.age - personA.age;

const sortByName = (ascending) => (personA, personB) => {
  if (personA.name.last === personB.name.last) {
    return 0;
  }
  if (ascending) {
    return personA.name.last < personB.name.last;
  } else {
    return personA.name.last > personB.name.last;
  }
};

const people = [
  {
    name: {
      first: 'John',
      last: 'Doe',
    },
    age: 36,
    sex: 'M',
  },
  {
    name: {
      first: 'Jane',
      last: 'Doe',
    },
    age: 48,
    sex: 'F',
  },
  {
    name: {
      first: 'John',
      last: 'Smith',
    },
    age: 36,
    sex: 'M',
  },
  {
    name: {
      first: 'Susan',
      last: 'Smith',
    },
    age: 36,
    sex: 'F',
  },
  {
    name: {
      first: 'Stephanie',
      last: 'Allen',
    },
    age: 25,
    sex: 'F',
  },
];

const myCustomSortingFn = composeSort(
  sortByPreferredSex('F'),
  sortByAge(true),
  sortByName(false),
);

console.log(people.sort(myCustomSortingFn));
/*
Outputs:
[
  { name: { first: 'Stephanie', last: 'Allen' }, age: 25, sex: 'F' },
  { name: { first: 'Susan', last: 'Smith' }, age: 36, sex: 'F' },
  { name: { first: 'Jane', last: 'Doe' }, age: 48, sex: 'F' },
  { name: { first: 'John', last: 'Doe' }, age: 36, sex: 'M' },
  { name: { first: 'John', last: 'Smith' }, age: 36, sex: 'M' }
]
*/
```

### Performance

Sorting functions will only be called if necessary. In other words, if you are using three sorting functions, but the first sorting function can decide how to sort two elements, the subsequent two sorting functions are never even called.
