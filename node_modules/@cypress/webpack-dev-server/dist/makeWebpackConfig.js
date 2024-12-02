"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWebpackConfig = exports.CYPRESS_WEBPACK_ENTRYPOINT = void 0;
const tslib_1 = require("tslib");
const debug_1 = require("debug");
const path = tslib_1.__importStar(require("path"));
const webpack_merge_1 = require("webpack-merge");
const local_pkg_1 = require("local-pkg");
const makeDefaultWebpackConfig_1 = require("./makeDefaultWebpackConfig");
const constants_1 = require("./constants");
const dynamic_import_1 = require("./dynamic-import");
const debug = (0, debug_1.debug)('cypress:webpack-dev-server:makeWebpackConfig');
const removeList = [
    // We provide a webpack-html-plugin config pinned to a specific version (4.x)
    // that we have tested and are confident works with all common configurations.
    // https://github.com/cypress-io/cypress/issues/15865
    'HtmlWebpackPlugin',
    // This plugin is an optimization for HtmlWebpackPlugin for use in
    // production environments, not relevant for testing.
    'PreloadPlugin',
    // Another optimization not relevant in a testing environment.
    'HtmlPwaPlugin',
    // We already reload when webpack recompiles (via listeners on
    // devServerEvents). Removing this plugin can prevent double-refreshes
    // in some setups.
    'HotModuleReplacementPlugin',
];
// CaseSensitivePathsPlugin checks the paths of every loaded module to enforce
// case sensitivity - this helps developers on mac catch issues that will bite
// them later, but on linux the OS already does this by default. The plugin
// is somewhat slow, accounting for ~15% of compile time on a couple of CRA
// based projects (where it's included by default) tested.
if (process.platform === 'linux') {
    removeList.push('CaseSensitivePathsPlugin');
}
exports.CYPRESS_WEBPACK_ENTRYPOINT = path.resolve(__dirname, 'browser.js');
/**
 * Removes and/or modifies certain plugins known to conflict
 * when used with cypress/webpack-dev-server.
 */
function modifyWebpackConfigForCypress(webpackConfig) {
    var _a;
    if (webpackConfig === null || webpackConfig === void 0 ? void 0 : webpackConfig.plugins) {
        webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => !removeList.includes(plugin.constructor.name));
    }
    if (typeof ((_a = webpackConfig === null || webpackConfig === void 0 ? void 0 : webpackConfig.module) === null || _a === void 0 ? void 0 : _a.unsafeCache) === 'function') {
        const originalCachePredicate = webpackConfig.module.unsafeCache;
        webpackConfig.module.unsafeCache = (module) => {
            return originalCachePredicate(module) && !/[\\/]webpack-dev-server[\\/]dist[\\/]browser\.js/.test(module.resource);
        };
    }
    return webpackConfig;
}
async function getWebpackConfigFromProjectRoot(projectRoot) {
    const { findUp } = await (0, dynamic_import_1.dynamicImport)('find-up');
    return await findUp(constants_1.configFiles, { cwd: projectRoot });
}
/**
 * Creates a webpack 4/5 compatible webpack "configuration"
 * to pass to the sourced webpack function
 */
async function makeWebpackConfig(config) {
    var _a, _b, _c;
    let userWebpackConfig = config.devServerConfig.webpackConfig;
    const frameworkWebpackConfig = config.frameworkConfig;
    const { cypressConfig: { projectRoot, supportFile, }, specs: files, framework, } = config.devServerConfig;
    if (!userWebpackConfig && !frameworkWebpackConfig) {
        debug('Not user or framework webpack config received. Trying to automatically source it');
        const configFile = await getWebpackConfigFromProjectRoot(projectRoot);
        if (configFile) {
            debug('found webpack config %s', configFile);
            const sourcedConfig = await (0, local_pkg_1.importModule)(configFile);
            debug('config contains %o', sourcedConfig);
            if (sourcedConfig && typeof sourcedConfig === 'object') {
                userWebpackConfig = (_a = sourcedConfig.default) !== null && _a !== void 0 ? _a : sourcedConfig;
            }
        }
        if (!userWebpackConfig) {
            debug('could not find webpack.config!');
            if ((_b = config.devServerConfig) === null || _b === void 0 ? void 0 : _b.onConfigNotFound) {
                config.devServerConfig.onConfigNotFound('webpack', projectRoot, constants_1.configFiles);
                // The config process will be killed from the parent, but we want to early exit so we don't get
                // any additional errors related to not having a config
                process.exit(0);
            }
            else {
                throw new Error(`Your Cypress devServer config is missing a required webpackConfig property, since we could not automatically detect one.\nPlease add one to your ${config.devServerConfig.cypressConfig.configFile}`);
            }
        }
    }
    userWebpackConfig = typeof userWebpackConfig === 'function'
        ? await userWebpackConfig()
        : userWebpackConfig;
    const userAndFrameworkWebpackConfig = modifyWebpackConfigForCypress((0, webpack_merge_1.merge)(frameworkWebpackConfig !== null && frameworkWebpackConfig !== void 0 ? frameworkWebpackConfig : {}, userWebpackConfig !== null && userWebpackConfig !== void 0 ? userWebpackConfig : {}));
    debug(`User passed in user and framework webpack config with values %o`, userAndFrameworkWebpackConfig);
    debug(`New webpack entries %o`, files);
    debug(`Project root`, projectRoot);
    debug(`Support file`, supportFile);
    const mergedConfig = (0, webpack_merge_1.merge)(userAndFrameworkWebpackConfig, (0, makeDefaultWebpackConfig_1.makeCypressWebpackConfig)(config));
    // Some frameworks (like Next.js) change this value which changes the path we would need to use to fetch our spec.
    // (eg, http://localhost:xxxx/<dev-server-public-path>/static/chunks/spec-<x>.js). Deleting this key to normalize
    // the spec URL to `*/spec-<x>.js` which we need to know up-front so we can fetch the sourcemaps.
    (_c = mergedConfig.output) === null || _c === void 0 ? true : delete _c.chunkFilename;
    // Angular loads global styles and polyfills via script injection in the index.html
    if (framework === 'angular') {
        mergedConfig.entry = Object.assign(Object.assign({}, mergedConfig.entry || {}), { 'cypress-entry': exports.CYPRESS_WEBPACK_ENTRYPOINT });
    }
    else {
        mergedConfig.entry = exports.CYPRESS_WEBPACK_ENTRYPOINT;
    }
    debug('Merged webpack config %o', mergedConfig);
    return mergedConfig;
}
exports.makeWebpackConfig = makeWebpackConfig;
