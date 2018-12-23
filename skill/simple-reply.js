"use strict";

const debug = require('debug')('bot-express:skill');
Promise = require('bluebird');

module.exports = class SkillSimpleReply {

    constructor(){
        this.required_parameter = {
            aaaa: {
                message_to_confirm: {
                    type: "text",
                    text: "にぁーす"
                }
            },
            body: {
                message_to_confirm: {
                    type: "text",
                    text: "OK. 本文プリーズ"
                }
            },
            user_id: {
                message_to_confirm: {
                    type: "text",
                    text: "ユーザーIDをプリーズ"
                }
            }
        }

        this.clear_context_on_finish = true;
    }

    async finish(bot, event, context){
        let first_message = context.previous.message[context.previous.message.length - 1];

        let first_message_text;
        if (bot.type == "line"){
            first_message_text = first_message.message.data;
        } else if (bot.type == "facebook"){
            first_message_text = first_message.message.payload;
        }

        // Promise List.
        let tasks = [];

        // ### Tasks Overview ###
        // -> Send message to original user.
        // -> Reply to administrator. Just say OK.
        console.log("bot.type ::: "+bot.type);
        console.log(context.confirmed);

        // -> Reply to original user.
        tasks.push(bot.send(context.confirmed.user_id, {
            type: "text",
            text: context.confirmed.body
        }));

        // -> Reply to administrator. Just say OK.
        tasks.push(bot.reply({
            type: "text",
            text: "了解。ユーザーへ返信しておきますー。"
        }));

        await Promise.all(tasks);
    }
};
