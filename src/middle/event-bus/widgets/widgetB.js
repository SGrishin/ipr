class WidgetB {
    constructor(container, eventBus) {
        this.container = container;
        this.eventBus = eventBus;
        this.render();
        this.setupListeners();
    }

    render() {
        this.container.innerHTML = `
            <h2>Widget B</h2>
            <p>This widget communicates with A and C</p>
            <input type="text" id="widget-b-input" placeholder="Enter message">
            <button id="widget-b-send-a">Send to A</button>
            <button id="widget-b-send-c">Send to C</button>
            <div id="widget-b-received" class="messages"></div>
        `;
    }

    setupListeners() {
        this.container.querySelector('#widget-b-send-a').addEventListener('click', () => {
            const input = this.container.querySelector('#widget-b-input');
            const message = input.value.trim();
            if (message) {
                this.eventBus.emit('message-to-a', { from: 'B', message });
                input.value = '';
            }
        });

        this.container.querySelector('#widget-b-send-c').addEventListener('click', () => {
            const input = this.container.querySelector('#widget-b-input');
            const message = input.value.trim();
            if (message) {
                this.eventBus.emit('message-to-c', { from: 'B', message });
                input.value = '';
            }
        });

        this.eventBus.on('message-to-b', (data) => {
            this.displayMessage(`From ${data.from}: ${data.message}`);
        });

        this.eventBus.on('broadcast', (data) => {
            this.displayMessage(`Broadcast from ${data.from}: ${data.message}`);
        });
    }

    displayMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        messageDiv.style.padding = '5px';
        messageDiv.style.margin = '5px 0';
        messageDiv.style.backgroundColor = '#f0f0f0';
        messageDiv.style.borderRadius = '4px';
        this.container.querySelector('#widget-b-received').prepend(messageDiv);
    }
}