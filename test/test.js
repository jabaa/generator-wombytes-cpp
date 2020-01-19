const helpers = require('yeoman-test');
const expect = require('expect.js');
const path = require('path');
const fs = require('fs');

describe('App', () => {
  it('generate a project', () => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['projectName'])
      .withPrompts({author: 'Author Name'})
      .then((tmpPath) => {
        expect(fs.readdirSync(tmpPath)).to.eql(['projectName']);
      });
  })
});
