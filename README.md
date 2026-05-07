# YC-python
学习python的平台

## 本地运行（当前仓库）

### 前端（Next.js）

```bash
cd web
npm install
npm run dev
```

访问：
- 首页：http://localhost:3000
- 挑战关卡：http://localhost:3000/challenges
- 知识点示例：http://localhost:3000/learn/types

如果 3000 被占用，换端口启动：

```bash
npm run dev -- --port 3001
```

### 一键启动（即将补齐）

已提供 FastAPI + PostgreSQL + Redis + docker-compose：

```bash
docker compose up --build
```

访问：
- Web：http://localhost:3000
- API：http://localhost:8000/docs
