/* @flow */

import Container from './Container';

export default class Route {
    path: string;
    layout: string;
    containers: Container[];

    constructor(path: string, layout: string, containers: Container[]) {
        this.path = path;
        this.layout = layout;
        this.containers = containers;
        Object.freeze(this);
    }
}
