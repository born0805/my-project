# 聚米喵项目

一个基于 Spring Boot + React 的全栈项目。

## 项目结构

```
testProject/
├── backed/          # 后端项目（Spring Boot）
├── front/           # 前端项目（React）
└── README.md        # 项目说明
```

## 技术栈

### 后端
- Spring Boot 3.2.0
- MyBatis Plus 3.5.5
- MySQL 8.0
- Java 17

### 前端
- React 18
- TypeScript
- Vite
- React Router
- Axios

## 快速开始

### 1. 数据库准备

1. 创建 MySQL 数据库
2. 执行 `backed/src/main/resources/sql/schema.sql` 创建表结构
3. 修改 `backed/src/main/resources/application.yml` 中的数据库连接信息

### 2. 启动后端

```bash
cd backed
mvn spring-boot:run
```

后端服务将运行在: http://localhost:8080/api

### 3. 启动前端

```bash
cd front
npm install
npm run dev
```

前端服务将运行在: http://localhost:3000

## 功能特性

- ✅ 用户管理（CRUD）
- ✅ RESTful API
- ✅ 跨域支持
- ✅ 统一响应格式
- ✅ 响应式前端界面

## 开发说明

### 后端 API 示例

- 获取用户列表: `GET /api/user/list`
- 获取用户详情: `GET /api/user/{id}`
- 新增用户: `POST /api/user`
- 更新用户: `PUT /api/user`
- 删除用户: `DELETE /api/user/{id}`

### 前端路由

- 首页: `/`
- 用户管理: `/users`

## 注意事项

1. 确保 MySQL 服务已启动
2. 修改数据库连接配置
3. 后端和前端需要同时运行才能完整使用功能


