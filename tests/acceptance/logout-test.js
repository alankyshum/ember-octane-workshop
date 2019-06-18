import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
// import { visit, currentURL, click, pauseTest/ } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubbedAuthService from '../stubs/auth-service';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('visiting /teams and logout', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth._setUserId(1);
    await visit('/teams/linkedin/recruiting');
    assert.equal(currentURL(), '/teams/linkedin/recruiting');

    /**
     * INFO: using `pauseTest` to pause the test and allow interactions
     */
    // await pauseTest();
    await click('.team-sidebar__logout-button');
    assert.equal(currentURL(), '/login');
    assert.equal(auth.currentUserId, undefined, 'it resets the current user id');
  });
});
