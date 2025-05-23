// const RTEButtons = new TextEditorButtons(document.getElementById("editor"))

// let undoButton = RTEButtons.undoButton(document.getElementById("undo"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let redoButton = RTEButtons.redoButton(document.getElementById("redo"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let indentLeftButton = RTEButtons.indentLeftButton(document.getElementById("indent-left"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[22px] leading-[22px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[22px] leading-[22px]")
// let indentRightButton = RTEButtons.indentRightButton(document.getElementById("indent-right"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[22px] leading-[22px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[22px] leading-[22px]")
// let textStyleButton = RTEButtons.textStypeButton(document.getElementById("text-style"), "10px 20px", "cursor-pointer bg-gray-200 rounded-[8px] text-[16px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[16px]")
// let boldButton = RTEButtons.boldButton(document.getElementById("bold"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[16px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[16px]")
// let italicButton = RTEButtons.italicButton(document.getElementById("italic"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let underlineButton = RTEButtons.underlineButton(document.getElementById("underline"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[16px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[16px]")
// let anchorButton = RTEButtons.anchorButton(document.getElementById("anchor"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[16px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[16px]")
// let removeAnchorButton = RTEButtons.removeAnchorButton(document.getElementById("remove-anchor"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let pointListButton = RTEButtons.pointListButton(document.getElementById("point-list"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let numListButton = RTEButtons.numListButton(document.getElementById("num-list"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let alphaListButton = RTEButtons.alphaListButton(document.getElementById("alpha-list"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let alignLeftButton = RTEButtons.alignLeftButton(document.getElementById("aligh-left"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let alignCenterButton = RTEButtons.alignCenterButton(document.getElementById("align-center"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let alignRightButton = RTEButtons.alignRightButton(document.getElementById("align-right"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px] text-[18px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px] text-[18px]")
// let textColorButton = RTEButtons.textColorButton(document.getElementById("text-color"), "py-[10px] px-[20px] cursor-pointer bg-gray-200 rounded-[8px]", "py-[10px] px-[20px] cursor-pointer bg-white rounded-[8px]")

// RTEButtons.initEditor()

let a = new RTE(document.getElementById("editor"), {
    undoButton: document.getElementById("undo"),
    redoButton: document.getElementById("redo"),
    indentLeftButton: document.getElementById("indent-left"),
    indentRightButton: document.getElementById("indent-right"),
    textStyleButton: document.getElementById("text-style"),
    boldButton: document.getElementById("bold"),
    italicButton: document.getElementById("italic"),
    underlineButton: document.getElementById("underline"),
    anchorButton: document.getElementById("anchor"),
    removeAnchorButton: document.getElementById("remove-anchor"),
    pointListButton: document.getElementById("point-list"),
    numListButton: document.getElementById("num-list"),
    alphaListButton: document.getElementById("alpha-list"),
    alignLeftButton: document.getElementById("align-left"),
    alignCenterButton: document.getElementById("align-center"),
    alignRightButton: document.getElementById("align-right"),
    textColorButton: document.getElementById("text-color")
})

// a.setHTML("<h1>Title</h1><p>Paragraph</p><ul><li>List item 1</li><li>List item 2</li></ul>")