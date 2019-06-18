import Route from '@ember/routing/route';

export default class TeamsTeamChannelRoute extends Route {
  model({ channelId }) {
    const { channels } = this.modelFor('teams.team');

    const matches = channels.filter(({ id }) => {
      channelId === id;
    });

    return matches[0];
  }
}
