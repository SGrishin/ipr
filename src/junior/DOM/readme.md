1. EventTarget (Базовый уровень)
Роль: Самый базовый интерфейс, от которого наследуются все объекты, способные получать события (например, клики, клавиатура и т. д.).

Методы:

addEventListener() – добавляет обработчик события.

removeEventListener() – удаляет обработчик.

dispatchEvent() – инициирует событие.

Примеры: Window, Document, Element, XMLHttpRequest и др.

2. Node (Узел DOM)
Роль: Базовый класс для всех узлов DOM (элементы, текстовые узлы, комментарии и т. д.).

Наследует: EventTarget.

Свойства/методы:

nodeType – тип узла (например, 1 для элемента, 3 для текста).

parentNode, childNodes, nextSibling, previousSibling – навигация по DOM.

appendChild(), removeChild(), cloneNode() и др.

Примеры: Element, Text, Comment, DocumentFragment.

3. Element (HTML- или XML-элемент)
Роль: Представляет элемент DOM (например, <div>, <p>).

Наследует: Node.

Свойства/методы:

id, className, classList, attributes – доступ к атрибутам.

getAttribute(), setAttribute(), removeAttribute().

querySelector(), querySelectorAll() – поиск внутри элемента.

innerHTML, outerHTML, textContent.

Примеры: Все HTML-элементы (<div>, <span> и т. д.).

4. HTMLElement (HTML-элемент с специфичными свойствами)
Роль: Базовый класс для всех HTML-элементов, добавляет специфичные для HTML свойства.

Наследует: Element.

Свойства/методы:

style – доступ к CSS-стилям.

offsetWidth, offsetHeight, clientWidth, clientHeight – размеры.

click(), focus(), blur() – методы взаимодействия.

Примеры: Конкретные элементы, такие как HTMLDivElement, HTMLButtonElement.

5. Window (Окно браузера)
Роль: Глобальный объект, представляющий окно браузера.

Наследует: EventTarget (но не Node!).

Свойства/методы:

window.document – доступ к документу.

window.location – URL страницы.

window.setTimeout(), window.fetch() – глобальные методы.

События: load, resize, scroll.

Особенность: Является глобальной областью видимости в браузере (window === this).

6. Document (DOM-документ)
Роль: Представляет весь HTML-документ (корень DOM-дерева).

Наследует: Node (но не Element!).

Свойства/методы:

documentElement – ссылка на <html>.

head, body – доступ к <head> и <body>.

getElementById(), getElementsByClassName() – поиск элементов.

createElement(), createTextNode() – создание узлов.

События: DOMContentLoaded.

7. DocumentFragment (Легковесный DOM-фрагмент)
Роль: "Легкий" контейнер для DOM-узлов, который не является частью основного DOM-дерева.

Наследует: Node.

Преимущества:

Оптимизация: можно собрать фрагмент в памяти и вставить его за одну операцию.

Не вызывает reflow/repaint до вставки в DOM.

EventTarget
  ├── Node
  │    ├── Document
  │    ├── Element
  │    │    └── HTMLElement
  │    ├── Text
  │    ├── Comment
  │    └── DocumentFragment
  ├── Window
  └── XMLHttpRequest, etc.