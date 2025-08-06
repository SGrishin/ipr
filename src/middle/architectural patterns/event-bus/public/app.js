// Инициализация компонентов
document.addEventListener('DOMContentLoaded', () => {
    new MessageSender();
    new MessageDisplay();
    new NotificationManager();
    
    // Системное сообщение при загрузке
    setTimeout(() => {
    eventBus.publish('NEW_MESSAGE', {
        text: 'Добро пожаловать в чат!',
        sender: 'System',
        timestamp: new Date()
    });
    }, 500);
});