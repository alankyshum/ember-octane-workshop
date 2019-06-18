import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('users', [{
      "id": 0,
      "name": "Dilbert",
      "username": "dilbert",
      "iconUrl": "https://pbs.twimg.com/profile_images/631245346379689984/GqseXcd4_400x400.jpg"
    }]);

    await render(hbs`<LoginForm @users={{this.users}} />`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),
        ['Select a user', 'Dilbert', 'A validation message']
    );
  });

  test('initially no user selected, and "sign in" button disabled', async function(assert) {
    await render(hbs`<LoginForm />`);

    const select = find('[data-test-login="user-select"]');
    assert.equal(select.value, '', 'it does not have any value');

    const signInButton = find('[data-test-login="signin-button"]');
    assert.equal(signInButton.disabled, true, 'it disables signin button initially');
  });

  test('when selecting a userId, and "sign in" button enabled', async function(assert) {
    this.set('users', [{
      "id": 0,
      "name": "Dilbert",
      "username": "dilbert",
      "iconUrl": "https://pbs.twimg.com/profile_images/631245346379689984/GqseXcd4_400x400.jpg"
    }]);

    await render(hbs`<LoginForm @users={{this.users}} />`);

    const select = find('[data-test-login="user-select"]');
    const signInButton = find('[data-test-login="signin-button"]');
    assert.equal(signInButton.disabled, true, 'it disables signin button initially');

    await fillIn(select, '0');
    assert.equal(signInButton.disabled, false, 'it enabled signin button');
  });
});
