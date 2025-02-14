import { EmbedBuilder } from 'discord.js';
import { Message } from './Message';
import { ButtonBuilder } from './ButtonBuilder';
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
/**
 * Class symbolizing a `Button`
 * @class
 */
export declare class Button {
    /**
     * The guild ID
     */
    guildID: string;
    /**
     * The button ID
     */
    id: string;
    /**
     * Thz button custom ID
     */
    customID: string;
    /**
     * The button token
     */
    token: string;
    /**
     * The application ID
     */
    applicationID: string;
    /**
     * The message
     */
    message: Message;
    /**
     * The member
     */
    member: MemberOptions;
    /**
     * The channel ID
     */
    channelID: string;
    private _token;
    private emitter;
    /**
     * Create a new Button
     * @param {any} data
     * @param {string} token
     * @param {any} emitter
     */
    constructor(data: any, token: string, emitter: any);
    /**
     * Reply to the interaction
     * @param {string|EmbedBuilder} message
     * @param {MessageOptions} options
     * @returns {Promise<void>}
     * @example button.reply('some content');
     */
    reply(message: string | EmbedBuilder, options?: MessageOptions): Promise<void>;
    /**
     * Edit the message button
     * @param {string|number|DiscordEmbed} message
     * @param {SendOptions} options
     * @returns {Promise<void>}
     * @example button.edit('some edit');
     */
    edit(message: string | EmbedBuilder, options?: MessageOptions): Promise<void>;
    /**
     * Thinking reply
     * @param {boolean} ephemeral
     * @returns {Promise<void>}
     * @example button.think();
     */
    think(ephemeral?: boolean): Promise<void>;
    /**
     * Defer the interaction
     * @returns {Promise<void>}
     * @example button.defer();
     */
    defer(): Promise<void>;
}
export {};
