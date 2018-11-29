import fs from 'fs';

export const watch = (filepath, fn) => {
    fs.watch('layouts/', { recursive: true }, () => {
        fn();
    });

    fs.watchFile(filepath, () => {
        fn();
    });
};
