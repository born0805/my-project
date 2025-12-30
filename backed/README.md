# 聚米喵后端项目

## 技术栈
- Spring Boot 3.2.0
- MyBatis Plus 3.5.5
- MySQL 8.0
- Java 17

## 项目结构
```
backed/
├── src/
│   ├── main/
│   │   ├── java/com/jumimiao/
│   │   │   ├── JumimiaoApplication.java    # 启动类
│   │   │   ├── common/                     # 通用类
│   │   │   ├── config/                     # 配置类
│   │   │   ├── controller/                 # 控制器
│   │   │   ├── entity/                     # 实体类
│   │   │   ├── mapper/                     # Mapper接口
│   │   │   └── service/                    # 服务层
│   │   └── resources/
│   │       ├── application.yml             # 配置文件
│   │       └── sql/                        # SQL脚本
│   └── test/                               # 测试代码
├── pom.xml                                 # Maven配置
└── README.md
```

## 快速开始

### 1. 环境要求
- JDK 17+
- Maven 3.6+
- MySQL 8.0+

### 2. 数据库配置
1. 创建数据库（或使用提供的 schema.sql）
2. 修改 `application.yml` 中的数据库连接信息

### 3. 运行项目
```bash
mvn spring-boot:run
```

### 4. 访问地址
- 后端服务: http://localhost:8080/api

## API 示例
- 获取用户列表: GET /api/user/list
- 获取用户详情: GET /api/user/{id}
- 新增用户: POST /api/user
- 更新用户: PUT /api/user
- 删除用户: DELETE /api/user/{id}






