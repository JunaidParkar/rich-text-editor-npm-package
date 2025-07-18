const buttonList = {
  BOLD: "b",
  UNDERLINE: "u",
  ITALIC: "i",
  UNORDERED_LIST: "ul",
  ORDERED_LIST: "ol",
  FONT_SIZE: "fs",
  FORMATS: "f",
  ALIGNMENTS: "al",
  ANCHOR: "a",
  IMAGE: "img",
  TEXT_COLOR: "tc",
  HIGHLIGHT: "h"
}

class RichText {
  constructor(elem, mainBg="#f9fafb", buttonBG= "#e0e7ff", buttonBorder= "#c7d2fe", buttonClickBackground="#dbeafe", buttonClickBorder="#3b82f6", buttons=[buttonList.BOLD, buttonList.UNDERLINE, buttonList.ITALIC, buttonList.ANCHOR]) {
    this.container = elem;
    this.buttons = buttons;
    this.mainBG = mainBg;
    this.buttonBG = buttonBG;
    this.buttonClickBG = buttonClickBackground;
    this.buttonBorder = buttonBorder;
    this.buttonClickBorder = buttonClickBorder;

    this.toolbar = document.createElement("div");
    this.editor = document.createElement("div");
  }
  
  buttonCreator(btn) {
    let div = document.createElement("div")
    div.style.padding = "10px 15px"
    div.style.background = this.buttonBG
    div.style.border = `1px solid ${this.buttonBorder}`
    if (btn === buttonList.BOLD || btn === buttonList.ITALIC || btn === buttonList.UNDERLINE || btn === buttonList.ANCHOR) {
      let b = document.createElement(btn)
      b.innerText = btn
      div.appendChild(b)
    }
    this.toolbar.appendChild(div)
  }

  init() {
    this.container.style.backgroundColor = this.mainBG;

    // Toolbar styles
    this.toolbar.style.display = "flex";
    this.toolbar.style.gap = "10px";
    this.toolbar.style.width = "100%";
    this.toolbar.style.flexWrap = "wrap";
    this.toolbar.style.padding = "10px 0";
    
    // Adding buttons
    console.log(this.buttons)
    this.buttons.forEach((btn) => {
      this.buttonCreator(btn)
    })

    // Editor styles
    this.editor.style.width = "100%";
    this.editor.style.minHeight = "200px";
    this.editor.style.padding = "10px";
    this.editor.style.border = `1px solid ${this.buttonBorder}`;
    this.editor.contentEditable = true;

    this.container.appendChild(this.toolbar);
    this.container.appendChild(this.editor);
  }
}

const a = new RichText(elem=document.getElementById("rte"))
a.init()