#! /usr/bin/env bash

# FIXME webui requires login http://192.168.178.120/

declare -A last_drum_replacements

last_drum_replacements[Brother_HL-L5100DN_1]="84400"
last_drum_replacements[Brother_HL-L5100DN_2]="41140"
last_drum_replacements[Brother_HL-L5100DN_3]="41500"
last_drum_replacements[Brother_HL-L5100DN_4]="24400"
last_drum_replacements[Brother_HL-L5100DN_5]="102870"
last_drum_replacements[Brother_HL-L5100DN_6]="4300 16500"
last_drum_replacements[Brother_HL-L5100DN_7]="125990"
last_drum_replacements[Brother_HL-L5100DN_8]="65700"

# <TR><TD><A HREF="/printers/Brother_HL-L5100DN_1">Brother_HL-L5100DN_1</A></TD><TD></TD><TD>192.168.178.175</TD><TD>Brother HL-L5100DN for CUPS </TD><TD>Idle</TD></TR>
printers_html="$(curl -s -L http://127.0.0.1:631/printers/)"

while read line
do
  [[ "${line:0:27}" == '<TR><TD><A HREF="/printers/' ]] || continue
  # Brother_HL-L5100DN_1
  name=$(echo "$line" | cut -d'"' -f2 | xargs basename)
  [[ "${name:0:19}" == 'Brother_HL-L5100DN_' ]] || continue
  addr=$(echo "$line" | cut -d'>' -f9 | cut -d'<' -f1)
  #echo "$addr $name"
  ping -c1 -W1 $addr >/dev/null || continue
  # the status page works on all printers, also without login
  status_html="$(curl -s -L http://$addr/general/status.html)"
  toner_remain=$(echo "$status_html" | grep 'class="tonerremain" height="' | sed -E 's/^.*class="tonerremain" height="([0-9]+)".*$/\1/')
  toner_percent=$(echo $toner_remain | awk '{ print int($1 / 60 * 100) }')
  #echo "$addr $name toner_remain: $toner_remain of 60"
  warning=$(echo "$status_html" | grep '<div id="moni_data"><span class="moni moniWarning">' | sed -E 's|^.*<div id="moni_data"><span class="moni moniWarning">([^<]+)</span></div>.*$|\1|')
  if [[ -n "$warning" ]]; then
    warning="   warning: $warning"
  fi

  # the info page requires login
  info_html="$(curl -s -L http://$addr/general/information.html)"
  page_counter=""
  drum_pages_remain=""
  drum_pages=""
  debug=""
  if ! echo "$info_html" | grep -q -F 'To&#32;Access&#32;this&#32;page&#32;you&#32;are&#32;required&#32;to&#32;Login,&#32;please&#32;Login.'; then
    # >Toner<!-- mid-end -->**</dt><dd>(50.00%)</dd>
    # note: this toner value is different than on the status page
    toner_percent_info=$(echo "$info_html" | grep -F '>Toner<!-- mid-end -->**</dt><dd>(' | sed -E 's|^.*>Toner<!-- mid-end -->\*\*</dt><dd>\(([0-9.]+)%\).*$|\1|')
    #echo "$addr   $name   toner_status: $toner_percent%   toner_info: $toner_percent_info%"
    # >Page&#32;Counter<!-- mid-end --></dt><dd>84387</dd>
    page_counter=$(echo "$info_html" | grep -F '>Page&#32;Counter<' | sed -E 's|^.*>Page&#32;Counter<!-- mid-end --></dt><dd>([0-9]+)</dd>.*$|\1|')

    if false; then
    # this counter is not reliable. replacing the drum seems to require manual reset of the counter
    # >Drum&#32;Unit<!-- mid-end -->*</dt><dd>0<span class="unit">
    # http://192.168.178.168/general/information.html
    # >Drum&#32;Unit<!-- mid-end -->*</dt><dd>53%</dd>
    drum_pages_remain=$(
      echo "$info_html" |
      grep -F '>Drum&#32;Unit<!-- mid-end -->*</dt>' |
      sed -E 's|^.*>Drum&#32;Unit<!-- mid-end -->\*</dt><dd>([0-9]+%?)<.*$|\1|'
    )
    # TODO relative if not ends with "%"
    else
    ldr=$(echo "${last_drum_replacements[$name]}" | tr ' ' $'\n' | tail -n1)
    #echo "$addr   $name   ldr: $ldr   page_counter: $page_counter   drum_pages: $((page_counter - ldr))"
    drum_pages=$((page_counter - ldr))
    fi

  else
    debug+="   debug: requires login for info page"
  fi

  [[ -n "$page_counter" ]] && page_counter="   pages: $page_counter"
  #[[ -n "$drum_pages_remain" ]] && drum_pages_remain="   drum: $drum_pages_remain/?"
  #[[ -n "$drum_pages" ]] && drum_pages="   drum: $drum_pages"
  drum_pages_expected=15000
  [[ -n "$drum_pages" ]] && drum_pages_rel=$(echo "$drum_pages" "$drum_pages_expected" | awk '{ print (100 - ($1 / $2 * 100)) }')
  [[ -n "$drum_pages" ]] && drum_pages="   drum: $drum_pages_rel%"

  echo "$addr   $name   toner: $toner_percent%$drum_pages$page_counter$warning$debug"
  #break # debug
done <<<"$printers_html"
