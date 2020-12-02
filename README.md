
参考
https://qiita.com/mima_ita/items/014dcb42872f3a10855b


```
# データベースを使うためのパッケージをインストール
npm install sequelize
npm install sqlite3
npm install --save-dev sequelize-cli
# 初期化
npx sequelize-cli init
# モデルとマイグレーションを作成
npx sequelize-cli model:generate --name Message --attributes text:string
# マイグレーション
npx sequelize-cli db:migrate
```

# 見出し

