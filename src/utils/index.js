const moveArray = (array, from, to) => {
  array = [...array]; // copy array
  array.splice(to, 0, ...array.splice(from, 1));
  return array;
};

module.exports = {
  moveArray
};
