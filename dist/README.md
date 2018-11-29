# compossibru
#### Disclaimer: compossibru is still under development! **It's not recommended to use it in production.** 

<hr/>

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

Add your first widgets:
```bash
npm install compossibru-widget-jquery-example compossibru-widget-react-example compossibru-widget-vue-example
```

Add a script to your `package.json`:
```json
{
  "scripts": {
    "start": "compossibru start",
    "build": "compossibru build"
  }
}
```

Add the configuration to your `compossibru.config.yml`:
```yml
Version: 1
Routes:
  Home:
    Route: /
    Layout: layouts/3-column.ejs
    Containers:
      left:
        - compossibru-widget-jquery-example
      middle:
        - compossibru-widget-react-example
      right:
        - compossibru-widget-vue-example
```

Add custom layouts to your `layouts` folder:
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

Congrats. You are done. `compossibru` is configured!

To start:
```bash
compossibru start
```

## How to write a widget?
tbd

## Which features are still left?
- [ ] add proper documentation
- [x] integrate [`commander.js`](https://github.com/tj/commander.js)
- [x] integrate [`cosmiconfig`](https://github.com/davidtheclark/cosmiconfig)
- [ ] integrate [`semantic-release`](https://github.com/semantic-release/semantic-release)
- [x] integrate [`jest`](https://github.com/facebook/jest)
- [ ] create CI/CD (possibly [GitHub Actions](https://github.com/features/actions))
- [ ] publish to `npm registry`
- [ ] create `init` CLI command to auto-generate configuration

## License

[MIT](LICENSE)
