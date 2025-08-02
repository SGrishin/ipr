// Dependency Inversion Principle

// Пример нарушения

class LightBulb {
  turnOn() {
    console.log('Лампочка включена');
  }
  
  turnOff() {
    console.log('Лампочка выключена');
  }
}

class Switch {
  constructor(bulb) {
    this.bulb = bulb;
  }
  
  operate() {
    if (/* условие */) {
      this.bulb.turnOn();
    } else {
      this.bulb.turnOff();
    }
  }
}

// Исправленный вариант

class SwitchableDevice {
  turnOn() {
    throw new Error('Метод turnOn должен быть реализован');
  }
  
  turnOff() {
    throw new Error('Метод turnOff должен быть реализован');
  }
}

class LightBulb extends SwitchableDevice {
  turnOn() {
    console.log('Лампочка включена');
  }
  
  turnOff() {
    console.log('Лампочка выключена');
  }
}

class Fan extends SwitchableDevice {
  turnOn() {
    console.log('Вентилятор включен');
  }
  
  turnOff() {
    console.log('Вентилятор выключен');
  }
}

class Switch {
  constructor(device) {
    this.device = device;
  }
  
  operate() {
    if (/* условие */) {
      this.device.turnOn();
    } else {
      this.device.turnOff();
    }
  }
}