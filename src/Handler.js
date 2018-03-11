const NotifyUtil = require('./utils/NotifyUtil');
const TerminalUtil = require('./utils/TerminalUtil');

/**
 * Metodo che si occupa di andare a controllare eventuali match tra chunk e rules e agire di conseguenza
 */
var rules = require('./Rules');
var isPostStartup = false;

var tomcatConfig;
var commandOptions;
data = (line) => {
    var items = line.split("\n");
    items.forEach(data => {
        if (commandOptions.log == true) console.log(data);
        rules.forEach(key => {
            let idx = data.indexOf(key.check);
            if (idx > -1) {
                if(key.log != undefined && key.log != false) {
                    onLog(data, idx, key);
                }
                if(key.alert != undefined && key.alert != false) {
                    onAlert(data, idx, key);
                }
            }
        });
    });
};

/** Handler per messaggio ALERT */
onAlert = (data, idx, key) => {
    if(key.postStartup && !isPostStartup) return;
    isPostStartup = true;
    let msg = parse(data, idx, key);
    if(typeof key.alert === 'string' && data.indexOf(key.alert) == -1) {
        return;
    }
    NotifyUtil.default(msg);
}

/** Hangled per messaggio LOG */
onLog = (data, idx, key) => {
    if (!commandOptions.log) {
        let color = (typeof key.log === 'string') ? key.log : 'log';
        TerminalUtil[color](parse(data, idx, key));
    }
}

parse = (data, idx, key) => {
    return data.replace(tomcatConfig.path,'').replace(/.{1}webapp.{1}/, '~>').substring(idx + key.check.length).trim();
}


module.exports = {
    /**
     * Metodo principale che registra un listener per andare a leggere l'output del processo che viene lanciato direttamente all'interno del metodo stesso
     */
    process: (ptyProcess, tomcat, options) => {
        tomcatConfig = tomcat;
        commandOptions = options;

        ptyProcess.on('data', data);

        TerminalUtil.green('Starting tomcat: ' + tomcat.name);
        ptyProcess.write('cd ' + tomcat.path + '\\bin\r');
        ptyProcess.write('catalina run\r');
    }
};
