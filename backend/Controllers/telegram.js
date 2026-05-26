const axios = require("axios");
require("dotenv").config();

const BOT_TOKEN = process.env.MY_BOT_TOKEN;
const CHAT_ID = process.env.MY_CHAT_ID;

async function sendMessage(text) {
    try {
        await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: text
            }
        );

        console.log("Message sent");
    } catch (err) {
        console.log("Error:", err);
    }
}

module.exports = {sendMessage};