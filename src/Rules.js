/**
 * Array di regole usate nel filtrare i messaggi del Tomcat
 *
 * ```
 * check: viene controllato l'indexOf sul chunk di risposta, se > di -1
 * lavel:
 *      ALERT: mostra alert di windows
 *      LOG: log in console
 *      ALERTPOST: comportamento misto, all'avvio fa il LOG e le volte successive l'ALERT
 * ```
 */
module.exports = [
    {
        check: 'TN::',
        log: true
    },
    {
        check: 'org.apache.catalina.startup.Catalina.start',
        log: true,
        alert: true
    },
    {
        check: 'org.apache.catalina.startup.HostConfig.deployDirectory',
        log: 'green'
    },
    {
        check: 'org.apache.catalina.startup.HostConfig.deployWAR',
        log: 'green',
        alert: ['finished', 'completed'],
        postStartup: true
    },
    {
        check: 'org.apache.catalina.core.StandardContext.reload',
        log: 'green',
        alert: ['finished', 'completed'],
        postStartup: true
    }
];
