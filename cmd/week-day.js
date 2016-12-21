/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/19
 */
'use strict';

var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
             "Thursday", "Friday", "Saturday"];
exports.name = function(number) {
    return names[number];
};
exports.number = function(name) {
    return names.indexOf(name);
};