/* @flow */

import Widget from './Widget';

export default class Container {
    name: string;
    widgets: Widget[];

    constructor(name: string, widgets: Widget[]) {
        this.name = name;
        this.widgets = widgets;
        Object.freeze(this);
    }
}
