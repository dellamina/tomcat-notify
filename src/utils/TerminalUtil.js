var term = require('terminal-kit').terminal;

var newLine = '\r\n';
var inLine = false;

var maybeNewLine = (args) => {
    if(!inLine)
        term(newLine);
    inLine = false;
};

TerminalUtil = {
    green: (...args) => {
        term.green(args);
        maybeNewLine();
    },

    cyan: (...args) => {
        term.cyan(args);
        maybeNewLine();
    },

    red: (...args) => {
        term.red(args);
        maybeNewLine();
    },

    blue: (...args) => {
        term.blue(args);
        maybeNewLine();
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
