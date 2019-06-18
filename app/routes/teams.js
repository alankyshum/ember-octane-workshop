import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeamsRoute extends Route {
  @service auth;

  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (!this.auth.currentUserId) {

      /**
       * NOTES: Do not use `replaceWith`, otherwise the history will be affected,
       * then users cannot go back and forward anymore
       */
      this.transitionTo('/login');
    }
  }
}
