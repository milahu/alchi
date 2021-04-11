#!/usr/bin/env bash

#dest="$1"

# get absolute paths
dest="$(readlink -f "$1")"
src="$(readlink -f .)"

if [ -z "$dest" ]; then
	echo "usage: $0 <path_to_destination_folder>"
	exit 1
fi

if [ ! -d "$dest" ]; then
	echo "error: not a directory: $dest"
	exit 1
fi

echo "will copy:"
echo "  from $src"
echo "  to   $dest"
echo "hit Ctrl+C to abort"
printf "hit enter to confirm: "
read

rsync_opts=""
rsync_opts+=" --verbose --progress"
#rsync_opts+=" --checksum" # slow
rsync_opts+=" --archive"
rsync_opts+=" --recursive"
rsync_opts+=" --relative"
rsync_opts+=" --prune-empty-dirs"

#rsync -avrmR --exclude='node_modules/' --include='*/' --include='*.yaml' --exclude='*' ./ ./dist
rsync $rsync_opts --exclude='node_modules/' --include='*' ./ "$(readlink -f "$dest")"
