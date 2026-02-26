# Docker環境成果物テンプレート

## 1. 出力ファイル構成（最小）

- `docker-compose.yml`
- `Dockerfile.web` / `Dockerfile.api`（必要なもののみ）
- `.dockerignore`
- `.env.example`
- `scripts/init-db.sh`（必要な場合のみ）

## 2. docker-compose.yml テンプレート

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.web
    command: npm run dev
    ports:
      - "3000:3000"
    env_file:
      - .env
    volumes:
      - ./:/app
    depends_on:
      api:
        condition: service_healthy

  api:
    build:
      context: .
      dockerfile: Dockerfile.api
    command: ./start-api.sh
    ports:
      - "8080:8080"
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 10s
      timeout: 5s
      retries: 5

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  db_data:
```

## 3. Dockerfile テンプレート（Node系）

```dockerfile
FROM node:22-bookworm
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

## 4. .env.example テンプレート

```env
APP_ENV=local
WEB_PORT=3000
API_PORT=8080
DB_HOST=db
DB_PORT=5432
DB_NAME=app
DB_USER=app
DB_PASSWORD=change-me
```

## 5. 出力時の補足ルール

- 実値の秘密情報は記載しない
- 設計書由来でない推測値は `[TBD]` として明示する
- 既存プロジェクトに合わせてポート・コマンド・ボリュームを調整する
