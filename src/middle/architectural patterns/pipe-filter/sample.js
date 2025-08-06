

// Класс Pipeline для соединения фильтров
class Pipeline {
  constructor() {
    this.filters = [];
  }

  add(filter) {
    this.filters.push(filter);
    return this; // для цепочки вызовов
  }

  execute(input) {
    let result = input;
    for (const filter of this.filters) {
      result = filter.process(result);
    }
    return result;
  }
}

// Фильтры для обработки данных пользователя
class TrimFilter extends Filter {
  process(data) {
    return data.trim();
  }
}

class ValidateEmailFilter extends Filter {
  process(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }
    return email;
  }
}

class NormalizeEmailFilter extends Filter {
  process(email) {
    return email.toLowerCase();
  }
}

// Создаем pipeline для обработки email
const emailPipeline = new Pipeline()
  .add(new TrimFilter())
  .add(new ValidateEmailFilter())
  .add(new NormalizeEmailFilter());

try {
  const processedEmail = emailPipeline.execute('  John.Doe@EXAMPLE.COM ');
  console.log(processedEmail); // "john.doe@example.com"
} catch (error) {
  console.error('Error processing email:', error.message);
}