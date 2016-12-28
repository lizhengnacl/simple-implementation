/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/28
 */
'use strict';

(function(root, f){
    if(typeof exports === 'object'){
        exports = f();
    }else if(typeof define === 'function' && define.amd){
        define([], f);
    }else{
        root.returnExports = f();
    }
})(this, function(){
    return 'umd'
});