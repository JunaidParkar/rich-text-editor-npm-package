let editor_container = document.getElementById("editor-container");

let rte = new RTE(
    editor_container,
    "#FF4D8D", // accentColor
    "#FFF1F4", // secondaryColor
    "#1F2937", // textAccentColor
    "#4B5563" // textPrimaryColor
);
rte.init();