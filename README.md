# 利润追踪器 (Profit Tracker)

一个美观、安全的网页应用，用于记录和追踪产品利润信息。支持 GitHub Pages 部署。

## ✅ 功能特点
- **安全登录**：需要账号密码访问（默认账号：`admin`，密码：`123456`）。
- **数据管理**：输入产品名称、买入价、卖出价，自动计算利润和利润率。
- **持久化存储**：刷新页面后数据不丢失（保存在本地浏览器中）。
- **精美设计**：采用现代 Glassmorphism（毛玻璃）风格，深色模式。

## 🚀 快速开始

### 1. 本地运行
如果你想在自己的电脑上运行：

```bash
# 进入目录
cd product-profit-tracker

# 安装依赖
npm install

# 启动项目
npm run dev
```
启动后，浏览器打开显示的地址（通常是 `http://localhost:5173`）即可使用。

### 2. 部署到 GitHub Pages (推荐)
你可以免费将此网页发布到 GitHub 上，让他人通过链接访问。

#### 步骤 1：创建 GitHub 仓库
1. 登录 [GitHub](https://github.com)。
2. 创建一个新的 Repository (仓库)，例如命名为 `profit-tracker`。

#### 步骤 2：推送到 GitHub
在当前项目目录下，运行以下命令（请替换 `<你的仓库地址>`）：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <你的仓库地址>
git push -u origin main
```

#### 步骤 3：一键部署
项目已经配置好了自动部署脚本。只需运行：

```bash
npm run deploy
```

#### 步骤 4：启用 GitHub Pages
1. 等待部署脚本运行完成（出现 `Published` 提示）。
2. 在 GitHub 仓库页面，点击 **Settings** (设置) -> **Pages** (左侧菜单)。
3. 确保 **Source** 选择的是 `gh-pages` 分支（如果脚本成功，这通常会自动设置）。
4. 顶部会显示你的网页链接，例如 `https://yourname.github.io/profit-tracker/`。

## ⚠️ 注意事项
- **数据隐私**：目前数据保存在**你当前使用的浏览器**中（Local Storage）。如果你换了电脑或浏览器，数据不会同步。
- **密码安全**：由于是纯前端项目，密码验证逻辑在浏览器运行。作为个人工具足够安全，但请勿用于保护高度机密数据。

## 🛠️ 技术栈
- React + Vite
- Vanilla CSS (Glassmorphism Design)
- LocalStorage Data Persistence
