// Создаем новый промис
const myPromise = new Promise((resolve, reject) => {
  // Симулируем асинхронную операцию (например, запрос к API)
  setTimeout(() => {
    const success = Math.random() > 0.3; // 70% chance of success
    
    if (success) {
      resolve("Данные успешно получены!"); // Промис выполнен успешно
    } else {
      reject("Ошибка: не удалось получить данные"); // Промис завершился с ошибкой
    }
  }, 1000);
});

// Используем промис
myPromise
  .then((result) => {
    console.log(result); // Выводится при успешном выполнении
  })
  .catch((error) => {
    console.error(error); // Выводится при ошибке
  })
  .finally(() => {
    console.log("Операция завершена (успешно или с ошибкой)");
  });


// Цепочка промисов
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: "John Doe" }), 500);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Post 1", "Post 2", "Post 3"]), 800);
  });
}

function fetchPostComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Comment 1", "Comment 2"]), 300);
  });
}

// Цепочка промисов
fetchUserData(123)
  .then((user) => {
    console.log("User:", user);
    return fetchUserPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return fetchPostComments(posts[0]);
  })
  .then((comments) => {
    console.log("Comments:", comments);
  })
  .catch((error) => {
    console.error("Error:", error);
  });



// Async/Await
// Асинхронная функция, возвращающая промис
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Использование async/await
async function run() {
  console.log("Начало выполнения");
  
  try {
    await wait(1000); // Ждем 1 секунду
    console.log("Прошла 1 секунда");
    
    await wait(1500); // Ждем еще 1.5 секунды
    console.log("Прошло еще 1.5 секунды");
    
    return "Функция завершена";
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
}

// Вызов асинхронной функции
run()
  .then(result => console.log(result))
  .catch(error => console.error("Внешняя обработка ошибки:", error));


// Обработка ошибок в async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Данные получены:", data);
    return data;
  } catch (error) {
    console.error("Не удалось получить данные:", error);
    // Можно пробросить ошибку дальше
    throw error;
  }
}

// Альтернативный вариант без try/catch (с обработкой через catch)
async function loadData() {
  const response = await fetch('https://api.example.com/data')
    .catch(err => console.error("Ошибка сети:", err));
  
  if (!response) return;
  
  const data = await response.json();
  return data;
}

loadData().then(data => console.log(data));


// Promise.all и Promise.race
async function parallelExecution() {
  const promise1 = fetch('https://api.example.com/users');
  const promise2 = fetch('https://api.example.com/posts');
  const promise3 = fetch('https://api.example.com/comments');
  
  // Ожидаем выполнения всех промисов
  const [usersRes, postsRes, commentsRes] = await Promise.all([
    promise1,
    promise2,
    promise3
  ]);
  
  const users = await usersRes.json();
  const posts = await postsRes.json();
  const comments = await commentsRes.json();
  
  console.log({ users, posts, comments });
}

async function raceExample() {
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Timeout!")), 3000);
  );
  
  const dataPromise = fetch('https://api.example.com/slow-data');
  
  // Получаем результат того промиса, который выполнится первым
  try {
    const result = await Promise.race([dataPromise, timeoutPromise]);
    const data = await result.json();
    console.log("Данные получены:", data);
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}