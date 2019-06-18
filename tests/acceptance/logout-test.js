import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
// import { visit, currentURL, click, pauseTest/ } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /teams', async function(assert) {
    await visit('/teams');
    assert.equal(currentURL(), '/teams');

    // await pauseTest();
    await click('.team-sidebar__logout-button');
    assert.equal(currentURL(), '/login');
  });
});
