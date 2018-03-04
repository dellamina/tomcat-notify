const notifier = require('node-notifier');
const path = require('path');

module.exports = {
    /**
     * Metodo per mostrare notifica growl like
     */
    default: (msg) => {
        notifier.notify({
            title: 'Tomcat Notify',
            message: msg,
            icon: path.join(__dirname, '..', 'imgs', 'Tomcat.png')
        });
    }
};
