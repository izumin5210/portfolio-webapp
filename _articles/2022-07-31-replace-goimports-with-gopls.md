---
updatedOn: null
tags: ['go']
---

# goimports をやめて gopls に寄せる

自分は Go を書くときは Vim を使っていた。
2020-01 に vim-go から [gopls][gopls] + [mattn/vim-goimports][vim-goimports] に移行してそのままだったのだが、
最近になって gopls が LSP の `source.organzieImports` Code Action に対応していることに気づいた。

（当時は gopls が import 補完に対応してない思いこんでいたんだけど、gopls の commit を追っていくと 2020 年時点で既に `source.organizeImports` に関するコードがあるように見える… 😇）

ISUCON で久々に本気 Go を書くことになるので、環境を見直すついでにこのへんの移行もした。
[vim-lsp の README][vim-lsp] をベースに、`BufWritePre` で `source.organizeImports` も同期実行するようにした形。

```vim
function! s:on_lsp_buffer_enabled() abort
  " ...

  let g:lsp_format_sync_timeout = 1000
  autocmd BufWritePre *.go call execute(['LspCodeActionSync source.organizeImports', 'LspDocumentFormatSync'])
endfunction
```

- [Update vim\-lsp and gopls by izumin5210 · Pull Request \#209 · izumin5210/dotfiles](https://github.com/izumin5210/dotfiles/pull/209)

いままで外部コマンド呼び出しだったのが LSP に任せられるようになったからか、`:w` がかなり速くなった印象（しばらく Go から離れてたので気のせいかもしれないが…）

ちなみに、設定の甲斐なく ISUCON12 は予選落ちです。

[gopls]: https://github.com/golang/tools/blob/master/gopls/README.md
[vim-goimports]: https://github.com/mattn/vim-goimports
[vim-lsp]: https://github.com/prabirshrestha/vim-lsp
