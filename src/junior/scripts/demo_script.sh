#!/bin/bash

# 1. Создаем временный каталог и файлы
mkdir -p /tmp/demo_dir
echo "Hello World" > /tmp/demo_dir/file1.txt
echo "Another file" > /tmp/demo_dir/file2.txt

# 2. Используем cp для копирования файла
cp /tmp/demo_dir/file1.txt /tmp/demo_dir/file1_backup.txt

# 3. Используем mv для перемещения/переименования
mv /tmp/demo_dir/file2.txt /tmp/demo_dir/renamed_file.txt

# 4. Используем ln для создания жесткой ссылки
ln /tmp/demo_dir/file1.txt /tmp/demo_dir/file1_link.txt

# 5. Используем cat и grep для поиска содержимого
echo "Содержимое file1.txt:"
cat /tmp/demo_dir/file1.txt | grep "Hello"

# 6. Используем pipe для фильтрации вывода
echo "Файлы в /tmp/demo_dir:"
ls -l /tmp/demo_dir | grep "file"

# 7. Используем ip/ifconfig для получения сетевой информации
echo "Сетевые интерфейсы:"
ip a | grep "inet" || ifconfig | grep "inet"

# 8. Используем netstat для проверки сетевых соединений
echo "Активные соединения:"
netstat -tuln | grep "LISTEN" # TCP, UDP соединения, прослушиваемые (LISTEN) порты (серверные) в числовом формате

# 9. Запускаем процесс в фоне (sleep) и используем kill
sleep 300 &
PID=$!
echo "Запущен процесс sleep с PID $PID"
echo "Список процессов (top/htop):"
top -b -n 1 | head -10 || htop --show-command | head -10
echo "Убиваем процесс sleep"
kill $PID

# 10. Убираем за собой (используем rm)
echo "Очищаем временные файлы"
rm -rf /tmp/demo_dir

echo "Демонстрация завершена!"
