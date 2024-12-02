"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuxtHandler = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const sourceRelativeWebpackModules_1 = require("./sourceRelativeWebpackModules");
const debug = (0, debug_1.default)('cypress:webpack-dev-server:nuxtHandler');
async function nuxtHandler(devServerConfig) {
    const sourceWebpackModulesResult = (0, sourceRelativeWebpackModules_1.sourceDefaultWebpackDependencies)(devServerConfig);
    try {
        const nuxt = require.resolve('nuxt', {
            paths: [devServerConfig.cypressConfig.projectRoot],
        });
        const { getWebpackConfig } = require(nuxt);
        const webpackConfig = await getWebpackConfig();
        // Nuxt has asset size warnings configured by default which will cause webpack overlays to appear
        // in the browser which we don't want.
        delete webpackConfig.performance;
        debug('webpack config %o', webpackConfig);
        return { frameworkConfig: webpackConfig, sourceWebpackModulesResult };
    }
    catch (e) {
        console.error(e); // eslint-disable-line no-console
        throw Error(`Error loading nuxt. Looked in ${require.resolve.paths(devServerConfig.cypressConfig.projectRoot)}`);
    }
}
exports.nuxtHandler = nuxtHandler;
