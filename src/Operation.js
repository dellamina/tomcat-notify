const opn = require('opn');

const InquirerUtil = require('./utils/InquirerUtil');
const ConfigstoreUtil = require('./utils/ConfigstoreUtil');
const TerminalUtil = require('./utils/TerminalUtil');
const PtyUtil = require('./utils/PtyUtil');

const Handler = require('./Handler');

module.exports = {
    run: async (options) => {
        let count = ConfigstoreUtil.countTomcat();
        if (count <= 0)
            return TerminalUtil.red('There are no tomcat configured!');

        let tomcat;
        if (count > 1) {
            let answers = await InquirerUtil.askWhichTomcat();
            tomcat = ConfigstoreUtil.getTomcatByName(answers.name);
        }
        else {
            tomcat = ConfigstoreUtil.listTomcat()[0];
        }
        Handler.process(PtyUtil.getProcess(), tomcat, options);
    },

    add: async () => {
        var answers = await InquirerUtil.askForNewTomcat();
        var confirm = await InquirerUtil.askConfirm();
        if (confirm.flag) {
            ConfigstoreUtil.addTomcat(answers);
            return TerminalUtil.green('Tomcat addedd successfully');
        }
        TerminalUtil.cyan('No changes applied.');
        return;
    },

    rm: async () => {
        if (!ConfigstoreUtil.hasTomcat())
            return TerminalUtil.red('There are no tomcat configured!');

        var answers = await InquirerUtil.askWhichTomcat();
        var confirm = await InquirerUtil.askConfirm();
        if (confirm.flag) {
            ConfigstoreUtil.rmTomcat(answers);
            return TerminalUtil.green('Tomcat deleted successfully');
        }
        TerminalUtil.cyan('No changes applied.');
        return;
    },

    list: async () => {
        if (!ConfigstoreUtil.hasTomcat())
            return TerminalUtil.red('There are no tomcat configured!');

        TerminalUtil.green('Tomcats available:');
        ConfigstoreUtil.listTomcat().forEach(function (item) {
            TerminalUtil.inline().red(item.name).cyan([' => ' + item.path]);
        });
        return;
    },

    open: async () => {
        let count = ConfigstoreUtil.countTomcat();
        if (count <= 0)
            return TerminalUtil.red('There are no tomcat configured!');

        let tomcat;
        if (count > 1) {
            let answers = await InquirerUtil.askWhichTomcat();
            tomcat = ConfigstoreUtil.getTomcatByName(answers.name);
        }
        else {
            tomcat = ConfigstoreUtil.listTomcat()[0];
        }
        return opn(tomcat.path);
    }
};
