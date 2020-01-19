const Generator = require('yeoman-generator');
const moment = require('moment');
const path = require('path');

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

  prompting() {
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
    return this.prompt(prompts).then(answers => {
      if (answers.projectName) {
        this.options.projectName = answers.projectName;
      }
    });
  }

  configuring() {
    this.destinationRoot(path.join(this.contextRoot, this.options.projectName));
  }

  writing() {
    let filelist = [
      'CMakeLists.txt',
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

    filelist = [
      'conanfile.txt',
      'README.md',
      'CPPLINT.cfg',
      '.clang-tidy',
      '.devcontainer/devcontainer.json',
      '.devcontainer/Dockerfile',
      '.vscode/c_cpp_properties.json',
      '.vscode/settings.json',
      'src/main.cpp'
    ];

    for (const file of filelist) {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      );
    }
  }
};
