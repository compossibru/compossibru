# @compossibru/compossibru
<a href="https://www.npmjs.com/package/@compossibru/compossibru">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@compossibru/compossibru/latest.svg">
</a>
<a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
</a>

compossibru helps you to build a composite UI easily.

<hr/>

<p align="center">
    <a href="https://github.com/compossibru/compossibru">
        <img alt="Composite UI?!" src="https://s3-eu-west-1.amazonaws.com/compossibru/github/compossibru/composite-ui.jpg" width="350">
    </a>
</p>
<p align="center">
    <a href="https://github.com/compossibru/compossibru">
        <img alt="Use compossibru" src="https://s3-eu-west-1.amazonaws.com/compossibru/github/compossibru/compossibru.jpg" width="350">
    </a>
</p>

## How does it work?
compossibru is a wrapper around [next.js](https://github.com/zeit/next.js/).

## How to install and configure?

Install it:
```bash
npm install @compossibru/compossibru
```

Add widgets:
```bash
npm install @compossibru/widget-twitter-widgets
```

Add scripts in your `package.json`:
```json
{
  "scripts": {
    "start": "npx compossibru start",
    "build": "npx compossibru build"
  }
}
```

Add configuration to your `.compossibrurc` file:
```yaml
Version: 1
Routes:
  Home:
    Route: /
    Layout: layouts/main.ejs
    Containers:
      left:
        - "@compossibru/widget-twitter-widgets":
            type: Timeline
            options:
              dataSource:
                sourceType: profile
                screenName: npmjs
              options:
                username: npmjs
                height: 400
      middle:
        - "@compossibru/widget-twitter-widgets":
            type: Timeline
            options:
              dataSource:
                sourceType: profile
                screenName: github
              options:
                username: github
                height: 400
      right:
        - "@compossibru/widget-twitter-widgets":
            type: Timeline
            options:
              dataSource:
                sourceType: profile
                screenName: internetofshit
              options:
                username: internetofshit
                height: 400

```

Add custom layouts to your `layouts` folder (e.g. `main.ejs`):
```html
<div>
    <div>
        <%- left %>
    </div>
    <div>
        <%- middle %>
    </div>
    <div>
        <%- right %>
    </div>
</div>
```

The final project structure looks as following:
```
.
├── layouts
│   ├── main.ejs   
├── .compossibrurc
├── package.json
```

Congrats. You are done. `compossibru` is configured!

To start:
```bash
npm start
```

Enter http://localhost:3000

## How to write a widget?
A widget can be written with different libraries (e.g. [React](https://reactjs.org), [Vue](https://vuejs.org), [jQuery](https://jquery.com), etc.).
Important here is that the entrypoint needs to be a function where `widgetId` and [`widgetContext`](#what-is-a-widget-context) is passed to.

See the following example implementations using different libraries:

### Example: React
```js
import React from 'react';
import ReactDOM from 'react-dom';

export default (widgetId, widgetContext) => {
    ReactDOM.render(
        <div>{JSON.stringify(widgetContext)}</div>,
        document.getElementById(widgetId)
    );
}
```

### Example: Vue
```js
import Vue from 'vue';

export default (widgetId, widgetContext) => {
    new Vue({
        render: h => h('div', JSON.stringify(widgetContext))
    }).$mount(`#${widgetId}`)
};
```

### Example: jQuery
```js
import $ from 'jquery';

export default (widgetId, widgetContext) => {
    $(document).ready(() => {
        $(`#${widgetId}`).html(`<div>${JSON.stringify(widgetContext)}</div>`);
    });
};
```

## What is a widget context?
Beside the basic widget configuration (which widget should be used in which container), it is possible to pass extended configurations to each widget and that's called `widget context`.

See the following example configurations and the corresponding widget context:

#### Configuration
```yaml
[...]
Containers:
  main:
    - my-awesome-widget
    - my-second-awesome-widget:
        someKey: someValue
    - my-third-awesome-widget:
        someObjectKey:
          someArrayKey:
            - someArrayElement1
            - someArrayElement2
```

#### Widget context for `my-awesome-widget`
```json
{}
```

#### Widget context for `my-second-awesome-widget`
```json
{
    "someKey": "someValue"
}
```

#### Widget context for `my-third-awesome-widget`
```json
{
    "someObjectKey": {
        "someArrayKey": [
            "someArrayElement1",
            "someArrayElement2"
        ]
    }
}
```

## Which features are still left?
- [ ] create CI/CD (possibly [GitHub Actions](https://github.com/features/actions))
- [ ] create `init` CLI command to auto-generate configuration
- [ ] improve path handling in `bin/cli.js`
- [ ] change configuration to be case insensitive

## License

[MIT](LICENSE)
