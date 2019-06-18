import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ChannelContainerComponent extends Component {
  @tracked messages = [];

  @action
  async loadMessages() {
    // api/teams/li/channels/general/messages
    const { channel } = this.args;
    const resp = await fetch(`/api/teams/${channel.teamId}/channels/${channel.id}/messages`);
    this.messages = await resp.json();
  }
}
