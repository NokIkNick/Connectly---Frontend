"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebpackDevServer = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const makeWebpackConfig_1 = require("./makeWebpackConfig");
const debug = (0, debug_1.default)('cypress:webpack-dev-server:start');
async function createWebpackDevServer(config) {
    const { sourceWebpackModulesResult: { webpack: { module: webpack, }, webpackDevServer: { majorVersion: webpackDevServerMajorVersion, }, }, } = config;
    const finalWebpackConfig = await (0, makeWebpackConfig_1.makeWebpackConfig)(config);
    const webpackCompiler = webpack(finalWebpackConfig);
    if (webpackDevServerMajorVersion === 5) {
        debug('using webpack-dev-server v5');
        return webpackDevServer5(config, webpackCompiler, finalWebpackConfig);
    }
    if (webpackDevServerMajorVersion === 4) {
        debug('using webpack-dev-server v4');
        return webpackDevServer4(config, webpackCompiler, finalWebpackConfig);
    }
    if (webpackDevServerMajorVersion === 3) {
        debug('using webpack-dev-server v3');
        return webpackDevServer3(config, webpackCompiler, finalWebpackConfig);
    }
    throw new Error(`Unsupported webpackDevServer version ${webpackDevServerMajorVersion}`);
}
exports.createWebpackDevServer = createWebpackDevServer;
function webpackDevServer5(config, compiler, finalWebpackConfig) {
    var _a;
    const { devServerConfig: { cypressConfig: { devServerPublicPathRoute } } } = config;
    const isOpenMode = !config.devServerConfig.cypressConfig.isTextTerminal;
    const WebpackDevServer = config.sourceWebpackModulesResult.webpackDevServer.module;
    const webpackDevServerConfig = Object.assign(Object.assign({ host: '127.0.0.1', port: 'auto' }, finalWebpackConfig === null || finalWebpackConfig === void 0 ? void 0 : finalWebpackConfig.devServer), { devMiddleware: {
            publicPath: devServerPublicPathRoute,
            stats: (_a = finalWebpackConfig.stats) !== null && _a !== void 0 ? _a : 'minimal',
        }, hot: false, 
        // Only enable file watching & reload when executing tests in `open` mode
        liveReload: isOpenMode });
    debug(WebpackDevServer);
    debug(webpackDevServerConfig);
    const server = new WebpackDevServer(webpackDevServerConfig, compiler);
    debug(server);
    return {
        server,
        compiler,
    };
}
function webpackDevServer4(config, compiler, finalWebpackConfig) {
    var _a;
    const { devServerConfig: { cypressConfig: { devServerPublicPathRoute } } } = config;
    const isOpenMode = !config.devServerConfig.cypressConfig.isTextTerminal;
    const WebpackDevServer = config.sourceWebpackModulesResult.webpackDevServer.module;
    const webpackDevServerConfig = Object.assign(Object.assign({ host: '127.0.0.1', port: 'auto' }, finalWebpackConfig === null || finalWebpackConfig === void 0 ? void 0 : finalWebpackConfig.devServer), { devMiddleware: {
            publicPath: devServerPublicPathRoute,
            stats: (_a = finalWebpackConfig.stats) !== null && _a !== void 0 ? _a : 'minimal',
        }, hot: false, 
        // Only enable file watching & reload when executing tests in `open` mode
        liveReload: isOpenMode });
    const server = new WebpackDevServer(webpackDevServerConfig, compiler);
    return {
        server,
        compiler,
    };
}
function webpackDevServer3(config, compiler, finalWebpackConfig) {
    var _a, _b;
    const { devServerConfig: { cypressConfig: { devServerPublicPathRoute } } } = config;
    const isOpenMode = !config.devServerConfig.cypressConfig.isTextTerminal;
    const WebpackDevServer = config.sourceWebpackModulesResult.webpackDevServer.module;
    const webpackDevServerConfig = Object.assign(Object.assign({}, (_a = finalWebpackConfig.devServer) !== null && _a !== void 0 ? _a : {}), { hot: false, 
        // @ts-ignore ignore webpack-dev-server v3 type errors
        inline: false, publicPath: devServerPublicPathRoute, noInfo: false, stats: (_b = finalWebpackConfig.stats) !== null && _b !== void 0 ? _b : 'minimal', 
        // Only enable file watching & reload when executing tests in `open` mode
        liveReload: isOpenMode });
    const server = new WebpackDevServer(compiler, webpackDevServerConfig);
    return {
        server,
        compiler,
    };
}
