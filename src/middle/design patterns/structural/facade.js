// Facade — структурный шаблон проектирования, позволяющий скрыть сложность системы путём сведения всех возможных внешних вызовов к одному объекту,
// делегирующему их соответствующим объектам системы.

// Сложные подсистемы
class Amplifier {
  on() {
    console.log('Усилитель включен');
  }
  
  setVolume(level) {
    console.log(`Установлена громкость на уровне ${level}`);
  }
  
  off() {
    console.log('Усилитель выключен');
  }
}

class Tuner {
  on() {
    console.log('Тюнер включен');
  }
  
  off() {
    console.log('Тюнер выключен');
  }
}

class DvdPlayer {
  on() {
    console.log('DVD-плеер включен');
  }
  
  play(movie) {
    console.log(`Начинается воспроизведение фильма "${movie}"`);
  }
  
  off() {
    console.log('DVD-плеер выключен');
  }
}

class Projector {
  on() {
    console.log('Проектор включен');
  }
  
  setInput(source) {
    console.log(`Проектор получает сигнал от ${source}`);
  }
  
  off() {
    console.log('Проектор выключен');
  }
}

// Фасад - упрощенный интерфейс для работы с кинотеатром
class HomeTheaterFacade {
  constructor(amp, tuner, dvd, projector) {
    this.amp = amp;
    this.tuner = tuner;
    this.dvd = dvd;
    this.projector = projector;
  }
  
  watchMovie(movie) {
    console.log('Готовимся смотреть фильм...');
    this.amp.on();
    this.amp.setVolume(5);
    this.tuner.on();
    this.dvd.on();
    this.dvd.play(movie);
    this.projector.on();
    this.projector.setInput('DVD');
  }
  
  endMovie() {
    console.log('Выключаем кинотеатр...');
    this.amp.off();
    this.tuner.off();
    this.dvd.off();
    this.projector.off();
  }
}

// Использование фасада
const amp = new Amplifier();
const tuner = new Tuner();
const dvd = new DvdPlayer();
const projector = new Projector();

const homeTheater = new HomeTheaterFacade(amp, tuner, dvd, projector);

homeTheater.watchMovie('Крестный отец');
// Через некоторое время...
homeTheater.endMovie();


// Преимущества:
// - Изолирует клиентов от сложных подсистем
// - Уменьшает зависимость между клиентом и подсистемой
// - Упрощает работу с API

// Недостатки:
// - Фасад может стать "божественным объектом", привязанным ко всем классам программы