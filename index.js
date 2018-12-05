function composeSort() {
  var sortingArguments = arguments;
  return function(valA, valB) {
    for (var i = 0; i < sortingArguments.length; i++) {
      var order = sortingArguments[i](valA, valB);
      if (order !== 0) {
        return order;
      }
    }
    return 0;
  };
}

module.exports = composeSort;
