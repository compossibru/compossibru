const { preparePages } = require('../../../src/compossibru-generate-pages');
const configurationWithoutWidgetContextInput = require('./mock/configuration_without_widget_context_input.json');
const configurationWithoutWidgetContextOutput = require('./mock/configuration_without_widget_context_output.json');
const configurationWithWidgetContextInput = require('./mock/configuration_with_widget_context_input.json');
const configurationWithWidgetContextOutput = require('./mock/configuration_with_widget_context_output.json');
const configurationMultipleRoutesWithoutWidgetContextInput = require('./mock/configuration_multiple_routes_without_widget_context_input.json');
const configurationMultipleRoutesWithoutWidgetContextOutput = require('./mock/configuration_multiple_routes_without_widget_context_output.json');
const configurationMultipleRoutesWithWidgetContextInput = require('./mock/configuration_multiple_routes_with_widget_context_input.json');
const configurationMultipleRoutesWithWidgetContextOutput = require('./mock/configuration_multiple_routes_with_widget_context_output.json');
const configurationWithSpecialCharWidgetInput = require('./mock/configuration_with_special_char_widget_input.json');
const configurationWithSpecialCharWidgetOutput = require('./mock/configuration_with_special_char_widget_output.json');
const configurationWithWidgetImportsInput = require('./mock/configuration_with_widget_imports_input.json');
const configurationWithWidgetImportsOutput = require('./mock/configuration_with_widget_imports_output.json');

test('compossibru-generate-pages: preparePages without widget context', () => {
    const pages = preparePages(
        configurationWithoutWidgetContextInput,
        () => 'id',
        () => '.'
    );
    expect(pages).toEqual(configurationWithoutWidgetContextOutput);
});

test('compossibru-generate-pages: preparePages with widget context', () => {
    const pages = preparePages(
        configurationWithWidgetContextInput,
        () => 'id',
        () => '.'
    );
    expect(pages).toEqual(configurationWithWidgetContextOutput);
});

test('compossibru-generate-pages: preparePages with multiple routes and without widget context', () => {
    const pages = preparePages(
        configurationMultipleRoutesWithoutWidgetContextInput,
        () => 'id',
        () => '.'
    );
    expect(pages).toEqual(configurationMultipleRoutesWithoutWidgetContextOutput);
});

test('compossibru-generate-pages: preparePages with multiple routes and widget context', () => {
    const pages = preparePages(
        configurationMultipleRoutesWithWidgetContextInput,
        () => 'id',
        () => '.'
    );
    expect(pages).toEqual(configurationMultipleRoutesWithWidgetContextOutput);
});

test('compossibru-generate-pages: preparePages with special char widget', () => {
    const pages = preparePages(
        configurationWithSpecialCharWidgetInput,
        () => 'id',
        () => '.'
    );
    expect(pages).toEqual(configurationWithSpecialCharWidgetOutput);
});

test('compossibru-generate-pages: preparePages with widget imports', () => {
    const pages = preparePages(
        configurationWithWidgetImportsInput,
        () => 'id',
        () => '.'
    );
    expect(pages).toEqual(configurationWithWidgetImportsOutput);
});
