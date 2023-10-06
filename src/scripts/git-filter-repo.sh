#!/usr/bin/env bash

# copy all values from author to committer
# https://stackoverflow.com/questions/28536980/git-change-commit-date-to-author-date

git filter-repo --commit-callback '
  commit.committer_date = commit.author_date;
  commit.committer_name = commit.author_name;
  commit.committer_email = commit.author_email;
'
