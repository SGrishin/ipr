class NotificationManager {
  constructor() {
    this.notificationCount = 0;
    this.notificationBadge = document.getElementById('notification-badge');
    
    // Подписываемся на новые сообщения
    eventBus.subscribe('NEW_MESSAGE', this.showNotification.bind(this));
  }

  showNotification() {
    this.notificationCount++;
    this.notificationBadge.textContent = this.notificationCount;
    this.notificationBadge.style.display = 'block';
    
    // Через 3 секунды сбрасываем уведомления
    setTimeout(() => {
      this.notificationCount = 0;
      this.notificationBadge.style.display = 'none';
    }, 3000);
  }
}