const getRandomArbitrary = (min, max, amountSymbolAfterComma = 0) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }
  let randomNumber = Math.random() * (max - min) + min;
  randomNumber = Number(randomNumber.toFixed(amountSymbolAfterComma));
  return randomNumber;
};

const getRandomElementArr = (array) => {
  return array[getRandomArbitrary(0, array.length - 1, 0)];
};

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const checkEsc = (evt) => {
  return evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
};

export { getRandomArbitrary, getRandomElementArr, checkEsc };
