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
exports.SentMessage = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
/**
 * Class symbolizing a `SentMessage`
 * @class
 */
class SentMessage {
    /**
     * Create a new SentMessage
     * @param {any} data
     * @constructor
     */
    constructor(data, token, emitter) {
        this._token = token;
        this.emitter = emitter;
        this.id = data.id;
        this.type = data.type;
        this.content = data.content;
        this.author = {
            username: data.author.username,
            id: data.author.id,
            discriminator: data.author.discriminator,
            avatar: data.author.avatar,
            bot: data.author.bot,
            tag: `${data.author.username}#${data.author.discriminator}`,
        };
        this.channelID = data.channel_id;
        this.timestamp = data.timestamp;
        this.components = data.components;
    }
    /**
     * Delete the sent message
     * @returns {Promise<void>}
     * @example message.delete();
     */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield node_fetch_1.default(`https://discord.com/api/v9/channels/${this.channelID}/messages/${this.id}`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bot ' + this._token,
                },
                method: 'DELETE',
            }).then((res) => {
                if (res.status !== 204) {
                    this.emitter.emit('ERROR', 'DELETE_ERROR');
                    this.emitter.emit('error', 'DELETE_ERROR');
                }
                return;
            });
            return;
        });
    }
    /**
     * Edit the sent message
     * @param {string|EmbedBuilder} message
     * @param {SendOptions} options
     * @returns {Promise<void>}
     * @example messahe.edit('some edit');
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
            if ((options === null || options === void 0 ? void 0 : options.buttons) && options.menu)
                throw new SyntaxError('BUTTON_AND_MENU_PROVIDED');
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
            if (options === null || options === void 0 ? void 0 : options.menu) {
                payload.components = [
                    {
                        type: 1,
                        components: [options.menu.getJSON()],
                    },
                ];
            }
            yield node_fetch_1.default(`https://discord.com/api/v9/channels/${this.channelID}/messages/${this.id}`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bot ' + this._token,
                },
                method: 'PATCH',
                body: JSON.stringify(payload),
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
exports.SentMessage = SentMessage;
