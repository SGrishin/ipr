class MessageSender {
  constructor() {
    this.messageInput = document.getElementById('message-input');
    this.sendButton = document.getElementById('send-button');
    
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (message) {
      // Публикуем событие с новым сообщением
      eventBus.publish('NEW_MESSAGE', {
        text: message,
        sender: 'User',
        timestamp: new Date()
      });
      this.messageInput.value = '';
    }
  }
}