emotionsns のフロントエンドになります

[バックエンドはこちら](https://github.com/TsunoKento/emotionSNS-backend)

## 使用技術・ライブラリ

- TypeScript
- Next.js
- MUI
- SWR
- React Hook Form
- Docker
- Vercel

## 導入方法

1. プロジェクトをクローンする

```zsh
git clone https://github.com/TsunoKento/emotionSNS-frontend.git
```

2. イメージをビルドする

```zsh
docker-compose build
```

3. コンテナを起動する

```zsh
docker-compose up -d
```

4. パッケージを読み込む

```zsh
docker-compose exec node yarn install --frozen-lockfile
```

5. サーバーを起動する

```zsh
docker-compose exec node yarn dev
```
