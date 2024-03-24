#!/bin/sh

set -e
set -x

# chdir to repo root
cd "$(dirname "$0")"/../..

repo_root="$PWD"

# get absolute path so we can cd/pushd
git_rebase_order_commits_by_author_date="$(readlink -f src/scripts/git-rebase-order-commits-by-author-date.sh)"

opts="--force"

main_branch="master"

extra_branches=""

branches="$main_branch $extra_branches"

ignore_remotes=""

# force english language so we can parse git output
export LANG=C
export LC_ALL=C

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
# stash changes to the main branch
stash_output="$(git stash -m "git pull-push $(date)")"
echo "$stash_output"
if [[ "$stash_output" == "No local changes to save" ]]; then
  did_stash_main=false
else
  did_stash_main=true
fi
for branch in $branches; do
  git branch --copy $branch $branch-bak-$date
  if [[ "$branch" == "$main_branch" ]]; then
    last_head=$(git rev-parse $branch)
    git rebase remotes/$remote/$branch --committer-date-is-author-date
    "$git_rebase_order_commits_by_author_date" $last_head --committer-date-is-author-date
    if $did_stash_main; then
      git stash pop
    fi
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
    pushd "$branch_path" >/dev/null
    stash_output="$(git stash -m "git pull-push $(date)")"
    echo "$stash_output"
    if [[ "$stash_output" == "No local changes to save" ]]; then
      did_stash=false
    else
      did_stash=true
    fi
    last_head=$(git rev-parse $branch)
    git rebase remotes/$remote/$branch --committer-date-is-author-date
    "$git_rebase_order_commits_by_author_date" $last_head --committer-date-is-author-date
    if $is_temp_branch_path; then
      git worktree remove "$branch_path"
    fi
    if $did_stash; then
      git stash pop
    fi
    popd >/dev/null
  fi
done

# push changes to all repos

for remote in $(git remote show); do
  if [[ " $ignore_remotes " =~ " $remote " ]]; then
    continue
  fi
  if echo "$remote" | grep -q readonly; then
    continue
  fi
  # TODO push branches and tags in one command
  git push $remote $branches $opts || true
  git push $remote $branches $opts --tags || true
done

# codeberg.org has no automatic update like github pages
echo updating https://milahu.codeberg.page/alchi/
git push codeberg.org $main_branch:pages --force

# sourceforge.net has no automatic update like github pages
echo updating https://milahu-alchi.sourceforge.io/
"$repo_root/src/scripts/sync-sourceforge-pages.sh"
