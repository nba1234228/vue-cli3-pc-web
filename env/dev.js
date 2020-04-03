module.exports = {
    mode: 'dev',
    homePagePath: '/home/home/Home',
    apiPrefixUrl: '/api',
    responseCodeName: 'retCode',
    responseMsgName: 'retMsg',
    successCode: 0,
    noLoginCode: 701,
    noPermissionCode: 401,
    authResourceUrl: '/auth',
    userInfoUrl: '/oa/getUserInfo',
    logoutUrl: '/oa/logout',
    diffText: '(dev)',
    host: '0.0.0.0',
    port: 8011,
    proxy: {
        '/api': {
            target: 'http://localhost:9000',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
};
