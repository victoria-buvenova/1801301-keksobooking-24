const BASE_URL = 'https://24.javascript.pages.academy/keksobooking';

/**
 * функция, делающая запрос на получение данных с сервера
 * @param {функция} onSuccess функция вызывающаяся в случае успешного получения данных
 * @param {функция} onError функция, вызыващаяся в случае ошибки
 */
const fetchAds = (onSuccess, onError) => () => {
  fetch(
    `${BASE_URL}/data`,
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

/**
 * Отправка данных на сервер
 * @param {Object} body - данные для отправки
 * @param {функция} onSuccess функция вызывающаяся в случае успешной отправки данных
 * @param {функция} onError функция, вызыващаяся в случае ошибки в отправке данных
 */
const postAd = (newAd, onSuccess, onError) => {
  fetch(BASE_URL, {
    method: 'POST',
    body: newAd,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};


export {fetchAds, postAd};
