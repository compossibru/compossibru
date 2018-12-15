/* @flow */

export default class Widget {
    name: string;
    context: any;

    constructor(name: string, context: any = null) {
        this.name = name;
        this.context = context;
        Object.freeze(this);
    }
}
