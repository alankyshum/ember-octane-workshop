import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubbedAuthService from '../stubs/auth-service';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('visiting /login', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth._setUserId();
    await visit('/login');
    assert.equal(currentURL(), '/login', 'it show /login page');

    await fillIn('[data-test-login="user-select"]', '1');
    await click('[data-test-login="signin-button"]');
    // await click('[type="submit"]');

    assert.equal(currentURL(), '/teams');
  });
});
