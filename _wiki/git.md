---
layout: wiki
title: Git
cate1: Tools
cate2: Version Control
categories: Git
description: Git Common operation records
keywords: Git, version control
date_created: 2023-05-23
---
## Common commands

| Functions | Commands |
|:--------------------------|:-------------------- ------------------|
| Add files/changes to the staging area | git add filename |
| Add all files/changes to the staging area | git add . |
| Commit | git commit -m msg |
| Pull the latest code from the remote repository | git pull origin master |
| Push to remote warehouse | git push origin master |
| View configuration information | git config --list |
| View file list | git ls-files |
| Compare workspace and staging | git diff |
| Compare staging area and repository | git diff --cached |
| Compare workspace and repository | git diff HEAD |
| Remove a file from the staging area | git reset HEAD filename |
| View local remote warehouse configuration | git remote -v |
| rollback | git reset --hard commit SHA |
| Force push to remote repository | git push -f origin master |
| Modify the last commit | git commit --amend |
| Push tags to remote repository | git push --tags |
| Push a single tag to a remote repository | git push origin [tagname] |
| delete remote branch | git push origin --delete [branchName] |
| remote empty branch (equivalent to delete) | git push origin :[branchName] |
| View all branch history | gitk --all |
| show history sorted by date | gitk --date-order |

## Q&A

### How to solve the problem of garbled Chinese characters in gitk and garbled Chinese file names in git ls-files?

Add the following content in ~/.gitconfig

```
[core]
    quotepath = false
[gui]
    encoding = utf-8
[i18n]
    commitencoding = utf-8
[svn]
    pathnameencoding = utf-8
```

Reference <http://zengrom.net/post/1249.htm>

### How to deal with local changes that need to be merged into new code from the server?

```
git stash
git pull
git stash pop
```

### stash

View the stash list:

```
git stash list
```

View the list of modified files of a certain stash (the latest one is displayed by default if the last parameter is not passed):

```
git stash show "stash@{0}"
```

Display changes in patch mode

```
git stash show -p "stash@{0}"
```

Apply a stash change:

```
git stash apply "stash@{0}"
```

### How to merge upstream updates from a forked repository?

```
git remote add upstream https://upstream-repo-url
git fetch upstream
git merge upstream/master
```

### How to use TortoiseMerge.exe in TortoiseSVN to handle the conflict generated by git?
* Add the path where TortoiseMerge.exe is located to the `path` environment variable.
* Run the command `git config --global merge.tool tortoisemerge` to set TortoiseMerge.exe as the default merge tool.
* Run `git mergetool` in the directory where the conflict was generated, and TortoiseMerge.exe will pop up for you to resolve the conflict.

   > You can also run `git mergetool -t vimdiff` and use the `-t` parameter to temporarily specify a merge tool you want to use.

### The file that I don't want to track has been submitted, how to stop tracking and keep the local file?

`git rm --cached /path/to/file`, then add and commit normally.

### How not to create a branch without a parent?

```
git checkout --orphan newbranch
```

At this time, `git branch` will not display the branch until you make the first commit after making changes. For example, you may want to create an empty gh-pages branch, then:

```
git checkout --orphan gh-pages
git rm -rf .
// add your gh-pages branch files
git add .
git commit -m "init commit"
```
### Common commands of submodule

**add submodule**

```
git submodule add git@github.com:philsquared/Catch.git Catch
```

This will generate the following .gitmodules file in the root directory of the warehouse and clone the submodule to the local.

```
[submodule "Catch"]
path = Catch
url = git@github.com:philsquared/Catch.git
```

**Update submodule**

```
git submodule update
```

When the remote of the submodule is updated, it needs

```
git submodule update --remote
```

When the remote update of the submodule is pulled locally, but you want to go back:

```
git submodule update --init
```

**delete submodule**

Delete the information corresponding to the submodule in .gitmodules, and then use the following command to delete all files of the submodule:

```
git rm --cached catch
```

**Pull the submodule when cloning the warehouse**

