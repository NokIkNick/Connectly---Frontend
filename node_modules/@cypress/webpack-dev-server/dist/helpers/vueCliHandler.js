"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vueCliHandler = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const sourceRelativeWebpackModules_1 = require("./sourceRelativeWebpackModules");
const debug = (0, debug_1.default)('cypress:webpack-dev-server:vueCliHandler');
async function vueCliHandler(devServerConfig) {
    const sourceWebpackModulesResult = (0, sourceRelativeWebpackModules_1.sourceDefaultWebpackDependencies)(devServerConfig);
    try {
        const Service = require(require.resolve('@vue/cli-service', {
            paths: [devServerConfig.cypressConfig.projectRoot],
        }));
        let service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());
        await service.init(process.env.VUE_CLI_MODE || process.env.NODE_ENV);
        const webpackConfig = service.resolveWebpackConfig();
        debug('webpack config %o', webpackConfig);
        return { frameworkConfig: webpackConfig, sourceWebpackModulesResult };
    }
    catch (e) {
        console.error(e); // eslint-disable-line no-console
        throw Error(`Error loading @vue/cli-service/lib/Service or resolving WebpackConfig. Looked in ${require.resolve.paths(devServerConfig.cypressConfig.projectRoot)}`);
    }
}
exports.vueCliHandler = vueCliHandler;
