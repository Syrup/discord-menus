"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const Message_1 = require("./Message");
/**
 * Class symbolizing a `Menu`
 * @class
 */
class Menu {
    /**
     * Create a new Menu
     * @param {any} data
     * @param {string} token
     * @param {any} emitter
     * @constructor
     */
    constructor(data, token, emitter) {
        this.emitter = emitter;
        if (!data)
            throw new Error('INVALID_MENU_DATA');
        this.channelID = data.channel_id;
        this.id = data.id;
        this.guildID = data.guild_id;
        this.applicationID = data.application_id;
        this.customID = data.data.custom_id;
        this.values = data.data.values;
        this.token = data.token;
        this.member = {
            avatar: data.member.user.avatar,
            id: data.member.user.id,
            username: data.member.user.username,
            discriminator: data.member.user.discriminator,
            tag: `${data.member.user.username}#${data.member.user.discriminator}`,
        };
        this._token = token;
        this.message = new Message_1.Message(data.message, this._token, this);
    }
    /**
     * Reply to the interaction
     * @param {string|EmbedBuilder} message
     * @param {MessageOptions} options
     * @returns {Promise<void>}
     * @example menu.reply('some reply');
     */
    reply(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message)
                throw new SyntaxError('INVALID_MESSAGE');
            const payload = {
                content: '',
                embeds: [],
                components: [],
                flags: (options === null || options === void 0 ? void 0 : options.ephemeral) ? 64 : null,
            };
            switch (typeof message) {
                case 'string':
                    payload.content = message;
                    break;
                default:
                    try {
                        payload.embeds = [message.toJSON()];
                    }
                    catch (err) {
                        throw new Error('INVALID_MESSAGE ' + err);
                    }
                    break;
            }
            if (options === null || options === void 0 ? void 0 : options.buttons) {
                payload.components = [
                    {
                        type: 1,
                        components: Array.isArray(options.buttons)
                            ? options.buttons.map((btn) => btn.getJSON())
                            : [options.buttons.getJSON()],
                    },
                ];
            }
            yield node_fetch_1.default(`https://discord.com/api/v9/interactions/${this.id}/${this.token}/callback`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bot ' + this._token,
                },
                method: 'POST',
                body: JSON.stringify({
                    type: 4,
                    data: payload,
                }),
            }).then((res) => {
                if (res.status !== 200) {
                    this.emitter.emit('ERROR', 'POST_ERROR');
                    this.emitter.emit('error', 'POST_ERROR');
                }
                return;
            });
            return;
        });
    }
    /**
     * Edit the message button
     * @param {string|EmbedBuilder} message
     * @param {SendOptions} options
     * @returns {Promise<void>}
     * @example menu.edit('some edit');
     */
    edit(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message)
                throw new SyntaxError('INVALID_MESSAGE');
            const payload = {
                content: '',
                embeds: [],
                components: [],
            };
            switch (typeof message) {
                case 'string':
                    payload.content = message;
                    break;
                default:
                    try {
                        payload.embeds = [message.toJSON()];
                    }
                    catch (err) {
                        throw new Error('INVALID_MESSAGE ' + err);
                    }
                    break;
            }
            if (options === null || options === void 0 ? void 0 : options.buttons) {
                payload.components = [
                    {
                        type: 1,
                        components: Array.isArray(options.buttons)
                            ? options.buttons.map((btn) => btn.getJSON())
                            : [options.buttons.getJSON()],
                    },
                ];
            }
            yield node_fetch_1.default(`https://discord.com/api/v9/interactions/${this.id}/${this.token}/callback`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bot ' + this._token,
                },
                method: 'POST',
                body: JSON.stringify({
                    type: 7,
                    data: payload,
                }),
            }).then((res) => {
                if (res.status !== 200) {
                    this.emitter.emit('ERROR', 'POST_ERROR');
                    this.emitter.emit('error', 'POST_ERROR');
                }
                return;
            });
            return;
        });
    }
    /**
     * Thinking reply
     * @param {boolean} ephemeral
     * @returns {Promise<void>}
     * @example menu.think();
     */
    think(ephemeral) {
        return __awaiter(this, void 0, void 0, function* () {
            yield node_fetch_1.default(`https://discord.com/api/v9/interactions/${this.id}/${this.token}/callback`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bot ' + this._token,
                },
                method: 'POST',
                body: JSON.stringify({
                    data: {
                        flags: ephemeral ? 64 : null,
                    },
                    type: 5,
                }),
            }).then((res) => {
                if (res.status !== 200) {
                    this.emitter.emit('ERROR', 'POST_ERROR');
                    this.emitter.emit('error', 'POST_ERROR');
                }
                return;
            });
            return;
        });
    }
    /**
     * Defer the interaction
     * @returns {Promise<void>}
     * @example menu.defer();
     */
    defer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield node_fetch_1.default(`https://discord.com/api/v9/interactions/${this.id}/${this.token}/callback`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bot ' + this._token,
                },
                method: 'POST',
                body: JSON.stringify({
                    type: 6,
                }),
            }).then((res) => {
                if (res.status !== 200) {
                    this.emitter.emit('ERROR', 'POST_ERROR');
                    this.emitter.emit('error', 'POST_ERROR');
                }
                return;
            });
            return;
        });
    }
}
exports.Menu = Menu;
