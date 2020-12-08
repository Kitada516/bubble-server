const express = require('express');  //Expressをnode_modulesから呼び出すための変数宣言
const bodyParser = require('body-parser');  //body-parserをnode_modulesから呼び出すための変数宣言
const models = require('./models');  //modelsディレクトリを呼び出すための変数宣言
const app = express();  //Expressの関数を使用するための変数宣言

//Expressを使ってページのフォームデータを配列で受け取れるようにする
app.use(bodyParser.urlencoded({ extended: true }));
//Expressを使ってpublicディレクトリ内の静的ファイル(cssやjsファイルなど)を使えるようにする
app.use(express.static('public'));
//テンプレートエンジンpugを使えるようにする
app.set('view engine', 'pug')

const port = 4000;  //ポート番号を4000に設定

app.post('/api/messages/', async (req, res) => {  //'api/messages/'というページに飛ぶと{}内の動作を行う
    const message = req.body.message;  //htmlファイルの'bodyタグ内にある変数message'の値をapp.js内の変数message'に代入
    await models.Message.create({  //modelsのデータであるMessageを呼び出す
        text: message  //Message内部にあるtextという変数に代入する
    });
    res.redirect('/complete.html')  //'/complete.html'というページに飛ぶ
});

app.get('/api/messages/', async (req, res) => {   //'api/messages/'というページに飛ぶと{}内の動作を行う
    const messages = await models.Message.findAll();  //modelsのデータであるMessage内のデータ全てを代入する
    res.json({  //res='api/messages/'というページにjsonデータを表示する
        messages: messages  //messagesという変数に代入する
    });
});

//'api/messages/:messageId'というページに飛ぶと{}内の動作を行う.URL最後の':messageId'は値を自由に設定可能
app.get('/api/messages/:messageId/', async (req, res) => {
    const message = await models.Message.findOne({ //{}内の条件に当てはまるデータをMessage内から見つける
        //messageIdというパラメータがidに入っている場合
        where: {
            id: req.params.messageId
        }
    });
    res.json(message);  //jsonデータの形式でmessageの中身を表示する
});

app.get('/analyze/', async (req, res) => {  //'/analyze/'というページに飛ぶと{}内の動作を行う
    const messages = await models.Message.findAll();  //Message内部のデータを全て呼び出す
    res.render('analyze', { title: 'Hey', messages: messages })  //analyze.pugファイルを読んでhtmlに変換し，{}内部を表示する
});

app.listen(port, () => {  //接続が確認されたら{}内部の動作をする
    console.log(`http://localhost:${port}`)  //コンソールに()内部の文字列を表示
});
