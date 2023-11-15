#!/bin/sh

set -e
set -x

opts="--force"

branches="master journal"

# try.gitea.io is a read-only mirror of the repo on github.com
ignore_remotes="try.gitea.io"

# done: remove. better: socks5h proxy:
# git -c remote.origin.proxy=socks5h://127.0.0.1:9050 clone
# git config --add remote.darktea.proxy socks5h://127.0.0.1:9050
# curl --proxy socks5h://127.0.0.1:9050
#
# build git with patched curl to fix:
# Not resolving .onion address (RFC 7686)
# https://github.com/curl/curl/pull/11236
#export CURL_ALLOW_DOT_ONION=1

remote=github.com
git fetch $remote $branches --tags

# rebase the main branches with changes from the main repo
# usually, these changes come from the Issues2Markdown github action
date=$(date +%F-%H-%M-%S)
# stash changes to the master branch
git stash -m "git pull-push $(date)"
for branch in $branches; do
  git branch --copy $branch $branch-bak-$date
  if [[ "$branch" == "master" ]]; then
    git rebase remotes/$remote/$branch
    git stash pop
  else
    branch_path="$(git worktree list | grep " \[$branch\]$" || true)"
    is_temp_branch_path=false
    if [ -n "$branch_path" ]; then
      branch_path="$(echo "$branch_path" | sed -E 's| +[0-9a-f]+ \[[^]]+\]$||')"
    else
      branch_path="worktree-branch-$branch-$date"
      git worktree add "$branch_path" $branch
      is_temp_branch_path=true
    fi
    git -C "$branch_path" stash -m "git pull-push $(date)"
    git -C "$branch_path" rebase remotes/$remote/$branch
    if $is_temp_branch_path; then
      git worktree remove "$branch_path"
    fi
    git -C "$branch_path" stash pop
  fi
done

# push changes to all repos

for remote in $(git remote show); do
  if [[ " $ignore_remotes " =~ " $remote " ]]; then
    continue
  fi
  git push $remote $branches $opts || true
  git push $remote $branches $opts --tags || true
done
