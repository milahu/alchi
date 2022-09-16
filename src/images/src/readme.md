# alchi/src/images/src

use `(name).nunjuck` template to generate

* SVG images &rarr; `(name).svg`
* PNG images
  * transparent background &rarr; `(name).png`
  * white background &rarr; `(name).light.png`
  * black background &rarr; `(name).dark.png`

## commands

```sh
./pallas-pattern.generate.sh

./svg2png.sh

./move-svg-files.sh
# git add ...
# git commit ...

./move-png-files.sh
# git add ...
# git commit ...
```
