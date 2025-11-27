# インターン課題 環境構築（windows）

## **WSL2を入れる（導入済みの場合、スキップ）**

管理者権限の PowerShell を開く
右クリック → 管理者として実行

インストール

```console
wsl --install -d Ubuntu
```

自動もしくは手動で再起動 → 初回起動で **ユーザー名とパスワード** を作成

状態確認

```console
wsl --status
wsl -l -v
```

Ubuntuが **Version 2** になっていればOK

もし失敗する場合、以下の設定を確認

- BIOS の仮想化支援（Intel VT-x / AMD-V）を有効化
- Windows の機能で「仮想マシン プラットフォーム」を有効化 → 再起動
- 再度 以下を実行

```console
wsl --install -d Ubuntu
```

## **Ubuntu初期設定**

- Ubuntu のターミナルで実行します。
- Windows の **スタートメニュー** を開く
- Ubuntu と入力して検索
- Ubuntu（または Ubuntu-22.04 などインストールしたバージョン名）をクリック
  黒い画面（ターミナル）が開き、`username@DESKTOP:~$` のようなプロンプトが出ればOK

```console

# Gitが入っているか確認
git --version
git config --list

# 最新版が必要な場合のみ実行
# ※ Ubuntu標準は古いことがあるため、最新Gitを使いたい場合はPPAを追加
sudo add-apt-repository ppa:git-core/ppa -y

# gitインストールが必要な場合のみ実行
sudo apt update
sudo apt install -y git

# バージョン確認
git --version

# Gitの初期設定（初回のみ）
# コミットに使うユーザー情報を登録
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# デフォルトブランチをmain
git config --global init.defaultBranch main

# 改行コードの自動変換を無効化（WindowsとLinuxの改行差異による事故防止）
git config --global core.autocrlf false   # 改行の事故防止

```

## **Visual Studio Codeのインストール（インストール済みの場合、スキップ）**

1. <https://code.visualstudio.com> から VS Code をインストール
2. 任意で、拡張機能（Extensions）から以下をインストール：

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

## **リポジトリのクローンと起動**

作業ディレクトリを作成し移動

```console
mkdir work
cd work
```

リポジトリをクローン

```console
git clone GitHubの<>codeタブの<>codeをクリック、HTTPSのURL
```

依存関係インストール

```console
pnpm install
```

環境変数ファイルの作成（プロジェクトの直下）

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
