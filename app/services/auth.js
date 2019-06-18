import Service, { inject as service } from '@ember/service';

const USER_KEY = 'shlack-userid';

export default class AuthService extends Service {
  @service router;

  get _getUserId() {
    return window.localStorage.getItem(USER_KEY);
  }

  _setUserId(userId) {
    return window.localStorage.setItem(USER_KEY, userId);
  }

  get currentUserId() {
    return this._getUserId;
  }

  loginWithUserId(userId) {
    window.localStorage.setItem(USER_KEY, userId);
    this.router.transitionTo('teams');
  }

  logout() {
    window.localStorage.removeItem(USER_KEY);
    this.router.transitionTo('login');
  }
}
