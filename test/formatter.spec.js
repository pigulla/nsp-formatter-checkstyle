const fs = require('fs');
const path = require('path');

const source_dir = process.env.SOURCE_DIR || path.join('..', 'src'); // eslint-disable-line no-process-env

const expect = require('chai').expect;
const formatter = require(path.join(source_dir, 'formatter'));

const findings = require('./fixtures/findings.json');

describe('formatter', function () {
    it('creates correct XML', function () {
        const file = path.join(__dirname, 'fixtures', 'findings.xml');
        const expected = fs.readFileSync(file).toString();
        const actual = formatter(null, findings, 'package.json');

        expect(actual).to.equal(expected);
    });

    describe('prints debug output on error', function () {
        it('when data is a buffer', function () {
            const data = new Buffer('Foo!', 'utf-8'),
                actual = formatter(
                    new Error('Some nasty error'),
                    data,
                    'package.json'
                );

            expect(actual).to.equal('Debug output: "Foo!"\nError: Some nasty error');
        });

        it('when data is not a buffer', function () {
            const data = { foo: 'bar' },
                actual = formatter(
                    new Error('Some nasty error'),
                    data,
                    'package.json'
                );

            expect(actual).to.equal('Debug output: {"foo":"bar"}\nError: Some nasty error');
        });
    });
});
