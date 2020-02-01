const helpers = require('yeoman-test');
const expect = require('expect.js');
const path = require('path');
const fs = require('fs');
const generatorVersion = require('../package.json').version;

describe('App', () => {
  it('generates a project without argument', () => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'projectName',
        author: 'Author Name'
      })
      .then((tmpPath) => {
        expect(fs.readdirSync(tmpPath)).to.eql(['projectName']);
      });
  });

  it('generates a project with argument', () => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['projectName'])
      .withPrompts({author: 'Author Name'})
      .then((tmpPath) => {
        expect(fs.readdirSync(tmpPath)).to.eql(['projectName']);
      });
  });

  it('writes generator version into README.md', () => {
    const projectName = 'projectName';
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments([projectName])
      .withPrompts({author: 'Author Name'})
      .then((tmpPath) => {
        expect(generatorVersion).to.match(/[0-9]+\.[0-9]+\.[0-9]+/);
        expect(fs.readFileSync(path.join(tmpPath, projectName, 'README.md'), 'utf8')).to.eql('Created with wombytes-cpp 0.2.0\n');
      });
  });
});
