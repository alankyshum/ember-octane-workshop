import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const USER_KEY = 'shlack-userid';

export default class AuthService extends Service {
  @service router;
  @service cookies;

  @tracked currentUser = null;

  get _getUserId() {
    return this.cookies.read(USER_KEY);
  }

  _setUserId(userId) {
    if (!userId) {
      return this.cookies.clear(USER_KEY);
    }

    return this.cookies.write(USER_KEY, userId);
  }

  get currentUserId() {
    return this._getUserId;
  }

  loginWithUserId(userId) {
    this._setUserId(userId);
    this.router.transitionTo('teams');
  }

  async loadCurrentUser() {
    const { currentUserId } = this;
    if (!currentUserId) return;
    const userResp = await fetch(`/api/users/${currentUserId}`);
    this.currentUser = await userResp.json();
    return this.currentUser;
  }

  @action
  logout() {
    this._setUserId(null);
    this.router.transitionTo('login');
  }
}
