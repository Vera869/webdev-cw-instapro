// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
//const personalKey = "prod";
const personalKey = "Vera-Bu";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;
//let token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if(response.status === 500) {
        throw new Error("Сервер сломался");
      }
      if(!navigator.onLine) {
        throw new Error("нет интернета")
      }
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => {
      return data.posts;
    })
    // then((dataResponse) => {
    //   const appHtml =
    //   responseData.posts.map((post) => {
    //     return {"id": "642bf333b959b2a4679f2e69",
    //     "imageUrl": "https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1680601903167-%25C3%2590%25C2%25A1%25C3%2590%25C2%25BD%25C3%2590%25C2%25B8%25C3%2590%25C2%25BC%25C3%2590%25C2%25BE%25C3%2590%25C2%25BA%2520%25C3%2591%25C2%258D%25C3%2590%25C2%25BA%25C3%2591%25C2%2580%25C3%2590%25C2%25B0%25C3%2590%25C2%25BD%25C3%2590%25C2%25B0%25202023-03-31%2520%25C3%2590%25C2%25B2%252012.45.42.png",
    //     "createdAt": "2023-04-04T09:51:47.187Z",
    //     "description": "Это я",
    //     "user": {
    //       "id": "642bf323b959b2a4679f2e68",
    //       "name": "Глеб Фокин",
    //       "login": "glebkaf777",
    //       "imageUrl": "https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1680601877737-%25C3%2590%25C2%25A1%25C3%2590%25C2%25BD%25C3%2590%25C2%25B8%25C3%2590%25C2%25BC%25C3%2590%25C2%25BE%25C3%2590%25C2%25BA%2520%25C3%2591%25C2%258D%25C3%2590%25C2%25BA%25C3%2591%25C2%2580%25C3%2590%25C2%25B0%25C3%2590%25C2%25BD%25C3%2590%25C2%25B0%25202023-03-31%2520%25C3%2590%25C2%25B2%252012.58.33.png"
    //     },
    //     "likes": [
    //       { "id": "642bf323b959b2a4679f2e68", "name": "Глеб Фокин" },
    //       { "id": "64226edb0cdb1574f162d950", "name": "Глеб Админ" },
    //       { "id": "64255dabca1ce2a815a327d7", "name": "Глеб" }
    //     ],
    //     "isLiked": false
    //   };
    // })
    // })
    .catch((error) => {
      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
        return;
      } if (error.message === "нет интернета") {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        return}
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login: login
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
      password: password
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
      name: name
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
      imageUrl,
    }),
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if(response.status === 500) {
      throw new Error("Сервер сломался");
    }
    if(!navigator.onLine) {
      throw new Error("нет интернета")
   }
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  })
  .catch((error) => {
    if (error.message === "Сервер сломался") {
      alert("Сервер сломался, попробуй позже");
      return;
    } if (error.message === "нет интернета") {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
      return}
      if (error.message === "Такой пользователь уже существует") {
        alert("Кажется, такой пользователь уже существует");
        return}
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    if(response.status === 500) {
      throw new Error("Сервер сломался");
    }
    if(!navigator.onLine) {
      throw new Error("нет интернета")
   }
    return response.json();
  })
  .catch((error) => {
    if (error.message === "Сервер сломался") {
      alert("Сервер сломался, попробуй позже");
      return;
    } if (error.message === "нет интернета") {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
      return}
      if (error.message === "Неверный логин или пароль") {
        alert("Неверный логин или пароль");
        return}
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    if(response.status === 500) {
      throw new Error("Сервер сломался");
    }
    if(!navigator.onLine) {
      throw new Error("нет интернета")
   }
    return response.json();
  })
  .catch((error) => {
    if (error.message === "Сервер сломался") {
      alert("Сервер сломался, попробуй позже");
      return;
    } if (error.message === "нет интернета") {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
      return}
  });
}
// export const postFetch = () => {
//   return fetch(postsHost, {
//     method: "POST",
//     headers: {
//       Authorization: token,
//     },
//     body: JSON.stringify({
//         description: post.description
//           .replaceAll("&", "&amp;")
//           .replaceAll("<", "&lt;")
//           .replaceAll(">", "&gt;")
//           .replaceAll('"', "&quot;"),
//         imageUrl: imageUrl,
//       }),
//     }).then((response) => {
//       if(response.status === 500) {
//         throw new Error("Сервер сломался");
//       }
//       if(response.status === 400) {
//         throw new Error("Плохой запрос");
//       }
//       if(!navigator.onLine) {
//         throw new Error("нет интернета")
//     }
//       return response.json()
//     }).then((responseData) => {
//       return getFetch();
//     }).then(() => {
//     }).catch((error) => {
//       if (error.message === "Сервер сломался") {
//         alert("Сервер сломался, попробуй позже");
//         return;
//       } if (error.message === "нет интернета") {
//         alert("Кажется, у вас сломался интернет, попробуйте позже");
//         return
//       }if (error.message === "Плохой запрос") {
//           alert("Пожалуйста, проверьте правильность заполнения полей");
//           return
//       }
//     });
// }
