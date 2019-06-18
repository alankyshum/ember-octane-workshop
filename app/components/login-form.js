import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @tracked userId = null;

  @service auth;

  get isDisabled() {
    return !this.userId;
  }

  @action
  onSelectChange(evt) {
    this.userId = evt.target.value;
  }

  /**
   * NOTES: using @action decorator: allows binding `this` in the template
   * imported from `@ember/object`
   */
  @action
  onLoginFormSubmit(evt /* DOM event */) {
    evt.preventDefault();
    if (!this.userId) return;
    this.auth.loginWithUserId(this.userId);
  }
}
