import { click, currentURL, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender, { ResponseHandler } from 'pretender';
import { module, test } from 'qunit';
import StubbedAuthService from '../stubs/auth-service';

/**
 *
 * @param {any} body
 * @returns {ResponseHandler}
 */
function jsonResponse(body) {
  return function() {
    return [200, {}, JSON.stringify(body)];
  };
}

/**
 * @this {Pretender}
 */
function setupServer() {
  this.get(
    '/api/users',
    jsonResponse([
      { id: 1, name: 'Sample McFixture' },
      { id: 2, name: 'Testy Assertington' },
    ])
  );
  this.get(
    '/api/users/:id',
    jsonResponse({ id: 1, name: 'Sample McFixture' })
  );
  this.get(
    '/api/teams',
    jsonResponse([
      {
        id: 'gh',
        name: 'GitHub',
      },
    ])
  );
  this.get(
    '/api/teams/gh',
    jsonResponse({
      id: 'gh',
      name: 'GitHub',
      channels: [
        {
          id: 'prs',
          name: 'Pull Requests',
        },
      ],
    })
  );
  this.get(
    '/api/teams/gh/channels/prs',
    jsonResponse({
      id: 'prs',
      name: 'Pull Requests',
    })
  );
}


module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  let server;
  hooks.beforeEach(function() {
    server = new Pretender(setupServer);
  });

  hooks.afterEach(function() {
    server && server.shutdown();
    server = null;
  });

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('visiting /login', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth._setUserId();
    await visit('/login');
    assert.equal(currentURL(), '/login', 'it show /login page');

    await fillIn('select', '1');
    await click('[type="submit"]');

    assert.equal(currentURL(), '/teams/gh/prs');
  });
});
