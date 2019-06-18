import AuthService from 'shlack/services/auth';

export default class StubbedAuthService extends AuthService {
  _usreId = null;

  get _getUserId() {
    return this.userId;
  }

  _setUserId(userId) {
    this.userId = userId;
  }
}
