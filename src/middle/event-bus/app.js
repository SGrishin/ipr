// Event Bus implementation
class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) return;
        
        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event, data = null) {
        if (!this.listeners[event]) return;
        
        this.listeners[event].forEach(listener => {
            listener(data);
        });
    }
}

// Create global event bus
const eventBus = new EventBus();

// Application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all widgets
    if (typeof WidgetA !== 'undefined') {
        new WidgetA(document.getElementById('widget-a'), eventBus);
    }
    
    if (typeof WidgetB !== 'undefined') {
        new WidgetB(document.getElementById('widget-b'), eventBus);
    }
    
    if (typeof WidgetC !== 'undefined') {
        new WidgetC(document.getElementById('widget-c'), eventBus);
    }
});