let editor_container = document.getElementById("editor-container");

let rte = new RTE(
    editor_container,
    "#FF5733", // accentColor
    "#C70039", // secondaryColor
    "#900C3F", // textAccentColor
    "#581845" // textPrimaryColor
);
rte.init();