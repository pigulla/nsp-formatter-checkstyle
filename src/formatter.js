const { format } = require('util');
const checkstyle = require('checkstyle-formatter');

module.exports = function (err, data, pkgPath) {
    if (err) {
        const message = JSON.stringify(Buffer.isBuffer(data) ? data.toString() : data);
        return `Debug output: ${message}\n${err}`;
    }

    const messages = data.map(function (item) {
        return {
            line: 0,
            column: 0,
            severity: 'error',
            message: format(
                'Module %s has a known vulnerability: "%s" (vulnerable: %s, patched: %s, yours: %s), see %s',
                item.module, item.title, item.vulnerable_versions, item.patched_versions, item.version, item.advisory
            )
        };
    });

    return checkstyle([
        {
            filename: pkgPath,
            messages
        }
    ]);
};
