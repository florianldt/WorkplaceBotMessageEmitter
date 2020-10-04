import fetch from 'node-fetch';

const BASE_URL = 'https://graph.facebook.com/v6.0/me/messages?access_token=';
let BOT_ACCESS_TOKEN = '';
let WORPLACE_THREAD_KEY = '';

const renderEmote = (type) => {
    let emote = '';
    switch (type) {
        case 'error':
            emote = '❌';
            break;
        case 'info':
            emote = 'ℹ️';
            break;
        case 'success':
            emote = '✅';
            break;
        case 'warning':
            emote = '⚠️';
            break;
    }
    return emote;
};

const renderText = (title, message) => {
    let text = '';
    if (title) text += ' ' + title;
    if (message) {
        if (title) text += '\n' + message;
        else text += ' ' + message;
    }
    return text;
};

export const init = (botAccessToken, workplaceThreadId) => {
    BOT_ACCESS_TOKEN = botAccessToken;
    WORPLACE_THREAD_KEY = workplaceThreadId;
};

export const sendMessage = (type, title, message) => {
    return new Promise(function(resolve, reject) {
        if (!BOT_ACCESS_TOKEN && !WORPLACE_THREAD_KEY) {
            reject(Error('Workplace Bot Message Emitter not initialized'));
        }

        const emote = renderEmote(type);
        const text = renderText(title, message);
        const payload = {
            recipient: {
                thread_key: WORPLACE_THREAD_KEY,
            },
            message: {
                text: emote + text,
            },
        };

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };

        resolve(fetch(BASE_URL + BOT_ACCESS_TOKEN, config));
    });
};
