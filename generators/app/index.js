import Generator from 'yeoman-generator';
import moment from 'moment';
import path from 'path';
const generatorVersion = (await import('../../package.json', { with: { type: "json" } })).default.version;

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('projectName', {
      description: 'Project name',
      required: false,
      optional: true,
      type: String,
    });
  }

  async prompting() {
    let prompts = [];
    if (!this.options.projectName) {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: this.config.get('projectName'),
      });
    }
    prompts.push({
      type: 'input',
      name: 'author',
      message: 'Author:',
    });
    prompts.push({
      type: 'select',
      name: 'type',
      message: 'Application type:',
      choices: ['Application', 'Server Application'],
      default: 0,
    });
    const answers = await this.prompt(prompts);
    if (answers.projectName) {
      this.options.projectName = answers.projectName;
    }
    this.options.type = answers.type;
    this.options.author = answers.author;
  }

  configuring() {
    this.destinationRoot(path.join(this.contextRoot, this.options.projectName));
  }

  async writing() {
    let filelist = ['CMakeLists.txt', '.vscode/launch.json'];

    const config = (await import(`./${this.options.type.replace(' ', '')}.json`, { with: { type: "json" } })).default;

    for (const file of filelist) {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), {
        projectName: this.options.projectName,
      });
    }

    for (const file of config.templates) {
      this.fs.copyTpl(
        this.templatePath(path.join(config.path, file)),
        this.destinationPath(file),
        {
          projectName: this.options.projectName,
        }
      );
    }

    this.fs.copyTpl(
      this.templatePath('LICENSE.md'),
      this.destinationPath('LICENSE.md'),
      {
        year: moment().year(),
        copyrightHolder: this.options.author,
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        generatorVersion,
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
      '.vscode/extensions.json',
      '.vscode/settings.json',
      'cmake/Conan.cmake',
      'cmake/CompilerWarnings.cmake',
    ];

    for (const file of filelist) {
      this.fs.copy(this.templatePath(file), this.destinationPath(file));
    }

    for (const file of config.files) {
      this.fs.copy(
        this.templatePath(path.join(config.path, file)),
        this.destinationPath(file)
      );
    }
  }
};
