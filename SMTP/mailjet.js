

//send Mailjet

const mailjet = require('node-mailjet')
.connect('84dc84ed059a247c54f586adc3f36101', '0a39ce052eb8cc25df1dd48dbdf60669');


const request = mailjet.post('send', {'version': 'v3.1'})
.request({
    'Messages':[
        {
            'From': {
                'Email': <email>,
                'Name': <name>
            },
            'To': [
                {
                    'Email': <email>,
                    'Name': <name>
                }
            ],
            'Subject': 'Greetings from Mailjet.',
            'TextPart': 'My first Mailjet email',
            'HTMLPart': '<h3> Dear passenger, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3>',
            'CustomId': 'AppGettingStartedTest'

        }
    ]
});

// request.then(res => {
//     console.log(res.body);
// })
// .catch(err => {
//     console.log(err.statusCode);
// });
