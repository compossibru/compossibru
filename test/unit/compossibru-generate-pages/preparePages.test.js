const { preparePages } = require('../../../src/compossibru-generate-pages');
import configurationWithoutWidgetContextInput from './mock/configuration_without_widget_context_input.json';
import configurationWithoutWidgetContextOutput from './mock/configuration_without_widget_context_output.json';
import configurationWithWidgetContextInput from './mock/configuration_with_widget_context_input.json';
import configurationWithWidgetContextOutput from './mock/configuration_with_widget_context_output.json';
import configurationMultipleRoutesWithoutWidgetContextInput
    from './mock/configuration_multiple_routes_without_widget_context_input.json';
import configurationMultipleRoutesWithoutWidgetContextOutput
    from './mock/configuration_multiple_routes_without_widget_context_output.json';
import configurationMultipleRoutesWithWidgetContextInput
    from './mock/configuration_multiple_routes_with_widget_context_input.json';
import configurationMultipleRoutesWithWidgetContextOutput
    from './mock/configuration_multiple_routes_with_widget_context_output.json';
import configurationWithSpecialCharWidgetInput from './mock/configuration_with_special_char_widget_input.json';
import configurationWithSpecialCharWidgetOutput from './mock/configuration_with_special_char_widget_output.json';
import configurationWithWidgetImportsInput from './mock/configuration_with_widget_imports_input.json';
import configurationWithWidgetImportsOutput from './mock/configuration_with_widget_imports_output.json';
import configurationWithoutWidgetImportsAndStylesInput
    from './mock/configuration_without_widget_imports_and_styles_input.json';
import configurationWithoutWidgetImportsAndStylesOutput
    from './mock/configuration_without_widget_imports_and_styles_output.json';

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

test('compossibru-generate-pages: preparePages without widget imports and styles', () => {
    const pages = preparePages(
        configurationWithoutWidgetImportsAndStylesInput,
        () => 'id',
        () => '.'
    );
    expect(pages).toEqual(configurationWithoutWidgetImportsAndStylesOutput);
});
