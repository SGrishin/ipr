class MessageDisplay {
  constructor() {
    this.messagesContainer = document.getElementById('messages-container');
    
    // Подписываемся на события новых сообщений
    eventBus.subscribe('NEW_MESSAGE', this.addMessage.bind(this));
  }

  addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `
      <strong>${message.sender}:</strong> 
      <span>${message.text}</span>
      <small>${message.timestamp.toLocaleTimeString()}</small>
    `;
    this.messagesContainer.appendChild(messageElement);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}