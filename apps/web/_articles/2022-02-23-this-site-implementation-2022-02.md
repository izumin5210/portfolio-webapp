---
uuid: 03d70cc6-1cf5-446d-8006-047881252719
updatedOn: null
tags: ['izum-dot-in']
---

# このサイトの実装 2022-02

2021年12月から、ほそぼそと「自分のサイト」を新しく作っていた。
気になる技術を好き勝手試せて最悪壊してもいい、いわゆる砂場が欲しかったというのがモチベーション。
足りない抽象やコンポーネントを自分で見つける・発明するのも楽しいけど、やっぱり既に発明されてる武器をちゃんと知っておくのも大切。

とりあえずブログとして公開できるところまで至った。せっかくなので現時点での構成とかを記録しておく。


## フロントエンド
[Next.js](https://nextjs.org/) を使っている。仕事でも使っているため新鮮味はないが、より雑に謎の新機能とか試したい。

CSS は [Linaria](https://github.com/callstack/linaria) を採用した。業務で [デザインシステムの React 実装](https://www.wantedly.com/companies/wantedly/post_articles/302873)というのを作っていたが、そのときの振り返りをしつつ styled-components や emotion よりも制約の強いライブラリで拡張性高い汎用 UI コンポーネントを作るチャレンジをしてみたい。

裏側には無駄に GraphQL サーバがおり、クライアントには [Relay](https://relay.dev/) を使っている。仕事では Apollo Client だが、色々思うところがあって別のを試しているところ。

あとは最近の Rails のフロントエンド開発も触れておきたいんだけど、どこに入れるといいんだろう。


## バックエンド
とりあえず運用し始められることを優先したかったので、Next.js の [API Routes](https://nextjs.org/docs/api-routes/introduction) で誤魔化してる。データは適当に Yaml で管理されている。

一方で Relay の検証は進めかったので、[graphql-js](https://github.com/graphql/graphql-js) で雑に作った実装を [graphql-helix](https://github.com/contrawork/graphql-helix) で Next.js アプリにのせている。

Rust でサーバ書きたいとか GraphQL Federation したいとか色々試したいことはあるが、あとのお楽しみ。


## インフラ
Next.js アプリは [Cloud Run](https://cloud.google.com/run) で動かしている。フルマネージドで Docker コンテナ動かせて雑に使えて安い。`next build` で生成された静的ファイル群は Cloud Storage にアップロードし Cloud CDN から配信さている。

あとは CDN で色々遊んでみたいというのがあって、その気持を強く持つために US にデプロイしている。いま見ているこの記事は太平洋を超えて日本の皆様に届いています。


## ビルド
GitHub Actions を使っていて、push されたら image がビルドされ Cloud Registry に push される。[docker/build-push-action](https://github.com/docker/build-push-action) を使ってる。 `next build` もこの image のビルドの中で実行される。静的ファイルのアップロードはビルド完了後にやってる。

GitHub Actions から Google Cloud を操作するのは [Workload Identify Federation](https://cloud.google.com/iam/docs/configuring-workload-identity-federation#github-actions) なる機能により credentials の類なしで実現できるようになっていた。便利。


## デザイン
気持ちとしては Figma 触り倒したりデザインの勉強したりしたかったが、これもぱっと運用開始することを優先して React と CSS で雑にプロトタイプしていった。色やフォント周りなどのパラメタは Material Design のものを拝借している。
