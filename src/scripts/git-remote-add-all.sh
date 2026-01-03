#!/usr/bin/env bash

main_branches="master journal"

username=milahu

force=true

function git_remote_add() {

  local name="$1"
  local url="$2"

  exists=false
  if git remote get-url "$name" >/dev/null 2>&1; then
    exists=true
  fi

  if ! $force && $exists; then
    # remote with this name already exists
    echo "remote exists: $name"
    return
  fi

  # add username
  url="$(echo "$url" | sed -E "s|^(https?://)|\1${username}@|")"

  if ! $exists; then
    echo "adding remote: $name"
    git remote add "$name" "$url"
  else
    echo "updating remote: $name"
    git remote set-url "$name" "$url"
  fi

  if echo "$name" | grep -q '.onion$'; then
    echo "torifying remote: $name"
    git config --add "remote.$name.proxy" socks5h://127.0.0.1:9050
  fi

}



git_remote_add github.com https://github.com/milahu/alchi

git_remote_add gitlab.com https://gitlab.com/milahu/alchi

git_remote_add codeberg.org https://codeberg.org/milahu/alchi

git_remote_add sourceforge.net https://git.code.sourceforge.net/p/milahu-alchi/code

git_remote_add notabug.org https://notabug.org/milahu/alchi

git_remote_add disroot.org https://git.disroot.org/milahu/alchi

git_remote_add sr.ht git@git.sr.ht:~milahu/alchi

git_remote_add darktea.onion http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi

git_remote_add righttoprivacy.onion http://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion/milahu/alchi

git_remote_add darkforest.onion http://git.dkforestseeaaq2dqz2uflmlsybvnq2irzn4ygyvu53oazyorednviid.onion/milahu/alchi

git_remote_add gdatura.onion http://gdatura24gtdy23lxd7ht3xzx6mi7mdlkabpvuefhrjn4t5jduviw5ad.onion/milahu/alchi



# done
exit 0



# not needed?
# what problem should this solve?
if false; then
# fix error: There are multiple remotes whose fetch refspecs map to the remote
# caused by: git branch --set-upstream-to=...
if origin_url=$(git remote get-url origin); then
  new_origin_name=""
  git remote show | grep -v -x origin | while read remote; do
    remote_url=$(git remote get-url $remote)
    if [[ "$origin_url" == "$remote_url" ]]; then
      new_origin_name="$remote"
      break
    fi
  done
  if [[ -n "$new_origin_name" ]]; then
    git remote remove origin
    # use the previous "origin" as default remote, so we can just "git pull" and "git push"
    for branch in $main_branches; do
      git branch --set-upstream-to=$new_origin_name/$branch $branch
    fi
  fi
fi
fi
