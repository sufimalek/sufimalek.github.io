---
layout: wiki
title: Vim
cate1: Tools
cate2: Editor
description: The most commonly used Vim operations by individuals.
keywords: Vim
date_created: 2023-07-05
---
### move

**in units of characters (characters)**

| Functions | Buttons |
|:-----|:-----|
| on | `k` |
| down | `j` |
| left | `h` |
| right | `l` |

**in words**

| Functions | Buttons |
|:-----------------------------------------|:-----|
| previous word ending | `ge` |
| the beginning of the next word | `w` |
| The beginning of this word (if already at the beginning of this word, skip to the beginning of the previous word) | `b` |
| The end of this word (skip to the end of the next word if it is already at the end of this word) | `e` |

**In screen units**
 
| Functions | Buttons |
|:-------------------------|:---------|
| Page down | `CTRL-f` |
| page up | `CTRL-b` |
| Turn half a page down | `CTRL-d` |
| Turn half a page up | `CTRL-u` |
| Go up one line | `CTRL-y` |
| Go down one line | `CTRL-e` |
| Move the cursor to the top of the screen | `H` |
| Move the cursor to the middle of the screen | `M` |
| Move the cursor to the bottom of the screen | `L` |
| Move the cursor position to the top of the screen | `zt` |
| Move the cursor position to the middle of the screen | `zz` |
| Move the cursor position to the bottom of the screen | `zb` |

**line number**

| Functions | Buttons |
|:-------------|:----------------------------|
| jump to line num | `:num` or `numG` or `numgg` |

**document**

| Functions | Buttons |
|:-----------|:-----|
| Jump to the beginning of the file | `gg` |
| Jump to end of file | `G` |

### edit

#### copy

| Functions | Buttons |
|:-----------------|:------|
| Copy the word under the cursor | `yiw` |
| Copy the line where the cursor is located | `yy` |

#### paste

| Functions | Buttons |
|:---------------|:-----|
| paste after cursor | `p` |
| Paste before cursor | `P` |

#### cut

| Functions | Buttons |
|:---------------|:-----|
| cut selection | `d` |
| Cut the line where the cursor is located | `dd` |

#### replace

| Functions | Buttons |
|:-------------------------------------|:------------ --------|
| Replace str1 with str2 in full text | `:%s/str1/str2/g` |
| replace str1 with str2 in lines 1 to 5 | `:1,5s/str1/str2/g` |

#### Case

| Functions | Buttons |
|:---------------------|:----------------|
| Swap case selection | `~` |
| Convert all selected content to lowercase | `gu` |
| Convert selection to uppercase | `gU` |
| lowercase the current line | `guu` |
| Make the current line uppercase | `gUU` |
| Replace matches with uppercase | `:%s/xxx/\U&/g` |
| Replace matches with lowercase | `:%s/xxx/\L&/g` |

Note: `&` represents all the matching items of the regular expression, and `\1`, '\2', ..., `\9` represent the 1st to 9th matching items.

### choose

| Functions | Buttons |
|:---------------------|:--------------------|
| Select the last selected region | `gv` |
| Select the area inside the brackets | `vi{`, `vi[`, `vi(` |

### search

| Functions | Buttons |
|:---------------------|:-------|
| Find strings down | `/str` |
| look up string | `?str` |
| find next | `n` |
| Find Previous | `N` |
| Find the word under the cursor | `*` |
| Find the word under the cursor | `#` |

### Regular Expressions

| Functions | Buttons |
|:---------------|:---------------------|
| matches word left boundary | `\<` |
| matches the right edge of a word | `\>` |
| deduplication | `:g/^\(.*\)$\n\1/d` |

### Commonly used

| Functions | Buttons |
|:----------------------|:---------------|
| delete empty lines | `:g/^$/d` |
| Undo/UNDO | `u` |
| redo/REDO | `C-r` |
| Count lines/words/chars/bytes | `g C-g` |
| Remove UTF-8 BOM | `:set nobomb` |
| Preserve UTF-8 BOM | `:set bomb` |

