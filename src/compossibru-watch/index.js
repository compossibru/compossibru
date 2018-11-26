const fs = require('fs');

const watch = (fn) => {
    fs.watch('layouts/', { recursive: true }, () => {
        fn();
    });

    fs.watchFile('compossibru.config.yml', () => {
        fn();
    });
};

module.exports = watch;
