// Proxy — структурный шаблон проектирования, предоставляющий объект,
// который контролирует доступ к другому объекту, перехватывая все вызовы (выполняет функцию контейнера).


// пример с ленивой загрузкой
// Реальный объект
class RealImage {
  constructor(filename) {
    this.filename = filename;
    this.loadFromDisk();
  }

  display() {
    console.log(`Показываю изображение: ${this.filename}`);
  }

  loadFromDisk() {
    console.log(`Загрузка изображения ${this.filename} с диска...`);
  }
}

// Заместитель (Proxy)
class ProxyImage {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null; // Реальный объект пока не создан
  }

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename); // Ленивая загрузка
      this.realImage.loadFromDisk()
    }
    this.realImage.display();
  }
}

// Использование
const image = new ProxyImage("photo.jpg");

// Изображение загрузится только при вызове display()
image.display();

// Повторный вызов — загрузки не будет (объект уже создан)
image.display();


// Преимущества:
// - Контроль доступа
// - Ленивая инициализация
// - Кеширование
// - Сайд эффекты

// Недостатки:
// - Усложнение кода
// - Накладные расходы на производительность
// - Риск неправильного использования
// - Ограничения реализации