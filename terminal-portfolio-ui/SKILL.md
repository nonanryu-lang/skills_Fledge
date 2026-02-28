---
name: terminal-portfolio-ui
description: Next.jsとTailwind CSSを使用して、ターミナルライクでメタリックなエンジニア向けポートフォリオUIを構築・適用するスキル。Bento Gridレイアウト、グラスモーフィズム、コマンドプロンプト風のテキスト装飾を含みます。ポートフォリオの新規作成、既存UIのターミナル風への改修、Bento Gridの追加などの際に使用します。
---

# Terminal Portfolio UI

このスキルは、Next.jsとTailwind CSSを使用して、洗練されたターミナルライクかつメタリックなエンジニア向けポートフォリオUIを構築するためのガイドラインとリソースを提供します。

## コアコンセプト

1. **ターミナルライクなテキスト**: `JetBrains Mono` などの等幅フォントを使用し、`user@portfolio:~$` のようなコマンドプロンプト風の装飾を施します。
2. **メタリック＆グラスモーフィズム**: 黒・グレー・白を基調とし、`.metallic-card` クラスや `backdrop-blur-md` を用いて、重厚感のあるガラスのような質感を表現します。
3. **Bento Gridレイアウト**: プロジェクト一覧などに、大小のカードを組み合わせたBento Gridレイアウトを採用します。
4. **サイバーパンク風アクセント**: `text-green-400` や `text-blue-400` をアクセントカラーとして使用し、ターミナルのシンタックスハイライトを模倣します。

## ワークフロー

### 1. 初期セットアップ

プロジェクトにターミナルUIを導入する場合、まずは以下の設定を行います。

1. **フォントの設定**: `next/font/google` から `JetBrains_Mono` をインポートし、Tailwindの `font-mono` に割り当てます。
2. **Tailwindの設定**: `assets/tailwind.config.ts` を参考に、カラートークン（`background`, `foreground`, `border` など）を設定します。
3. **グローバルCSS**: `assets/globals.css` を参考に、`.metallic-card` や `.cyber-line` などのカスタムクラスを追加します。

### 2. コンポーネントの実装

UIコンポーネントを実装・改修する際は、以下のパターンに従います。

- **セクションヘッダー**: 単なる見出しではなく、`ls -l ./projects` のようなコマンド実行風にします。
- **カードUI**: `.metallic-card` クラスを適用し、上部にターミナルのタイトルバー（`cat file.md` など）を模したヘッダーを配置します。
- **リンク・ボタン**: `[ Submit ]` や `./view_details.sh` のようなCLI風のテキストにします。
- **フォーム**: 入力フィールドを四角くし、ラベルに `? Name:` のようなプロンプト記号を付けます。

具体的な実装コード例については、[references/components.md](references/components.md) を参照してください。

## リソース

- **[assets/tailwind.config.ts](assets/tailwind.config.ts)**: メタリックテーマのカラートークンを含むTailwind設定例。
- **[assets/globals.css](assets/globals.css)**: `.metallic-card` や `.cyber-line` などのカスタムCSSクラス。
- **[references/components.md](references/components.md)**: ターミナルウィンドウ、Bento Grid、プログレスバーなどの具体的なReactコンポーネント実装例。
