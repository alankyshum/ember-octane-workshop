import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TeamSidebarComponent extends Component {
  @service auth;

  @action
  logout() {
    this.auth.logout();
  }
}
