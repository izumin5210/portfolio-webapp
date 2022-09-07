---
uuid: 53f6d325-5fe1-4d93-88e4-6a7e78d9d1e2
updatedOn: null
tags: ['graphql', 'nodejs', 'web-frontend']
---

# コード生成のために GraphQL サーバから schema を取ってくる

`graphql` が `getIntrospectionQuery` という関数を持っており、これが Introspection のクエリをいい感じに吐いてくれる。
これをそのまま GraphQL サーバに投げつけたらスキーマ情報を取得でき、その結果をそのまま `schema.json` みたいな感じで dump しておくことで graphql-codegen などのツールで読めるようになる。

```js
import { getIntrospectionQuery } from "graphql";
import fetch from "node-fetch";

const url = "http://0.0.0.0:3000/api/graphql";

const { data, errors } = await fetch(url, {
  method: "POST",
  body: JSON.stringify({ query: getIntrospectionQuery() }),
  headers: { "Content-Type": "application/json" },
}).then((r) => r.json());

if (errors) {
  process.stderr.write(JSON.stringify(errors, null, 2));
  process.exit(1);
}

process.stdout.write(JSON.stringify(data, null, 2));
```

上のは丁寧に書いたけど、これくらいならワンライナーでやっちゃってもいいかもしれない。

```bash
curl -sf \
  -X POST \
  -H 'Content-Type: application/json' \
  -d "$(node -pe 'JSON.stringify({ query: require("graphql").getIntrospectionQuery() })')" \
  http://0.0.0.0:3000/api/graphql \
  | jq .data \
  > schema.json
```

POST である必要すらないかも。

```bash
curl -sf "http://localhost:3000/api/graphql?query=$(node -pe 'encodeURI(require("graphql").getIntrospectionQuery())')" | jq .data > schema.json
```

（`graphql` の breaking change に気付きにくくなるので、丁寧にやるなら型チェックが効くようにしておくほうが良さそうな気はする）

SDL でほしければ  `printSchema(buildClientSchema(data))` で OK。

これは [get-graphql-schema](https://github.com/prisma-labs/get-graphql-schema) がやってることと同じだが、このパッケージはすごい古い `graphql` に依存してたりする。
[Apollo CLI も dreprecation になっていく](https://github.com/apollographql/apollo-tooling)方針らしく、使いたくない。
代替探してもいいんだけど、これだけのために他のパッケージに依存するのもなんだかなあと思い、手で書くようになった。

モバイルアプリなど、Node.js を使わない環境ではどうするんだろう。各ライブラリがいいい感じやってくれてるんだろうか。
