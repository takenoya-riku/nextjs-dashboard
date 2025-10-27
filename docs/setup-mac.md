# インターン課題 環境構築（mac）

## **Git のインストール**

### **Homebrew の確認・導入**

バージョン番号が表示されればインストール済み

`command not found` が表示された場合は、以下のコマンドでインストール：

```console
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

パスが通っているか確認：

```console
brew help
```

### **Git の導入**

Git のインストール（Homebrew 利用）：

```console
brew install git
```

バージョン確認：

```console
git --version
```

任意: ブラウザ連携サインインを安定させたい場合は Git Credential Manager を導入：

```console
brew install --cask git-credential-manager
```

## **Git の初期設定と認証**

```console
git config --global user.name "あなたの名前"
git config --global user.email "あなたのメールアドレス"

git config --list
```

初回の `git push` でブラウザが開き、GitHub にサインイン・承認すると以降は資格情報が保存されます（GCM を入れている場合）。

SSH を使う場合は鍵を作成して GitHub に登録してください。

```console
# 参考: SSH 鍵作成
ssh-keygen -t ed25519 -C "あなたのメールアドレス"

# 以下を実行、 表示された文字列を GitHub > Settings > SSH and GPG keys に登録
cat ~/.ssh/id_ed25519.pub 
```

## **Visual Studio Code のインストール**

1. <https://code.visualstudio.com> から VS Code をインストール
2. 拡張機能（Extensions）から以下をインストール：

- **Auto Close/Auto Rename Tag**  
  JSX/TSX タグを自動補完・同期更新（タグ漏れ・修正を軽減）
- **Path Intellisense**  
  import パス補完（複雑な階層やエイリアスでも迷わず入力）
- **Tailwind CSS IntelliSense**  
  クラス補完・色プレビュー・ルールチェック
- **ESLint**  
  規約違反や潜在バグを検出
- **Prettier**  
  自動整形でスタイル統一
- **Error Lens**  
  エラー・警告を強調表示（修正スピード向上）
- **GitLens**  
  blame・履歴・コミット詳細が見やすい
- **Git History**  
  コミット履歴を視覚的に確認
- **Git**  
  VS Code 内で基本 Git 操作（commit / push / pull）

## **Node.js と pnpm の導入（Volta のみ）**

本プロジェクトは Next.js です。**Node.js 18.12 以上（LTS 推奨）** を使用してください。

### **Volta のインストール（macOS）**

```console
curl https://get.volta.sh | bash

# ターミナルを一度閉じて開き直す（または `source ~/.zshrc`）
volta --version
```

Volta は通常 PATH を自動設定します。PATH 追記は基本不要です。

### **Node.js LTS を Volta で導入**

```console
volta install node@lts
node -v
```

### **pnpm も Volta で導入（Corepack は使いません）**

```console
volta install pnpm
pnpm -v
```

## **リポジトリのクローンと起動**

作業ディレクトリを作成し移動

```console
mkdir -p ~/work
cd ~/work
```

リポジトリをクローン

```console
git clone https://github.com/takenoya-riku/nextjs-dashboard.git
cd nextjs-dashboard
```

依存関係インストール

```console
pnpm install
```

環境変数ファイルの作成（nextjs-dashboardの直下）

```console
.env
```

※ファイルの設定は社員に共有してもらう

開発サーバー起動

```console
pnpm dev
```

ブラウザで <http://localhost:3000> が開ければ OK

## **Issue を自分にアサイン**

- GitHub の **Issues** を開く
- 取り組む Issue を開く
- 右サイドバー **Assignees** で自分を選択

### **ブランチ作成規約**

- ベース: `main`
- 命名: `feature/番号`

```console
# 例: issue #10
git checkout -b feature/10
```

### **変更のコミットとPush**

```console
git add .
git commit -m "修正内容"
git push origin feature/123
```

初回 push でブラウザが開いたらサインインと承認を行ってください（Passkey も可）

### **Pull Request の作成**

```console
Compare & pull request
```

base: `main`

タイトル例: `A-1：【ダッシュボード】PCレイアウト修正`

Reviewer: `@takenoya-riku` `@e3sys-oishi` `@leaf-y`

指摘対応は同ブランチに追加コミットして push
