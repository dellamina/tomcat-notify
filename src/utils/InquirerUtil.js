/** Importiamo inquirer e registriamo il plugin per far scegliere una directory */
var inquirer = require('inquirer');
inquirer.registerPrompt('directory', require('inquirer-select-directory'));

const ConfigstoreUtil = require('./ConfigstoreUtil');

module.exports = {
    /**
     * Metodo inquirer per la creazione di un nuovo tomcat
     */
    askForNewTomcat: () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is this Tomcat identifier (you can use his version)?'
            },
            {
                type: 'directory',
                name: 'path',
                message: 'Where is your Tomcat located (DO NOT include bin folder)?',
                basePath: '/'
            }
        ]);
    },

    /**
     * Metodo inquirer per scegliere un tomcat dalla lista di quelli disponibili
     */
    askWhichTomcat: (conf) => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which Tomcat whould you like to use?',
                choices: ConfigstoreUtil.listTomcat().map(function(item) {
                    return item.name;
                })
            }
        ]);
    },

    /**
     * Metoddo inquirer per mostrare un confirm
     */
    askConfirm: (msg = 'You sure?') => {
        return inquirer.prompt([
            {
                type: 'confirm',
                name: 'flag',
                message: msg,
            }
        ]);
    }
};
