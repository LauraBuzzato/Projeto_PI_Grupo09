create database biologistics;
use biologistics;




create table endereco (
    idendereco int primary key auto_increment,
    logradouro varchar(100) not null,
    numero varchar(10),
    complemento varchar(50),
    bairro varchar(50) not null,
    cidade varchar(50) not null,
    estado char(2) not null,
    cep varchar(9) not null
);



-- insert endereco 
insert into endereco (logradouro, numero, complemento, bairro, cidade, estado, cep) values
('Rua das Acácias', 125, 'Galpão 2', 'Jardim Primavera', 'São Paulo', 'SP', '01234-567'),
('Avenida Brasil', 3020, 'Bloco B', 'Centro', 'Rio de Janeiro', 'RJ', '22040-110'),
('Rua dos Pinheiros', 87, 'Sala 5', 'Pinheiros', 'São Paulo', 'SP', '05422-010'),
('Rua Almeida Júnior', 45, 'Fundos', 'Parque Industrial', 'Campinas', 'SP', '13036-520'),
('Travessa da Serra', 19, 'Casa 1', 'Vila Nova', 'Curitiba', 'PR', '80045-120'),
('Avenida das Nações', 501, 'Galpão logístico', 'Distrito Industrial', 'Belo Horizonte', 'MG', '31080-300'),
('Rua do Comércio', 213, null, 'Centro', 'Fortaleza', 'CE', '60060-000');

select * from endereco;




create table transportadora (
    idtransportadora int primary key auto_increment,
    nome varchar(100) not null,
    cnpj varchar(18)  not null,
    telefone varchar(20) not null,
    ativo boolean default true,
    idendereco int,
    foreign key (idendereco) references endereco(idendereco)
);

-- insert trasportadora

-- insert transportadora
insert into transportadora (nome, cnpj, telefone, idendereco) values 

  ('HealthCargo Logística', '01.987.654/0001-01', '(11) 3456-7890', 3),
  ('PharmaExpress','02.123.456/0001-02', '(21) 2345-6789', 1),
  ('BioTransMedic','03.654.321/0001-03', '(31) 8765-4321', 2),
  ('HealthCargo - Unidade Campinas', '01.987.654/0002-01', '(19) 4002-8922', 4),
  ('HealthCargo - Unidade Curitiba', '01.987.654/0003-01', '(41) 3222-3344', 5),
  ('PharmaExpress - Unidade BH',     '02.123.456/0002-02', '(31) 3555-6677', 6),
  ('BioTransMedic - Fortaleza',      '03.654.321/0002-03', '(85) 98877-1122', 7);


create table usuario(
idUsuario int not null primary key auto_increment,
nome varchar(100) null, 
email varchar(100) not null unique,
senha varchar(20) not null,
administrador boolean,
ativo boolean default true,
idTransportadora int not null,
foreign key (idTransportadora) references transportadora(idTransportadora)
);
-- insert usuarios
insert into usuario (nome,email, senha, administrador, idTransportadora) values 
(null,'gloria.souza@pharmaexpress.com','senha123',  true,  4), 
('Fernando Lima','fernando.lima@healthcargo.com', 'hc2023@',   true, 2), 
(null,'ana.moreira@biotrans.com','bio321!',   true,  6), 
('Carlos Silva','carlos.silva@hc-campinas.com','campi@22',  false, 7), 
('Natan Alves','natan.alves@hc-curitiba.com','curi@001',  false, 5), 
('Luana Torres','luana.torres@pharma-bh.com','pharmabh#', false, 1),
('Juliana Peres','juliana.peres@biofort.com','fort#987',  false, 3),
(null, 'suporte@gmail.com', '123', true, 1); 


create table cliente(
    idcliente int not null primary key auto_increment,
    idendereco int not null,
    idtransportadora int,
    nome varchar(80),
    CNPJ varchar(18),
    telefone varchar(20),
    foreign key (idendereco) references endereco(idendereco),
    foreign key (idtransportadora) references transportadora(idtransportadora)
    );
