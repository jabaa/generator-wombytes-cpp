const helpers = require('yeoman-test');
const expect = require('expect.js');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const moment = require('moment');
const generatorVersion = require('../package.json').version;
const Chance = require('chance');
const chance = new Chance();

const licenseText = `Copyright ${moment().year()} Author Name

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

describe('application project without argument', () => {
  let runResult;
  let tmpPath;
  let projectName;

  before(async () => {
    projectName = chance.string({ alpha: true, numeric: true, symbols: false });
    runResult = await helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName,
        author: 'Author Name',
        type: 'Application',
      });

    tmpPath = runResult.cwd;
  });

  it('generates a project', async () => {
    expect(fs.readdirSync(tmpPath)).to.eql([projectName]);
    expect(
      fs.readFileSync(path.join(tmpPath, projectName, 'LICENSE.md'), 'utf8')
    ).to.eql(licenseText);
  });

  it('writes generator version into README.md', async () => {
    expect(generatorVersion).to.match(/[0-9]+\.[0-9]+\.[0-9]+/);
    expect(
      fs.readFileSync(path.join(tmpPath, projectName, 'README.md'), 'utf8')
    ).to.eql(`Created with wombytes-cpp ${generatorVersion}\n`);
  });

  it('generates C++ project', async () => {
    const buildDir = path.join(tmpPath, projectName, 'build');
    fs.mkdirSync(buildDir);
    const cmake = spawn('cmake', ['..'], { cwd: buildDir });
    const code = await new Promise((res) => {
      cmake.on('close', res);
    });
    expect(code).to.be(0);
  });

  it('builds C++ project', async () => {
    const buildDir = path.join(tmpPath, projectName, 'build');
    const cmake = spawn('cmake', ['--build', '.'], { cwd: buildDir });
    let stdout = '';
    cmake.stdout.on('data', (data) => {
      stdout += data;
    });
    let stderr = '';
    cmake.stderr.on('data', (data) => {
      stderr += data;
    });
    const code = await new Promise((res) => {
      cmake.on('close', res);
    });
    if (code !== 0) {
      console.log(stdout);
      console.log(stderr);
    }
    expect(code).to.be(0);
  });

  it('runs C++ project tests', async () => {
    const buildDir = path.join(tmpPath, projectName, 'build');
    const ctest = spawn('ctest', [], { cwd: buildDir });
    let stdout = '';
    ctest.stdout.on('data', (data) => {
      stdout += data;
    });
    let stderr = '';
    ctest.stderr.on('data', (data) => {
      stderr += data;
    });
    const code = await new Promise((res) => {
      ctest.on('close', res);
    });
    if (code !== 0) {
      console.log(stdout);
      console.log(stderr);
    }
    expect(code).to.be(0);
  });

  after(() => {
    fs.rmSync(path.join(tmpPath), { recursive: true, force: true });
  });
});

describe('server application project without argument', () => {
  let runResult;
  let tmpPath;
  let projectName;

  before(async () => {
    projectName = chance.string({ alpha: true, numeric: true, symbols: false });
    runResult = await helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName,
        author: 'Author Name',
        type: 'Server Application',
      });

    tmpPath = runResult.cwd;
  });

  it('generates a project', async () => {
    expect(fs.readdirSync(tmpPath)).to.eql([projectName]);
    expect(
      fs.readFileSync(path.join(tmpPath, projectName, 'LICENSE.md'), 'utf8')
    ).to.eql(licenseText);
  });

  it('writes generator version into README.md', async () => {
    expect(generatorVersion).to.match(/[0-9]+\.[0-9]+\.[0-9]+/);
    expect(
      fs.readFileSync(path.join(tmpPath, projectName, 'README.md'), 'utf8')
    ).to.eql(`Created with wombytes-cpp ${generatorVersion}\n`);
  });

  it('generates C++ project', async () => {
    const buildDir = path.join(tmpPath, projectName, 'build');
    fs.mkdirSync(buildDir);
    const cmake = spawn('cmake', ['..'], { cwd: buildDir });
    const code = await new Promise((res) => {
      cmake.on('close', res);
    });
    expect(code).to.be(0);
  });

  it('builds C++ project', async () => {
    const buildDir = path.join(tmpPath, projectName, 'build');
    const cmake = spawn('cmake', ['--build', '.'], { cwd: buildDir });
    let stdout = '';
    cmake.stdout.on('data', (data) => {
      stdout += data;
    });
    let stderr = '';
    cmake.stderr.on('data', (data) => {
      stderr += data;
    });
    const code = await new Promise((res) => {
      cmake.on('close', res);
    });
    if (code !== 0) {
      console.log(stdout);
      console.log(stderr);
    }
    expect(code).to.be(0);
  });

  it('runs C++ project tests', async () => {
    const buildDir = path.join(tmpPath, projectName, 'build');
    const ctest = spawn('ctest', [], { cwd: buildDir });
    let stdout = '';
    ctest.stdout.on('data', (data) => {
      stdout += data;
    });
    let stderr = '';
    ctest.stderr.on('data', (data) => {
      stderr += data;
    });
    const code = await new Promise((res) => {
      ctest.on('close', res);
    });
    if (code !== 0) {
      console.log(stdout);
      console.log(stderr);
    }
    expect(code).to.be(0);
  });

  after(() => {
    fs.rmSync(path.join(tmpPath), { recursive: true, force: true });
  });
});

describe('application project with argument', () => {
  let runResult;
  let tmpPath;
  let projectName;

  before(async () => {
    projectName = chance.string({ alpha: true, numeric: true, symbols: false });
    runResult = await helpers
      .run(path.join(__dirname, '../generators/app'))
      .withArguments([projectName])
      .withPrompts({ author: 'Author Name', type: 'Application' });

    tmpPath = runResult.cwd;
  });

  it('generates a project', async () => {
    expect(fs.readdirSync(tmpPath)).to.eql([projectName]);
    expect(
      fs.readFileSync(path.join(tmpPath, projectName, 'LICENSE.md'), 'utf8')
    ).to.eql(licenseText);
  });

  it('writes generator version into README.md', async () => {
    expect(generatorVersion).to.match(/[0-9]+\.[0-9]+\.[0-9]+/);
    expect(
      fs.readFileSync(path.join(tmpPath, projectName, 'README.md'), 'utf8')
    ).to.eql(`Created with wombytes-cpp ${generatorVersion}\n`);
  });

  after(() => {
    fs.rmSync(path.join(tmpPath), { recursive: true, force: true });
  });
});
