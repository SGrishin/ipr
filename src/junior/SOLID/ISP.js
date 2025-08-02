// Interface Segregation Principle

// Пример нарушения

class Machine {
  print() {
    // печать документа
  }
  
  scan() {
    // сканирование документа
  }
  
  fax() {
    // отправка факса
  }
}

class OldPrinter extends Machine {
  // Старый принтер не умеет сканировать и отправлять факсы
  scan() {
    throw new Error('Не поддерживается');
  }
  
  fax() {
    throw new Error('Не поддерживается');
  }
}

// Исправленный вариант

class Printer {
  print() {
    // печать документа
  }
}

class Scanner {
  scan() {
    // сканирование документа
  }
}

class Fax {
  fax() {
    // отправка факса
  }
}

class MultiFunctionDevice {
  constructor(printer, scanner, fax) {
    this.printer = printer;
    this.scanner = scanner;
    this.fax = fax;
  }
  
  print() {
    this.printer.print();
  }
  
  scan() {
    this.scanner.scan();
  }
  
  fax() {
    this.fax.fax();
  }
}

class OldPrinter extends Printer {
  // Только печать
}
