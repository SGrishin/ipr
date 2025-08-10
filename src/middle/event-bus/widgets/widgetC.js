class WidgetC {
    constructor(container, eventBus) {
        this.container = container;
        this.eventBus = eventBus;
        this.render();
        this.setupListeners();
    }

    render() {
        this.container.innerHTML = `
            <h2>Widget C</h2>
            <p>This widget receives messages and can broadcast</p>
            <input type="text" id="widget-c-input" placeholder="Enter message">
            <button id="widget-c-broadcast">Broadcast</button>
            <div id="widget-c-received" class="messages"></div>
        `;
    }

    setupListeners() {
        this.container.querySelector('#widget-c-broadcast').addEventListener('click', () => {
            const input = this.container.querySelector('#widget-c-input');
            const message = input.value.trim();
            if (message) {
                this.eventBus.emit('broadcast', { from: 'C', message });
                input.value = '';
            }
        });

        this.eventBus.on('message-to-c', (data) => {
            this.displayMessage(`From ${data.from}: ${data.message}`);
        });

        this.eventBus.on('broadcast', (data) => {
            if (data.from !== 'C') {
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
        this.container.querySelector('#widget-c-received').prepend(messageDiv);
    }
}