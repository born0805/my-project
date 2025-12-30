# 聚米喵前端项目

## 技术栈
- React 18
- TypeScript
- Vite
- React Router
- Axios

## 项目结构
```
front/
├── src/
│   ├── components/          # 组件
│   │   └── Layout.tsx       # 布局组件
│   ├── pages/              # 页面
│   │   ├── Home.tsx        # 首页
│   │   └── UserList.tsx    # 用户列表页
│   ├── services/           # API服务
│   │   └── userService.ts  # 用户服务
│   ├── types/              # 类型定义
│   │   ├── api.ts          # API类型
│   │   └── user.ts         # 用户类型
│   ├── App.tsx             # 根组件
│   ├── main.tsx            # 入口文件
│   └── index.css           # 全局样式
├── index.html              # HTML模板
├── package.json            # 依赖配置
├── tsconfig.json           # TypeScript配置
├── vite.config.ts          # Vite配置
└── README.md
```

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

### 4. 预览生产构建
```bash
npm run preview
```

## 开发说明

- 开发服务器运行在: http://localhost:3000
- API代理配置在 `vite.config.ts` 中，所有 `/api` 请求会被代理到后端服务器
- 确保后端服务运行在 http://localhost:8080