### Global

| Functions | Buttons |
|:-------------|:-----|
| exit | `:q` |
| Mandatory | `!` |
| Execute external command | `:!` |

### File Operations

| Functions | Buttons |
|:--------------------|:----------|
| open | `:e` |
| open file dialog | `:bro e` |
| save | `:w` |
| Save As Dialog | `:brow` |
| view a list of historical files | `:ol` |
| view and open history files | `:bro ol` |
|Rename the current file|`:f filename`|

### vimdiff

| Functions | Buttons |
|:-----------------------|:--------------|
| move to previous difference | `[c` |
| move to next difference | `]c` |
| The diff point uses the | `dp` of the current file |
| This diff uses | `do` from other files |
| Manually refresh and re-diff | `:diffupdate` |

### Buffer

| Functions | Buttons |
|:-------------------------------------|:---------|
| View Buffer list | `:ls` |
| Go to the next Buffer in the Buffer list | `:bn` |
| Go to the previous Buffer in the Buffer list | `:bp` |
| Go to Buffer number num in the Buffer list | `:bnum` |
| A Buffer you have been in before | `:b#` |
| Delete num buffers from the Buffer list | `:bdnum` |

### Combine commands

You can use `|` to combine commands, such as `cmd1 | cmd2`.

### code

| Functions | Buttons |
|:------------------------|:---------------------- ---------|
| formatting code | `gg=G` |
| Remove the line number at the beginning of line 1-20 | `:1,20s/^\\s\*[0-9]\*\\s\*//g` |
| Expand All Collapse | `zR` |
| Expand the current level of folding | `zr` |
| Collapse All | `zM` |
| current level collapse | `zm` |
| Toggle collapse/expand | `za` |
| Recursively fold/expand the current large block | `zA` |
| Collapse the current block | `zc` |
| Recursively fold the current large block | `zC` |
| Expand current block | `zo` |
| Recursively expand the current large block | `zO` |
| format json data | `:%!python -m json.tool` |
| indent current line | `>>` |
| Unindent the current line | `<<` |

### modeline

Writing:

```
  vim: set ft=markdown:
  vim:ft=markdown

// vim: noai:ts=4:sw=4
/* vim: noai:ts=4:sw=4 */
```

### Plugins

#### CtrlP

Basic keys `C-p`

| Functions | Buttons |
|:-------------------------------------|:----------|
| Refresh list | `F5` |
| switch file/buffer/MRU | `C-f/b` |
| Toggle full path search/filename search | `C-d` |
| toggle regex mode | `C-r` |
| Previous/Next option | `C-k/j` |
| Open file in new tab/vertical split/horizontal split | `C-t /v/x` |
| The previous/next record of history selection | `C-p/n` |
| create file and its parent directory | `C-y` |
| mark and open multiple files | `C-z C-o` |
| Exit CtrlP | `C-c` |

#### LeaderF

| Functions | Buttons |
|:-----------------------------------|:----------- ------------|
| open file | `Leader-f` |
| Open buffer | `Leader-b` |
| Open MRU | `Leader-m` (custom) |
| exit | `C-c` |
| Toggle fuzzy search and regular search | `C-r` |
| paste | `C-v` |
| Clear input | `C-u` |
| Previous/Next option | `C-k/j` |
| Open file in new tab/vertical split/horizontal split | `C-t/]/v` |
| Refresh list | `F5` |

#### vim-table-mode

| Functions | Buttons |
|:---------------|:-------------|
| drop column | `Leader-tdc` |
| delete line | `Leader-tdd` |
| Reformat table | `Leader-tr` |

#### markdown-preview.nvim

| Functions | Buttons |
|----------|------|
| Preview | `F5` |
| stop preview | `F6` |

Export PDF: After previewing, use the "Print" function of the browser, select "Save as PDF" for the printer, uncheck "Header and Footer", and then click Save.

### Command Line

Jump to the specified line when opening Vim:

```
vim +[num] filename
```

num represents the line number, if not filled, it will jump to the end of the file.
