/**
 * Created by liz
 * Email: lizhengnacl@163.com
 * Tel: 18686768624
 * Date: 16/12/20
 */
'use strict';

define('name', ['./age.js'], function(age){
    return 'liz' + age;
});
