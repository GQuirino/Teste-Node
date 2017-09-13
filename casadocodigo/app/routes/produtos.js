
module.exports = function (app) {
  var listaProdutos = function(req,res){
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.lista(function(erros,resultados,next){
      
      if(erros){
        return next(erros);
      }
        res.format({
            html: function(){
                res.render('produtos/lista',{lista:resultados});
            },
            json: function(){
                res.json(resultados)
            }
        });

    });
    connection.end();
  };


  app.get('/produtos', listaProdutos);

  app.get('/produtos/form', function(req, res){
    res.render('produtos/form',{errosValidacao:{},produto: {}});
  });

  app.post('/produtos', function(req, res){
    var produto = req.body;

    req.assert('titulo','Título é obrigatório').notEmpty();  
  // var validadorTitulo = req.assert('titulo','Título é obrigatório');
  // validadorTitulo.notEmpty();  
    req.assert('preco','Formato inválido').isFloat();
    
    var erros = req.validationErrors();

    if (erros){
      res.format({
        html: function(){
            res.status(400).render('produtos/form',{errosValidacao:erros,produto:produto});
        },
        json: function(){
            res.status(400).json(erros);
        }
    });
      return;
    }

    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.salva(produto, function(erros, resultados){
      console.log(erros);
      res.redirect('/produtos');
    });   
  });
}
