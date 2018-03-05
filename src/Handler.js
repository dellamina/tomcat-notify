const NotifyUtil = require('./utils/NotifyUtil');
const TerminalUtil = require('./utils/TerminalUtil');

// FUTURE: gestire la necessità di loggare tutto in console andando magari solo a colorare i vari output
var isPostStartup = false;
/**
 * Metodo che si occupa di andare a controllare eventuali match tra chunk e rules e agire di conseguenza
 */
var logAll = false;
var rules = require('./Rules');
data = (line) => {
    var items = line.split("\n");
    items.forEach(data => {
        if (logAll) console.log(data);
        rules.forEach(key => {
            let idx = data.indexOf(key.check);
            if (idx > -1) {
                if (key.lavel == 'ALERT' || (key.lavel == 'ALERTPOST' && isPostStartup))
                    return onAlert(data, idx, key);
                if (key.lavel == 'LOG' || key.lavel == 'ALERTPOST')
                    return onLog(data, idx, key);
                else
                    return onOther(data, idx, key);
            }
        });
    });
};

/** Handler per messaggio ALERT */
onAlert = (data, idx, key) => {
    isPostStartup = true;
    let msg = parse(data, idx, key);
    if (!logAll) TerminalUtil.green(msg);
    NotifyUtil.default(msg);
};

/** Hangled per messaggio LOG */
onLog = (data, idx, key) => {
    if (!logAll) TerminalUtil.log(parse(data, idx, key));
};

/** Handler per messaggi di ERRORE */
onOther = (data, idx, key) => {
    if (!logAll) TerminalUtil.red('begin::ERROR\r\n' + data + 'end::ERROR\r\n');
};

parse = (data, idx, key) => {
    return data.substring(idx + key.check.length).trim();
}

module.exports = {
    /**
     * Metodo principale che registra un listener per andare a leggere l'output del processo che viene lanciato direttamente all'interno del metodo stesso
     */
    process: (ptyProcess, tomcat) => {
        ptyProcess.on('data', data);

        TerminalUtil.green('Starting tomcat: ' + tomcat.name);
        ptyProcess.write('cd ' + tomcat.path + '\\bin\r');
        ptyProcess.write('catalina.bat run\r');
    }
};
