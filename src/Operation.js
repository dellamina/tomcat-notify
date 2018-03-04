const InquirerUtil = require('./utils/InquirerUtil');
const ConfigstoreUtil = require('./utils/ConfigstoreUtil');
const TerminalUtil = require('./utils/TerminalUtil');
const PtyUtil = require('./utils/PtyUtil');

const Handler = require('./Handler');

module.exports = {
    run: async () => {
        if (!ConfigstoreUtil.hasTomcat())
            return TerminalUtil.red('There are no tomcat configured!');

        var answers = await InquirerUtil.askWhichTomcat();
        Handler.process(PtyUtil.getProcess(), ConfigstoreUtil.getTomcatByName(answers.name));
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
    }
};
