import { spawn } from 'child_process';

export const start = (port) => {
    const child = spawn(`npx next -p ${port}`, {
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
