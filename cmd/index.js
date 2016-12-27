/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/19
 */
'use strict';

'use strict';
let fs = require('fs');
let catchModule = {};

function readFile(name){
    return fs.readFileSync(name);
}

function _require(name){
    if(catchModule[name]){
        return catchModule[name];
    }
    let exports = {};
    /* eval Function 将字符串编译为功能代码 */
    new Function('exports', readFile(name))(exports);
    catchModule[name] = exports;
    return exports;
}

let obj = _require('./week-day.js');

console.log(obj.name(1));