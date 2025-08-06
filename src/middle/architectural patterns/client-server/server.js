const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;

    // Обработка API запросов
    if (req.method === 'GET' && pathname === '/calculate') {
        handleCalculation(req, res, parsedUrl);
    } 
    // Отдача статических файлов
    else {
        serveStaticFile(req, res, pathname);
    }
});

function handleCalculation(req, res, parsedUrl) {
    const query = querystring.parse(parsedUrl.query);
    const { operation, num1, num2 } = query;
    
    if (!operation || !num1 || !num2) {
        sendResponse(res, 400, { error: 'Missing parameters' });
        return;
    }
    
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    let result;
    
    switch(operation) {
        case 'add':
            result = a + b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        case 'divide':
            result = b !== 0 ? a / b : 'Error: Division by zero';
            break;
        default:
            sendResponse(res, 400, { error: 'Invalid operation' });
            return;
    }
    
    sendResponse(res, 200, { result });
}

function serveStaticFile(req, res, pathname) {
    // Определяем путь к файлу
    let filePath = path.join(__dirname, 'public', 
        pathname === '/' ? 'index.html' : pathname);
    
    // Проверяем расширение файла для Content-Type
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
    
    // Читаем файл
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Файл не найден
                fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
                    if (err) {
                        sendResponse(res, 500, 'Internal Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Другая ошибка сервера
                sendResponse(res, 500, 'Internal Server Error');
            }
        } else {
            // Успешный ответ
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});