# thankyou-cudo

## 環境構築・起動手順

### 1. Dockerイメージのビルド

```sh
docker build -t thankyou-cudo-app .
```

### 2. サービスアカウントキーの準備

- GCPで必要な権限（Storage, BigQueryなど）を持つサービスアカウントキー（JSON）を `./secret/key.json` として配置してください。
※ローカルでのみ

### 3. コンテナの起動

```sh
docker run \
  --name thankyou-app \
  -p 8080:8080 \
  -e GOOGLE_APPLICATION_CREDENTIALS=/var/www/thankyou-cudo/secret/key.json \
  -v $(pwd)/secret:/var/www/thankyou-cudo/secret \
  thankyou-cudo-app
```

### 4. コンテナへシェルで入る

```sh
docker exec -it thankyou-app sh
```
