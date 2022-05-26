# alchi-maps

compatibility map for humans

## view

view the latest version on ...

* [github](https://milahu.github.io/alchi/src/alchi-maps/public/alchi-maps.html#A1_e/bxfoto_s+m_1110_0_en_np)
* [gitlab](https://milahu.gitlab.io/alchi/src/alchi-maps/public/alchi-maps.html#A1_e/bxfoto_s+m_1110_0_en_np)

## build

```sh
# install dependencies
# use `pnpm` to cache downloads or fallback to `npm`

pnpm install || npm install



# start production server + open site

npm run dev

# .... wait for
# "Your application is ready~!"
# and run ....

xdg-open http://0.0.0.0:5000/



# build multi file + start static server
# + build single file alcimaps.html

npm run build && npm run start

# .... wait a few seconds for
# "Your application is ready~!"
# and in a second terminal run ....

npm run inline
```

