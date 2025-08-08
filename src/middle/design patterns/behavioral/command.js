// ===== 1. Получатели (Receivers) =====

// 1.1. Свет
class Light {
  turnOn() {
    console.log("💡 Свет включен");
  }

  turnOff() {
    console.log("💡 Свет выключен");
  }
}

// 1.2. Музыкальный плеер
class MusicPlayer {
  play() {
    console.log("🎵 Музыка играет");
  }

  pause() {
    console.log("🎵 Музыка на паузе");
  }
}

// 1.3. Кондиционер
class AirConditioner {
  setTemperature(temp) {
    console.log(`❄️ Кондиционер установлен на ${temp}°C`);
  }

  turnOff() {
    console.log("❄️ Кондиционер выключен");
  }
}

// ===== 2. Команды (Commands) =====

// 2.1. Базовый класс команды
class Command {
  execute() {}
  undo() {}
}

// 2.2. Команда включения света
class TurnOnLightCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}

// 2.3. Команда воспроизведения музыки
class PlayMusicCommand extends Command {
  constructor(musicPlayer) {
    super();
    this.musicPlayer = musicPlayer;
  }

  execute() {
    this.musicPlayer.play();
  }

  undo() {
    this.musicPlayer.pause();
  }
}

// 2.4. Команда установки температуры кондиционера
class SetACTemperatureCommand extends Command {
  constructor(ac, temperature) {
    super();
    this.ac = ac;
    this.temperature = temperature;
    this.prevTemperature = null;
  }

  execute() {
    if (this.prevTemperature === null) {
      this.prevTemperature = 25; // Предположим, что предыдущая температура была 25°C
    }
    this.ac.setTemperature(this.temperature);
  }

  undo() {
    if (this.prevTemperature !== null) {
      this.ac.setTemperature(this.prevTemperature);
    } else {
      this.ac.turnOff();
    }
  }
}

// ===== 3. Инициатор (Invoker) =====

class RemoteControl {
  constructor() {
    this.history = [];
  }

  pressButton(command) {
    command.execute();
    this.history.push(command);
  }

  undoLastCommand() {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      console.log("⏪ Отмена последней команды...");
      lastCommand.undo();
    } else {
      console.log("Нет команд для отмены!");
    }
  }
}

// ===== 4. Клиентский код =====

// Создаем получателей
const livingRoomLight = new Light();
const musicPlayer = new MusicPlayer();
const ac = new AirConditioner();

// Создаем команды
const turnOnLight = new TurnOnLightCommand(livingRoomLight);
const playMusic = new PlayMusicCommand(musicPlayer);
const setACToCool = new SetACTemperatureCommand(ac, 18);

// Создаем пульт управления
const remote = new RemoteControl();

// Выполняем команды
remote.pressButton(turnOnLight);   // 💡 Свет включен
remote.pressButton(playMusic);     // 🎵 Музыка играет
remote.pressButton(setACToCool);   // ❄️ Кондиционер установлен на 18°C

// Отменяем последнюю команду
remote.undoLastCommand();          // ⏪ Отмена последней команды... ❄️ Кондиционер установлен на 25°C
remote.undoLastCommand();          // ⏪ Отмена последней команды... 🎵 Музыка на паузе
remote.undoLastCommand();          // ⏪ Отмена последней команды... 💡 Свет выключен
remote.undoLastCommand();          // Нет команд для отмены!


// Преимущества:
// - Разделение отправителя и получателя
// - Гибкость и расширяемость
// - Поддержка отмены и повтора операций (Undo/Redo)
// - Возможность организации очереди команд
// - Логирование и аудит операций

// Недостатки:
// - Усложнение кода из-за множества классов
// - Накладные расходы на память
// - Не всегда нужен