// based on
// * inliner/cli/index.js
// * @11ty/eleventy/cmd.js
// * https://github.com/11ty/eleventy/issues/620

const fs = require('fs');
const net = require('net');
const child_process = require('child_process');
const appRoot = require('app-root-path').path;
const findPort = require('find-free-port-sync');
const Eleventy = require("@11ty/eleventy");
const Inliner = require('inliner')
const npmRun = require('npm-run')

const host = '127.0.0.1';
const path = '/';
const version = new Date().toLocaleDateString('af'); // yyyy-mm-dd
//const out_file = appRoot + `/output.singlefile.${version}.html`;
//const out_file = appRoot + `/dist/alchi-book.${version}.html`;
const out_file = appRoot + `/dist/pallas.me-and-my-six-friends.${version}.html`; // TODO mkdir

const inliner_config = {
  nocompress: true,
};

async function main() {

  console.log(`appRoot = ${appRoot}`)
  process.chdir(appRoot);

  const port = findPort({ start: 8080 });
  //await sleep(50);

  // TODO use `serve` script from package.json
  const server_cmd = 'npx';
  const server_args = ['eleventy', '--serve', '--port', port, '--config=config/eleventy.config.js'];
  console.log('start eleventy server: ' + [server_cmd, ...server_args].join(' '));

  /* this way, we cannot kill the server (continues to run in background)
  const server_process = child_process.spawn(
    server_cmd, server_args, {
    stdio: 'inherit', // show output
    detached: false,
    windowsHide: true,
  });
  */

  const server_process = npmRun.spawn(
    server_args[0], server_args.slice(1), {
    stdio: 'inherit', // show output
    detached: false,
    windowsHide: true,

  });

  console.log(`started eleventy server with PID ${server_process.pid}`)

  /*
  server_process.on('close', (code) => {
    console.log(`server_process exited with code ${code}`);
  });

  server_process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  server_process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  */

  // we could also parse output from `eleventy --serve`
  for (let retry = 0; retry < 100; retry++) {
    const ping_res = await tcp_ping(host, port, 500);
    if (ping_res.status == 'error') {
      if (ping_res.error.errno != -111) { // -111 = error.code 'ECONNREFUSED'
        console.dir(ping_res);
      }
    }
    else if (ping_res.status == 'ok') {
      console.log('started eleventy server')
      break;
    }
    //console.log('.');
    await sleep(500);
  }

  const url = `http://${host}:${port}${path}`;

  if (inliner_config.nocompress) {
    inliner_config.compressCSS = false
    inliner_config.compressJS = false
    inliner_config.collapseWhitespace = false
  }

  console.log(`run inliner`);
  const inliner = new Inliner(url, inliner_config, async (error, html) => {
    console.log(`stop eleventy server`);
    server_process.kill();
    if (error) {
      const message = Inliner.errors[error.code] || error.message
      console.error(message)
      if (inliner_config.debug) console.error(error.stack)
      process.exit(1)
    }
    //console.log('html = ' + html.slice(0, 100) + ' ....')
    console.log(`write html to ${out_file}`);
    fs.writeFileSync(out_file, html, 'utf8');
    console.log(`done`);
  })
}

// https://github.com/apaszke/tcp-ping/blob/master/ping.js
function tcp_ping(address, port, timeout = 1000) {
  return new Promise((resolve, reject) => {
    try {
      const s = new net.Socket();
      s.connect(port, address, _ => {
        s.destroy();
        resolve({ status: 'ok' });
      });
      s.on('error', error => {
        s.destroy();
        resolve({ status: 'error', error });
      });
      s.setTimeout(timeout, _ => {
        s.destroy();
        resolve({ status: 'timeout' });
      });
    } catch (error) {
      reject({ status: 'error', error })
    }
  });
};

function sleep(t = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), t);
  });
};

main();

if (0) {

// this fails spectacularly ... config is not used??

// default config as returned by minimist
const argv = {
  _: [],
  quiet: null,
  version: false,
  watch: false,
  dryrun: false,
  help: false,
  serve: true,
  passthroughall: false,
  incremental: false
};

argv.port = findPort({ start: 8080 });
argv.config = appRoot + '/.eleventy.js';
/*
argv.input = appRoot + '/src';
argv.output = appRoot + '/_site';
*/

//const Eleventy = require("@11ty/eleventy");

const elev = new Eleventy(argv.input, argv.output, {
  // --quiet and --quiet=true both resolve to true
  quietMode: argv.quiet,
  configPath: argv.config,
});

elev.setIsVerbose(true);

(async function() {
  //const elev = new Eleventy();
  //elev.config = { /*my custom config*/ };
  await elev.init();
  await elev.write();
})();

}

