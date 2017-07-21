const http = require('http');

const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `438826880:AAEDzhIpPfSdRP5JH3RpVLWJ9OO4B40qdzQ`

const bot = new TelegramBot( TOKEN, { polling: true } )

var timeout = 0;

const TIME = 1800000;

const msgs = [
    "nada mais importa",
    "hoje acordei cinza",
    "o céu a noite é preto, como a minha alma",
    "O cúmulo da depressão é ainda na barriga da mãe, tentar se enforcar com o cordão umbilical",
    "minha felicidade brigou com meu coração e abortaram a minha alma",
    "Eu sou rico. Rico de vazio"
];

const lastMsgs = new Array(msgs.length);

const getRand = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const randomMsg = () => {
    var msg = msgs[getRand(0, msgs.length-1)];
    return msg;
}

const isInHistory = (theMsg) => {
    var checkArray = lastMsgs.slice(0);
    return checkArray.filter((msg) => {
        return msg === theMsg;
    }).length > 0;
}

const checkHistory = (theMsg) => {
    var msg = randomMsg();
    if(isInHistory(theMsg)){
        console.log("[ERRO]", theMsg, "ESTA NO HISTORICO, checar", msg)
        return checkHistory(msg);
    }else{
        console.log("[OK]", theMsg, "NAO ESTA NO HISTORICO")
        return theMsg;
    }
}

const sendMsg = (msg, match) => {
    var text = msg.text.toLowerCase();
    var msgToSend = "mentira, isso tudo é mentira";
    if(text.match(/(amor|calma|paz|assim)/)){
        bot.sendMessage( msg.chat.id, msgToSend);
    }else if(!text.match(/\/start/)){
        msgToSend = checkHistory(randomMsg());
        setTimeout(() => {
            bot.sendMessage( msg.chat.id, msgToSend);
        }, 1000);
    }
    lastMsgs[0] = msgToSend;
    for(var i = 0, total = msgs.length - 1; i < total; i++){
        lastMsgs[i+1] = lastMsgs[i];
    }
}

const autoMsg = () => {
    clearTimeout(timeout);
    bot.sendMessage( msg.chat.id, checkHistory(randomMsg()));
    timeout = setTimeout(autoMsg, TIME);
}

bot.onText( /(^\/start|.*)/, sendMsg);
timeout = setTimeout(autoMsg, TIME);
console.log('rodando bot...')

http.createServer(()=>{}).listen(process.env.PORT || 6000)