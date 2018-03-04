const Configstore = require('configstore');
const pkg = require('../../package.json');

const TOMCAT_CONFIG_KEY = 'tomcat';

var conf = new Configstore(pkg.name);

module.exports = {
    /**
     * Ritorna un Configstore, serve per storare e recuperare la conf dell'applicativo senza dover andare a scrivere a mano sui JSON
     */
    getConfigstore: () => {
        return conf;
    },

    /**
     * Metodo per andare a storare un nuovo tomcat
     * TODO: gestire univocità nome
     */
    addTomcat: (tomcat) => {
        var tomcatArray = conf.get(TOMCAT_CONFIG_KEY);
        if(tomcatArray === undefined)
            tomcatArray = [tomcat];
        else
            tomcatArray.push(tomcat);
        conf.set('tomcat', tomcatArray);
    },

    /**
     * Metodo per andare a rimuovere un tomcat
     */
    rmTomcat: (tomcat) => {
        var tomcatArray = conf.get(TOMCAT_CONFIG_KEY);
        tomcatArray = tomcatArray.filter(function(item) {
            if (item.name !== tomcat.name)
                return item;
        });
        conf.set('tomcat', tomcatArray);
    },

    /**
     * Metodo per andare a recuperare un tomcat dal suo nome
     */
    getTomcatByName: (name) => {
        var tomcatArray = conf.get(TOMCAT_CONFIG_KEY);
        tomcatArray = tomcatArray.filter(function(item) {
            return (item.name === name);
        });
        if (tomcatArray !== undefined) {
            return tomcatArray[0]
        }
        throw new Error('Tomcat not found!');
    },

    /**
     * Metodo per andare a controllare se ci sono conf salvate
     */
    hasTomcat: () => {
        return (conf.has(TOMCAT_CONFIG_KEY) && conf.get(TOMCAT_CONFIG_KEY) !== undefined && conf.get(TOMCAT_CONFIG_KEY).length > 0);
    },

    /**
     * Metodo per andare a leggere le conf salvate
     */
    listTomcat: () => {
        return conf.get(TOMCAT_CONFIG_KEY);
    }
};
