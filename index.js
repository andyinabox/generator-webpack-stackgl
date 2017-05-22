const nyg = require('nyg');
const spawn = require('child_process').spawn;

const prompts = [
  {
    type: "input",
    name: "project",
    message: "What is the project name?",
    default: "sketch-"+Date.now()
  },
  {
    type: "input",
    name: "description",
    message: "Project description?",
    default: ""
  },
  {
    type: "confirm",
    message: "Use yarn for dependencies?",
    name: "yarn",
    default: true
  }
];

const globs = [
  {base: 'template/', glob: '*'}
];

let generator = nyg(prompts, globs);

// install using yarn if selected
generator.on('preinstall', () => {
  const done = generator.async();
  if(generator.config.get('yarn')) {
    // spawn child process
    const yarn = spawn('yarn', ['install']);
    // events
    yarn.stdout.pipe(process.stdout);
    yarn.stderr.pipe(process.stderr);
    yarn.on('exit', (code) => generator.end());
  } else {
    done();
  }
})

generator.run()