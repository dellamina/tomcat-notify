const NotifyUtil = require('./utils/NotifyUtil');
const TerminalUtil = require('./utils/TerminalUtil');

// FUTURE: gestire la necessità di loggare tutto in console andando magari solo a colorare i vari output
var isPostStartup = false;
/**
 * Metodo che si occupa di andare a controllare eventuali match tra chunk e rules e agire di conseguenza
 */
data = (data) => {
    var rules = require('./Rules');
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
};

/** Handler per messaggio ALERT */
onAlert = (data, idx, key) => {
    isPostStartup = true;
    let msg = key.parse(key, data, idx);
    TerminalUtil.green(msg);
    NotifyUtil.default(msg);
};

/** Hangled per messaggio LOG */
onLog = (data, idx, key) => {
    TerminalUtil.blue(key.parse(key, data, idx))
};

/** Handler per messaggi di ERRORE */
onOther = (data, idx, key) => {
    TerminalUtil.red('begin::ERROR\r\n' + data + 'end::ERROR\r\n');
};

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
