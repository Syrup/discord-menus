import { EventEmitter } from 'events';
import { Client, EmbedBuilder, Message, CommandInteraction, Embed, APIEmbed } from 'discord.js';
import { Menu } from './Menu';
import { ButtonBuilder } from './ButtonBuilder';
import { MenuBuilder } from './MenuBuilder';
import { Button } from './Button';
import { SentMessage } from './SentMessage';
declare type Errors = 'POST_ERROR' | 'DELETE_ERROR';
declare type Warns = 'NO_MENU_PROVIDED' | 'NO_BUTTON_PROVIDED';
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
    on<K extends keyof DiscordMenusEvents>(event: K, listener: (...args: DiscordMenusEvents[K]) => void | Promise<void>): this;
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
export declare class DiscordMenus extends EventEmitter {
    /**
     * Discord.JS client
     * @type {Client}
     */
    client: Client;
    payload: {
        content: string;
        embeds: Embed[] | APIEmbed[];
        components: object[];
    };
    /**
     * Create a new DiscordMenus
     * @param {Client} client
     * @constructor
     */
    constructor(client: Client);
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
    sendMenu(message: Message | CommandInteraction, content: string | EmbedBuilder, options?: SendOptionsMenu): Promise<SentMessage>;
    /**
     * Send the menu
     * @param {Message|CommandInteraction} message
     * @param {string|MessageEmbed} content
     * @param {SendOptions} options
     * @returns {Promise<SentMessage>}
     * @example MenusManager.sendButton(message, 'content', { buttons: [button1, button2] });
     */
    sendButton(message: Message | CommandInteraction, content: string | EmbedBuilder, options?: SendOptionsButton): Promise<SentMessage>;
    private _awaitEvents;
}
export {};
