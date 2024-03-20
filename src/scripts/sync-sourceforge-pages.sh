#! /usr/bin/env bash

set -e

# check dependencies
for dep in git rsync ssh sshpass; do
  if command -v "$dep" >/dev/null; then
    continue
  fi
  echo "error: missing command: $dep"
  exit 1
done

# chdir to alchi/src/scripts
cd "$(dirname "$0")"
# chdir to alchi
cd ../../
alchi_repo="$(pwd)"

tempdir=$(mktemp -d)
echo "using tempdir $tempdir"
cd $tempdir

echo "cloning from '$alchi_repo' to '$tempdir/alchi'"
git clone --depth=1 "file://$alchi_repo" alchi
cd alchi

ls -A
git log | head
git status



echo pushing files to sourceforge.net

# https://sourceforge.net/p/forge/documentation/rsync/#project-web-use

# rsync --delete: delete extraneous files from dest dirs
# rsync --cvs-exclude: ignore .git/
# rsync --links: copy symlinks as symlinks

# https://sourceforge.net/p/forge/documentation/SSH%20Key%20Fingerprints/
# web.sourceforge.net, web.sf.net, frs.sourceforge.net, frs.sf.net
# SHA256:209BDmH3jsRyO9UeGPPgLWPSegKmYCBIya0nR/AWWCY

known_hosts_line='web.sourceforge.net ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOQD35Ujalhh+JJkPvMckDlhu4dS7WH6NsOJ15iGCJLC'
if ! grep -q -x "$known_hosts_line" $HOME/.ssh/known_hosts; then
  echo "$known_hosts_line" >>$HOME/.ssh/known_hosts
fi

# https://stackoverflow.com/questions/3299951/how-to-pass-password-automatically-for-rsync-ssh-command
password_file="$alchi_repo/secrets/password-web.sourceforge.net.txt"

# no. The --password-file option may only be used when accessing an rsync daemon.
# rsync --password-file="$password_file"

if ! [ -e "$password_file" ]; then
  echo "error: missing password file: $password_file"
  exit 1
fi

# rsync --rsh=ssh: interactive login

ssh_username=milahu
ssh_password=$(cat "$password_file")

rsync --recursive --compress --delete --cvs-exclude --links \
  --rsh="sshpass -p $ssh_password ssh -o StrictHostKeyChecking=no -l $ssh_username" \
  ./ milahu@web.sourceforge.net:/home/project-web/milahu-alchi/htdocs/

echo removing tempdir $tempdir
rm -rf $tempdir
