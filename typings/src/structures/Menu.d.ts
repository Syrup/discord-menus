import { EmbedBuilder } from 'discord.js';
import { ButtonBuilder } from './ButtonBuilder';
import { Message } from './Message';
interface MessageOptions {
    /**
     * Button or button array
     */
    buttons?: ButtonBuilder | ButtonBuilder[];
    /**
     * Ephemeral?
     */
    ephemeral?: boolean;
}
interface MemberOptions {
    /**
     * Member ID
     */
    id: string;
    /**
     * Member username
     */
    username: string;
    /**
     * Member discriminator
     */
    discriminator: string;
    /**
     * Member tag
     */
    tag: string;
    /**
     * Member avatar
     */
    avatar: string;
}
/**
 * Class symbolizing a `Menu`
 * @class
 */
export declare class Menu {
    /**
     * The menu channel ID
     */
    channelID: string;
    /**
     * The menu ID
     */
    id: string;
    /**
     * The menu guild ID
     */
    guildID: string;
    /**
     * The menu application ID
     */
    applicationID: string;
    /**
     * The menu custom ID
     */
    customID: string;
    /**
     * The menu selected values
     */
    values: string[];
    /**
     * The interaction token
     */
    token: string;
    /**
     * The interaction member
     */
    member: MemberOptions;
    /**
     * The interaction message
     */
    message: Message;
    private _token;
    private emitter;
    /**
     * Create a new Menu
     * @param {any} data
     * @param {string} token
     * @param {any} emitter
     * @constructor
     */
    constructor(data: any, token: string, emitter: any);
    /**
     * Reply to the interaction
     * @param {string|EmbedBuilder} message
     * @param {MessageOptions} options
     * @returns {Promise<void>}
     * @example menu.reply('some reply');
     */
    reply(message: string | EmbedBuilder, options?: MessageOptions): Promise<void>;
    /**
     * Edit the message button
     * @param {string|EmbedBuilder} message
     * @param {SendOptions} options
     * @returns {Promise<void>}
     * @example menu.edit('some edit');
     */
    edit(message: string | EmbedBuilder, options?: MessageOptions): Promise<void>;
    /**
     * Thinking reply
     * @param {boolean} ephemeral
     * @returns {Promise<void>}
     * @example menu.think();
     */
    think(ephemeral?: boolean): Promise<void>;
    /**
     * Defer the interaction
     * @returns {Promise<void>}
     * @example menu.defer();
     */
    defer(): Promise<void>;
}
export {};
