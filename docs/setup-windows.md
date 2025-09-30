# インターン課題 環境構築（windows）

## **WSL2 を入れる（Windows 側）**

管理者権限の PowerShell を開く
右クリック → 管理者として実行

インストール

```console
wsl --install -d Ubuntu
```

自動で再起動 → 初回起動で **UNIX ユーザー名とパスワード** を作成

状態確認

```console
wsl --status
wsl -l -v
```

Ubuntu が **Version 2** になっていれば OK

もし失敗する場合

- BIOS の仮想化支援（Intel VT-x / AMD-V）を有効化
- Windows の機能で「仮想マシン プラットフォーム」を有効化 → 再起動
- 再度 以下を実行

```console
wsl --install -d Ubuntu
```

## **Ubuntu の初期設定（WSL）**

- Ubuntu のターミナルで実行します。
- Windows の **スタートメニュー** を開く
- Ubuntu と入力して検索
- Ubuntu（または Ubuntu-22.04 などインストールしたバージョン名）をクリック
  
  → 黒い画面（ターミナル）が開き、`username@DESKTOP:~$` のようなプロンプトが出ればOK

```console
# 最新化
sudo add-apt-repository ppa:git-core/ppa -y
sudo apt update
sudo apt install -y git
git --version

# Git の初期設定（あなたの情報に置き換え）
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global core.autocrlf false   # 改行の事故防止

# SSH 認証を使う場合
ssh-keygen -t ed25519 -C "you@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub   # これを GitHub の SSH keys に登録
ssh -T git@github.com       # 成功メッセージで確認

# 確認
git --version
git config --list

```

※WSL 上で作業するフォルダの場所によって、処理速度が大きく変わるため

作業フォルダは Linux 側（例: /home/あなた）に置きます。

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

## **Node.js と pnpm の導入**

```console
# Volta をインストール
curl https://get.volta.sh | bash

# シェルを再読み込み
source ~/.bashrc

# 正しく入ったか確認
volta -v
```

すでに nvm を入れている場合は、`.bashrc` や `.zshrc` の `export NVM_DIR=...` と `source "$NVM_DIR/nvm.sh"` を**コメントアウト**し、`corepack` を有効化していたら `corepack disable` しておくと衝突を避けられます。

既存の Node を PATH から外したら、`hash -r` でコマンドキャッシュをクリア。

## **GitHub 認証の準備**

SSH 方式

```console
# 鍵を作る（メールは GitHub に登録のもの）
ssh-keygen -t ed25519 -C "you@example.com"

# エージェント起動＆鍵登録
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 公開鍵を表示してコピー
cat ~/.ssh/id_ed25519.pub
```

[GitHub](https://github.com/) → 右上アイコン → **Settings** → **SSH and GPG keys** → **New SSH key**

さきほどの公開鍵を貼り付けて保存

接続確認

```console
ssh -T git@github.com

# "Hi <ユーザー名>! You've successfully authenticated..." と出れば成功
```

リポジトリを clone

```console
cd ~
# SSH の場合
git clone git@github.com:takenoya-riku/nextjs-dashboard.git

cd nextjs-dashboard
```

依存を入れて動作確認

```console
pnpm install
pnpm dev
```

ブラウザで <http://localhost:3000> が開ければ OK

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
