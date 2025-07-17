class TextEditor {
    constructor(editor) {
        this.__editor = editor
        this.__buttons = []
        this.__editor.style.outline = "none"
        this.__editor.style.innerHTML = ""
        this.__editor.contentEditable = true
        this.__editor.spellCheck = true
        this.__eventListeners = []
        this.__timeOuts = []
        this.__timeIntervals = []
    }

    __init() {
        this.__editor.style.outline = "none"
        this.__editor.style.innerHTML = ""
        this.__editor.contentEditable = true
        this.__editor.spellCheck = true
        this.__eventListeners = []
        this.__timeOuts = []
        this.__timeIntervals = []

        this.__addEventListener(this.__editor, "click", () => {
            this.__updateBlockFormat()
            this.__updateButtonState()
        })
        this.__addEventListener(this.__editor, "input", () => {
            this.__updateBlockFormat()
            this.__updateButtonState()
        })
        this.__addEventListener(document, "selectionchange", () => {
            if (document.activeElement === this.__editor) {
                this.__updateBlockFormat()
                this.__updateButtonState()
            }
        })
    }

    __format(command) {
        let selection = window.getSelection();
        let currentListItem = null;
        if (selection.rangeCount > 0) {
            let node = selection.getRangeAt(0).startContainer;
            if (node.nodeType !== 1) node = node.parentElement;
            currentListItem = node.closest('li');
        }

        if (command === 'indent' && currentListItem) {
            // If in a list item, indent creates a sublist
            const parentList = currentListItem.closest('ul, ol, .abc-list');
            const listType = parentList.tagName.toLowerCase() === 'ul' ? 'ul' : 'ol';
            const isAbcList = parentList.classList.contains('abc-list');
            const range = selection.getRangeAt(0);
            const newList = document.createElement(listType);
            if (isAbcList) newList.classList.add('abc-list');
            const newLi = document.createElement('li');
            newLi.innerHTML = '<br>';
            newList.appendChild(newLi);
            currentListItem.appendChild(newList);
            // Move cursor to the new sublist item
            range.selectNodeContents(newLi);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            document.execCommand(command, false, null);
        }

        this.__updateBlockFormat()
        this.__updateButtonState()
    }

    __formatBlock(command) {
        if (command.startsWith('justify')) {
            document.execCommand(command, false, null);
        } else {
            document.execCommand('formatBlock', false, command);
        }
        this.__updateBlockFormat()
        this.__updateButtonState()
    }

    __setBlockFormat(select) {
        let tag = select.value
        let selection = window.getSelection();
        this.__editor.focus()
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            document.execCommand('formatBlock', false, tag);
        }

        this.__updateBlockFormat()
        this.__updateButtonState()
    }

    __setColor(color) {
        document.execCommand('foreColor', false, color);
        this.__updateBlockFormat()
        this.__updateButtonState()
    }

    __insertLink() {
        let url = prompt("Enter the URL", "http://");
        if (url) {
            document.execCommand('createLink', false, url);
        }
        this.__updateBlockFormat()
        this.__updateButtonState()
    }

    __removeLink() {
        document.execCommand('unlink', false, null);
        this.__updateBlockFormat()
        this.__updateButtonState()
    }

    __insertList(type) {
        let selection = window.getSelection();
        let parentList = null;
        let currentListItem = null;
        if (selection.rangeCount > 0) {
            let node = selection.getRangeAt(0).startContainer;
            if (node.nodeType !== 1) node = node.parentElement;
            parentList = node.closest('ul, ol, .abc-list');
            currentListItem = node.closest('li');
        }

        if (type === 'ul') {
            document.execCommand('insertUnorderedList', false, null);
        } else if (type === 'ol') {
            document.execCommand('insertOrderedList', false, null);
        } else if (type === 'abc') {
            document.execCommand('insertOrderedList', false, null);
            this.__setTimeout(() => {
                const lists = this.__editor.querySelectorAll('ol:not(.abc-list)');
                lists.forEach(list => list.classList.add('abc-list'));
            }, 0);
        }

        this.__setTimeout(() => {
            const lists = this.__editor.querySelectorAll('ul, ol');
            lists.forEach(list => {
                const items = list.querySelectorAll(':scope > li');
                if (items.length === 0) {
                    const li = document.createElement('li');
                    li.innerHTML = '<br>';
                    list.appendChild(li);
                }
            });
        }, 0);

        this.__updateBlockFormat()
        this.__updateButtonState()
    }

    __updateBlockFormat() {
        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0);
            let node = range.startContainer;
            if (node.nodeType !== 1) node = node.parentElement;
            let block = node.closest('p, h1, h2, h3, h4, h5, h6, blockquote, pre');
            let select = this.__buttons.find(obj => obj.label === "Text Style").element;
            let tag = block ? block.tagName : 'P';
            select.value = tag;
        }
    }

    __updateButtonState() {
        let commands = [{
            command: 'bold',
            selector: this.__buttons.find(obj => obj.label === "Bold").element,
            activeClass: this.__buttons.find(obj => obj.label === "Bold").activeClass,
            className: this.__buttons.find(obj => obj.label === "Bold").className
        }, {
            command: 'italic',
            selector: this.__buttons.find(obj => obj.label === "Italic").element,
            activeClass: this.__buttons.find(obj => obj.label === "Italic").activeClass,
            className: this.__buttons.find(obj => obj.label === "Italic").className
        }, {
            command: 'justifyLeft',
            selector: this.__buttons.find(obj => obj.label === "Align Left").element,
            activeClass: this.__buttons.find(obj => obj.label === "Align Left").activeClass,
            className: this.__buttons.find(obj => obj.label === "Align Left").className
        }, {
            command: 'justifyCenter',
            selector: this.__buttons.find(obj => obj.label === "Align Center").element,
            activeClass: this.__buttons.find(obj => obj.label === "Align Center").activeClass,
            className: this.__buttons.find(obj => obj.label === "Align Center").className
        }, {
            command: 'justifyRight',
            selector: this.__buttons.find(obj => obj.label === "Align Right").element,
            activeClass: this.__buttons.find(obj => obj.label === "Align Right").activeClass,
            className: this.__buttons.find(obj => obj.label === "Align Right").className
        }, {
            command: 'insertUnorderedList',
            selector: this.__buttons.find(obj => obj.label === "Point List").element,
            activeClass: this.__buttons.find(obj => obj.label === "Point List").activeClass,
            className: this.__buttons.find(obj => obj.label === "Point List").className
        }, {
            command: 'insertOrderedList',
            selector: this.__buttons.find(obj => obj.label === "Numbered List").element,
            activeClass: this.__buttons.find(obj => obj.label === "Numbered List").activeClass,
            className: this.__buttons.find(obj => obj.label === "Numbered List").className
        }, {
            command: 'insertOrderedList',
            selector: this.__buttons.find(obj => obj.label === "Alpha List").element,
            activeClass: this.__buttons.find(obj => obj.label === "Alpha List").activeClass,
            className: this.__buttons.find(obj => obj.label === "Alpha List").className
        }];

        commands.forEach(({
            command,
            selector,
            activeClass,
            className
        }) => {
            if (selector) {
                const isActive = document.queryCommandState(command);
                if (isActive) {
                    selector.className = ""
                    selector.classList.add(...activeClass.split(" "))
                } else {
                    selector.className = ""
                    selector.classList.add(...className.split(" "))
                }
            }
        });

        const abcButton = this.__buttons.find(obj => obj.label === "Alpha List").element;
        let abcClassName = this.__buttons.find(obj => obj.label === "Alpha List").className;
        let abcActiveClass = this.__buttons.find(obj => obj.label === "Alpha List").activeClass;
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let node = selection.getRangeAt(0).startContainer;
            if (node.nodeType !== 1) node = node.parentElement;
            const isAbcList = node.closest('.abc-list') !== null;
            if (isAbcList) {
                if (document.queryCommandState('insertOrderedList')) {
                    abcButton.className = ""
                    abcButton.classList.add(...abcActiveClass.split(" "))
                } else {
                    abcButton.className = ""
                    abcButton.classList.add(...abcClassName.split(" "))
                }
            }
        }
    }

    __setTimeout(fn, delay) {
        const id = setTimeout(fn, delay);
        this.__timeOuts.push(id);
        return id;
    }

    // Utility to add interval
    __setInterval(fn, delay) {
        const id = setInterval(fn, delay);
        this.__timeIntervals.push(id);
        return id;
    }

    // Utility to add event listener and track for cleanup
    __addEventListener(target, event, handler, options) {
        if (!target || !event || !handler) return;
        target.addEventListener(event, handler, options);
        this.__eventListeners.push({ target, event, handler, options });
    }

    __addButtons(btn) { this.__buttons.push(btn) }

    __unmount() {
        this.__timeOuts.forEach(id => clearTimeout(id));
        this.__timeIntervals.forEach(id => clearInterval(id));
        this.__eventListeners.forEach(({ target, event, handler, options }) => {
            target.removeEventListener(event, handler, options);
        });

        this.__buttons = []
        this.__timeOuts = [];
        this.__timeIntervals = [];
        this.__eventListeners = [];
    }
}

