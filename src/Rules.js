/**
 * Array di regole usate nel filstrare i messaggi del Tomcat
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
        check: 'org.apache.catalina.startup.Catalina.start',
        lavel: 'ALERT'
    },
    {
        check: 'org.apache.catalina.startup.HostConfig.deployDirectory',
        lavel: 'LOG'
    },
    {
        check: 'org.apache.catalina.startup.HostConfig.deployWAR',
        lavel: 'ALERTPOST'
    },
    {
        check: 'org.apache.catalina.core.StandardContext.reload',
        lavel: 'ALERTPOST'
    }
];
