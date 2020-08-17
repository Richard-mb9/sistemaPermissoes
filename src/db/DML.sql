INSERT INTO tbsystem(SystemName,Mnemonic) VALUES ('funcionarios','func');
INSERT INTO tbsystem(SystemName,Mnemonic) VALUES ('vendas','vend');

INSERT INTO tbRule(RuleName,idSystem) VALUES ('Cadastrar Funcionario',1);
INSERT INTO tbRule(RuleName,idSystem) VALUES ('Remover Funcionario',1);
INSERT INTO tbRule(RuleName,idSystem) VALUES ('Alterar Funcionario',1);
INSERT INTO tbRule(RuleName,idSystem) VALUES ('Consultar Funcionario',1);
INSERT INTO tbRule(RuleName,idSystem) VALUES ('Cadastrar Venda',2);
INSERT INTO tbRule(RuleName,idSystem) VALUES ('Remover Venda',2);
INSERT INTO tbRule(RuleName,idSystem) VALUES ('Alterar Venda',2);
INSERT INTO tbRule(RuleName,idSystem) VALUES ('Consultar Venda',2);

INSERT INTO tbLogin(Login,Password,nome,email) VALUES ('carlos_silva','123456','Carlos','carlos@gmail.com');
INSERT INTO tbLogin(Login,Password,nome,email) VALUES ('mariabb','123456','Maria','maria@hotmail.com');
INSERT INTO tbLogin(Login,Password,nome,email) VALUES ('pedroh2','123456','Pedro','pedro@yahoo.com.br');

INSERT INTO tbLoginRules(idRule,idLogin) VALUES(1,1);
INSERT INTO tbLoginRules(idRule,idLogin) VALUES(2,1);
INSERT INTO tbLoginRules(idRule,idLogin) VALUES(3,2);
INSERT INTO tbLoginRules(idRule,idLogin) VALUES(4,2);
INSERT INTO tbLoginRules(idRule,idLogin) VALUES(5,3);
INSERT INTO tbLoginRules(idRule,idLogin) VALUES(6,3);