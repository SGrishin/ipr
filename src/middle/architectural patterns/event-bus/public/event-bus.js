class EventBus {
  constructor() {
    this.subscribers = {};
  }

  subscribe(eventType, callback) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(callback);
  }

  unsubscribe(eventType, callback) {
    if (!this.subscribers[eventType]) return;
    
    this.subscribers[eventType] = this.subscribers[eventType]
      .filter(cb => cb !== callback);
  }

  publish(eventType, data) {
    if (!this.subscribers[eventType]) return;
    
    this.subscribers[eventType].forEach(callback => {
      callback(data);
    });
  }
}

const eventBus = new EventBus();