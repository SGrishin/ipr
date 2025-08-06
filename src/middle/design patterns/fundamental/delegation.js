// Делегирование — основной шаблон проектирования, в котором объект внешне выражает некоторое поведение,
// но в реальности передаёт ответственность за выполнение этого поведения связанному объект

// Объект, который умеет отправлять запросы
const httpClient = {
  get(url) {
    console.log(`GET запрос к ${url}`);
    return Promise.resolve("Данные с сервера");
  },
};

// Основной класс, который делегирует HTTP-запросы
class ApiService {
  constructor(client) {
    this.client = client; // Делегируем работу httpClient
  }

  fetchData(url) {
    return this.client.get(url);
  }
}

// Использование
const api = new ApiService(httpClient);
api.fetchData("https://api.example.com").then(console.log);
// Вывод:  
// "GET запрос к https://api.example.com"  
// "Данные с сервера"