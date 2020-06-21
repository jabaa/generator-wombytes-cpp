const helpers = require('yeoman-test');
const expect = require('expect.js');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const generatorVersion = require('../package.json').version;

const licenseText =
`Copyright ${moment().year()} Author Name

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

describe('App', () => {
  it('generates a project without argument', () => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'projectName',
        author: 'Author Name'
      })
      .then((tmpPath) => {
        expect(fs.readdirSync(tmpPath)).to.eql(['projectName']);
        expect(fs.readFileSync(path.join(tmpPath, 'projectName', 'LICENSE.md'), 'utf8')).to.eql(licenseText);
      });
  });

  it('generates a project with argument', () => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['projectName'])
      .withPrompts({author: 'Author Name'})
      .then((tmpPath) => {
        expect(fs.readdirSync(tmpPath)).to.eql(['projectName']);
        expect(fs.readFileSync(path.join(tmpPath, 'projectName', 'LICENSE.md'), 'utf8')).to.eql(licenseText);
      });
  });

  it('writes generator version into README.md', () => {
    const projectName = 'projectName';
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments([projectName])
      .withPrompts({author: 'Author Name'})
      .then((tmpPath) => {
        expect(generatorVersion).to.match(/[0-9]+\.[0-9]+\.[0-9]+/);
        expect(fs.readFileSync(path.join(tmpPath, projectName, 'README.md'), 'utf8')).to.eql(`Created with wombytes-cpp ${generatorVersion}\n`);
      });
  });
});