```
git submodule update --init --recursive
```

### Delete remote tag

```
git push origin --delete tag [tagname]
```

### Create a tag based on a commit

```
git tag <tag name> <commit id>
```

```
git tag v1.0.0 ef0120
```

### Clear untracked files

```
git clean
```

Options:

| Options | Meaning |
|-----------------------|----------------------- -----------|
| -q, --quiet | Do not show deleted file names |
| -n, --dry-run | dry run |
| -f, --force | force delete |
| -i, --interactive | delete interactively |
| -d | delete folder |
| -e, --exclude <pattern> | ignore files matching <pattern> |
| -x | Clear include ignored files in .gitignore |
| -X | Only clear ignored files in .gitignore |

### Ignore file attribute changes

A chmod of a file due to a temporary need results in this being recorded as a change, sometimes this is desired, sometimes it's a nuisance.

```
git config --global core.filemode false
```

Reference: [How do I make Git ignore file mode (chmod) changes?](http://stackoverflow.com/questions/1580596/how-do-i-make-git-ignore-file-mode-chmod-changes)

### Ignore all files except a certain extension

All files except those with .c extension are ignored.

```
*
!*.c
!*/
```

In gitignore, *, ?, [] can be used as wildcards.

### patch

Generate a patch file for changes that were not added to the staging area:

```
git diff > demo.patch
```

Generate a patch file with the changes that have been added to the staging area:

```
git diff --cached > demo.patch
```

Merge the changes contained in the patch file generated by the above two commands:

```
git apply demo.patch
```

Will generate 3 patch files from 3 commits before HEAD:

(HEAD can be replaced with sha1 code)

```
git format-patch -3 HEAD
```

Generate a patch file of commits between af8e2 and eaf8e:

(Note that af8e2 is earlier than eaf8e)

```
git format-patch af8e2..eaf8e
```

Merge the patch files generated by the format-patch command:

```
git am 0001-Update.patch
```

Unlike `git apply`, this will add and commit directly.

### Only download the latest code

```
git clone --depth 1 git://xxxxxx
```

In this way, the cloned warehouse will be in a shallow state. To make it a complete version:

```
git fetch --unshallow
```

or

```
git pull --unshallow
```

### Create a branch based on a commit

```sh
git checkout -b test 5234ab
```

Indicates that the branch `test` is created based on the code whose commit hash is `5234ab`.

### restore a single file to the specified version

```sh
git reset 5234ab MainActivity.java
```

Restore the MainActivity.java file to the state when the commit hash is `5234ab`.

### Set global hooks

```sh
git config --global core.hooksPath C:/Users/mazhuang/git-hooks
```

Then put the corresponding hooks file in the directory specified by the last parameter.

For example, if you want to set that before committing, if it is detected that there is no synchronization from the server, the commit is not allowed, then create a file pre-commit in the above directory, and the content is as follows:

```sh
#!/bin/sh

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

git fetch origin $CURRENT_BRANCH

HEAD=$(git rev-parse HEAD)
FETCH_HEAD=$(git rev-parse FETCH_HEAD)

if [ "$FETCH_HEAD" = "$HEAD" ];
then
    echo "Pre-commit check passed"
    exit 0
fi

echo "Error: you need to update from remote first"

exit 1
```
### View the modified content of a commit

```sh
git show <commit-hash-id>
```

### View the modification history of a file

```sh
git log -p <filename>
```

### View the last two revisions

```sh
git log -p -2
```

### Apply an existing change / merge a commit

```sh
git cherry-pick <commit-hash-id>
```

For more detailed usage of cherry-pick, please refer to the help documentation.

### Command line auto-completion

Load the git-completion series of scripts in the shell, see <https://github.com/git/git/tree/master/contrib/completion> for details

### Change details for each line of the file

```sh
git blame <filename>
```

### Retrieve past history

```sh
git reflog
```

List a series of commits that HEAD once pointed to, they only exist on this machine, not part of the version warehouse.

besides:

```sh
git fsck
```

### Remember the username and password in http(s) mode

In some cases, the git protocol cannot be used. For example, the company's git server has set an IP whitelist, and can only use ssh in the company's intranet, so it can only use http(s) to upload and download source code outside, but manually every time Entering the username/password is very miserable, so just remember it.

Set remember password (default 15 minutes):

```sh
git config --global credential.helper cache
```

Customize the time to remember (such as one hour below):

```sh
git config credential.helper 'cache --timeout=3600'
```

Long-term storage of passwords:

```sh
git config --global credential.helper store
```

### Count the number of lines of code

Direct execution under CMD may fail, you can right-click and execute it in Git Bash here.

#### Count someone's code submissions

```sh
git log --author="$(git config --get user.name)" --pretty=tformat: --numstat | gawk '{ add += $1 ; subs += $2 ; loc += $1 - $2 } END { printf "added lines: %s removed lines : %s total lines: %s\n",add,subs,loc }'
```

#### Top 5 repository committers

If you look at all, just remove the head pipeline.

```sh
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 5
```

#### Top 5 repository committers (mailboxes)

This statistic may not be accurate, and it may have the same name.

```sh
git log --pretty=format:%ae | gawk -- '{ ++c[$0]; } END { for(cc in c) printf "%5d %s\n",c[cc],cc; } ' | sort -u -n -r | head -n 5
```

#### Contributor Ranking

```sh
git log --pretty='%aN' | sort -u | wc -l
```

#### Commit statistics

```sh
git log --oneline | wc -l
```

Reference: [Git code line statistics command set](http://blog.csdn.net/Dwarven/article/details/46550117)

### Case problem when modifying file name

When modifying the case of the file name, it will be ignored by default (this is the case under Windows), the method to make git case-sensitive:

```sh
git config --global core.ignorecase false
```

Or use `git mv oldname newname` is also possible.


### When cloning, specify a branch other than master

```sh
git clone -b <branch name> --single-branch <repo address>
```

### Get the current branch name

```sh
git symbolic-ref --short -q HEAD
```

### Solve no man viewer handled the request

Running the command `git stash --help` reports an error:

```sh
warning: failed to exec 'man': Invalid argument
fatal: no man viewer handled the request
```

The reason is that there is no man command under Windows.

You can modify the git configuration so that the help documentation for the command is opened through the browser.

```
git config --global help.format web
```

### Compare the differences between two branches

Show all diff details:

```sh
git diff <branch_name_1> <branch_name_2>
```

Display a list of files with differences:

```sh
git diff <branch_name_1> <branch_name_2> --stat
```

Show diff details for a specified file:

```sh
git diff <branch_name_1> <branch_name_2> <filename>
```

View the commits that branch A has but not branch B:

```sh
git log <branch_name_A> ^<branch_name_B>
```

### git operation times warning

Warning message:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@
@ WARNING: POSSIBLE DNS SPOOFING DETECTED! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@
The ECDSA host key for gitlab.xxxx.com has changed,
and the key for the corresponding IP address 121.40.151.8
is unknown. This could either mean that
DNS SPOOFING is happening or the IP address for the host
and its host key have changed at the same time.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@
@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:bud2tDwxl9687vMOUUBGXlwZhjxDTu7eVF43ojAu1Pw.
Please contact your system administrator.
Add correct host key in /c/Users/mzlogin/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /c/Users/mzlogin/.ssh/known_hosts:1
ECDSA host key for gitlab.xxxx.com has changed and you have requested strict checking.
Host key verification failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

solution:

```
rm ~/.ssh/known_hosts
```

Then re-operate.

### Delete local branches that do not have corresponding remote branches

(The effectiveness of this section is questionable, and sometimes it doesn't work well.)

```sh
$ git remote show origin
development tracked
master tracked
feature/new-ui tracked
refs/remotes/origin/feature/test stale (use 'git remote prune' to remove)
...
```

Among them, feature/test is the local branch that does not exist in the remote branch.

```sh
$ git remote prune origin
```

Cleanup complete.
