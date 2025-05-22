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

    }

    init() {
        // container
        this.__container.style.background = this.__secondaryColor;
        this.__container.style.borderRadius = "8px";
        this.__container.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        this.__container.style.overflow = "hidden";
        // toolbar
        this.__toolBarSection = document.createElement("div");
        this.__toolBarSection.style.display = "flex";
        this.__toolBarSection.style.alignItems = "center";
        this.__toolBarSection.style.flexWrap = "wrap";
        this.__toolBarSection.style.gap = "8px";
        this.__toolBarSection.style.marginBottom = "16px";
        this.__toolBarSection.style.overflowX = "hidden";
        this.__toolBarSection.style.background = this.__textPrimaryColor
        this.__toolBarSection.style.padding = "8px 16px";
        // this.__toolBarSection.style.borderRadius = "2px";
        // toolbar buttons
        // this.__buttons = [this.__buttonCreator("bold", "B")]
        this.__toolBarSection.appendChild(this.__buttonCreator("undo", "↶"));
        this.__toolBarSection.appendChild(this.__buttonCreator("redo", "↷"));
        this.__toolBarSection.appendChild(this.__buttonCreator("bold", "B"));
        this.__toolBarSection.appendChild(this.__buttonCreator("italic", "I"));
        this.__toolBarSection.appendChild(this.__buttonCreator("underline", "U"));
        this.__toolBarSection.appendChild(this.__buttonCreator("strikeThrough", "S"));
        this.__toolBarSection.appendChild(this.__buttonCreator("fontSize", "A"));
        this.__toolBarSection.appendChild(this.__buttonCreator("textStyle", "T"));
        this.__toolBarSection.appendChild(this.__buttonCreator("subscript", "X"));
        this.__toolBarSection.appendChild(this.__buttonCreator("superscript", "X"));
        // editor
        this.__editor = document.createElement("div");
        this.__editor.contentEditable = true
        this.__editor.style.width = "100%";
        this.__editor.style.minHeight = "200px";
        this.__editor.style.padding = "16px";
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
            return button;
        }
        let p = document.createElement("p");
        if (type === "subscript") {
            let sub = document.createElement("sub");
            sub.innerText = 0
            p.innerText = innerText
            p.appendChild(sub);
            button.appendChild(p);
            return button;
        }
        if (type === "superscript") {
            let sup = document.createElement("sup");
            sup.innerText = 0
            p.innerText = innerText
            p.appendChild(sup);
            button.appendChild(p);
            return button;
        }
        p.innerText = innerText
        if (type === "strikeThrough") {
            p.style.textDecoration = "line-through";
        }
        if (type === "bold") {
            p.style.fontWeight = "bold";
        }
        if (type === "italic") {
            p.style.fontStyle = "italic";
        }
        if (type === "underline") {
            p.style.textDecoration = "underline";
        }
        button.appendChild(p);
        return button;
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
}