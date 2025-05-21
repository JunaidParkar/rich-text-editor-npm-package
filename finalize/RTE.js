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
        this.__editor = document.createElement("div");
        this.__editor.contentEditable = true
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