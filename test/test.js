const helpers = require('yeoman-test');
const expect = require('expect.js');
const path = require('path');
const fs = require('fs');

describe('App', () => {
  it('generate a project without argument', () => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'projectName',
        author: 'Author Name'
      })
      .then((tmpPath) => {
        expect(fs.readdirSync(tmpPath)).to.eql(['projectName']);
      });
  });

  it('generate a project with argument', () => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['projectName'])
      .withPrompts({author: 'Author Name'})
      .then((tmpPath) => {
        expect(fs.readdirSync(tmpPath)).to.eql(['projectName']);
      });
  });
});
