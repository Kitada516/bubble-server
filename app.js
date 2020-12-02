const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug')

const port = 80;

app.post('/api/messages/', async (req, res) => {
    const message = req.body.message;
    await models.Message.create({
        text: message
    });
    res.redirect('/complete.html')
});

app.get('/api/messages/', async (req, res) => {
    const messages = await models.Message.findAll();
    res.json({
        messages: messages
    });
});

app.get('/api/messages/:messageId/', async (req, res) => {
    const message = await models.Message.findOne({
        where: {
            id: req.params.messageId
        }
    });
    res.json(message);
});

app.get('/analyze/', async (req, res) => {
    const messages = await models.Message.findAll();
    res.render('analyze', { title: 'Hey', messages: messages })
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});
