#! /usr/bin/env bash

set -eu

for i in "$@"; do

	echo
	echo "i = $i"

	t=$(mktemp --suffix="$(basename "$i")")

	pdftk "$i" cat output "$t"

	i_size=$(stat -c%s "$i")
	t_size=$(stat -c%s "$t")

	if (( t_size < i_size )); then
		echo "success: compressed pdf from $i_size to $t_size"
		mv -v "$i" "$i.bak~$(date +%s)"
		mv -v "$t" "$i"
	else
		echo "no change in size"
		rm "$t"
	fi

done
