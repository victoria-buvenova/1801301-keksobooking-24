// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max <= min) {
    throw 'Ошибка: максимальное значение не может быть меньше или равно минимальному'
  };
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  // Функция, возвращающая случайное число с
  // плавающей точкой из переданного диапазона включительно
  function getRandomFloat(min, max) {
    if (max <= min) {
      throw 'error: max cannot be less than min'
    }
    return Math.random() * (max - min) + min;
  }
