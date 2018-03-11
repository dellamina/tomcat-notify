const notifier = require('node-notifier');
const path = require('path');
const stripAnsi = require('strip-ansi');

module.exports = {
    /**
     * Metodo per mostrare notifica growl like
     */
    default: (msg) => {
        notifier.notify({
            title: 'Tomcat Notify',
            message: stripAnsi(msg),
            icon: path.join(__dirname, '..', 'imgs', 'Tomcat.png')
        });
    }
};
