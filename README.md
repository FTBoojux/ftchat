## FTChat

这是一个用于个人学习使用的聊天应用，当前正在逐步设计和开发中。

本项目网页端基于Next.js框架，使用Tauri框架打包为桌面应用。

对应的后端程序：[FTChat-backend](https://github.com/FTBoojux/ftchat_backend)

对应的实时聊天模块：[FTChat-channel](https://github.com/FTBoojux/ftchat-channel)

当前计划任务：

1.完成文件上传功能

2.改造消息系统，分离消息内容与消息id

以下内容为Next.js框架原生内容：

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run tauri build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 开发日志

### 2023-06-23

1、修改redis中jwt令牌过期判断的逻辑；
2、将好友请求改为使用webSocket请求

### 2023-06-26

1、调整了部分样式
2、在GPT对话页面增加了头像显示
3、登陆时对密码进行AES加密

### 2023-06-27
1、调整了GPT会话页面的样式，调整了获取头像的方法
2、现在可以修改用户信息了

### 2023-06-29
1、增加了好友申请的通知
2、增加了好友申请的处理

### 2023-06-30
1、现在可以删除好友了

### 2023-07-01
1、设计会话界面的样式和实现

### 2023-07-02
1、调整了项目组织结构

### 2023-07-03
1、聊天记录样式设计

### 2023-07-04
1、现在好友、陌生人、群聊使用聚合搜索的接口了
2、调整了添加好友和群聊界面的样式

### 2023-08-03
1、现在会展示加群申请了

### 2023-08-04 
1、增加处理加群请求的功能

### 2023-08-08
1、登录过期时跳转回登录页

### 2023-10-18
1、现在会话中可以显示消息记录了(尚不支持滚动查询)

### 2023-11-23
1.调整message页面样式

### 2023-12-06
1.发送消息到会话后通过socket进行通知

### 2024-01-25
1.会话列表显示最后一条消息
2.自动登录逻辑优化

### 2024-02-01
1.引入redux
2.使用redux管理会话的最新消息

### 2024-02-04
1.移除redux

### 2024-02-06
1.修改context，使用context管理会话的最新消息
2.调整总的未读消息的数量显示

### 2024-02-27
1.会话消息增加滚动查询
2.调整会话消息页面的样式

### 2024-03-07
1.现在支持在聊天消息中带有图片了

### 2024-04-09
1.初步支持文件上传功能

### 2024-04-10
1.修复了文件上传中url错误的问题
2.为文件消息准备了专门的消息展示

### 2024-05-31
1.文件粘贴统一选择文件消息
2.优化文件消息预览