-- insert  cliente
insert into cliente(idtransportadora, idendereco, nome, CNPJ, telefone) values 
(7,4, 'AstraZeneca do Brasil', '60.318.797/0001-06', '(19) 3721-8000'),
(5,2, 'Fiocruz','00.394.544/0001-40', '(21) 3865-9500'),
(4,7, 'Janssen-Cilag Farmacêutica', '59.748.514/0001-00', '(85) 3456-7890'),
(1,1, 'Pfizer Brasil', '33.000.167/0001-10', '(11) 4002-8922'),
(2,6, 'Bio-Manguinhos', '00.394.544/0015-00', '(31) 3224-1010'),
(2,5, 'Moderna Brasil', '12.345.678/0001-99', '(41) 3304-1000');


create table veiculo (
    idveiculo int primary key auto_increment,
    idtransportadora int not null,
    tipo varchar(12) not null,
    placa varchar(10) unique not null,
    modelo varchar(50) not null,
    ano int,
    ativo boolean default true,
    foreign key (idtransportadora) references transportadora(idtransportadora)
);
-- inseert veiculos
insert into veiculo (idtransportadora, tipo, placa, modelo, ano) values 
(6, 'Caminhão', 'ABC1D23', 'Mercedes-Benz Atego 2430',2020),
(2, 'Avião',    'XYZ9K88', 'Embraer EMB-120 Brasília',2018),
(1, 'Caminhão', 'JKL3Z45', 'Volkswagen Constellation',2022),
(4, 'Avião',    'QWE7F65', 'Cessna Caravan 208B',2021),
(5, 'Caminhão', 'MNO2P34', 'Volvo VM 270', 2023),
(3, 'Caminhão', 'HGF5T67', 'Ford Cargo 1119', 2019),
(7, 'Avião',    'RTY8H76', 'Beechcraft King Air 350',2020);



create table sensor (
    idsensor int primary key auto_increment,
    idveiculo int not null,
    faixa_min decimal(5,2) default 2,
    faixa_max decimal(5,2) default 8,
    ativo boolean default true,
    foreign key (idveiculo) references veiculo(idveiculo)
);
-- insert sensores
insert into sensor (idveiculo, faixa_min, faixa_max) values 
(1, 2.00, 8.00),
(2, 2.00, 8.00),
(3, 2.00, 8.00),
(4, 2.00, 8.00),
(5, 2.00, 8.00),
(6, 2.00, 8.00),
(7, 2.00, 8.00);





create table pedido (
    idpedido int primary key auto_increment,
    idveiculo int,
    idcliente int,
    data_pedido date,
    data_entrega_prevista date,
    data_entrega_real datetime,
    tipo_medicamento1 varchar(100),
    concluido boolean default false,
    foreign key (idveiculo) references veiculo(idveiculo),
    foreign key (idcliente) references cliente(idcliente)
    
);
-- insert pedidos
insert into pedido (idveiculo, idcliente, data_pedido, data_entrega_prevista, data_entrega_real, tipo_medicamento1) values 
(5, 2, '2025-04-21', '2025-04-22', null, 'Vacina C'),
(2, 6, '2025-04-20', '2025-04-21', '2025-04-21 15:00:00', 'Vacina A'),
(7, 1, '2025-04-23', '2025-04-24', null, 'Vacina E'),
(3, 4, '2025-04-22', '2025-04-23', null, 'Medicamento X'),
(1, 5, '2025-04-24', '2025-04-25', '2025-04-25 12:00:00', 'Medicamento Z'),
(4, 3, '2025-04-25', '2025-04-26', null, 'Vacina F'),
(2, 5, '2025-04-26', '2025-04-29', null, 'Vacina A');



create table leiturasensor (
    idleitura_sensor int primary key auto_increment,
    idsensor int not null,
    idpedido int,
    valor decimal(5,2) not null,
    data_hora datetime not null default current_timestamp,
    foreign key (idsensor) references sensor(idsensor),
    foreign key (idpedido) references pedido(idpedido)
);

