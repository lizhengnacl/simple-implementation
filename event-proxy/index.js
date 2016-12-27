/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/6
 */
'use strict';

let eventProxy = function(){
    let onData = {};
    let oneData = {};
    return {
        on: function(k, f){
            if(onData[k] === undefined){
                onData[k] = [];
            }
            onData[k].push(f);
        },
        one: function(k, f){
            if(oneData[k] === undefined){
                oneData[k] = [];
            }
            oneData[k].push(f);
        },
        off: function(k){
            delete onData[k];
            delete  oneData[k];
        },
        trigger: function(){
            let k, args;
            k = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
            if(onData[k] && onData[k].length > 0){
                for(let prop in onData[k]){
                    if(onData[k][prop]){
                        onData[k][prop].apply(null, args);
                    }
                }
            }
            if(oneData[k] && oneData[k].length > 0){
                for(let prop in oneData[k]){
                    if(oneData[k][prop]){
                        oneData[k][prop].apply(null, args);
                    }
                    delete oneData[k][prop];
                }
            }
        }
    };
}();

eventProxy.on('name', function(name){
    console.log(name);
});
eventProxy.one('name', function(name){
    console.log('name' + ' one');
});


eventProxy.trigger('name', 'liz');
eventProxy.off('name');
eventProxy.trigger('name', 'liz');
eventProxy.trigger('name', 'liz');
