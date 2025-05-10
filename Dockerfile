FROM node:22

WORKDIR /var/www/thankyou-cudo

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npx tsc

# サービスアカウントキーをコンテナにコピー（開発用のみ！）
COPY /secret/key.json /var/www/thankyou-cudo/secret/key.json

# 環境変数を設定
ENV GOOGLE_APPLICATION_CREDENTIALS="/var/www/thankyou-cudo/secret/key.json"

EXPOSE 8080

CMD [ "node", "dist/index.js" ]
