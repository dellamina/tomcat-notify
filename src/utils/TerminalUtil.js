var term = require('terminal-kit').terminal;

var newLine = '\r\n';
var inLine = false;

var maybeNewLine = (args) => {
    if(!inLine)
        term(newLine);
    inLine = false;
    return TerminalUtil;
};

TerminalUtil = {
    green: (...args) => {
        term.green(args);
        return maybeNewLine();
    },

    cyan: (...args) => {
        term.cyan(args);
        return maybeNewLine();
    },

    red: (...args) => {
        term.red(args);
        return maybeNewLine();
    },

    blue: (...args) => {
        term.blue(args);
        return maybeNewLine();
    },

    log: (...args) => {
        term(args);
        return maybeNewLine();
    },

    /**
     * Metodo per disattivare il newLine sulla chiamata successiva
     */
    inline: () => {
        inLine = true;
        return TerminalUtil;
    }
};

module.exports = TerminalUtil;
