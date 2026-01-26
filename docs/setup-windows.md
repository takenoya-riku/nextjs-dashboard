
# インターン課題：環境構築（Windows/WSL2）

## 1. WSL2 の導入

> **WSL2（Windows Subsystem for Linux 2）** は、Windows上でLinux環境を利用できる機能です。

---

### 1-1. WSL2 のインストール

WSL2 のインストール確認。

```console
wsl --status
wsl -l -v
```

Ubuntu が **Version 2** になっていればOK。（インストール済みは1-1.と1-2スキップ）

管理者権限の PowerShell を開き、以下を実行：

```console
wsl --install -d Ubuntu
```

※ 初回起動は数分かかる場合があります。Ubuntu-22.04 などのバージョン名が表示されれば正常です。

インストール後、自動または手動で再起動し、初回起動時に **ユーザー名とパスワード** を作成します。

> よくあるトラブルと対処法：
> - WSL2の初回起動時に「Windowsの更新が必要」と表示された場合は、
Windows Updateを実施してください。
Ubuntuのインストール後、WSL2のバージョンが「1」になっている場合は `wsl --set-version Ubuntu 2` を実行してください。
> - インストールや起動に失敗する場合は、以下を確認してください：
>   - BIOS の仮想化支援（Intel VT-x / AMD-V）を有効化
>   - Windows の機能で「仮想マシン プラットフォーム」を有効化 → 再起動
>   - 再度 `wsl --install -d Ubuntu` を実行

### 1-2. WSL2 の状態確認

```console
wsl --status
wsl -l -v
```

Ubuntu が **Version 2** になっていればOK。

## 2. Ubuntu 初期設定・Git の導入

> 以降は Ubuntu ターミナルで作業します。

### 2-1. Git のインストール（インストール済みはスキップ）

```console
# Gitが入っているか確認
git --version

# 最新版が必要な場合のみ（任意）
sudo add-apt-repository ppa:git-core/ppa -y
sudo apt update
sudo apt install -y git

sudo apt upgrade -y  # セキュリティ更新も推奨

# バージョン確認
git --version
```

### 2-2. Git の初期設定（初期設定済みはスキップ）

```console
# ユーザー情報を登録
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# デフォルトブランチを main
git config --global init.defaultBranch main

# 改行コードの自動変換を無効化（WindowsとLinuxの改行差異による事故防止）
git config --global core.autocrlf false
```

※core.autocrlf は「Windowsで作業する場合はfalse推奨」です。混在環境での改行事故防止のためです。

## 3. Visual Studio Code のインストール

> **Visual Studio Code（VS Code）** は、現在もっとも広く使われているコードエディタのひとつです。

### 3-1. Visual Studio Code をインストール（インストール済みはスキップ）

「Visual Studio Code」がインストールされていないことを確認。

<https://code.visualstudio.com> からインストール

> WSL2上でVSCodeを使う場合は「Remote - WSL」拡張のインストールを推奨します。
> Windows側でVSCodeをインストール後、WSL2ターミナルから `code .` で起動できます。

### 3-2. 拡張機能（Extensions）をインストール（任意）

- **Tailwind CSS IntelliSense**：クラス補完・色プレビュー・ルールチェック
- **ESLint**：規約違反や潜在バグを検出
- **Prettier - Code formatter**：自動整形でスタイル統一
- **Error Lens**：エラー・警告を強調表示（修正スピード向上）
- **GitLens**：blame・履歴・コミット詳細が見やすい
- **Remote Development**：WSL2上でVSCodeを使う場合はこの拡張パックのインストールを推奨（Remote - WSLを含む）

## 4. Node.js と pnpm の導入（Volta を使用）

> 本プロジェクトは **Next.js** を使用しています。
> Node.js とパッケージマネージャの管理には **Volta** を使用します。

### 4-1. Volta のインストール（インストール済みはスキップ）

Volta がインストールされていないことを確認：

```console
volta --version
```

次のコマンドを実行して Volta をインストールします。

```console
curl https://get.volta.sh | bash
```

インストール後、ターミナルを一度閉じて再度開くか、次を実行：

```console
source ~/.bashrc  # bashの場合
source ~/.zshrc  # zshの場合
```

Volta が正しくインストールされたか確認：

```console
volta --version
```

VoltaでインストールしたNode.jsやpnpmは自動でPATHが通ります。

すでに nvm を入れている場合は、`.bashrc` や `.zshrc` の `export NVM_DIR=...` と `source "$NVM_DIR/nvm.sh"` を**コメントアウト**し、`corepack` を有効化していたら `corepack disable` しておくと衝突を避けられます。

既存の Node を PATH から外したら、`hash -r` でコマンドキャッシュをクリア。

### 4-2. Node.js を Volta でインストール（インストール済みはスキップ）

Volta を使うことで、Node.js のバージョン管理が簡単になります。

```console
node -v
volta install node@20.18.0
node -v
```

`node -v` で 20.18.0 が表示されれば OK。

### 4-3. pnpm を Volta 経由でインストール（インストール済みはスキップ）

```console
pnpm -v
volta install pnpm
pnpm -v
```

pnpm のバージョンが表示されればインストール完了です。

## 5. リポジトリのクローンと起動

### 5-1. 作業ディレクトリを作成して移動

```console
mkdir -p ~/work
cd ~/work
```

### 5-2. リポジトリをクローン

```console
git clone GitHubの緑色の<>codeをクリック、HTTPSのURL
cd リポジトリ
```

### 5-3. 依存関係をインストール

```console
pnpm install
```

### 5-4. 環境変数ファイルの作成

プロジェクト直下に .env ファイルを作成します。

```console
touch .env
```

※作成した.envファイルの内容は、以下を実行前に社員に確認してください。

### 5-5. 開発サーバーを起動

```console
pnpm dev
```

ブラウザで <http://localhost:3000> が開ければ OK

## 6. Issue を自分にアサイン

- GitHub の **Issues** を開く
- 取り組む Issue を開く
- 右サイドバー **Assignees** で自分を選択

### 6-1. ブランチ作成規約

- ベース: `main`
- 命名: `feature/番号`

```console
# 例: issue #10
git checkout -b feature/10
```

### 6-2. 変更のコミットとPush

```console
git add .
git commit -m "修正内容"
git push origin feature/10
```

初回 push でブラウザが開いたらサインインと承認を行ってください（Passkey も可）

### 6-3. Pull Request の作成

```console
Compare & pull request
```

base: `main`

タイトル例: `A-1：【ダッシュボード】PCレイアウト修正`

Reviewer: `@takenoya-riku` `@e3sys-oishi` `@leaf-y`

指摘対応は同ブランチに追加コミットして push

PR作成時はGitHubリポジトリ画面右上の「Compare & pull request」ボタンをクリックしてください。
