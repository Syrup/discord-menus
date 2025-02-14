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
exports.Message = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
/**
 * Class symbolizing a `Message`
 * @class
 */
class Message {
    /**
     * Create a new Message
     * @param {any} data
     * @param {string} token
     * @constructor
     */
    constructor(data, token, emitter) {
        this.emitter = emitter;
        this._token = token;
        this.id = data.id;
        this.type = data.type;
        this.timestamp = data.timestamp;
        this.mentions = data.mentions;
        this.embeds = data.embeds || undefined;
        this.content = data.content;
        this.components = data.components;
        this.channelID = data.channel_id;
        this.author = {
            username: data.author.username,
            discriminator: data.author.discriminator,
            avatar: data.author.avatar,
            id: data.author.id,
            bot: data.author.bot,
            tag: `${data.author.username}#${data.author.discriminator}`,
        };
    }
    /**
     * Delete the message
     * @returns {Promise<void>}
     * @example menu.message.delete();
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
}
exports.Message = Message;
