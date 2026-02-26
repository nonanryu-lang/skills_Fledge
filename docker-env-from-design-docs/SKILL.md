---
name: docker-env-from-design-docs
description: 基本設計書・詳細設計書をもとに、Dockerコンテナ前提の開発環境を設計・構築・更新するスキル。Dockerfile、docker-compose.yml、.env.example、初期化スクリプト、README相当の運用手順を一貫して作成したいときに使用する。次の場面で使う：(1) 設計書から新規にローカル開発環境を立ち上げたいとき、(2) 設計変更を既存コンテナ構成へ差分反映したいとき、(3) 複数サービス（Web/API/DB/Cache/Queue）の依存関係をcomposeで整備したいとき、(4) 「Docker環境構築」「コンテナ化」「docker-compose」「開発環境セットアップ」などのキーワードがあるとき。
---

# 基本設計・詳細設計→Docker環境構築スキル

基本設計書・詳細設計書から必要コンポーネントを抽出し、Dockerコンテナ中心の実行環境を構築する。

## ワークフロー判定

入力状態に応じてフローを選ぶ：

- **新規作成フロー**: 設計書はあるがDocker環境が未整備
- **差分更新フロー**: 既存Docker環境に設計変更を反映

## ステップ1: 入力設計書と制約を確認する

最初に次を確認する：

1. 対象システムの構成（Web/API/Worker/DB/Cache/Message Broker）
2. ランタイム要件（Node/Python/Java/PHPなどのバージョン）
3. 外部依存（S3、SMTP、OAuth、外部API、社内VPN接続）
4. 非機能要件（起動時間、ログ、監視、セキュリティ、ボリューム運用）
5. 開発用途か検証用途か（hot reload優先か、本番近似優先か）

不足がある場合は2〜3問ずつ追加ヒアリングする。

抽出チェックリストは [references/design-input-checklist.md](references/design-input-checklist.md) を使う。

## ステップ2: 設計要素をコンテナ構成へマッピングする

設計情報をDocker構成へ変換する。マッピング基準は [references/design-to-docker-mapping.md](references/design-to-docker-mapping.md) を参照する。

- 画面/フロント設計 → `web` サービス（Node系ビルド、公開ポート、静的配信）
- API/バッチ設計 → `api` / `worker` サービス（実行コマンド、依存起動順）
- データ設計 → `db` サービス（イメージ、永続ボリューム、初期化SQL）
- 性能・運用設計 → ヘルスチェック、ログ出力、リソース制約、再起動ポリシー
- セキュリティ設計 → `.env` 分離、シークレット注入方針、不要ポート閉塞

## ステップ3: Docker関連成果物を作成する

成果物テンプレートは [references/docker-environment-template.md](references/docker-environment-template.md) を使う。

最低限、次を作成する：

1. `docker-compose.yml`
2. `Dockerfile`（サービスごと）
3. `.dockerignore`
4. `.env.example`
5. 初期化スクリプト（必要な場合のみ）
6. 起動/停止/再作成/マイグレーション手順（プロジェクトの標準ドキュメントに追記）

作成時のルール：

1. サービス名は責務ベースで命名する（`web` `api` `db` `redis` など）
2. 依存関係は `depends_on` とヘルスチェックで明示する
3. 開発用マウントと生成物ディレクトリの衝突を避ける
4. 機密値は `.env` 側へ分離し、固定値を埋め込まない
5. 設計書にない推測設定は「設計判断」として明示する

## ステップ4: 差分更新フローを実行する

差分更新フローでは次を実行する：

1. 変更された設計項目を抽出する（追加/変更/削除）
2. 影響するコンテナ定義を特定する（イメージ、環境変数、ポート、ボリューム、ネットワーク）
3. `docker-compose.yml` と関連 `Dockerfile` を更新する
4. 既存データへの影響（DBボリューム・マイグレーション）を評価する
5. 変更理由、影響範囲、ロールバック方針を明記する

## ステップ5: 検証する

以下の順で検証する：

1. 静的検証: 構文・キー重複・未使用変数を確認する
2. 起動検証: `docker compose up --build` で主要サービスが健康状態になることを確認する
3. 接続検証: `web → api → db` などの主要経路を確認する
4. 初期化検証: マイグレーション・シード・初回起動手順が再現可能であることを確認する
5. 復旧検証: 再起動、ボリューム再作成時の手順を確認する

検証チェックは [references/validation-checklist.md](references/validation-checklist.md) を使う。

## ステップ6: 出力を確定する

最終出力では次を必ず含める：

1. 追加・更新したファイル一覧
2. 起動コマンドと停止コマンド
3. 必須環境変数一覧（値は伏せる）
4. 未確定事項 `[TBD]` と確認先
5. 次工程（CI連携、本番用compose分離、Kubernetes移行可否）の提案
