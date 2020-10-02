import fetch from 'node-fetch';

const BASE_URL = 'https://graph.facebook.com/v6.0/me/messages?access_token=';
const BOT_ACCESS_TOKEN = '';
const WORPLACE_THREAD_KEY = '';

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

export const sendMessage = (type, title, message) => {
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

    fetch(BASE_URL + BOT_ACCESS_TOKEN, config)
        .then((data) => {
            console.log('✅', data);
        })
        .catch((e) => console.error(e));
};
