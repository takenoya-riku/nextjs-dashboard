# インターン課題：環境構築（mac）

## **1. Homebrew の確認・インストール**

> **Homebrew（ホ-ムブリュー）** は、Mac で開発ツールを簡単にインストールするためのパッケージマネージャです。

---

### 1-1. Homebrewがインストールされているか確認（インストール済みはスキップ）

Launchpad → 「ターミナル」で検索 または `⌘ + スペース` で Spotlight を開き、「terminal」と入力

次のコマンドを入力して実行します。

```console
brew -v
```

結果を確認します。

`Homebrew 4.6.17` などが表示されればインストール済みです。

`command not found: brew` と表示された場合は、Homebrewが未インストールなので、次の「1-2」に進んでください。

### 1-2. Homebrewをインストールする（未インストールの場合のみ）

ターミナルで、次のコマンドをそのままコピー＆ペーストして実行します。

```console
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

インストール中にパスワード入力を求められた場合は、
Mac にログインするときのパスワード を入力して Enter を押します。
（入力中、画面には何も表示されませんが正常です。）

### 1-3. PATH 設定の確認（brew コマンドが使えるか）

インストール完了後、次のコマンドを実行します。

```console
brew help
```

brew install などの説明が表示されれば、
Homebrew のインストールと設定は完了 です。

もし command not found: brew と表示される場合は、以下を確認してください。

一度ターミナルを閉じて、もう一度開いてから再度 brew help を実行する

それでもダメな場合は、インストール時のログに

`echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ...`

のような PATH を通すためのコマンド が表示されていないか確認し、表示されているコマンドを指示どおりに実行してください。

## **2. Git の導入**

> **Git** は、ソースコードの変更履歴を管理するためのバージョン管理ツールです。  
> 開発作業には必須なので、ここでインストールしておきます。

---

### 2-1. Git をインストールする（インストール済みはスキップ）

Git がインストールされていないことを確認します。

```console
git --version
```

次のコマンドを実行し、Git をインストールします。

```console
brew install git
```

### 2-2. Git が正しくインストールされたか確認する

インストール後、バージョンを確認します。

```console
git --version
```

例：`git version 2.47.0` のように表示されれば正常にインストールされています。

## **3. Visual Studio Codeのインストール**

> **Visual Studio Code（VS Code）** は、現在もっとも広く使われているコードエディタのひとつです。  
> 拡張機能が豊富で、Web・アプリ開発に必要な機能を簡単に追加できます。  
> すでにインストール済みの場合は、この手順はスキップして構いません。

### 3-1. VS Code をインストールする（インストール済みはスキップ）

Launchpad で「Visual Studio Code」がインストールされていないことを確認。

Homebrew を使わない場合は、<https://code.visualstudio.com> からインストールします。

Homebrew を使う場合は、ターミナルで以下のコマンドを入力します。

```console
brew install --cask visual-studio-code
```

### 3-2. インストールが完了したら

Launchpad を開くと「Visual Studio Code」が追加されているはずです。

初回起動時に権限確認のダイアログが表示されることがありますが、そのまま許可して問題ありません。

### 3-3. 任意で、拡張機能（Extensions）から以下をインストール

- **Tailwind CSS IntelliSense**  
  クラス補完・色プレビュー・ルールチェック
- **ESLint**  
  規約違反や潜在バグを検出
- **Prettier - Code formatter**  
  自動整形でスタイル統一
- **Error Lens**  
  エラー・警告を強調表示（修正スピード向上）
- **GitLens**  
  blame・履歴・コミット詳細が見やすい

## **4. Node.js と pnpm の導入（Volta を使用）**

> 本プロジェクトは **Next.js** を使用しています。  
> 動作には **Node.js 20.18.0** が必要です。  
> Node.js とパッケージマネージャの管理には **Volta** を使用します。

---

### 4-1. Volta のインストール（インストール済みはスキップ）

Volta がインストールされていないことを確認します。

```console
volta --version
```

次のコマンドを実行して Volta をインストールします。

```console
curl https://get.volta.sh | bash
```

インストール完了後、ターミナルを一度閉じて再度開く か、次のコマンドを実行します。

```console
source ~/.zshrc
```

Volta が正しくインストールされたか確認します。

```console
volta --version
```

Volta は PATH の設定を自動で行うため、通常は追加設定は不要です。

### 4-2. Node.js を Volta でインストール（インストール済みはスキップ）

Volta を使うことで、Node.js のバージョン管理が簡単になります。

```console
node -v
volta install node@20.18.0
node -v
```

`node -v` で 20.18.0 が表示されれば OK です。

### 4-3. pnpm を Volta 経由でインストール（インストール済みはスキップ）

```console
pnpm -v
volta install pnpm
pnpm -v
```

pnpm のバージョンが表示されればインストール完了です。

## 5. **リポジトリのクローンと起動**

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

クローンしたディレクトリに移動してから、依存関係をインストールします。

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

## 6. **Issue を自分にアサイン**

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
