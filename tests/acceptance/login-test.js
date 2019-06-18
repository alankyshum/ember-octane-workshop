import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubbedAuthService from '../stubs/auth-service';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('visiting /login', async function(assert) {
    await visit('/login');
    assert.equal(currentURL(), '/login');

    await fillIn('[data-test-login="user-select"]', '1');
    await click('[data-test-login="signin-button"]');

    assert.equal(currentURL(), '/teams');
  });
});
