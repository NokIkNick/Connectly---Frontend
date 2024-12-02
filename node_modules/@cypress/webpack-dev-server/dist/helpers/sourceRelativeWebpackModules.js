"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreLoadHook = exports.getMajorVersion = exports.sourceDefaultWebpackDependencies = exports.sourceHtmlWebpackPlugin = exports.sourceWebpackDevServer = exports.sourceWebpack = exports.sourceFramework = exports.cypressWebpackPath = void 0;
const tslib_1 = require("tslib");
const module_1 = tslib_1.__importDefault(require("module"));
const path_1 = tslib_1.__importDefault(require("path"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('cypress:webpack-dev-server:sourceRelativeWebpackModules');
class CypressWebpackDevServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CypressWebpackDevServerError';
    }
}
const originalModuleLoad = module_1.default._load;
const originalModuleResolveFilename = module_1.default._resolveFilename;
// We ship webpack@4 as part of '@cypress/webpack-batteries-included-preprocessor'. The path to this module
// serves as our fallback.
const cypressWebpackPath = (config) => {
    return require.resolve('@cypress/webpack-batteries-included-preprocessor', {
        paths: [config.cypressConfig.cypressBinaryRoot],
    });
};
exports.cypressWebpackPath = cypressWebpackPath;
const frameworkWebpackMapper = {
    'create-react-app': 'react-scripts',
    'vue-cli': '@vue/cli-service',
    'nuxt': '@nuxt/webpack',
    react: undefined,
    vue: undefined,
    next: 'next',
    'angular': '@angular-devkit/build-angular',
    'svelte': undefined,
};
// Source the users framework from the provided projectRoot. The framework, if available, will serve
// as the resolve base for webpack dependency resolution.
function sourceFramework(config) {
    debug('Framework: Attempting to source framework for %s', config.cypressConfig.projectRoot);
    if (!config.framework) {
        debug('Framework: No framework provided');
        return null;
    }
    const sourceOfWebpack = frameworkWebpackMapper[config.framework];
    if (!sourceOfWebpack) {
        debug('Not a higher-order framework so webpack dependencies should be resolvable from projectRoot');
        return null;
    }
    const framework = {};
    try {
        const frameworkJsonPath = require.resolve(`${sourceOfWebpack}/package.json`, {
            paths: [config.cypressConfig.projectRoot],
        });
        const frameworkPathRoot = path_1.default.dirname(frameworkJsonPath);
        // Want to make sure we're sourcing this from the user's code. Otherwise we can
        // warn and tell them they don't have their dependencies installed
        framework.importPath = frameworkPathRoot;
        framework.packageJson = require(frameworkJsonPath);
        debug('Framework: Successfully sourced framework - %o', framework);
        return framework;
    }
    catch (e) {
        debug('Framework: Failed to source framework - %s', e);
        // TODO
        return null;
    }
}
exports.sourceFramework = sourceFramework;
// Source the webpack module from the provided framework or projectRoot. We override the module resolution
// so that other packages that import webpack resolve to the version we found.
// If none is found, we fallback to the bundled version in '@cypress/webpack-batteries-included-preprocessor'.
function sourceWebpack(config, framework) {
    var _a;
    const searchRoot = (_a = framework === null || framework === void 0 ? void 0 : framework.importPath) !== null && _a !== void 0 ? _a : config.cypressConfig.projectRoot;
    debug('Webpack: Attempting to source webpack from %s', searchRoot);
    const webpack = {};
    let webpackJsonPath;
    try {
        webpackJsonPath = require.resolve('webpack/package.json', {
            paths: [searchRoot],
        });
    }
    catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            debug('Webpack: Failed to source webpack - %s', e);
            throw e;
        }
        debug('Webpack: Falling back to bundled version');
        webpackJsonPath = require.resolve('webpack/package.json', {
            paths: [(0, exports.cypressWebpackPath)(config)],
        });
    }
    webpack.importPath = path_1.default.dirname(webpackJsonPath);
    webpack.packageJson = require(webpackJsonPath);
    webpack.module = require(webpack.importPath);
    webpack.majorVersion = getMajorVersion(webpack.packageJson, [4, 5]);
    debug('Webpack: Successfully sourced webpack - %o', webpack);
    module_1.default._load = function (request, parent, isMain) {
        if (request === 'webpack' || request.startsWith('webpack/')) {
            const resolvePath = require.resolve(request, {
                paths: [webpack.importPath],
            });
            debug('Webpack: Module._load resolvePath - %s', resolvePath);
            return originalModuleLoad(resolvePath, parent, isMain);
        }
        return originalModuleLoad(request, parent, isMain);
    };
    module_1.default._resolveFilename = function (request, parent, isMain, options) {
        if (request === 'webpack' || request.startsWith('webpack/') && !(options === null || options === void 0 ? void 0 : options.paths)) {
            const resolveFilename = originalModuleResolveFilename(request, parent, isMain, {
                paths: [webpack.importPath],
            });
            debug('Webpack: Module._resolveFilename resolveFilename - %s', resolveFilename);
            return resolveFilename;
        }
        return originalModuleResolveFilename(request, parent, isMain, options);
    };
    return webpack;
}
exports.sourceWebpack = sourceWebpack;
// Source the webpack-dev-server module from the provided framework or projectRoot.
// If none is found, we fallback to the version bundled with this package.
function sourceWebpackDevServer(config, webpackMajorVersion, framework) {
    var _a;
    const searchRoot = (_a = framework === null || framework === void 0 ? void 0 : framework.importPath) !== null && _a !== void 0 ? _a : config.cypressConfig.projectRoot;
    debug('WebpackDevServer: Attempting to source webpack-dev-server from %s', searchRoot);
    const webpackDevServer = {};
    let webpackDevServerJsonPath;
    try {
        webpackDevServerJsonPath = require.resolve('webpack-dev-server/package.json', {
            paths: [searchRoot],
        });
    }
    catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            debug('WebpackDevServer: Failed to source webpack-dev-server - %s', e);
            throw e;
        }
        debug('WebpackDevServer: Falling back to bundled version');
        webpackDevServerJsonPath = require.resolve('webpack-dev-server/package.json', {
            paths: [__dirname],
        });
    }
    webpackDevServer.importPath = path_1.default.dirname(webpackDevServerJsonPath);
    webpackDevServer.packageJson = require(webpackDevServerJsonPath);
    webpackDevServer.module = require(webpackDevServer.importPath);
    webpackDevServer.majorVersion = getMajorVersion(webpackDevServer.packageJson, [3, 4, 5]);
    debug('WebpackDevServer: Successfully sourced webpack-dev-server - %o', webpackDevServer);
    if (webpackMajorVersion < 5 && webpackDevServer.majorVersion === 5) {
        const json = webpackDevServer.packageJson;
        throw new CypressWebpackDevServerError(`Incompatible major versions of webpack and webpack-dev-server!
      webpack-dev-server major version ${webpackDevServer.majorVersion} only works with major versions of webpack 5 - saw webpack-dev-server version ${json.version}.
      If using webpack major version 4, please install webpack-dev-server version 4 to be used with @cypress/webpack-dev-server or upgrade to webpack 5.`);
    }
    return webpackDevServer;
}
exports.sourceWebpackDevServer = sourceWebpackDevServer;
// Source the html-webpack-plugin module from the provided framework or projectRoot.
// If none is found, we fallback to the version bundled with this package dependent on the major version of webpack.
// We ship both v4 and v5 of 'html-webpack-plugin' by aliasing the package with the major version (check package.json).
function sourceHtmlWebpackPlugin(config, framework, webpack) {
    var _a;
    const searchRoot = (_a = framework === null || framework === void 0 ? void 0 : framework.importPath) !== null && _a !== void 0 ? _a : config.cypressConfig.projectRoot;
    debug('HtmlWebpackPlugin: Attempting to source html-webpack-plugin from %s', searchRoot);
    const htmlWebpackPlugin = {};
    let htmlWebpackPluginJsonPath;
    try {
        htmlWebpackPluginJsonPath = require.resolve('html-webpack-plugin/package.json', {
            paths: [searchRoot],
        });
        htmlWebpackPlugin.packageJson = require(htmlWebpackPluginJsonPath);
        // Check that they're not using v3 of html-webpack-plugin. Since we should be the only consumer of it,
        // we shouldn't be concerned with using our own copy if they've shipped w/ an earlier version
        htmlWebpackPlugin.majorVersion = getMajorVersion(htmlWebpackPlugin.packageJson, [4, 5]);
    }
    catch (e) {
        const err = e;
        if (err.code !== 'MODULE_NOT_FOUND' && !err.message.includes('Unexpected major version')) {
            debug('HtmlWebpackPlugin: Failed to source html-webpack-plugin - %s', e);
            throw e;
        }
        const htmlWebpack = `html-webpack-plugin-${webpack.majorVersion}`;
        debug('HtmlWebpackPlugin: Falling back to bundled version %s', htmlWebpack);
        htmlWebpackPluginJsonPath = require.resolve(`${htmlWebpack}/package.json`, {
            paths: [
                __dirname,
            ],
        });
    }
    htmlWebpackPlugin.importPath = path_1.default.dirname(htmlWebpackPluginJsonPath),
        htmlWebpackPlugin.packageJson = require(htmlWebpackPluginJsonPath),
        htmlWebpackPlugin.module = require(htmlWebpackPlugin.importPath),
        htmlWebpackPlugin.majorVersion = getMajorVersion(htmlWebpackPlugin.packageJson, [4, 5]);
    debug('HtmlWebpackPlugin: Successfully sourced html-webpack-plugin - %o', htmlWebpackPlugin);
    return htmlWebpackPlugin;
}
exports.sourceHtmlWebpackPlugin = sourceHtmlWebpackPlugin;
// Most frameworks follow a similar path for sourcing webpack dependencies so this is a utility to handle all the sourcing.
function sourceDefaultWebpackDependencies(config) {
    const framework = sourceFramework(config);
    const webpack = sourceWebpack(config, framework);
    const webpackDevServer = sourceWebpackDevServer(config, webpack.majorVersion, framework);
    const htmlWebpackPlugin = sourceHtmlWebpackPlugin(config, framework, webpack);
    return {
        framework,
        webpack,
        webpackDevServer,
        htmlWebpackPlugin,
    };
}
exports.sourceDefaultWebpackDependencies = sourceDefaultWebpackDependencies;
function getMajorVersion(json, acceptedVersions) {
    const major = Number(json.version.split('.')[0]);
    if (!acceptedVersions.includes(major)) {
        throw new Error(`Unexpected major version of ${json.name}. ` +
            `Cypress webpack-dev-server works with ${json.name} versions ${acceptedVersions.join(', ')} - saw ${json.version}`);
    }
    return Number(major);
}
exports.getMajorVersion = getMajorVersion;
function restoreLoadHook() {
    module_1.default._load = originalModuleLoad;
    module_1.default._resolveFilename = originalModuleResolveFilename;
}
exports.restoreLoadHook = restoreLoadHook;
