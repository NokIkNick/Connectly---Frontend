"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCypressWebpackConfig = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const CypressCTWebpackPlugin_1 = require("./CypressCTWebpackPlugin");
const debug = (0, debug_1.default)('cypress:webpack-dev-server:makeDefaultWebpackConfig');
const OUTPUT_PATH = path_1.default.join(__dirname, 'dist');
const OsSeparatorRE = RegExp(`\\${path_1.default.sep}`, 'g');
const posixSeparator = '/';
function makeCypressWebpackConfig(config) {
    const { devServerConfig: { cypressConfig: { experimentalJustInTimeCompile, port, projectRoot, devServerPublicPathRoute, supportFile, indexHtmlFile, isTextTerminal: isRunMode, }, specs: files, devServerEvents, framework, }, sourceWebpackModulesResult: { webpack: { module: webpack, majorVersion: webpackMajorVersion, }, htmlWebpackPlugin: { module: HtmlWebpackPlugin, majorVersion: htmlWebpackPluginVersion, importPath: htmlWebpackPluginImportPath, }, webpackDevServer: { majorVersion: webpackDevServerMajorVersion, }, }, } = config;
    const webpackDevServerPort = port !== null && port !== void 0 ? port : undefined;
    debug(`Using HtmlWebpackPlugin version ${htmlWebpackPluginVersion} from ${htmlWebpackPluginImportPath}`);
    const optimization = {
        // To prevent files from being tree shaken by webpack, we set optimization.sideEffects: false ensuring that
        // webpack does not recognize the sideEffects flag in the package.json and thus files are not unintentionally
        // dropped during testing in production mode.
        sideEffects: false,
        splitChunks: {
            chunks: 'all',
        },
    };
    if (webpackMajorVersion === 5) {
        optimization.emitOnErrors = true;
    }
    else {
        optimization.noEmitOnErrors = false;
    }
    const publicPath = (path_1.default.sep === posixSeparator)
        ? path_1.default.join(devServerPublicPathRoute, posixSeparator)
        // The second line here replaces backslashes on windows with posix compatible slash
        // See https://github.com/cypress-io/cypress/issues/16097
        : path_1.default.join(devServerPublicPathRoute, posixSeparator)
            .replace(OsSeparatorRE, posixSeparator);
    const finalConfig = {
        mode: 'development',
        optimization,
        output: {
            filename: '[name].js',
            path: OUTPUT_PATH,
            publicPath,
        },
        plugins: [
            new HtmlWebpackPlugin(Object.assign({ template: indexHtmlFile ? path_1.default.isAbsolute(indexHtmlFile) ? indexHtmlFile : path_1.default.join(projectRoot, indexHtmlFile) : undefined }, (framework === 'angular' ? { scriptLoading: 'module', base: '/__cypress/src/' } : {}))),
            new CypressCTWebpackPlugin_1.CypressCTWebpackPlugin({
                files,
                projectRoot,
                devServerEvents,
                supportFile,
                webpack,
                indexHtmlFile,
            }),
        ],
        devtool: 'inline-source-map',
    };
    if (isRunMode) {
        // if experimentalJustInTimeCompile is configured, we need to watch for file changes as the spec entries are going to be updated per test
        const ignored = experimentalJustInTimeCompile ? /node_modules/ : '**/*';
        // Disable file watching when executing tests in `run` mode
        finalConfig.watchOptions = {
            ignored,
        };
    }
    if (webpackDevServerMajorVersion === 5) {
        return Object.assign(Object.assign({}, finalConfig), { devServer: {
                port: webpackDevServerPort,
                client: {
                    overlay: false,
                },
            } });
    }
    if (webpackDevServerMajorVersion === 4) {
        return Object.assign(Object.assign({}, finalConfig), { devServer: {
                port: webpackDevServerPort,
                client: {
                    overlay: false,
                },
            } });
    }
    // @ts-ignore
    return Object.assign(Object.assign({}, finalConfig), { devServer: {
            port: webpackDevServerPort,
            overlay: false,
        } });
}
exports.makeCypressWebpackConfig = makeCypressWebpackConfig;
