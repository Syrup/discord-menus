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
exports.DiscordMenus = void 0;
const events_1 = require("events");
const node_fetch_1 = __importDefault(require("node-fetch"));
const Menu_1 = require("./Menu");
const Button_1 = require("./Button");
const SentMessage_1 = require("./SentMessage");
/**
 * Class symbolizing a `DiscordMenus`
 * @class
 * @extends {EventEmitter}
 */
class DiscordMenus extends events_1.EventEmitter {
    /**
     * Create a new DiscordMenus
     * @param {Client} client
     * @constructor
     */
    constructor(client) {
        super();
        if (!client)
            throw new SyntaxError('INVALID_DISCORD_CLIENT');
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
    sendMenu(message, content, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content)
                throw new SyntaxError('INVALID_MESSAGE');
            let returnData;
            switch (typeof content) {
                case 'string':
                    this.payload.content = content;
                    break;
                default:
                    try {
                        this.payload.embeds = [content.toJSON()];
                    }
                    catch (err) {
                        throw new Error('INVALID_CONTENT ' + err);
                    }
                    break;
            }
            if (options === null || options === void 0 ? void 0 : options.menu) {
                this.payload.components = [
                    {
                        type: 1,
                        components: [options.menu.getJSON()],
                    },
                ];
            }
            else {
                this.emit('WARN', 'NO_MENU_PROVIDED');
                this.emit('warn', 'NO_MENU_PROVIDED');
            }
            yield node_fetch_1.default(`https://discord.com/api/v9/channels/${message.channel.id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bot ' + this.client.token,
                },
                body: JSON.stringify(this.payload),
            }).then((res) => __awaiter(this, void 0, void 0, function* () {
                if (res.status !== 200) {
                    this.emit('ERROR', 'POST_ERROR');
                    this.emit('error', 'POST_ERROR');
                }
                returnData = yield res.json();
            }));
            return new SentMessage_1.SentMessage(returnData, this.client.token, this);
        });
    }
    /**
     * Send the menu
     * @param {Message|CommandInteraction} message
     * @param {string|MessageEmbed} content
     * @param {SendOptions} options
     * @returns {Promise<SentMessage>}
     * @example MenusManager.sendButton(message, 'content', { buttons: [button1, button2] });
     */
    sendButton(message, content, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content)
                throw new SyntaxError('INVALID_MESSAGE');
            let returnData;
            switch (typeof content) {
                case 'string':
                    this.payload.content = content;
                    break;
                default:
                    try {
                        this.payload.embeds = [content.toJSON()];
                    }
                    catch (err) {
                        throw new Error('INVALID_CONTENT ' + err);
                    }
                    break;
            }
            if (options === null || options === void 0 ? void 0 : options.buttons) {
                this.payload.components = [
                    {
                        type: 1,
                        components: Array.isArray(options.buttons)
                            ? options.buttons.map((btn) => btn.getJSON())
                            : [options.buttons.getJSON()],
                    },
                ];
            }
            else {
                this.emit('WARN', 'NO_BUTTON_PROVIDED');
                this.emit("warn", 'NO_BUTTON_PROVIDED');
            }
            yield node_fetch_1.default(`https://discord.com/api/v9/channels/${message.channel.id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bot ' + this.client.token,
                },
                body: JSON.stringify(this.payload),
            }).then((res) => __awaiter(this, void 0, void 0, function* () {
                if (res.status !== 200) {
                    this.emit('ERROR', 'POST_ERROR');
                    this.emit('error', 'POST_ERROR');
                }
                returnData = yield res.json();
            }));
            return new SentMessage_1.SentMessage(returnData, this.client.token, this);
        });
    }
    _awaitEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit('READY');
            this.emit('ready');
            this.client.on('interactionCreate', (interaction) => {
                if (interaction.data.component_type === 3) {
                    this.emit('MENU_CLICKED', new Menu_1.Menu(interaction, this.client.token, this));
                    this.emit('menuClicked', new Menu_1.Menu(interaction, this.client.token, this));
                }
                else if (interaction.data.component_type === 2) {
                    this.emit('BUTTON_CLICKED', new Button_1.Button(interaction, this.client.token, this));
                    this.emit('buttonClicked', new Button_1.Button(interaction, this.client.token, this));
                }
            });
        });
    }
}
exports.DiscordMenus = DiscordMenus;
