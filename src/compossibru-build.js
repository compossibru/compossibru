const { spawn } = require('child_process');

const build = () => {
    const child = spawn('npx next build && npx next export', {
        shell: true
    });

    child.on('error', (err) => {
        throw err;
    });

    child.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
        process.stdout.write(data);
    });

    child.on('exit', () => {
        process.stdout.write('I\'m done!');
    });
};

module.exports = build;
