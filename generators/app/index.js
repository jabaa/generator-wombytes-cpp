const Generator = require('yeoman-generator');
const moment = require('moment');
const path = require('path');
const generatorVersion = require('../../package.json').version;

module.exports = class extends Generator {
  
  constructor(args, opts) {
    super(args, opts);

    this.argument('projectName', {
      'description': 'Project name',
      'required': false,
      'optional': true,
      'type': String
    });
  }

  async prompting() {
    let prompts = [];
    if (!this.options.projectName) {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: this.config.get('projectName')
      });
    }
    prompts.push({
      type: 'input',
      name: 'author',
      message: 'Author:'
    });
    const answers = await this.prompt(prompts);
    if (answers.projectName) {
      this.options.projectName = answers.projectName;
    }
    this.options.author = answers.author;
  }

  configuring() {
    this.destinationRoot(path.join(this.contextRoot, this.options.projectName));
  }

  writing() {
    let filelist = [
      'CMakeLists.txt',
      '.vscode/launch.json',
      'src/CMakeLists.txt',
      'test/CMakeLists.txt',
      'test/main.cpp'
    ];

    for (const file of filelist) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        { projectName: this.options.projectName }
      );
    }

    this.fs.copyTpl(
      this.templatePath('LICENSE.md'),
      this.destinationPath('LICENSE.md'),
      {
        year: moment().year(),
        copyrightHolder: this.options.author
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        generatorVersion
      }
    );

    filelist = [
      'conanfile.txt',
      'CPPLINT.cfg',
      '.clang-format',
      '.clang-tidy',
      '.devcontainer/devcontainer.json',
      '.devcontainer/Dockerfile',
      '.vscode/c_cpp_properties.json',
      '.vscode/settings.json',
      'cmake/Conan.cmake',
      'cmake/CompilerWarnings.cmake',
      'src/Application.cpp',
      'src/Application.hpp',
      'src/main.cpp',
      'test/Application.cpp'
    ];

    for (const file of filelist) {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      );
    }
  }
};
