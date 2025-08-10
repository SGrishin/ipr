const fs = require('fs');
const path = require('path');

// 1. Получаем текущую дату и время в формате YYYY-MM-DD_HH-MM-SS
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

// 2. Создаем файл с текущей датой и временем в названии
const createFileWithDateTime = () => {
  const fileName = `file created at ${getCurrentDateTime()}.txt`;
  const fileContent = 'Этот файл был создан автоматически с помощью Node.js!\nТекущее время: ' + new Date().toLocaleString();

  // Записываем файл
  fs.writeFileSync(fileName, fileContent, 'utf-8');
  console.log(`Файл создан: ${fileName}`);

  return fileName;
};

// 3. Переименовываем файл, заменяя пробелы на подчеркивания
const renameFileWithoutSpaces = (oldFileName) => {
  const dirName = path.dirname(oldFileName);
  const newFileName = path.join(dirName, oldFileName.replace(/\s+/g, '_'));

  fs.renameSync(oldFileName, newFileName);
  console.log(`Файл переименован: ${newFileName}`);
};

// Запускаем весь процесс
const originalFileName = createFileWithDateTime();
renameFileWithoutSpaces(originalFileName);