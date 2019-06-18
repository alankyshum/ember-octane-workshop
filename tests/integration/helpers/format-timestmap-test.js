import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-timestmap', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('when a reasonable date is passed', async function(assert) {
    this.set('inputValue', '01-01-2019');

    await render(hbs`{{format-timestmap inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Jan 1, 2019 00:00.00 AM');
  });

  test('when no date is passed', async function(assert) {
    await render(hbs`{{format-timestmap}}`);

    assert.equal(this.element.textContent.trim(), '(unknown)');
  });
});
