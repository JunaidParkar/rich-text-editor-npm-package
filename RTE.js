class TextEditor {
    constructor(input) {
        this.__input = input
    }

    __init() {
        this.__input.style.outline = "none"
        this.__input.style.innerHTML = ""
        this.__input.contentEditable = true
        this.__input.spellCheck = true
        this.__eventListeners = []
        this.__timeOuts = []
        this.__timeIntervals = []
    }
}

class TextEditorButtons extends TextEditor {

    constructor(input) {
        super(input)
        this.__init()
    }


    redoButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "↷"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Redo',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    undoButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "↶"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Undo',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    indentRightButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "→"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Indent Right',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    indentLeftButton(elem, className, activeClassName) {
        const t = document.createElement("h1")
        t.innerText = "←"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Indent Left',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
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



        return {
            label: 'Text Style',
            class: className,
            activeClass: activeClassName,
            element: elem,
        }
    }

    boldButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "B"
        t.style.fontWeight = "bold"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Bold',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    italicButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "I"
        t.style.fontStyle = "italic"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Italic',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    underlineButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "U"
        t.style.textDecoration = "underline"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Underline',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    anchorButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "🔗"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Anchor',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    removeAnchorButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "⛓️‍💥"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Remove Anchor',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    pointListButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "• List"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Point List',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    numListButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "1. List"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Numbered List',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    alphaListButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "a. List"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Alpha List',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    alignLeftButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "⇤"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Align Left',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    alignCenterButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "↔"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Align Center',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    alignRightButton(elem, className, activeClassName) {
        const t = document.createElement("p")
        t.innerText = "⇥"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Align Right',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

    textColorButton(elem, className, activeClassName) {
        const t = document.createElement("input")
        t.type = "color"
        elem.innerHTML = ""
        elem.appendChild(t)
        elem.className = ""
        elem.classList.add(...className.split(" "))
        return {
            label: 'Text Color',
            class: className,
            activeClass: activeClassName,
            element: elem
        }
    }

}