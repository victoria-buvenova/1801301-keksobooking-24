const URL = 'https://24.javascript.pages.academy/keksobooking/data';

/**
 * функция, делающая запрос на получение данных с сервера
 * @param {функция} onSuccess функция вызывающаяся в случае успешного получения данных
 * @param {функция} onError функция, вызыващаяся в случае ошибки
 */
const fetchAds = (onSuccess, onError) => () => {
  fetch(
    URL,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};


export {fetchAds};
