import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  @tracked userId = null;

  get isDisabled() {
    return !this.userId;
  }

  handleSignIn(userId) {
    console.log(userId);
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
    const { target } = evt;
    const selectElem = target.querySelector('select');
    this.handleSignIn(selectElem.value);
  }
}
