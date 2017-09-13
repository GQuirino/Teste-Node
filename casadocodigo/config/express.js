
  // pra não guardar valor em variável, chama a função direto
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
  /**
   view engine é uma variável pré definida do express pra informar qual o motor de view a ser utilizado, no caso O Embeded JavaScript
  */

  /**
  O node.js já possui implementado dentro de si uma maneira característica de carregamento de módulo
  convenção CommonJS
  isolar o código não é um processo tão simples

  Podemos utilizar uma variável, a module e junto dela nós vamos acrescentar o exports.
  Com isso, nós podemos evocar através do exports a função que queremos que seja retornada quando dermos um require.
  */
module.exports = function(){

  var app = express();

  app.use(express.static('./app/public'));
  app.set('view engine','ejs');// ejs engine de view
  app.set('views','./app/views');//O caminho padrão do ejs (./view) foi alterado para (./app/view)
  
  
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());

  load('routes',{cwd: 'app'})//a partir da pasta app que vai procupar a pasta routes
    .then('infra')  
    .into(app);
    
    app.use(function(req, res, next){
      res.status(404).render('erros/404');
      next();
    });
    app.use(function(error, req, res, next){
      if(process.env.NODE_ENV == 'production') {
        res.status(500).render('error/500');
        return;
    }
      next();
    });

  return app;
}