class TextEditorButtons extends TextEditor {

    constructor(input) {
        super(input)
    }


    redoButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "↷"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "redo")
        let data = {
            label: 'Redo',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    undoButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "↶"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "undo")
        let data = {
            label: 'Undo',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    indentRightButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "→"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "indent")
        let data = {
            label: 'Indent Right',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    indentLeftButton(elem, className, activeClassName) {
        const t = document.createElement("h1")
        t.innerText = "←"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "outdent")
        let data = {
            label: 'Indent Left',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    textStypeButton(elem, padding, className, activeClassName) {
        const s = document.createElement("select")
        s.style.background = "transparent"
        s.style.outline = "none"
        s.style.border = "none"
        s.style.height = "100%"
        s.style.width = "100%"
        s.style.display = "flex"
        s.style.alignItems = "center"
        s.style.justifyContent = "space-evenly"
        s.style.cursor = "pointer"
        s.style.padding = padding
        s.style.borderRight = `${padding.split(" ")[1]} solid transparent`

        const options = [
            ["PARAGRAPH", "Paragraph"],
            ["H1", "Heading 1"],
            ["H2", "Heading 2"],
            ["H3", "Heading 3"],
            ["H4", "Heading 4"],
            ["H5", "Heading 5"],
            ["H6", "Heading 6"],
            ["BLOCKQUOTE", "Quote"],
            ["PRE", "Preformatted"]
        ]

        options.forEach(([val, label]) => {
            const o = document.createElement("option")
            o.value = val
            o.innerText = label
            s.appendChild(o)
        })

        elem.innerHTML = ""
        elem.appendChild(s)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.style.padding = 0
        elem.onchange = e => this.__setBlockFormat.bind(this, e)

        let data = {
            label: 'Text Style',
            className: className,
            activeClass: activeClassName,
            element: elem,
        }

        this.__addButtons(data)
        return data
    }

    boldButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "B"
        t.style.fontWeight = "bold"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "bold")
        let data = {
            label: 'Bold',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    italicButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "I"
        t.style.fontStyle = "italic"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "italic")
        let data = {
            label: 'Italic',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    underlineButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "U"
        t.style.textDecoration = "underline"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "underline")
        let data = {
            label: 'Underline',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    anchorButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "🔗"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__insertLink.bind(this)
        let data = {
            label: 'Anchor',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    removeAnchorButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "⛓️‍💥"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__removeLink.bind(this)
        let data = {
            label: 'Remove Anchor',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    pointListButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "• List"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "ul")
        let data = {
            label: 'Point List',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    numListButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "1. List"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "ol")
        let data = {
            label: 'Numbered List',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    alphaListButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "a. List"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "abc")
        let data = {
            label: 'Alpha List',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    alignLeftButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "⇤"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "justifyLeft")
        let data = {
            label: 'Align Left',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    alignCenterButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "↔"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "justifyCenter")
        let data = {
            label: 'Align Center',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    alignRightButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "⇥"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = this.__format.bind(this, "justifyRight")
        let data = {
            label: 'Align Right',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    textColorButton(elem, className, activeClassName) {
        const t = document.createElement("input")
        t.type = "color"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        elem.onclick = e => {
            e.preventDefault()
            e.stopPropagation()
            t.click()
        }
        t.onchange = e => {
            this.__setColor(e.target.value)
        }
        let data = {
            label: 'Text Color',
            className: className,
            activeClass: activeClassName,
            element: elem
        }
        this.__addButtons(data)
        return data
    }

    initEditor() {
        this.__init()
    }

    dispose() {
        this.__unmount()
    }

}