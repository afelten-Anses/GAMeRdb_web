/**
     * @fileOverview GAMeRdbi Views module. Rendering view for the controller
     * using data obtained from Models.
     * @author Kévin Durimel <k.durimel@gmail.com>
     * @version 0.99
     */

// ------------- MVC dependencies ------------- //
const model = require('./Model'); // use Model.js as a NodeJS module


/* ///////////////////////////////////////////////////////////////////
                    ----- Starts here -----
 ///////////////////////////////////////////////////////////////// */

/* Rendering  DataTables pages for a species : useful for species pages */
function renderDataTables(species, callback, response, template, msg) {
  model.filterByAttribute('Phylogeny.Genus', species, (result) => {
    // templatesJS imported in model
    template.set(callback, (errors) => {
      if (errors) {
        console.log('error in renderDataTables: ', errors);
        throw errors;
      } else {
        const JSONstring = result; // from model SucessCallback
        const list = {
          // list of variables that needed to be rendered dynamically
          datatablesJSON: JSON.stringify(JSONstring),
          JSONlen: Object.keys(JSONstring).length
        };
        template.renderAll(list, (err, templateCallback) => {
          if(err) {
            throw err;
          } else {
            response.writeHead(msg, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
            response.end(templateCallback);
          }
        });
      }
    });
  });
}

/* Rendering  DataTables pages for all species : useful for homepage */
function renderFullJson(callback, response, template, msg) {
  model.sendAllJson((result) => {
    // templatesJS imported from model
    template.set(callback, (errors) => {
      if (errors) {
        console.log('error in  renderFullJson: ', errors);
        throw errors;
      } else {
        const JSONstring = result; // from model SucessCallback
        const list = {
          // list of variables that needed to be rendered dynamically
          fullJSON: JSON.stringify(JSONstring),
          JSONlen: Object.keys(JSONstring).length
        };
        template.renderAll(list, (err, templateCallback) => {
          if (err) {
            console.log('rendering error in renderFullJson: ', errors);
            throw err;
          } else {
            response.writeHead(msg, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
            response.end(templateCallback);
          }
        });
      }
    });
  });
}
/* ///////////////////////////////////////////////////////////////////
            ----- Deprecated code  -----
  ///////////////////////////////////////////////////////////////// */

// model.filterByAttribute(MongoAttribute, MongoValue, (result) => {
//   template.set(contents, (errors) => {
//     if (errors) {
//       throw errors;
//     } else {
//       const JSONstring = result; // from model SucessCallback
//       const list = {
//         datatablesJSON: JSON.stringify(JSONstring),
//       }
//       template.renderAll(list, (err,contents) => {
//         if (err) {
//           throw err;
//         } else {
//           res.writeHead(msg, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
//           res.end(contents);
//         }
//       });
//     }
//   });
// });

/* ///////////////////////////////////////////////////////////////////
            ----- Export functions  -----
  ///////////////////////////////////////////////////////////////// */
exports.renderDataTables = renderDataTables;
exports.renderFullJson = renderFullJson;
