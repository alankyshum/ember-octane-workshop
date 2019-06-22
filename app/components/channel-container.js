import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ChannelContainerComponent extends Component {
  @service auth;
  @tracked messages = [];

  @action
  async createMessage(body) {
    const { teamId, id: channelId } = this.args.channel;
    const currentUser = this.auth.currentUser;
    const userId = this.auth.currentUserId;

    const resp = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body,
        teamId,
        channelId,
        userId,
      })
    });

    if (this.isDestroying) return;
    if (!resp.ok) {
      throw new Error('Problem creating new message: ' + await resp.text());
    }

    const newMessage = await resp.json();
    this.messages = [
      ...this.messages,
      {...newMessage, user: currentUser }
    ];

    /**
     * NOTES: need to assign the message again to trigger update
     * this.messages.push({...newMessage, user: currentUser });
     * this.messages = this.messages;
     */
  }

  @action
  async loadMessages() {
    // api/teams/li/channels/general/messages
    const { channel } = this.args;
    if (!channel) return;
    const resp = await fetch(`/api/teams/${channel.teamId}/channels/${channel.id}/messages`);
    this.messages = await resp.json();
  }
}
