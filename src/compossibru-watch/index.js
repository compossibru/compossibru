const fs = require('fs');

const watch = (filepath, fn) => {
    fs.watch('layouts/', { recursive: true }, () => {
        fn();
    });

    fs.watchFile(filepath, () => {
        fn();
    });
};

module.exports = watch;
