const TelegramApi = require('node-telegram-bot-api');

const botToken = '5294690246:AAEyaUOfgSIhxDApCllgE-Kw81MXq3bmp1s';

const bot = new TelegramApi(botToken, {polling: true});

const chatBD = {};

const playAgain = {
    reply_markup: JSON.stringify(
        {
            inline_keyboard: [
                [{text: 'Играть еще раз', callback_data: '/again'}]
            ]
        }
    )
}
    

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, а ты должен ее угадать, давай х1ал бих1ия бугущин духъго жойин лъаз бук1ин')
    const randomNumber = Math.floor(Math.random() * 10);
    chatBD[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай !', {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
                [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
                [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
                [{text: '0', callback_data: '0'}]
            ]
        })
    })
}


const start = () => {

    bot.setMyCommands(
        [
            {command: '/info', description: 'Гьани дуд бицин буг мун щивали'},
            {command: '/start', description: 'Гьаб буго бот биччал команда, ч1инкъия'},
            {command: '/game', description: 'Гьаб буго игра, вач1-цо, цо дагь васандизилин мунго'}
        ]
    )

    bot.on('message', async msg => {

        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            return await bot.sendMessage(chatId, 'Добро пожаловать в наш чат, если вас что-то интересует можете задать вопрос сюда, вдруг не смогу ответить направлю к профессионалу')
        }

        if (text === '/info') {
            return await bot.sendMessage(chatId, `Дуд ц1ар буго ${msg.from.first_name}, фамилияги ${msg.from.last_name}`)
        }

        if (text === '/game') {
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю, поставь нормальные диски')

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId);
        }


        if (data === chatBD[chatId]) {
            return bot.sendMessage(chatId, `Вот ты красавчик ${msg.from.first_name}, ты отгадал правильно`, playAgain)
        } else {
         return  bot.sendMessage(chatId, `Не переживай уцы может повезет в следующий раз, бот загадал ${chatBD[chatId]}`, playAgain)
        }



    })
}

start();


