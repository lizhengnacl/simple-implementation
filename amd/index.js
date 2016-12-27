/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/19
 */

'use strict';
var fs = require('fs');

/* 模拟ajax异步获取文件 */
function readFile(name, cb) {
    /* cb(err, data) */
    fs.readFile(name, cb);
}

var moduleCatch = Object.create(null);
var currentModule = null;

function getModle(name){
    if(moduleCatch[name]){
        return moduleCatch[name];
    }

    let module = {
        exports: null,
        loaded: false,
        check: function(){}
    };

    moduleCatch[name] = module;
    readFile(name, function(err, code){
        currentModule = module;
        /* 此为触发点 */
        new Function('define', code)(define);
    });

    return module;
}

function define(name, depsName, moduleFunc){
    let myModule = currentModule;
    let deps = depsName.map(getModle);
    deps.forEach(function(m){
        if(!m.loaded){
            /* checkDeps 与 deps形成闭包，保证每个子模块处理完成后，检测依赖该子模块的父模块的依赖是否完全加载完成 */
            m.check = checkDeps;
        }
    });

    /* 检查依赖的子模块是否完全加载完成 */
    function checkDeps(){
        if(!deps.every(function(m){return m.loaded})){
            return;
        }

        let args = deps.map(function(m){return m.exports});
        let exports = moduleFunc.apply(null, args);
        if(myModule){
            myModule.exports = exports;
            myModule.loaded = true;
            myModule.check();
            myModule.name = name;
        }
    }

    checkDeps();
}

define('index', ['./name.js'], function(name){
    console.log(name);
});