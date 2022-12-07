import { EventEmitter } from 'events';
import fetch from 'node-fetch';
import { Client, EmbedBuilder, Message, CommandInteraction, Embed, APIEmbed } from 'discord.js';

import { Menu } from './Menu';
import { ButtonBuilder } from './ButtonBuilder';
import { MenuBuilder } from './MenuBuilder';
import { Button } from './Button';
import { SentMessage } from './SentMessage';

type Errors = 'POST_ERROR' | 'DELETE_ERROR';

type Warns = 'NO_MENU_PROVIDED' | 'NO_BUTTON_PROVIDED';

interface DiscordMenusEvents {
  MENU_CLICKED: [menu: Menu];
  menuClicked: [menu: Menu];
  ERROR: [error: Errors];
  error: [error: Errors];
  WARN: [warn: Warns];
  warn: [warn: Warns];
  READY: [];
  ready: [];
  BUTTON_CLICKED: [button: Button];
  buttonClicked: [button: Button];
}

export declare interface DiscordMenus extends EventEmitter {
  on<K extends keyof DiscordMenusEvents>(
    event: K,
    listener: (...args: DiscordMenusEvents[K]) => void | Promise<void>,
  ): this;
}

interface SendOptionsMenu {
  /**
   * The menu **(only one)**
   */
  menu?: MenuBuilder;
}

interface SendOptionsButton {
  /**
   * The button or button array
   */
  buttons?: ButtonBuilder | ButtonBuilder[];
}

/**
 * Class symbolizing a `DiscordMenus`
 * @class
 * @extends {EventEmitter}
 */
export class DiscordMenus extends EventEmitter {
  /**
   * Discord.JS client
   * @type {Client}
   */
  public client: Client;
  public payload: { content: string; embeds: Embed[] | APIEmbed[]; components: object[] };

  /**
   * Create a new DiscordMenus
   * @param {Client} client
   * @constructor
   */
  constructor(client: Client) {
    super();
    if (!client) throw new SyntaxError('INVALID_DISCORD_CLIENT');
    this.client = client;
    this._awaitEvents();
    this.payload = {
      content: '',
      embeds: [],
      components: [],
    };
  }

  /**
   * Send the menu
   * @param {Message|CommandInteraction} message
   * @param {string|EmbedBuilder} content
   * @param {SendOptions} options
   * @returns {Promise<SentMessage>}
   * @example
   * MenusManager.sendMenu(message, 'content', { menu: myCoolMenu });
   * MenusManager.sendMenu(interaction, 'content', { menu: myCoolMenu });
   */
  public async sendMenu(
    message: Message | CommandInteraction,
    content: string | EmbedBuilder,
    options?: SendOptionsMenu,
  ): Promise<SentMessage> {
    if (!content) throw new SyntaxError('INVALID_MESSAGE');
    let returnData;
    switch (typeof content) {
      case 'string':
        this.payload.content = content;
        break;
      default:
        try {
          this.payload.embeds = [content.toJSON()];
        } catch (err) {
          throw new Error('INVALID_CONTENT ' + err);
        }
        break;
    }
    if (options?.menu) {
      this.payload.components = [
        {
          type: 1,
          components: [options.menu.getJSON()],
        },
      ];
    } else {
      this.emit('WARN', 'NO_MENU_PROVIDED');
      this.emit('warn', 'NO_MENU_PROVIDED');
    }
    await fetch(`https://discord.com/api/v9/channels/${message.channel!.id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bot ' + this.client.token,
      },
      body: JSON.stringify(this.payload),
    }).then(async (res) => {
      if (res.status !== 200) {
        this.emit('ERROR', 'POST_ERROR');
        this.emit('error', 'POST_ERROR');
      }
      returnData = await res.json();
    });
    return new SentMessage(returnData, this.client.token!, this);
  }

  /**
   * Send the menu
   * @param {Message|CommandInteraction} message
   * @param {string|MessageEmbed} content
   * @param {SendOptions} options
   * @returns {Promise<SentMessage>}
   * @example MenusManager.sendButton(message, 'content', { buttons: [button1, button2] });
   */
  public async sendButton(
    message: Message | CommandInteraction,
    content: string | EmbedBuilder,
    options?: SendOptionsButton,
  ): Promise<SentMessage> {
    if (!content) throw new SyntaxError('INVALID_MESSAGE');
    let returnData;
    switch (typeof content) {
      case 'string':
        this.payload.content = content;
        break;
      default:
        try {
          this.payload.embeds = [content.toJSON()];
        } catch (err) {
          throw new Error('INVALID_CONTENT ' + err);
        }
        break;
    }
    if (options?.buttons) {
      this.payload.components = [
        {
          type: 1,
          components: Array.isArray(options.buttons)
            ? options.buttons.map((btn) => btn.getJSON())
            : [options.buttons.getJSON()],
        },
      ];
    } else {
      this.emit('WARN', 'NO_BUTTON_PROVIDED');
      this.emit('warn', 'NO_BUTTON_PROVIDED');
    }
    await fetch(`https://discord.com/api/v9/channels/${message.channel!.id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bot ' + this.client.token,
      },
      body: JSON.stringify(this.payload),
    }).then(async (res) => {
      if (res.status !== 200) {
        this.emit('ERROR', 'POST_ERROR');
        this.emit('error', 'POST_ERROR');
      }
      returnData = await res.json();
    });
    return new SentMessage(returnData, this.client.token!, this);
  }

  private async _awaitEvents(): Promise<void> {
    this.emit('READY');
    this.emit('ready');
    this.client.on('interactionCreate', (interaction: any) => {
      if (interaction.data.component_type === 3) {
        this.emit('MENU_CLICKED', new Menu(interaction, this.client.token!, this));
        this.emit('menuClicked', new Menu(interaction, this.client.token!, this));
      } else if (interaction.data.component_type === 2) {
        this.emit('BUTTON_CLICKED', new Button(interaction, this.client.token!, this));
        this.emit('buttonClicked', new Button(interaction, this.client.token!, this));
      }
    });
  }
}
