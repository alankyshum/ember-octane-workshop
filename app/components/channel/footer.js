import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ChannelFooterComponent extends Component {
  @tracked inputValue = '';

  @action
  updateInput(evt) {
    this.inputValue = evt.target.value;
  }

  @action
  async createMessage(evt) {
    evt.preventDefault();
    await this.args.create(this.inputValue);
    this.inputValue = "";
  }
}
