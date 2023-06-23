## FTChat

这是一个用于个人学习使用的聊天应用，当前正在逐步设计和开发中。

本项目网页端基于Next.js框架，使用Tauri框架打包为桌面应用。

对应的后端程序：[FTChat-backend](https://github.com/FTBoojux/ftchat_backend)

对应的实时聊天模块：[FTChat-channel](https://github.com/FTBoojux/ftchat-channel)

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