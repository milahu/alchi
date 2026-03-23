#! /usr/bin/env bash

cd "$(dirname "$0")"

# options
# https://www.cs.utexas.edu/facilities/documentation/printing-options

# manual duplex: even -> odd
# -o sides=one-sided -o page-set=even
# -o sides=one-sided -o page-set=odd

if [ -z "$1" ] || [ "${1##*.}" != "pdf" ]; then
  echo "error: no pdf file"
  echo "usage: $0 document.pdf"
  exit 1
fi

pdf="$1"
echo "pdf: $pdf"

printer_nums="1                 10 11 12 13 14 15 16 17 18 19"

# options=(-o sides=two-sided-short-edge -o PageSize=A4 -o PrintQuality=600dpi)
options=(-o sides=two-sided-long-edge -o PageSize=A4 -o PrintQuality=600dpi)

options+=(-n 20)

t1=0
t2=4m # time to print round + sleep time after round

set -x

# 4 * 2 = 8 rounds with fast printers
# 3 * 2 = 6 rounds with fast printers

# print only with one printer
#if true; then
if false; then
  sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN
  exit
fi

#rounds=3
#rounds=4
#rounds=6 # 6 * 33 = 198 of 250
#rounds=7 # 7 * 33 = 231 of 250
rounds=1

if false; then
if [ -n "$1" ]; then
  rounds="$1"
fi
fi

for round in $(seq $rounds); do

  echo "round $round of $rounds"

  if [[ "$round" != "1" ]]; then
    # wait between rounds
    sleep $t2
    echo hit enter to print this round
    # TODO drain stdin before reading enter
    while true; do
      echo reading enter
      read user_input
      echo "user_input = '$user_input'"
      if [[ "$user_input" == "" ]]; then
        echo got enter
        break
      fi
    done
  fi

  # one round with slow printer
  #sleep $t1; lp "$pdf" "${options[@]}" -d Samsung_M3825_socket
  #sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN # FIXME slow

  # auto duplex
  for p in $printer_nums; do
    sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN_$p
  done

  continue

  # see also: print-loop.manual-duplex.sh
  if false; then
    # manual duplex
    # workaround for vertical crease from auto duplex
    # front side
    # TODO loop $printer_nums
    sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN_3 -o sides=one-sided -o page-set=odd
    sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN_4 -o sides=one-sided -o page-set=odd
    sleep $t2
    echo TODO move paper from output to manual feed: Brother_HL-L5100DN_3, Brother_HL-L5100DN_4
    echo hit enter to print back side
    read
    # back side
    # TODO loop $printer_nums
    sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN_3 -o sides=one-sided -o page-set=even -o outputorder=reverse
    sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN_4 -o sides=one-sided -o page-set=even -o outputorder=reverse

    if false; then
      # two rounds with fast printers
      for k in $(seq 2); do
        round=$(((i-1)*2 + k))
        echo round $round
        # TODO loop $printer_nums
        sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN
        sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN_2
        #sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN_3 # FIXME vertical crease
        #sleep $t1; lp "$pdf" "${options[@]}" -d Brother_HL-L5100DN_4 # FIXME vertical crease
        sleep $t2
      done
    fi
  fi
done
