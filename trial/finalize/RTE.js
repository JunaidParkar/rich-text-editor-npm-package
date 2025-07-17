class RTE {
    constructor(container, accentColor, secondaryColor, textAccentColor, textPrimaryColor) {
        this.__container = container;
        this.__accentColor = accentColor;
        this.__secondaryColor = secondaryColor;
        this.__textAccentColor = textAccentColor;
        this.__textPrimaryColor = textPrimaryColor;
        this.__timeOuts = []
        this.__eventListeners = []
        this.__timeIntervals = []
        this.__editor = null
        this.__buttons = {}

    }

    init() {
        // container
        this.__container.style.background = this.__secondaryColor;
        this.__container.style.borderRadius = "8px";
        this.__container.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        this.__container.style.overflow = "hidden";
        // toolbar
        this.__toolBarSection = document.createElement("div");
        this.__toolBarSection.style.width = "100%";
        this.__toolBarSection.style.display = "flex";
        this.__toolBarSection.style.alignItems = "center";
        this.__toolBarSection.style.flexWrap = "wrap";
        this.__toolBarSection.style.gap = "8px";
        this.__toolBarSection.style.overflowX = "hidden";
        this.__toolBarSection.style.background = this.__textPrimaryColor
        this.__toolBarSection.style.padding = "8px 16px";
        // toolbar buttons
        let buttonToAdd = [
            ["undo", "↶"],
            ["redo", "↷"],
            ["bold", "B"],
            ["italic", "I"],
            ["underline", "U"],
            ["strikeThrough", "S"],
            ["fontSize", "A"],
            ["textStyle", "T"],
            ["subscript", "X"],
            ["superscript", "X"],
            ["textColor", "T"],
            ["highlight", "H"],
            ["indent", "→"],
            ["outdent", "←"],
            ["orderedList", "1.  List"],
            ["unorderedList", "•  List"],
            ["alignLeft", "⇤"],
            ["alignCenter", "↔"],
            ["alignRight", "⇥"],
            ["alignJustify", "⇔"],
            ["link", "🔗"],
            ["unlink", "⛓️‍💥"],
            ["horizontalLine", "─"]
        ];
        buttonToAdd.forEach(([type, text]) => {
                this.__toolBarSection.appendChild(this.__buttonCreator(type, text));
            })
            // editor
        this.__editor = document.createElement("div");
        this.__editor.contentEditable = true
        this.__editor.style.width = "100%";
        this.__editor.style.minHeight = "200px";
        this.__editor.style.padding = "16px";
        this.__editor.style.fontSize = "16px";
        this.__editor.style.background = "transparent";
        this.__editor.style.color = this.__textPrimaryColor
        this.__editor.style.outline = "none"
        this.__container.appendChild(this.__toolBarSection);
        this.__container.appendChild(this.__editor);
    }

    __buttonCreator(type, innerText) {
        let button = document.createElement("div");
        button.style.background = this.__textAccentColor;
        button.style.color = this.__secondaryColor;
        button.style.height = "40px";
        button.style.display = "flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.border = "none";
        button.style.borderRadius = "4px";
        button.style.padding = "8px 16px";
        button.style.cursor = "pointer";
        button.style.fontSize = "14px";
        button.style.fontWeight = "500";
        if (type === "fontSize") {
            let sty = document.createElement("style");
            sty.innerHTML = `
            #ns::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }`
            button.appendChild(sty);
            let inp = document.createElement("input");
            inp.id = "ns"
            inp.type = "number";
            inp.style.width = "3ch";
            inp.style.outline = "none";
            inp.style.border = "none";
            inp.style.borderRadius = "4px";
            inp.style.background = "transparent"
            inp.value = 16;
            inp.style.color = this.__secondaryColor;
            inp.style.accentColor = this.__accentColor;
            button.appendChild(inp);
            this.__buttons[type] = button;
            return button;
        }
        if (type === "textStyle") {
            let select = document.createElement("select")
            let options = [
                { value: "normal", text: "Normal" },
                { value: "h1", text: "Heading 1" },
                { value: "h2", text: "Heading 2" },
                { value: "h3", text: "Heading 3" },
                { value: "h4", text: "Heading 4" },
                { value: "h5", text: "Heading 5" },
                { value: "h6", text: "Heading 6" },
                { value: "blockquote", text: "Blockquote" },
                { value: "pre", text: "Code" },
            ]
            options.forEach(option => {
                let opt = document.createElement("option");
                opt.value = option.value;
                opt.innerText = option.text;
                opt.style.background = this.__secondaryColor;
                opt.style.color = this.__textPrimaryColor;
                select.appendChild(opt);
            })
            select.style.width = "100%";
            select.style.outline = "none";
            select.style.border = "none";
            select.style.borderRadius = "4px";
            select.style.background = "transparent"
            select.style.color = this.__secondaryColor;
            select.style.accentColor = this.__accentColor;
            select.style.fontSize = "14px";
            select.style.fontWeight = "500";
            select.style.cursor = "pointer";
            button.appendChild(select);
            this.__buttons[type] = button;
            return button;
        }
        if (type === "textColor") {
            let inp = document.createElement("input");
            inp.type = "color";
            inp.style.width = "50px";
            inp.style.height = "20px"
            inp.style.outline = "none";
            inp.style.border = "none";
            inp.style.borderRadius = "4px";
            inp.style.background = "transparent"
            inp.value = this.__accentColor;
            inp.style.color = this.__secondaryColor;
            inp.style.accentColor = this.__accentColor;
            let p = document.createElement("p");
            p.innerText = innerText
            p.style.color = inp.value
            button.style.gap = "8px";
            button.appendChild(p);
            button.appendChild(inp);
            this.__buttons[type] = button;
            return button;
        }
        if (type === "highlight") {
            let inp = document.createElement("input");
            inp.type = "color";
            inp.style.width = "50px";
            inp.style.height = "20px"
            inp.style.outline = "none";
            inp.style.border = "none";
            inp.style.borderRadius = "4px";
            inp.style.background = "transparent"
            inp.value = this.__accentColor;
            inp.style.color = this.__secondaryColor;
            inp.style.accentColor = this.__accentColor;
            let p = document.createElement("p");
            p.innerText = innerText
            p.style.background = inp.value
            p.style.padding = "0 5px"
            p.style.color = this.__textAccentColor
            p.style.borderRadius = "4px";
            p.style.fontSize = "14px";
            p.style.lineHeight = "1.5";
            button.style.gap = "8px";
            button.appendChild(p);
            button.appendChild(inp);
            this.__buttons[type] = button;
            return button;
        }
        let p = document.createElement("p");
        if (type === "subscript") {
            let sub = document.createElement("sub");
            sub.innerText = 0
            p.innerText = innerText
            p.appendChild(sub);
            button.appendChild(p);
            this.__buttons[type] = button;
            return button;
        }
        if (type === "superscript") {
            let sup = document.createElement("sup");
            sup.innerText = 0
            p.innerText = innerText
            p.appendChild(sup);
            button.appendChild(p);
            this.__buttons[type] = button;
            return button;
        }
        p.innerText = innerText
        p.style.fontSize = "14px";
        p.style.lineHeight = "1.5";
        if (type === "strikeThrough") {
            p.style.textDecoration = "line-through";
        }
        if (type === "bold") {
            p.style.fontWeight = "bold";
            this.__addEventListener(button, "click", () => {
                this.__wrapSelectionWithTag(type);
            }, false);
        }
        if (type === "italic") {
            p.style.fontStyle = "italic";
        }
        if (type === "underline") {
            p.style.textDecoration = "underline";
        }
        button.appendChild(p);
        this.__buttons[type] = button;
        return button;
    }

    __wrapSelectionWithTag(type) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        let tag;
        switch (type) {
            case "bold":
                console.log("bold")
                tag = "b";
                break;
            case "italic":
                tag = "i";
                break;
            case "underline":
                tag = "u";
                break;
            case "strikeThrough":
                tag = "s";
                break;
            default:
                tag = "span";
                return;
        }
        const wrapper = document.createElement(tag);
        wrapper.innerHTML = range.extractContents().textContent;
        range.insertNode(wrapper);
        console.log(range.extractContents())
        this.__editor.focus();
        selection.removeAllRanges();
        selection.addRange(range);
        this.__updateToolbarState();
    }

    __updateToolbarState() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const node = selection.focusNode ? selection.focusNode.parentNode : null;
        if (!node || !(node instanceof HTMLElement)) return;

        ["bold", "italic", "underline", "strikeThrough"].forEach(type => {
            const tagMap = {
                bold: "B",
                italic: "I",
                underline: "U",
                strikeThrough: "S"
            };
            let isActive = false;
            let el = node;
            while (el && el !== this.__editor) {
                if (el.nodeName === tagMap[type]) {
                    isActive = true;
                    break;
                }
                el = el.parentElement;
            }
            const btn = this.__buttons[type];
            if (btn) btn.style.background = isActive ? this.__accentColor : this.__textAccentColor;
        });
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

    dispose() {
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