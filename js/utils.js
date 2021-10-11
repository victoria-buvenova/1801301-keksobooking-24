/**
 *
 * @returns целое положительное число
 */
function getRandomPositive() {
  return Math.floor(Math.random() * 10);
}

/**
 *
 * @param начало диапазона min
 * @param конец диапазона max
 * @returns целое положительное число в заданном диапазоне
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param array
 * @returns случайный элемент из переданного массива (аrray)
 */
function getRandomArrayElement(array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
}

/**
 *
 * @param начальное значение координаты min
 * @param конечное значение координаты max
 * @returns значение с плавающей точкой в заданном диапазоне
 */
function getRandomCoord(min, max) {
  return Math.random() * (max - min) + min;
}
export {getRandomPositive, getRandomIntInclusive, getRandomArrayElement, getRandomCoord};
