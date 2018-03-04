# tomcat-notify
This is a simple package to reduce general Tomcat output to only what metters for you.

Its behavior is based on some rules `./src/Rules.js`, from color logging in console to desktop notification.

All your configurations are stored in the config file `~/config/configstore/@dellamina/tomcat-notify/config.json` .

### Installation
You can install this package with `npm install -g` and then you can run `tomcat-notify` from everywhere on your pc or you can simply use `node index.js` from the installation directory.

To remove just run `npm uninstall -g @dellamina/tomcat-notify` .


### Usage 

```
  Usage: index [options] [command]


  Options:

    -v, --version  output the version number
    -h, --help     output usage information


  Commands:

    add   Configure a new tomcat.
    rm    Remove an available tomcat.
    list  List all available tomcat.
    run   Run a specific tomcat.
    *     Catch all.
```
