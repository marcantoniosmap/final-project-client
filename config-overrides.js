const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const {
    override,
    addWebpackPlugin
} = require("customize-cra");

module.exports = override(
    // add monaco editor webpack plugin 
    addWebpackPlugin(new MonacoWebpackPlugin())
);