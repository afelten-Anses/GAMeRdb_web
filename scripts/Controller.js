/**
     * @fileOverview GAMeRdbi Controller module. Main script of the NodeJS webapp.
     * @author Kévin Durimel <k.durimel@gmail.com>
     * @version 1.99 RC
     */


/* ///////////////////////////////////////////////////////////////////
            ----- CONTROLLER init : modules, MVC scripts, args -----
 ///////////////////////////////////////////////////////////////// */

// ------------- NodeJS modules ------------- //
const http = require('http'); // httpserver
const fs = require('fs'); // filesystem (file parser)
const url = require('url'); // url parser
const path = require('path'); // path parser

// ------------- MVC dependencies ------------- //
const model = require('./Model'); // use Model.js as a NodeJS module
const views = require('./Views'); // use Views.js as a NodeJS module

// ------------- External modules ------------- //
const template = require('templatesjs'); // useful for header and footer 'includes'
const validator = require('validator'); // queries validator and sanitizer
const querystring = require('querystring'); // query parser and stringifyier
const args = require('commander'); // arguments parser
const shell = require('shelljs'); // run bash scripts from NodeJS
// const crypto = require("crypto"); // used for generating uuids --> now generated on client-side

// ------------- Configuration ------------- //
let listenIp = process.argv[2] || '192.168.184.133'; // default listening ip
let listenPort = process.argv[3] || 3000; // default listening port
let nbThreads = 38;

args // App usage (help)
  .version('0.99')
  .option('--dev [dev]', 'dev mode (run app in dev port)')
  .option('--local [local]', 'run app in localhost')
  .option('--threads [threads]', 'number of threads')
  .option('--mongo <mongo>', 'MongoDB login url')
  .parse(process.argv);

// if  --dev mode: change localhost ip to server ip
if (args.dev) {
  listenIp = '192.168.184.133';
  listenPort = 3001;
}
if (args.local) {
  listenIp = '127.0.0.1';
  listenPort = 3000;
}
if (args.threads) {
  nbThreads = args.threads;
}
// if (args.mongo) {
//   model.loginGenomes(args.mongo)
// } else {
//   console.log("please provide Mongo credentials");
//   process.exit(1)
// }

/* More sockets per host  (default = 5) ==> increase performance.
decrease if case of excessive ressources draining */
http.globalAgent.maxSockets = 15;

const mimeType = { // Used for automatic type MIME attribution in readServerFileAutoMime()
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mpeg',
  '.nwk': 'text/plain',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt',
  '.gff': 'text/plain',
  '.log': 'text/plain',
  '.fasta': 'text/plain',
  '.fa': 'text/plain',
  '.fq': 'text/plain',
  '.vcf': 'text/plain',
  '.fastq': 'text/plain',
  '.gbk': 'text/plain',
  '.gz': 'application/gzip',
  '.tsv': 'text/plain',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain',
  '.zip': 'application/zip'
};
const prohibed = [ // Restricted files access list
  '/Controller.njs',
  '/Model.njs',
  '/Views.njs'
];

/* ///////////////////////////////////////////////////////////////////
                    ----- Starts here -----
 ///////////////////////////////////////////////////////////////// */

/**
     * NodeJS server code. Routing requests and converts it to commands for the model or view.
     * @exports src/Controller.js
     * @namespace Controller
     */
