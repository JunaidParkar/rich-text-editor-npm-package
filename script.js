const buttonList = {
  BOLD: "b",
  UNDERLINE: "ul",
  ITALIC: "i",
  UNORDERED_LIST: "ul",
  ORDERED_LIST: "ol",
  FONT_SIZE: "fs",
  FORMATS: "f",
  ALIGNMENTS: "al",
  ANCHOR: "a",
  IMAGE: "img"
}

class RichText {
  constructor(elem, mainBg="#f9fafb", buttonBG= "#e0e7ff", buttonBorder= "#c7d2fe", buttonClickBackground="#dbeafe", buttonClickBorder="#3b82f6", buttons=[]) {
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

  init() {
    this.container.style.backgroundColor = this.mainBG;

    // Toolbar styles
    this.toolbar.style.display = "flex";
    this.toolbar.style.gap = "10px";
    this.toolbar.style.width = "100%";
    this.toolbar.style.flexWrap = "wrap";
    this.toolbar.style.padding = "10px";

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