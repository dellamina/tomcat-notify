/**
 * Array di regole usate nel filstrare i messaggi del Tomcat
 *
 * ```
 * check: viene controllato l'indexOf sul chunk di risposta, se > di -1
 * lavel:
 *      ALERT: mostra alert di windows
 *      LOG: log in console
 *      ALERTPOST: comportamento misto, all'avvio fa il LOG e le volte successive l'ALERT
 * parse: fn di parse del chunk che deve resituire il msg da usare poi nei vari tipo di notifiche
 * ```
 */
module.exports = [
    {
        check: 'Server startup in',
        lavel: 'ALERT',
        parse: function (that, data, idx) {
            let to = 'ms';
            return data.substring(idx, data.lastIndexOf(to) + to.length);
        }
    },
    {
        check: 'Deploying web application directory',
        lavel: 'LOG',
        parse: function (that, data, idx) {
            let to1 = 'webapps\\',
                to2 = ']';
            data = data.substring(idx + that.check.length, data.length);
            return that.check + ' [' + data.substring(data.indexOf(to1) + to1.length, data.indexOf(to2)) + ']';
        }
    },
    {
        check: 'Deployment of web application archive',
        lavel: 'ALERTPOST',
        parse: function (that, data, idx) {
            let to1 = 'webapps\\',
                to2 = ']',
                to3 = 'has finished in',
                to4 = 'ms';
            data = data.substring(idx + that.check.length, data.length);
            return that.check + ' [' + data.substring(data.indexOf(to1) + to1.length, data.indexOf(to2)) + '] ' + data.substring(data.indexOf(to3), data.indexOf(to4) + to4.length);
        }
    }
];
