class RTE {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = Object.assign({
            buttons: [
                'undo', 'redo', 'blockFormat', 'bold', 'italic', 'heading', 'indent', 'outdent',
                'ul', 'ol', 'abc', 'link', 'unlink', 'justifyLeft', 'justifyCenter', 'justifyRight',
                'colorRed', 'colorBlue', 'colorGreen'
            ],
            minHeight: 200,
            initialContent: '<p>Sample content for the rich text editor.</p>'
        }, options);

        this._render();
        this._bindEvents();
    }

    _render() {
        // Toolbar
        this.toolbar = document.createElement('div');
        this.toolbar.className = 'rte-toolbar';
        this.toolbar.innerHTML = this._getToolbarHTML();

        // Editor
        this.editor = document.createElement('div');
        this.editor.className = 'rte-editor';
        this.editor.contentEditable = 'true';
        this.editor.style.minHeight = this.options.minHeight + 'px';
        this.editor.innerHTML = this.options.initialContent;

        // Output (optional, for demo)
        this.output = document.createElement('pre');
        this.output.className = 'rte-output';
        this.output.style.display = 'none';

        // Styles
        this._injectStyles();

        // Append
        this.container.appendChild(this.toolbar);
        this.container.appendChild(this.editor);
        this.container.appendChild(this.output);
    }

    _getToolbarHTML() {
        const btns = {
            undo: `<button type="button" title="Undo" data-cmd="undo">↶</button>`,
            redo: `<button type="button" title="Redo" data-cmd="redo">↷</button>`,
            blockFormat: `
                <select data-cmd="blockFormat">
                    <option value="P">Paragraph</option>
                    <option value="H1">Heading 1</option>
                    <option value="H2">Heading 2</option>
                    <option value="H3">Heading 3</option>
                    <option value="H4">Heading 4</option>
                    <option value="H5">Heading 5</option>
                    <option value="H6">Heading 6</option>
                    <option value="BLOCKQUOTE">Quote</option>
                    <option value="PRE">Preformatted</option>
                </select>`,
            bold: `<button type="button" title="Bold" data-cmd="bold"><b>B</b></button>`,
            italic: `<button type="button" title="Italic" data-cmd="italic"><i>I</i></button>`,
            heading: `<button type="button" title="Heading" data-cmd="heading">H</button>`,
            indent: `<button type="button" title="Indent" data-cmd="indent">→</button>`,
            outdent: `<button type="button" title="Outdent" data-cmd="outdent">←</button>`,
            ul: `<button type="button" title="Bullet List" data-cmd="ul">• List</button>`,
            ol: `<button type="button" title="Numbered List" data-cmd="ol">1. List</button>`,
            abc: `<button type="button" title="ABC List" data-cmd="abc">a. List</button>`,
            link: `<button type="button" title="Insert Anchor" data-cmd="link">🔗</button>`,
            unlink: `<button type="button" title="Remove Anchor" data-cmd="unlink">🚫</button>`,
            justifyLeft: `<button type="button" title="Align Left" data-cmd="justifyLeft">⇤</button>`,
            justifyCenter: `<button type="button" title="Align Center" data-cmd="justifyCenter">↔</button>`,
            justifyRight: `<button type="button" title="Align Right" data-cmd="justifyRight">⇥</button>`,
            colorRed: `<button type="button" class="rte-color-btn" style="background:#e53935;" title="Red" data-cmd="color" data-color="#e53935"></button>`,
            colorBlue: `<button type="button" class="rte-color-btn" style="background:#3949ab;" title="Blue" data-cmd="color" data-color="#3949ab"></button>`,
            colorGreen: `<button type="button" class="rte-color-btn" style="background:#43a047;" title="Green" data-cmd="color" data-color="#43a047"></button>`
        };
        return this.options.buttons.map(b => btns[b]).join('\n');
    }

    _injectStyles() {
        if (document.getElementById('rte-styles')) return;
        const style = document.createElement('style');
        style.id = 'rte-styles';
        style.textContent = `
.rte-toolbar {
    display: flex; flex-wrap: wrap; gap: 4px;
    background: #222; border: 1px solid #333; padding: 6px 8px; border-radius: 6px 6px 0 0;
}
.rte-toolbar button, .rte-toolbar select {
    background: #333; color: #fff; border: 1px solid #444; border-radius: 4px;
    padding: 2px 8px; margin: 0; cursor: pointer; font-size: 1em;
}
.rte-toolbar button.active { background: #3b82f6; }
.rte-color-btn { width: 20px; height: 20px; border-radius: 50%; border: 1px solid #444; padding: 0; }
.rte-editor {
    background: #18181b; color: #fff; border: 1px solid #333; border-top: none;
    border-radius: 0 0 6px 6px; padding: 12px; outline: none;
    min-height: 200px; font-size: 1em;
}
.rte-editor ul { list-style-type: disc; margin-left: 24px; }
.rte-editor ul ul { list-style-type: circle; }
.rte-editor ul ul ul { list-style-type: square; }
.rte-editor ol { list-style-type: decimal; margin-left: 24px; }
.rte-editor ol ol { list-style-type: lower-alpha; }
.rte-editor ol ol ol { list-style-type: lower-roman; }
.rte-editor .abc-list { list-style-type: lower-alpha; }
.rte-editor .abc-list .abc-list { list-style-type: lower-roman; }
.rte-editor h1 { font-size: 2rem; font-weight: bold; margin: 0.67em 0; }
.rte-editor h2 { font-size: 1.5rem; font-weight: bold; margin: 0.83em 0; }
.rte-editor h3 { font-size: 1.17rem; font-weight: bold; margin: 1em 0; }
.rte-editor h4 { font-size: 1rem; font-weight: bold; margin: 1.33em 0; }
.rte-editor h5 { font-size: 0.83rem; font-weight: bold; margin: 1.67em 0; }
.rte-editor h6 { font-size: 0.67rem; font-weight: bold; margin: 2.33em 0; }
.rte-editor p { margin: 1em 0; }
.rte-editor blockquote { border-left: 4px solid #3b82f6; margin: 1em 0; padding-left: 16px; color: #d1d5db; }
.rte-editor pre { font-family: monospace; background: #1f2937; padding: 8px; border-radius: 4px; margin: 1em 0; white-space: pre-wrap; }
.rte-output { background: #222; color: #fff; border: 1px solid #333; border-radius: 6px; padding: 8px; margin-top: 12px; }
        `;
        document.head.appendChild(style);
    }

    _bindEvents() {
        this.toolbar.addEventListener('mousedown', e => {
            if (e.target.tagName === 'BUTTON') e.preventDefault();
        });

        this.toolbar.addEventListener('click', e => {
            const btn = e.target.closest('button,select');
            if (!btn) return;
            const cmd = btn.dataset.cmd;
            switch (cmd) {
                case 'undo':
                    this._exec('undo');
                    break;
                case 'redo':
                    this._exec('redo');
                    break;
                case 'bold':
                    this._exec('bold');
                    break;
                case 'italic':
                    this._exec('italic');
                    break;
                case 'heading':
                    this._exec('formatBlock', 'H2');
                    break;
                case 'indent':
                    this._indentList();
                    break;
                case 'outdent':
                    this._exec('outdent');
                    break;
                case 'ul':
                    this._exec('insertUnorderedList');
                    break;
                case 'ol':
                    this._exec('insertOrderedList');
                    break;
                case 'abc':
                    this._insertAbcList();
                    break;
                case 'link':
                    this._insertLink();
                    break;
                case 'unlink':
                    this._exec('unlink');
                    break;
                case 'justifyLeft':
                    this._exec('justifyLeft');
                    break;
                case 'justifyCenter':
                    this._exec('justifyCenter');
                    break;
                case 'justifyRight':
                    this._exec('justifyRight');
                    break;
                case 'color':
                    this._setColor(btn.dataset.color);
                    break;
                default:
                    break;
            }
            this._updateToolbarStates();
        });

        this.toolbar.querySelector('select[data-cmd="blockFormat"]') ? this.toolbar.querySelector('select[data-cmd="blockFormat"]').addEventListener('change', e => {
            this._exec('formatBlock', e.target.value);
            this._updateToolbarStates();
        }) : null;

        this.editor.addEventListener('input', () => this._updateToolbarStates());
        this.editor.addEventListener('click', () => this._updateToolbarStates());
        document.addEventListener('selectionchange', () => {
            if (document.activeElement === this.editor) this._updateToolbarStates();
        });
    }

    _exec(cmd, value = null) {
        this.editor.focus();
        document.execCommand(cmd, false, value);
    }

    _setColor(color) {
        this._exec('foreColor', color);
    }

    _insertLink() {
        const url = prompt('Enter URL:');
        if (url) this._exec('createLink', url);
    }

    _insertAbcList() {
        this._exec('insertOrderedList');
        setTimeout(() => {
            this.editor.querySelectorAll('ol:not(.abc-list)').forEach(list => list.classList.add('abc-list'));
        }, 0);
    }

    _indentList() {
        const sel = window.getSelection();
        if (!sel.rangeCount) return;
        let node = sel.getRangeAt(0).startContainer;
        if (node.nodeType !== 1) node = node.parentElement;
        const li = node.closest('li');
        if (li) {
            const parentList = li.closest('ul, ol, .abc-list');
            const listType = parentList.tagName.toLowerCase() === 'ul' ? 'ul' : 'ol';
            const isAbc = parentList.classList.contains('abc-list');
            const newList = document.createElement(listType);
            if (isAbc) newList.classList.add('abc-list');
            const newLi = document.createElement('li');
            newLi.innerHTML = '<br>';
            newList.appendChild(newLi);
            li.appendChild(newList);
            // Move cursor
            const range = document.createRange();
            range.selectNodeContents(newLi);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        } else {
            this._exec('indent');
        }
    }

    _updateToolbarStates() {
        // Update active state for buttons
        const states = [
            { cmd: 'bold', selector: '[data-cmd="bold"]' },
            { cmd: 'italic', selector: '[data-cmd="italic"]' },
            { cmd: 'justifyLeft', selector: '[data-cmd="justifyLeft"]' },
            { cmd: 'justifyCenter', selector: '[data-cmd="justifyCenter"]' },
            { cmd: 'justifyRight', selector: '[data-cmd="justifyRight"]' },
            { cmd: 'insertUnorderedList', selector: '[data-cmd="ul"]' },
            { cmd: 'insertOrderedList', selector: '[data-cmd="ol"]' }
        ];
        states.forEach(({ cmd, selector }) => {
            const btn = this.toolbar.querySelector(selector);
            if (btn) btn.classList.toggle('active', document.queryCommandState(cmd));
        });

        // ABC list special
        const abcBtn = this.toolbar.querySelector('[data-cmd="abc"]');
        if (abcBtn) {
            const sel = window.getSelection();
            let node = sel.rangeCount ? sel.getRangeAt(0).startContainer : null;
            if (node && node.nodeType !== 1) node = node.parentElement;
            const isAbc = node && node.closest('.abc-list');
            abcBtn.classList.toggle('active', isAbc && document.queryCommandState('insertOrderedList'));
        }

        // Block format select
        const select = this.toolbar.querySelector('select[data-cmd="blockFormat"]');
        if (select) {
            const sel = window.getSelection();
            let node = sel.rangeCount ? sel.getRangeAt(0).startContainer : null;
            if (node && node.nodeType !== 1) node = node.parentElement;
            const block = node && node.closest('p,h1,h2,h3,h4,h5,h6,blockquote,pre');
            select.value = block ? block.tagName : 'P';
        }
    }

    getHTML() {
        return this.editor.innerHTML;
    }

    setHTML(html) {
        this.editor.innerHTML = html;
    }

    showOutput() {
        this.output.style.display = '';
        this.output.textContent = this.getHTML();
    }

    hideOutput() {
        this.output.style.display = 'none';
    }
}