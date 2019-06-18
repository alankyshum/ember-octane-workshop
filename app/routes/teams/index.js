import Route from '@ember/routing/route';

export default class TeamsIndexRoute extends Route {
  /**
   * NOTE: Hit only when there's no teamId, as this is `index` for `/`
   */
  async beforeModel(transition) {
    await super.beforeModel(transition);
    const teams = this.modelFor('teams');
    this.transitionTo('teams.team', teams[0].id);
  }
}
