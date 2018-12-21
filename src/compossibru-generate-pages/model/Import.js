/* @flow */

export default class Import {
    key: string;
    value: ?string;

    constructor(key: string, value: ?string = undefined) {
        this.key = key;
        this.value = value;
        Object.freeze(this);
    }
}
