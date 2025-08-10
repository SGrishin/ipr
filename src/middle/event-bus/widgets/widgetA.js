class WidgetA {
    constructor(container, eventBus) {
        this.container = container;
        this.eventBus = eventBus;
        this.render();
        this.setupListeners();
    }

    render() {
        this.container.innerHTML = `
            <h2>Widget A</h2>
            <p>This widget sends messages to others</p>
            <input type="text" id="widget-a-input" placeholder="Enter message">
            <button id="widget-a-send">Send to B</button>
            <button id="widget-a-broadcast">Broadcast</button>
            <div id="widget-a-received" class="messages"></div>
        `;
    }

    setupListeners() {
        this.container.querySelector('#widget-a-send').addEventListener('click', () => {
            const input = this.container.querySelector('#widget-a-input');
            const message = input.value.trim();
            if (message) {
                this.eventBus.emit('message-to-b', { from: 'A', message });
                input.value = '';
            }
        });

        this.container.querySelector('#widget-a-broadcast').addEventListener('click', () => {
            const input = this.container.querySelector('#widget-a-input');
            const message = input.value.trim();
            if (message) {
                this.eventBus.emit('broadcast', { from: 'A', message });
                input.value = '';
            }
        });

        this.eventBus.on('message-to-a', (data) => {
            this.displayMessage(`From ${data.from}: ${data.message}`);
        });

        this.eventBus.on('broadcast', (data) => {
            if (data.from !== 'A') {
                this.displayMessage(`Broadcast from ${data.from}: ${data.message}`);
            }
        });
    }

    displayMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        messageDiv.style.padding = '5px';
        messageDiv.style.margin = '5px 0';
        messageDiv.style.backgroundColor = '#f0f0f0';
        messageDiv.style.borderRadius = '4px';
        this.container.querySelector('#widget-a-received').prepend(messageDiv);
    }
}