/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/21
 */
'use strict';

/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/6
 */
'use strict';

// eventProxy.trigger('msg', 'end');
// eventProxy.on('msg', (msg) => {});

const eventProxy = {
    _on : {},
    _one: {},
    on: function(key, fn){
        if(this._on[key] === undefined){
            this._on[key] = [];
        }
        this._on[key].push(fn);
    },
    one: function(key, fn){
        if(this._one[key] === undefined){
            this._one[key] = [];
        }
        this._one[key].push(fn);
    },
    off: function(key){
        this._on[key] = [];
        this._one[key] = [];
    },
    trigger: function(){
        let key, args;
        if(arguments.length === 0){
            return false;
        }
        key = arguments[0];
        args = Array.prototype.slice.call(arguments, 1);
        if(this._on[key] !== undefined && this._on[key].length > 0){
            for(let i in this._on[key]){
                this._on[key][i].apply(null, args);
            }
        }
        if(this._one[key] !== undefined && this._one[key].length > 0){
            for(let i in this._one[key]){
                if(this._one[key][i] !== undefined){
                    this._one[key][i].apply(null, args);
                }
                this._one[key][i] = undefined;
            }
        }
    }
};

// export default eventProxy;
eventProxy.on('liz', (msg) => {
    console.log(msg);
});

eventProxy.one('zhu', (msg) => {
    console.log(msg);
});

eventProxy.trigger('zhu', 'zhuwenjie');
eventProxy.trigger('zhu', 'zhuwenjie');
eventProxy.trigger('liz', 'lizheng');
eventProxy.trigger('liz', 'lizheng');