const server = http.createServer((req, res) => {
  const urlPath = url.parse(req.url).pathname; // URL without query
  const params = querystring.parse(url.parse(req.url).query); // URL with query
  const fileName = urlPath.split('/').pop(-1); // requested filename
  console.log(req.url); // trace
  console.log('file requested : ', fileName); // trace
  console.log(params); // trace

  // Deprecated function
  /* function unpackFiles(uniqueId, filesList) {
    var child = shell.exec("sh ZipAndCall.sh " + uniqueId + " " + filesList, { async: true });
    // Say something on when child process stdout is active
    child.stdout.on('data', function (data) {
      console.log("processing files listed in tmp" + filesList)
    });
  } */

  /* handle POST request with JSON data */
  /**
         * A method in first level, just for test
         * @memberof controller
         * @method testFirstLvl
         * Repeat <tt>str</tt> several times.
         * @param {string} str The string to repeat.
         * @param {number} [times=1] How many times to repeat the string.
         * @returns {string}
         */

  function wordInString(sentence, word) {
    return new RegExp('\\b' + word + '\\b', 'i').test(sentence);
  }

  /* Read files from NAS and send it to client.
  filePath : file path, type ; file extension, msg: response code */
  function readServerFile(filePath, type, msg) {
    const ext = path.parse(filePath).ext; // Parse file requested to retrieve file extension (ext)
    fs.readFile(filePath, (errors, contents) => {
      if (errors) {
        send500(`readServerFile: Error getting the file ${filePath} : ${errors}.`); // if this file/path EXISTS cant be reached for any reason
        throw errors;
      } else {
        res.writeHead(msg, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
        res.end(contents);
      }
    });
    console.log('contenu ' + filePath + ' chargé , mimeType : ' + mimeType[ext]); // debug
  }

  /* Read server files and send it to client : automatic MIME type attribution
  type : Content-Type / msg : server response code */
  function readServerFileAutoMime(filePath, msg) {
    const ext = path.parse(filePath).ext; // Parse file requested to retrieve file extension (ext)
    // If file is a zip file stream it because it may be huge (nodeJS buffer limitations)
    if (mimeType[ext] === 'application/zip') {
      fs.createReadStream(filePath, (errors) => {
        if (errors) {
          send500(`readServerFileAutoMime : Error streaming the zip file ${filePath} : ${errors}.`); // if this file/path EXISTS cant be reached for any reason
          throw errors;
        }
        readServerFileAutoMime(filePath, 200);
      }).pipe(res); // stream end

      console.log('contenu ' + filePath + ' chargé , mimeType : ' + mimeType[ext]); // debug
    } else {
      fs.readFile(filePath, (errors, contents) => {
        if (errors) {
          send500(`readServerFileAutoMime : Error getting the file ${filePath} : ${errors}.`);
          throw errors;
        } else {
          res.writeHead(msg, { 'Content-Type': mimeType[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' }); // type MIME or application/octet-stream if unknown extension
          res.end(contents);
        }
      });
      console.log('contenu ' + filePath + ' chargé , mimeType : ' + mimeType[ext]); // debug
    }
  }

  /* Routing and "includes" processing (php includes like) */
  function readFileAndInclude(templateFilePath, msg) {
    fs.readFile(templateFilePath, (errors, contents) => {
      if (errors) {
        console.error(errors);
        send500(`readFileAndInclude : Error getting the file ${templateFilePath} : ${errors}.`); // if this file/path EXISTS cant be reached for any reason
        throw errors;
      } else {
        template.set(contents, (err, cont) => {
          if (err) {
            throw err;
          } else {
            res.writeHead(msg, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
            res.end(cont);
          }
        });
      }
    });
  }

  /* Same as readFileAndInclude, but include (php like) functionnality added */
  function readFileAndIncludeAndRender(templateFilePath, msg) {
    console.log('readFileAndIncludeAndRenderBySpecies'); // debug
    fs.readFile(templateFilePath, (errors, contents) => {
      if (errors) {
        console.error(errors);
        send500(`readFileAndIncludeAndRenderBySpecies : Error getting the file ${templateFilePath} : ${errors}.`);
        throw errors;
      } else {
        views.renderFullJson(contents, res, template, msg);
      }
    });
  }

  /* Same role as readFileAndIncludeAndRender, plus procssing views from MongoDB
   using view and model scripts */
  function readFileAndIncludeAndRenderBySpecies(templateFilePath, msg, MongoAttribute, MongoValue, species) {
    console.log('readFileAndIncludeAndRenderBySpecies'); // debug
    fs.readFile(templateFilePath, (errors, contents) => {
      if (errors) {
        console.error(errors);
        send500(`readFileAndIncludeAndRenderBySpecies : Error getting the file ${templateFilePath} : ${errors}.`);
      } else if (templateFilePath.indexOf('genomes') >= 0) {
        views.renderDataTables(species, contents, res, template, msg);
      } else if (templateFilePath.indexOf('refs') >= 0) {
        views.renderDataTablesRefs(species, contents, res, template, msg);
      } else if (templateFilePath.indexOf('ccdistribution') >= 0) {
        views.renderDataTables(species, contents, res, template, msg);
      } else if (templateFilePath.indexOf('stdistribution') >= 0) {
        views.renderDataTables(species, contents, res, template, msg);
      } else if (templateFilePath.indexOf('sdistribution') >= 0) {
        views.renderDataTables(species, contents, res, template, msg);
      }
    });
  }

  /* Dynamic routing for species workspaces (genomes,references) and rendering
  using readFileAndInclude...() functions */
  function routeFilesBySpecies(species) {
    console.log('routeFilesBySpecies'); // debug
    if (urlPath === `/species/${species}/blast`) {
      readFileAndIncludeAndRenderBySpecies(`./../interface/views/../interface/views/species/${species}/blast.html`, 200); // Blast
    } else if (urlPath === `/species/${species}/ccdistribution`) {
      readFileAndIncludeAndRenderBySpecies(`./../interface/views/species/${species}/ccdistribution.html`, 200, 'Phylogeny.Genus', species.capitalize(), species.capitalize()); // CC/ST/Serovar distribution
    }else if (urlPath === `/species/${species}/stdistribution`) {
      readFileAndIncludeAndRenderBySpecies(`./../interface/views/species/${species}/stdistribution.html`, 200, 'Phylogeny.Genus', species.capitalize(), species.capitalize()); // CC/ST/Serovar distribution
    }else if (urlPath === `/species/${species}/sdistribution`) {
      readFileAndIncludeAndRenderBySpecies(`./../interface/views/species/${species}/sdistribution.html`, 200, 'Phylogeny.Genus', species.capitalize(), species.capitalize()); // CC/ST/Serovar distribution
    } else if (urlPath === `/species/${species}/genomes`) {
      readFileAndIncludeAndRenderBySpecies(`./../interface/views/species/${species}/genomes.html`, 200, 'Phylogeny.Genus', species.capitalize(), species.capitalize()); // Genomes (Genus = species.capitalize())
    } else if (urlPath === `/species/${species}/refs`) {
      readFileAndIncludeAndRenderBySpecies(`./../interface/views/species/${species}/refs.html`, 200, 'Phylogeny.Genus', species.capitalize(), species.capitalize()); // Genomes (Genus = species.capitalize())
    } else if (urlPath === `/species/${species}/genomes_tutorial`) {
      readFileAndIncludeAndRenderBySpecies(`./../interface/views/species/${species}/genomes_tutorial.html`, 200, 'Phylogeny.Genus', species.capitalize(), species.capitalize()); // Genomes interactive tutorial
    } else if (urlPath === `/species/${species}/phylogeny`) {
      readFileAndInclude(`./../interface/views/species/${species}/phylogeny.html`, 200); // global phylogeny
    } else if (urlPath.indexOf(`/species/${species}/DATA`) !== -1) {
    /* Dynamic routing for NAS files */
      const trim = `/species/${species}`; // species sub url
      const urlPathTrimmed = urlPath.replace(trim, ''); // relative path from Controller script

      fs.exists(`.${urlPathTrimmed}`, (exist) => {
        // send 404 page if path doesn't exist
        if (!exist) {
          send404(`routeFilesBySpecies()  : File ${urlPathTrimmed} not found!`);
        } else {
          // read file from file system path
          fs.readFile(`.${urlPathTrimmed}`, (err) => {
            // if this file/path EXISTS cant be reached for any reason
            if (err) {
              send500(`routeFilesBySpecies() : Error getting the file: ${err}.`);
            } else {
              readServerFileAutoMime(`.${urlPathTrimmed}`, 200);
            }
          });
        }
      });
    } else if (req.method === 'POST') {
      // Handle POST requests (data send by user)
      console.log('Receiving POST data...');
      /*
      Handling POST requests from GENOME WORKSPACES
      if "genomes" in url : server side zip + send zipped file to client
      */
      if (wordInString(req.url, 'genomes')) {
        if (!wordInString(req.url, 'ticket')) {
          console.log('POST for --> zip genomes pipeline');
          let body = '';
          req.on('data', (data) => {
            body += data;
            console.log('req url:'); // req.url contains uuidv4() generated on the client-side
            console.log(req.url);
            // set POST size limit to 1MB. 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
              req.connection.destroy();
            }
          });

          req.on('end', () => {
            const post = querystring.parse(body, null, null, { maxKeys: 0 });
            console.log('Req content:');
            console.log(JSON.stringify(post));
            // Handle the POST request only if its JSON ("validator" used  for forms validation)
            if (validator.isJSON(JSON.stringify(post))) {
              const clientuid = req.url.split('/').pop();
              // Create tmp directory (with uuid) SYNChronously ({ async: false })
              shell.exec('mkdir -p /global/scratch/tmp/' + clientuid, { async: false });
              console.log('uuuid : ', clientuid);
              // Init filelist to zip
              const stream = fs.createWriteStream('/global/scratch/tmp/' + clientuid + '/filestozip_' + clientuid + '.txt'); // fs object containing list of files to zip
              const zipfilesList = '/global/scratch/tmp/' + clientuid + '/filestozip_' + clientuid + '.txt' // list of files to zip
              const zipOutputPathToSend = 'tmp/' + clientuid + '/wgsdata_' + clientuid + '.zip'
              console.log('files streamed: '); // debug
              // debug : stdout files list to zip
              stream.once('open', () => {
                for (let i in post) {
                  // if prop is not inherited : https://stackoverflow.com/questions/500504/why-is-using-for-in-with-array-iteration-a-bad-idea
                  if (Object.prototype.hasOwnProperty.call(post, i)) {
                    console.log(post[i], "__n: ", i);
                    stream.write(post[i] + "\n")
                  }
                }
              });
              // Launch bash script asynchrously (=when callback)
              const child = shell.exec('sh ZipAndCall.sh ' + clientuid + " " + zipfilesList, { async: true });
              // Serve files when child process ended
              child.stdout.on('end', (data) => {
                console.log(data)
                console.log('compression ended, now serving files...');
                res.writeHead(200, { 'Content-Type': 'application/zip', 'Cache-Control': 'no-cache' }); // type MIME or application/octet-stream if unknown extension
                res.end(zipOutputPathToSend); // file path that will be open By AJAX on client side then stremed with readServerFileAutoMime()
                console.log('sended: ', zipOutputPathToSend);
              });
            }
          });
        } 
      }
      else if (wordInString(req.url, 'ticket')) {
        processForm(req.url)
        //console.log('POST request not supported for this url: ', req.url);
      }
    } else {
      send404(`routeFilesBySpecies() : File file not found for ${species}`);
    }
  }

  /* Handle website contact forms and write every message in a tickets file */
  function processForm(requrl) {
    console.log('POST for --> ticket form received');
    let body = '';
    req.on('data', (data) => {
      body += data;
      console.log('req url:'); // req.url contains uuidv4() generated on the client-side
      console.log(req.url);
      // set POST size limit to 1MB. 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });
    req.on('end', () => {
      const post = querystring.parse(body, null, null, { maxKeys: 0 });
      console.log('Req content:');
      console.log(JSON.stringify(post));
      // Handle the POST request only if its JSON ("validator" used  for forms validation)
      if (validator.isJSON(JSON.stringify(post))) {
        console.log("isjson")
        const clientuid = req.url.split('/').pop();
        console.log('uuuid : ', clientuid);
        // Init filelist to zip
        const stream = fs.createWriteStream('private/tickets/' + post.name + '_' + clientuid + '.txt');
        stream.once('open', () => {
          stream.write('-----------\nName: ' + post.name + '\n' + '-----------\nMail: ' + post.mail + '\n' + '-----------\n');
          stream.write(post.message)
        });
        // how many tickets are not resolved (deleted) = number of files in the "tickets" directory
        const dir = './private/tickets';
        fs.readdir(dir, (err, files) => {
          res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' }); // type MIME or application/octet-stream if unknown extension
          res.end(String(files.length)); // number of ticket files (not resolved)
        });

      }
    });
  }

  /* Capitalize first letter (needed in routeFilesBySpecies()) */
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  /* Send err404 page : file not found
   and keep error trace in a log tool */
  function send404(message) {
    console.warn(message);
    readFileAndInclude('./../interface/views/404.html', 404);
  }
  /* Send err403 page : forbidden
  and keep error trace in a log tool */
  function send403(message) {
    console.warn(message);
    readFileAndInclude('./../interface/views/403.html', 403);
  }

  /* Send err500 page : internal server error
  and keep error trace in a log tool */
  function send500(message) {
    console.warn(message);
    readFileAndInclude('./../interface/views/500.html', 500);
  }

  /* ///////////////////////////////////////////////////////////////////
              ----- ROUTING and MVC processing  -----
   ///////////////////////////////////////////////////////////////// */


  /*
  1. Static files (css, js, imgs, fonts) are routed one by one using readServerFile()

  2. -Html files not related to species workspaces (homepage,tools pages) are routed
    one by one using readFileAndInclude() or  readFileAndIncludeAndRender()

  3. Html files related to species workfspaces are routed by sub workspaces
    using routeFilesBySpecies

  - err403, err404 and err500 routes are partially supported
  - NAS and server tmp files are automatically routed (last routes in this code).
  */

  if (urlPath === '/semantic/dist/semantic.min.css') {
    readServerFile('./../semantic/dist/semantic.min.css', 'text/css', 200);
  } else if (urlPath === '/semantic/dist/components/icon.min.css') {
    readServerFile('./../semantic/dist/components/icon.min.css', 'text/css', 200);
  } else if (urlPath === '/semantic/dist/semantic.min.js') {
    readServerFile('./../semantic/dist/semantic.min.js', 'application/javascript', 200);
  } else if (urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff2') {
    readServerFile('./../semantic/dist/themes/default/assets/fonts/icons.woff2', 'application/x-font-woff', 200);
  } else if (urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff') {
    readServerFile('./../semantic/dist:themes/default/assets/fonts/icons.woff', 'application/x-font-woff', 200);
  } else if (urlPath === '/semantic/dist/themes/default/assets/fonts/icons.ttf') {
    readServerFile('./../semantic/dist/themes/default/assets/fonts/icons.ttf', 'application/x-font-ttf', 200);
  } else if (urlPath === '/' || urlPath === '/home') {
    readFileAndIncludeAndRender('./../interface/views/homepage/index.html', 200);
  } else if (urlPath === '/tools/fastosh') {
    readFileAndInclude('./../interface/views/tools/fastosh.html', 200);
  } else if (urlPath === '/moreinfo/about') {
    readFileAndInclude('./../interface/views/moreinfo/about.html', 200);
  } else if (urlPath === '/moreinfo/faq') {
    readFileAndInclude('./../interface/views/moreinfo/faq.html', 200);
  } else if (urlPath === '/tools/fastosh_results') {
    readFileAndInclude('./../interface/views/tools/fastosh_results.html', 200);
  } else if (urlPath.indexOf('/species/') >= 0) { // indexOf returns -1 if the string is not found. It will return 0 if the string start with 'views/species'(index of the occurence)
    console.log('path species'); // debug
    if (urlPath.indexOf('bacillus') >= 0) {
      routeFilesBySpecies('bacillus');
    } else if (urlPath.indexOf('clostridium') >= 0) {
      routeFilesBySpecies('clostridium');
    } else if (urlPath.indexOf('listeria') >= 0) {
      routeFilesBySpecies('listeria');
    } else if (urlPath.indexOf('salmonella') >= 0) {
      routeFilesBySpecies('salmonella');
    } else if (urlPath.indexOf('staphylococcus') >= 0) {
      routeFilesBySpecies('staphylococcus');
    } else {
      console.log('Species not found!');
      send404("Species not found or didn't exist");
    }
  } else if (prohibed.indexOf(urlPath) >= 0) {
    send403(); // access denied
  } else if(req.method === 'POST') {
    console.log('POST: ', req.url)
    if (wordInString(req.url, 'fastosh')) {
      if (!wordInString(req.url, 'ticket')) {
        console.log('POST for --> fastosh pipeline');
        let body = '';
        req.on('data', (data) => {
          body += data;
          console.log('req url:'); // req.url contains uuidv4() generated on the client-side
          console.log(req.url);
          // set POST size limit to 1MB. 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if (body.length > 1e6) {
            req.connection.destroy();
          }
        });
        req.on('end', () => {
          const post = querystring.parse(body, null, null, { maxKeys: 0 });
          console.log('Req content:');
          console.log(JSON.stringify(post));
          // Handle the POST request only if its JSON ("validator" used  for forms validation)
          if (validator.isJSON(JSON.stringify(post))) {
            console.log("isjson")
            const clientuid = req.url.split('/').pop();
            // Create tmp directory (with uuid) SYNChronously ({ async: false })
            shell.exec('mkdir -p tmp/fastosh_' + clientuid, { async: false });
            console.log('uuuid : ', clientuid);
            // Init filelist to zip
            const stream = fs.createWriteStream('tmp/fastosh_' + clientuid + '/sketch_paths.tsv'); // fs object that will contain msh files paths
            const fashtoshTmpPath = 'tmp/fastosh_' + clientuid + '/' // list of files to zip
            console.log('files streamed: '); // debug
            // debug : stdout files list to zip
            stream.once('open', () => {
              for (let i in post) {
                // if prop is not inherited : https://stackoverflow.com/questions/500504/why-is-using-for-in-with-array-iteration-a-bad-idea
                if (Object.prototype.hasOwnProperty.call(post, i)) {
                  console.log(post[i], "__n: ", i);
                  model.getPaths('SampleID', post[i], (result) => {
                    stream.write(result[0].Genome.Sketch + "\n")
                  });
                }
              }
            });
            // // Launch Fashtosh script asynchrously (=when callback)
            const fastosh = shell.exec('python FasTosh_web.py -i ' + fashtoshTmpPath + 'sketch_paths.tsv -u ' + fashtoshTmpPath + ' -o ' + fashtoshTmpPath + 'distance_matrix -e ' + fashtoshTmpPath + 'taxonomy -T 10', { async: true });
            // const child = shell.exec("srun --cpus-per-task=" + nbThreads + " --nodelist=SAS-PP-LSCALC1 python FasTosh_web.py -i " + fashtoshTmpPath + 'sketch_paths.tsv -u ' + fashtoshTmpPath + ' -o ' + fashtoshTmpPath + 'distance_matrix -e ' + fashtoshTmpPath + 'taxonomy -T ' nbThreads, { async: true })
            // Serve files when child process ended
            fastosh.stdout.on('end', (data) => {;
              console.log('FasTosh ended, now serving files...');
              res.writeHead(200, { 'Content-Type': 'application/zip', 'Cache-Control': 'no-cache' }); // type MIME or application/octet-stream if unknown extension
              res.end(clientuid); // send uuid to results page
              console.log('sended: ', clientuid);
            });
            fastosh.stdout.on('exit', () => {
              // handle exit : TODO
            });
            fastosh.stdout.on('error', () => {
              // handle errors : TODO
            });
          }
        });
      }
    } else if (wordInString(req.url, 'ticket')) {
      processForm(req.url) // process tickets forms from fastosh page
    }
  } else {
    /* NAS FILES : auto-routing for existing paths :
      ---> This method works only for when url request == file path !
      ---> To route files using this method, just add symlinks at
      same level as GAMeRdb_web/scripts/DATA */
    console.log(`${req.method} ${req.url}`);
    // add a '.' before urlPath in order to use it inside fs.exists()
    const NasFilesPaths = `.${urlPath}`; // relative path to NAS files viewed from Controller.js. Example: tmp/...
    const staticFilePaths = '../interface' + urlPath; // relative path to static files viewed from Controller.js. Example: ..interface/js/file.js
    const pathFromScript = path.resolve(__dirname, staticFilePaths); // same as staticFilePath but added parents paths support
    console.log('pathname :', NasFilesPaths);
    console.log('pathfromscript: ', pathFromScript);
    // support static files only (do not read "views" folder)
    if (urlPath.indexOf('views') < 0) {
      fs.exists(NasFilesPaths, (exist) => {
        if (exist) {
          // create a read stream for the file if file exists
          fs.createReadStream(NasFilesPaths, (err) => {
            if (err) {
              send500(`Error getting the file: ${err}.`); // if this file/path exists but cant be reached for any reason
            } else {
              readServerFileAutoMime(NasFilesPaths, 200); // send file to the client
            }
          }).pipe(res); // stream the sended file (readServerFileAutoMime response)
        } else {
          console.log(`File ${NasFilesPaths} not found. Now searching if its a STATIC file`); // send 404 page if path doesn't exist)
          fs.exists(pathFromScript, (existP) => {
            if (existP) {
              console.log(`Ok: file ${NasFilesPaths} is a STATIC file`);
              // create a read stream for the file if file exists
              fs.createReadStream(pathFromScript, (err) => {
                if (err) {
                  send500(`Error getting the file: ${err}.`); // if this file/path exists but cant be reached for any reason
                } else {
                  readServerFileAutoMime(pathFromScript, 200); // send file to the client
                }
              }).pipe(res); // stream the sended file (readServerFileAutoMime response)
            } else {
              send404(`File ${pathFromScript} not found!`); // send 404 page if path doesn't exist
            }
          });
        }
      });
    } else {
      send403(`'illegal attempt to read [.${urlPath}] dynamic file from native filepath`);
    }
  }
});

/* ///////////////////////////////////////////////////////////////////
            ----- Start the webapp  -----
  ///////////////////////////////////////////////////////////////// */

server.listen(listenPort, listenIp);
console.log('Server running at http://', listenIp, ':', listenPort);
