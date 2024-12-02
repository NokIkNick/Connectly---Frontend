"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angularHandler = exports.toPosix = exports.getAngularJson = exports.getAngularCliModules = exports.getTempDir = exports.generateTsConfig = exports.getAngularBuildOptions = exports.getProjectConfig = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-extra"));
const os_1 = require("os");
const path = tslib_1.__importStar(require("path"));
const semver_1 = require("semver");
const dynamic_import_1 = require("../dynamic-import");
const sourceRelativeWebpackModules_1 = require("./sourceRelativeWebpackModules");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugPrefix = 'cypress:webpack-dev-server:angularHandler';
const debug = (0, debug_1.default)(debugPrefix);
async function getProjectConfig(projectRoot) {
    var _a;
    const angularJson = await getAngularJson(projectRoot);
    let { defaultProject } = angularJson;
    if (!defaultProject) {
        defaultProject = Object.keys(angularJson.projects).find((name) => angularJson.projects[name].projectType === 'application');
        if (!defaultProject) {
            throw new Error('Could not find a project with projectType "application" in "angular.json". Visit https://on.cypress.io/configuration to see how to pass in a custom project configuration');
        }
    }
    const defaultProjectConfig = angularJson.projects[defaultProject];
    const { architect, root, sourceRoot } = defaultProjectConfig;
    const { build } = architect;
    return {
        root,
        sourceRoot,
        buildOptions: Object.assign(Object.assign({}, build.options), ((_a = build.configurations) === null || _a === void 0 ? void 0 : _a.development) || {}),
    };
}
exports.getProjectConfig = getProjectConfig;
function getAngularBuildOptions(buildOptions, tsConfig) {
    // Default options are derived from the @angular-devkit/build-angular browser builder, with some options from
    // the serve builder thrown in for development.
    // see: https://github.com/angular/angular-cli/blob/main/packages/angular_devkit/build_angular/src/builders/browser/schema.json
    return Object.assign(Object.assign({ outputPath: 'dist/angular-app', assets: [], styles: [], scripts: [], fileReplacements: [], inlineStyleLanguage: 'css', stylePreprocessorOptions: { includePaths: [] }, resourcesOutputPath: undefined, commonChunk: true, baseHref: undefined, deployUrl: undefined, verbose: false, progress: false, i18nMissingTranslation: 'warning', i18nDuplicateTranslation: 'warning', localize: undefined, watch: true, poll: undefined, deleteOutputPath: true, preserveSymlinks: undefined, showCircularDependencies: false, subresourceIntegrity: false, serviceWorker: false, ngswConfigPath: undefined, statsJson: false, webWorkerTsConfig: undefined, crossOrigin: 'none', allowedCommonJsDependencies: [], buildOptimizer: false, optimization: false, vendorChunk: true, extractLicenses: false, sourceMap: true, namedChunks: true }, buildOptions), { tsConfig, aot: false, outputHashing: 'none', budgets: undefined });
}
exports.getAngularBuildOptions = getAngularBuildOptions;
async function generateTsConfig(devServerConfig, buildOptions) {
    var _a;
    const { cypressConfig } = devServerConfig;
    const { projectRoot } = cypressConfig;
    const { workspaceRoot = projectRoot } = buildOptions;
    const specPattern = Array.isArray(cypressConfig.specPattern) ? cypressConfig.specPattern : [cypressConfig.specPattern];
    const getProjectFilePath = (...fileParts) => (0, exports.toPosix)(path.join(...fileParts));
    const includePaths = [...specPattern.map((pattern) => getProjectFilePath(projectRoot, pattern))];
    if (cypressConfig.supportFile) {
        includePaths.push((0, exports.toPosix)(cypressConfig.supportFile));
    }
    if (buildOptions.polyfills) {
        const polyfills = Array.isArray(buildOptions.polyfills)
            ? buildOptions.polyfills.filter((p) => { var _a, _b; return ((_a = devServerConfig.options) === null || _a === void 0 ? void 0 : _a.projectConfig.sourceRoot) && p.startsWith((_b = devServerConfig.options) === null || _b === void 0 ? void 0 : _b.projectConfig.sourceRoot); })
            : [buildOptions.polyfills];
        includePaths.push(...polyfills.map((p) => getProjectFilePath(workspaceRoot, p)));
    }
    const typeRoots = [
        getProjectFilePath(workspaceRoot, 'node_modules'),
    ];
    const types = ['cypress'];
    const tsConfigContent = JSON.stringify({
        extends: getProjectFilePath(projectRoot, (_a = buildOptions.tsConfig) !== null && _a !== void 0 ? _a : 'tsconfig.json'),
        compilerOptions: {
            outDir: getProjectFilePath(projectRoot, 'out-tsc/cy'),
            allowSyntheticDefaultImports: true,
            skipLibCheck: true,
            types,
            typeRoots,
        },
        include: includePaths,
    }, null, 2);
    const tsConfigPath = path.join(await getTempDir(path.basename(projectRoot)), 'tsconfig.json');
    await fs.writeFile(tsConfigPath, tsConfigContent);
    return tsConfigPath;
}
exports.generateTsConfig = generateTsConfig;
async function getTempDir(projectName) {
    const cypressTempDir = path.join((0, os_1.tmpdir)(), 'cypress-angular-ct', projectName);
    await fs.ensureDir(cypressTempDir);
    return cypressTempDir;
}
exports.getTempDir = getTempDir;
async function getAngularCliModules(projectRoot) {
    let angularVersion;
    try {
        angularVersion = await getInstalledPackageVersion('@angular-devkit/core', projectRoot);
    }
    catch (_a) {
        throw new Error(`Could not resolve "@angular-devkit/core". Do you have it installed?`);
    }
    const angularCLiModules = [
        '@angular-devkit/build-angular/src/utils/webpack-browser-config.js',
        // in Angular 16.1 the locations of these files below were changed
        ...((0, semver_1.gte)(angularVersion, '16.1.0')
            ? ['@angular-devkit/build-angular/src/tools/webpack/configs/common.js', '@angular-devkit/build-angular/src/tools/webpack/configs/styles.js']
            : ['@angular-devkit/build-angular/src/webpack/configs/common.js', '@angular-devkit/build-angular/src/webpack/configs/styles.js']),
        '@angular-devkit/core/src/index.js',
    ];
    const [{ generateBrowserWebpackConfigFromContext }, { getCommonConfig }, { getStylesConfig }, { logging },] = await Promise.all(angularCLiModules.map((dep) => {
        try {
            const depPath = require.resolve(dep, { paths: [projectRoot] });
            return (0, dynamic_import_1.dynamicAbsoluteImport)(depPath);
        }
        catch (e) {
            throw new Error(`Could not resolve "${dep}". Do you have "@angular-devkit/build-angular" and "@angular-devkit/core" installed?`);
        }
    }));
    return {
        generateBrowserWebpackConfigFromContext,
        getCommonConfig,
        getStylesConfig,
        logging,
    };
}
exports.getAngularCliModules = getAngularCliModules;
async function getInstalledPackageVersion(pkgName, projectRoot) {
    const packageJsonPath = require.resolve(`${pkgName}/package.json`, { paths: [projectRoot] });
    const { version } = JSON.parse(await fs.readFile(packageJsonPath, { encoding: 'utf-8' }));
    return version;
}
async function getAngularJson(projectRoot) {
    const { findUp } = await (0, dynamic_import_1.dynamicImport)('find-up');
    const angularJsonPath = await findUp('angular.json', { cwd: projectRoot });
    if (!angularJsonPath) {
        throw new Error(`Could not find angular.json. Looked in ${projectRoot} and up.`);
    }
    const angularJson = await fs.readFile(angularJsonPath, 'utf8');
    return JSON.parse(angularJson);
}
exports.getAngularJson = getAngularJson;
function createFakeContext(projectRoot, defaultProjectConfig, logging) {
    const logger = new logging.Logger(debugPrefix);
    // Proxy all logging calls through to the debug logger
    logger.forEach((value) => {
        debug(JSON.stringify(value));
    });
    const context = {
        target: {
            project: 'angular',
        },
        workspaceRoot: projectRoot,
        getProjectMetadata: () => {
            return {
                root: defaultProjectConfig.root,
                sourceRoot: defaultProjectConfig.sourceRoot,
                projectType: 'application',
            };
        },
        logger,
    };
    return context;
}
const toPosix = (filePath) => filePath.split(path.sep).join(path.posix.sep);
exports.toPosix = toPosix;
async function getAngularCliWebpackConfig(devServerConfig) {
    var _a;
    const { projectRoot } = devServerConfig.cypressConfig;
    const { generateBrowserWebpackConfigFromContext, getCommonConfig, getStylesConfig, logging, } = await getAngularCliModules(projectRoot);
    // normalize
    const projectConfig = ((_a = devServerConfig.options) === null || _a === void 0 ? void 0 : _a.projectConfig) || await getProjectConfig(projectRoot);
    const tsConfig = await generateTsConfig(devServerConfig, projectConfig.buildOptions);
    const buildOptions = getAngularBuildOptions(projectConfig.buildOptions, tsConfig);
    const context = createFakeContext(projectConfig.buildOptions.workspaceRoot || projectRoot, projectConfig, logging);
    const { config } = await generateBrowserWebpackConfigFromContext(buildOptions, context, (wco) => {
        // Starting in Angular 16, the `getStylesConfig` function returns a `Promise`.
        // We wrap it with `Promise.resolve` so we support older version of Angular
        // returning a non-Promise result.
        const stylesConfig = Promise.resolve(getStylesConfig(wco)).then((config) => {
            // We modify resolve-url-loader and set `root` to be `projectRoot` + `sourceRoot` to ensure
            // imports in scss, sass, etc are correctly resolved.
            // https://github.com/cypress-io/cypress/issues/24272
            config.module.rules.forEach((rule) => {
                var _a;
                (_a = rule.rules) === null || _a === void 0 ? void 0 : _a.forEach((ruleSet) => {
                    if (!Array.isArray(ruleSet.use)) {
                        return;
                    }
                    ruleSet.use.map((loader) => {
                        var _a;
                        if (typeof loader !== 'object' || typeof loader.options !== 'object' || !((_a = loader.loader) === null || _a === void 0 ? void 0 : _a.includes('resolve-url-loader'))) {
                            return;
                        }
                        const root = projectConfig.buildOptions.workspaceRoot || path.join(devServerConfig.cypressConfig.projectRoot, projectConfig.sourceRoot);
                        debug('Adding root %s to resolve-url-loader options', root);
                        loader.options.root = root;
                    });
                });
            });
            return config;
        });
        return [getCommonConfig(wco), stylesConfig];
    });
    delete config.entry.main;
    return config;
}
function removeSourceMapPlugin(config) {
    var _a;
    config.plugins = (_a = config.plugins) === null || _a === void 0 ? void 0 : _a.filter((plugin) => {
        var _a;
        return ((_a = plugin === null || plugin === void 0 ? void 0 : plugin.constructor) === null || _a === void 0 ? void 0 : _a.name) !== 'SourceMapDevToolPlugin';
    });
}
async function angularHandler(devServerConfig) {
    const webpackConfig = await getAngularCliWebpackConfig(devServerConfig);
    removeSourceMapPlugin(webpackConfig);
    return { frameworkConfig: webpackConfig, sourceWebpackModulesResult: (0, sourceRelativeWebpackModules_1.sourceDefaultWebpackDependencies)(devServerConfig) };
}
exports.angularHandler = angularHandler;
