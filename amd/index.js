/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/19
 */

'use strict';
var fs = require('fs');

/* 模拟ajax异步获取文件 */
function backgroundReadFile(name, cb) {
    /* cb(err, data) */
    fs.readFile(name, cb);
}

var defineCache = Object.create(null);
var currentMod = null;

function getModule(name) {
    if (name in defineCache) {
        return defineCache[name];
    }

    var module = {
        exports: null,
        loaded: false,
        onLoad: []
    };

    defineCache[name] = module;
    backgroundReadFile(name, function(err, code) {
        currentMod = module;
        new Function('define', code)(define);
    });
    return module;
}

function define(name, depNames, moduleFunction) {
    var myMod = currentMod;
    var deps = depNames.map(getModule);
    deps.forEach(function(mod) {
        if(!mod.loaded) {
            mod.onLoad.push(whenDepsLoaded);
        }
    });

    // 用于检查是否所有的依赖模块都被成功加载了
    function whenDepsLoaded() {
        if(!deps.every(function(m) { return m.loaded; })) {
            return;
        }

        var args = deps.map(function(m) { return m.exports; });
        var exports = moduleFunction.apply(null, args);
        if (myMod) {
            myMod.exports = exports;
            myMod.loaded = true;
            myMod.onLoad.forEach(function(f) { f(); });
            myMod.name = name;
        }
    }

    whenDepsLoaded();
}

define('index', ['./name.js'], function(name) {
    console.log(name);
});