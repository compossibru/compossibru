/* @flow */

import Container from './Container';
import Import from './Import';

export default class Route {
    path: string;
    layout: string;
    imports: Import[];
    containers: Container[];

    constructor(path: string, layout: string, imports: Import[], containers: Container[]) {
        this.path = path;
        this.layout = layout;
        this.imports = imports;
        this.containers = containers;
        Object.freeze(this);
    }
}
