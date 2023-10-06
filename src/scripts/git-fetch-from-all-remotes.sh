#!/usr/bin/env bash

git_merge_command_lines=()



function fetch_from_remote() {

  local remote="$1"

  remote_branches="$(git ls-remote $remote | grep refs/heads/ | sed 's|^.*refs/heads/||')"

  echo
  echo "remote $remote: fetching branches:" $remote_branches

  git fetch $remote $remote_branches

  # the "origin" remote gives
  # merge: remotes/origin/master - not something we can merge
  if [[ "$remote" != "origin" ]]; then
    git_merge_command_lines+=("")
    for branch in $remote_branches; do
      git_merge_command_lines+=("git merge --ff-only --into-name $branch remotes/$remote/$branch")
    done
  fi

}



remote_list="$(git remote show)"

# fetch from "origin" first
if echo "$remote_list" | grep -q -x origin; then
  remote_list="$(echo "$remote_list" | grep -v -x origin)"
  fetch_from_remote origin
fi

for remote in $remote_list; do
  fetch_from_remote $remote
done

echo
echo "TODO: merge commits from remote branches to local branches"

for line in "${git_merge_command_lines[@]}"; do
  echo "$line"
done
