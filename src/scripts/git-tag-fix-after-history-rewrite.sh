#!/usr/bin/env bash

# fix git tags after rewriting the git history
# with "git-filter-repo" or "git rebase"

# restore the tags by author date

# what branches are allowed for tags?
# usually, tags are not allowed on backup branches
#branches="master branch2 branch3"
branches="master"

branches_regex="$(printf '|%s' $branches)"
branches_regex="(${branches_regex:1})"

echo "branches regex: $branches_regex"

while read tag_commit tag_ref; do
  tag_name=${tag_ref#*/*/}
  echo
  echo "checking tag $tag_name (commit $tag_commit) (date $tag_author_date)"
  tag_author_date=$(git log -1 --format='format:%ad' $tag_ref)
  tag_commit_branches="$(git branch --contains $tag_commit --format='%(refname)')"
  if ! echo "$tag_commit_branches" | grep -q -x -E "refs/heads/$branches_regex"; then
    echo "tag $tag_name is not part of branches $branches_regex"

    found=false
    for branch in $branches; do
      commit_candidates="$(git log $branch --format=format:"%ad %H" | grep "^$tag_author_date ")"
      if [[ -z "$commit_candidates" ]]; then
        #echo "error: found no commit candidates for tag $tag_name"
        :
      elif [[ $(echo "$commit_candidates" | wc -l) == 1 ]]; then
        commit_hash=${commit_candidates##* }
        echo "ok: found one commit candidate ($commit_hash) in branch $branch with author date $tag_author_date"
        echo git tag -f $tag_name $commit_hash
        git tag -f $tag_name $commit_hash
        found=true
        break
      else
        echo "error: found multiple commit candidates for tag $tag_name"
        echo "please fix this tag manually with one of these commands:"
        while read commit_candidate; do
          commit_hash=${commit_candidate##* }
          echo "  git tag -f $tag_name $commit_hash"
        done <<<"$commit_candidates"
      fi
    done
    if ! $found; then
      echo "error: found no commit candidates for tag $tag_name in branches $branches_regex"
    fi

  else
    tag_branches="$(echo "$tag_commit_branches" | grep -x -E "refs/heads/$branches_regex" | sed 's|^refs/heads/||')"
    echo "ok: tag $tag_name is part of branches" $tag_branches
  fi
done < <(
  git tag -l --format='%(objectname) %(refname)'
)
