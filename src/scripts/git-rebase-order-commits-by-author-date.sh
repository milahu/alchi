#!/usr/bin/env bash

# git-rebase-order-commits-by-author-date.sh

# https://stackoverflow.com/questions/27245008/reorder-git-commit-history-by-date

if [ $# = 0 ]; then
  echo "usage:" >&2
  echo "  $0 git_rebase_args..." >&2
  echo "" >&2
  echo "examples:" >&2
  echo "  $0 HEAD~5" >&2
  echo "  $0 --root --committer-date-is-author-date" >&2
  exit 1
fi

if [ $# = 1 ] && [ -e "$1" ] && [ "${1: -34}" == "/.git/rebase-merge/git-rebase-todo" ]; then

  # arg is commit list file
  # this script was called via sequence.editor
  todo_path="$1"
  todo_text_1=$(grep "^pick " "$todo_path")
  # sort by column 3
  todo_text_2=$(echo "$todo_text_1" | sort -k3)
  if [ "$todo_text_1" = "$todo_text_2" ]; then
    # no change
    touch $GIT_REBASE_TODO_EMPTY_PATH
    exit
  fi
  echo "$todo_text_2" > "$todo_path"
  exit

fi

# %at = author timestamp
# the todo file will have 3 columns:
# pick $hash $timestamp

export GIT_REBASE_TODO_EMPTY_PATH=$(mktemp -u)

git \
  -c rebase.instructionFormat="%at" \
  -c sequence.editor="$0" \
  rebase -i "$@"

rc=$?

# fix: exit 0 when nothing to do
if [ $rc = 1 ] && [ -e $GIT_REBASE_TODO_EMPTY_PATH ]; then
  rc=0
  echo "ok: nothing to do"
fi

if [ -e $GIT_REBASE_TODO_EMPTY_PATH ]; then
  rm $GIT_REBASE_TODO_EMPTY_PATH
fi

exit $rc