-- insert leitura dos sensores
insert into leiturasensor(idsensor, idpedido, valor, data_hora)
	values (1,5, 5, '2025-04-25 11:10:00'),
			(1,5, 4, '2025-04-25 11:10:05'),
            (1,5, 4, '2025-04-25 11:10:10'),
			(1,5, 3, '2025-04-25 11:10:15'),
			(1,5, 3, '2025-04-25 11:10:20'),
			(1,5, 2, '2025-04-25 11:10:25'),
			(1,5, 1, '2025-04-25 11:10:30'),
			(1,5, 1, '2025-04-25 11:10:35'),
			(1,5, 2, '2025-04-25 11:10:40'),
            (1,5, 2, '2025-04-25 11:10:45'),
            (1,5, 3, '2025-04-25 11:10:50'),
            (1,5, 4, '2025-04-25 11:10:55'),
            (1,5, 5, '2025-04-25 11:11:00'),
			(1,5, 6, '2025-04-25 11:11:05'),
            (1,5, 8, '2025-04-25 11:11:10'),
            (1,5, 9, '2025-04-25 11:11:15'),
            (1,5, 9, '2025-04-25 11:11:20'),
            (1,5, 8, '2025-04-25 11:11:25');

create table alerta(
idalerta int primary key auto_increment,
idpedido int,
duracao varchar(10),
limite int,
inicio datetime default current_timestamp,
constraint chk_limite check (limite in (2, 8)),
foreign key (idpedido) references pedido(idpedido)
);

desc endereco;

 -- Selects para o site
select 
 -- nome das colunas com apelidos (apelido.coluna)
 p.idpedido as Idpedido, p.data_pedido as Dt_pedido, p.data_entrega_prevista as Dt_prevista, p.data_entrega_real as Dt_real, p.tipo_medicamento1 as 'Medicamento(1)', p.quantidade_medicamento1 as 'Qtd_med(1)', 
		p.tipo_medicamento2 as 'Medicamento(2)', p.quantidade_medicamento2 as 'Qtd_med(2)', p.status as Status, 
	v.tipo as Veículo, v.placa as Placa, c.nome as Cliente, c.telefone as Telefone, et.logradouro as Partida, et.numero as Nº_partida, et.cep as CEP_partida, ec.logradouro as Entrega, ec.numero as Nº_entrega, ec.cep as CEP_entrega

-- tabela que estamos nos referindo 
	from pedido as p
    
--  conexão entre a tabela pedido e tabela cliente - para isso citando a fk (p.idcliente) e qual pk ela se relaciona (c.idcliente)
	inner join cliente as c on c.idcliente = p.idcliente
    
-- conexão entre a tabela cliente com a tabela endereco, essa conexão só é possível pq há um join cm a tabela cliente tbm. Nesse caso, ja que citamos a tabela endereco duas vezes nesse comando
	-- o apelido (ec) não é opicional. Esse comando, por se relacionar com cliente, puxa os endereços dos clientes, nosso endereço de entrega - fk(c.idendereco) q se relaciona cm a pk(ec.idendereco)
    inner join endereco as ec on ec.idendereco = c.idendereco
    
-- conexão entre a tabela de veículo e pedido. fk (p.idveiculo) q se relaciona cm a pk(v.idveiculo)
    inner join veiculo as v on v.idveiculo = p.idveiculo 
    
-- essa conexão é feita apenas para traçar um caminho entre veiculo para endereco, pois precisamos do endereco da transportadora pois é o nosso local de partida. Se você notar, nenhuma coluna da transportadora é
	-- citada na declaração das colunas na primeira parte do comando. fk(v.idtransportadora) com a pk(t.idtransportadora)
    inner join transportadora as t on t.idtransportadora = v.idtransportadora
    
-- Conexão entre a tabela transportadora com a tabela endereco. Essa parte do comando deixa possível a exibição do local de partida, pois se relaciona cm a tabela transportadora. fk(t.idendereco) com a pk(er.idendereco)
    inner join endereco as et on et.idendereco = t.idendereco;
    

select  idleitura_sensor as Id, idsensor as Sensor, idpedido as Pedido, valor as Temperatura, data_hora as Horário
	from leiturasensor where valor > 8 or valor < 2;
    
    select c.*, t.* 
from pedido as p
inner join veiculo as v on v.idveiculo = p.idveiculo
inner join transportadora as t on t.idtransportadora = v.idtransportadora
inner join cliente as c on c.idcliente = p.idcliente;
 