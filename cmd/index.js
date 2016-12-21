/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/19
 */
'use strict';

var fs = require('fs');

function _require(name){
    if(name in _require.cache){
        return _require.cache(name);
    }
    var code = new Function('exports, module', readFile(name));
    var exports = {}, module = {exports: exports};
    code(exports, module);
    _require.cache[name] = module.exports;
    return module.exports;
}

_require.cache = Object.create(null);

function readFile(name){
    var str = fs.readFileSync(name);
    return str;
}

var weekDay = _require("./week-day.js");

console.log(weekDay.name(1));