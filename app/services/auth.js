import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const USER_KEY = 'shlack-userid';

export default class AuthService extends Service {
  @service router;

  @tracked currentUser = null;

  get _getUserId() {
    return window.localStorage.getItem(USER_KEY);
  }

  _setUserId(userId) {
    if (!userId) {
      return window.localStorage.removeItem(USER_KEY);
    }

    return window.localStorage.setItem(USER_KEY, userId);
  }

  get currentUserId() {
    return this._getUserId;
  }

  loginWithUserId(userId) {
    window.localStorage.setItem(USER_KEY, userId);
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
