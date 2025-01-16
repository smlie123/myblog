# 使用官方 Node.js 镜像作为基础镜像
FROM node

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json (如果有的话)
COPY package*.json ./

# 安装项目的依赖
RUN npm install

# 复制整个应用的代码到容器中
COPY . .

# 在构建过程中执行 prisma generate 生成 Prisma 客户端
RUN npx prisma generate

# 构建 Next.js 项目
RUN npm run build

# 暴露 Next.js 默认的 3000 端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["npm", "start"]
