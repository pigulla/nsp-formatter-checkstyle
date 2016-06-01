'use strict';

var Util = require('util');
var Checkstyle = require('checkstyle-formatter');

module.exports = function (err, data, pkgPath) {
    if (err) {
        return 'Debug output: ' + JSON.stringify(Buffer.isBuffer(data) ? data.toString() : data) + '\n' + err;
    }

    var messages = data.map(function (item) {
        return {
            line: 0,
            column: 0,
            severity: 'error',
            message: Util.format(
                'Module %s has a known vulnerability: "%s" (vulnerable: %s, patched: %s, yours: %s), see %s',
                item.module, item.title, item.vulnerable_versions, item.patched_versions, item.version, item.advisory
            )
        };
    });

    return Checkstyle([
        {
            filename: pkgPath,
            messages: messages
        }
    ]);
};