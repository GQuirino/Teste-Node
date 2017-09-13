var express = require('../config/express')();
var request = require('supertest')(express);


describe('ProdutosController', function(){
    //alterar ambiente do express para test
    process.env.NODE_ENV = "test"; //no prompt NODE_ENV=test node_modules/mocha/bin/mocha

    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        //PESQUISAR node-database-cleaner biblioteca para limpar todas as tabelas da base de dados que passar
        conn.query("delete from produtos", function(ex, result){
            if(!ex){
                done();
            }
        });
    });


    it('#listagem json',function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);       
    });
    
    it('#cadastro de novo produto com dados invalidos', function(done){
        request.post('/produtos')
        .send({titulo:"",descricao:"novo livro"})
        .expect(400,done);
    });
    
    it('#cadastro de novo produto com dados validos', function(done){
        request.post('/produtos')
        .send({titulo:"titulo",descricao:"novo livro", preco:111.11})
        .expect(302,done);
    });
    

});

 