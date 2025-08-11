interface LogEntry {
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  context?: object;
}

class SimpleLogger {
  private logs: LogEntry[] = [];
  private readonly maxSize = 1000;

  private addLog(level: LogEntry['level'], message: string, context?: object) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && { context })
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxSize) {
      this.logs.shift();
    }

    // Форматирование для консоли
    const consoleMessage = `[${entry.timestamp}] ${level.toUpperCase()}: ${message}` +
      (context ? ` | ${JSON.stringify(context)}` : '');
    
    // Вывод в консоль с соответствующим уровнем
    switch (level) {
      case 'error':
        console.error(consoleMessage);
        break;
      case 'warn':
        console.warn(consoleMessage);
        break;
      case 'info':
        console.info(consoleMessage);
        break;
      case 'debug':
        console.debug(consoleMessage);
        break;
    }
  }

  error(message: string, context?: object) {
    this.addLog('error', message, context);
  }

  warn(message: string, context?: object) {
    this.addLog('warn', message, context);
  }

  info(message: string, context?: object) {
    this.addLog('info', message, context);
  }

  debug(message: string, context?: object) {
    this.addLog('debug', message, context);
  }

  getLogs(): string[] {
    return this.logs.map(entry => 
      `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}` +
      (entry.context ? ` | ${JSON.stringify(entry.context)}` : '')
    );
  }
}

export const log = new SimpleLogger();

// Обработка глобальных ошибок (только для браузера)
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    log.error(`Global Error: ${event.message}`, {
      error: event.error,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    log.error(`Unhandled Promise Rejection: ${event.reason}`, {
      reason: event.reason
    });
  });
}