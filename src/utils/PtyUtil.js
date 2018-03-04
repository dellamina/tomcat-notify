var os = require('os');
var pty = require('node-pty');
var shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';

module.exports = {
    /**
     * Create un nuovo processo cpn pty spawn per poi andare a leggerne l'output
     */
    getProcess: () => {
        return pty.spawn(shell, [], {
            name: 'xterm-color',
            cols: 80,
            rows: 30,
            cwd: process.env.HOME,
            env: process.env
        });
    }
};
