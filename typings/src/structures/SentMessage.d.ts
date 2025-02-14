import { EmbedBuilder } from 'discord.js';
import { ButtonBuilder } from './ButtonBuilder';
import { MenuBuilder } from './MenuBuilder';
interface MessageOptions {
    /**
     * Button or button array
     */
    buttons?: ButtonBuilder | ButtonBuilder[];
    /**
     * Message menu (don't add a menu if the message already contains one)
     */
    menu?: MenuBuilder;
}
interface AuthorOptions {
    /**
     * Author ID
     */
    id: string;
    /**
     * Author username
     */
    username: string;
    /**
     * Author discriminator
     */
    discriminator: string;
    /**
     * Author tag
     */
    tag: string;
    /**
     * Author avatar
     */
    avatar: string | null;
    /**
     * Is the author a bot ?
     */
    bot?: boolean;
}
/**
 * Class symbolizing a `SentMessage`
 * @class
 */
export declare class SentMessage {
    /**
     * The message ID
     */
    id: string;
    /**
     * The message type
     */
    type: string;
    /**
     * The message content
     */
    content: string;
    /**
     * The message author
     */
    author: AuthorOptions;
    /**
     * The message channel ID
     */
    channelID: string;
    /**
     * The message timestamp
     */
    timestamp: string;
    /**
     * The message components?
     */
    components?: any;
    /**
     * The message embeds?
     */
    embeds?: any;
    private _token;
    private emitter;
    /**
     * Create a new SentMessage
     * @param {any} data
     * @constructor
     */
    constructor(data: any, token: string, emitter: any);
    /**
     * Delete the sent message
     * @returns {Promise<void>}
     * @example message.delete();
     */
    delete(): Promise<void>;
    /**
     * Edit the sent message
     * @param {string|EmbedBuilder} message
     * @param {SendOptions} options
     * @returns {Promise<void>}
     * @example messahe.edit('some edit');
     */
    edit(message: string | EmbedBuilder, options?: MessageOptions): Promise<void>;
}
export {};
