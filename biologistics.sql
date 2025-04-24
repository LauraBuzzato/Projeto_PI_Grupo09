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

create table cliente(
    idcliente int not null primary key auto_increment,
    idendereco int not null,
    nome varchar(80),
    CNPJ varchar(18),
    telefone varchar(20),
    foreign key (idendereco) references endereco(idendereco)
    );
-- insert  cliente
insert into cliente(idendereco, nome, CNPJ, telefone) values 
(4, 'AstraZeneca do Brasil', '60.318.797/0001-06', '(19) 3721-8000'),
(2, 'Fiocruz','00.394.544/0001-40', '(21) 3865-9500'),
(7, 'Janssen-Cilag Farmacêutica', '59.748.514/0001-00', '(85) 3456-7890'),
(1, 'Pfizer Brasil', '33.000.167/0001-10', '(11) 4002-8922'),
(6, 'Bio-Manguinhos', '00.394.544/0015-00', '(31) 3224-1010'),
(5, 'Moderna Brasil', '12.345.678/0001-99', '(41) 3304-1000'),
(3, 'Butantan', '63.025.530/0001-38', '(11) 2627-9300');


create table transportadora (
    idtransportadora int primary key auto_increment,
    nome varchar(100) not null,
    cnpj varchar(18)  not null,
    telefone varchar(20) not null,
    ativo boolean default true,
    idendereco int not null,
    matrizTransportadora int,
    foreign key (idendereco) references endereco(idendereco),
    foreign key (matrizTransportadora) references transportadora(idTransportadora)
);

-- insert trasportadora

-- insert transportadora
insert into transportadora (nome, cnpj, telefone, idendereco, matrizTransportadora) values 

  ('HealthCargo Logística', '01.987.654/0001-01', '(11) 3456-7890', 3, null),
  ('PharmaExpress','02.123.456/0001-02', '(21) 2345-6789', 1, null),
  ('BioTransMedic','03.654.321/0001-03', '(31) 8765-4321', 2, null),
  ('HealthCargo - Unidade Campinas', '01.987.654/0002-01', '(19) 4002-8922', 4, 3),
  ('HealthCargo - Unidade Curitiba', '01.987.654/0003-01', '(41) 3222-3344', 5, 3),
  ('PharmaExpress - Unidade BH',     '02.123.456/0002-02', '(31) 3555-6677', 6, 1),
  ('BioTransMedic - Fortaleza',      '03.654.321/0002-03', '(85) 98877-1122', 7, 2);


create table usuario(
idUsuario int not null primary key auto_increment,
email varchar(100) not null,
senha varchar(20) not null,
administrador boolean,
ativo boolean default true,
idTransportadora int not null,
foreign key (idTransportadora) references transportadora(idTransportadora)
);
-- insert usuarios
insert into usuario (email, senha, administrador, idTransportadora) values 
('gloria.souza@pharmaexpress.com','senha123',  true,  4), 
('fernando.lima@healthcargo.com', 'hc2023@',   false, 2), 
('ana.moreira@biotrans.com','bio321!',   true,  6), 
('carlos.silva@hc-campinas.com','campi@22',  false, 7), 
('natan.alves@hc-curitiba.com','curi@001',  false, 5), 
('luana.torres@pharma-bh.com','pharmabh#', false, 1),
('juliana.peres@biofort.com','fort#987',  false, 3); 


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
    data_pedido datetime,
    data_entrega_prevista datetime,
    data_entrega_real datetime,
    tipo_medicamento1 varchar(100),
    quantidade_medicamento1 int,
    tipo_medicamento2 varchar(100),
    quantidade_medicamento2 int,
    destinatario_nome varchar(80),
    destinatario_tel varchar(20),
    status varchar(20) default 'pendente',
    foreign key (idveiculo) references veiculo(idveiculo),
    foreign key (idcliente) references cliente(idcliente)
    
);
-- insert pedidos
insert into pedido (idveiculo, idcliente, data_pedido, data_entrega_prevista, data_entrega_real, tipo_medicamento1, quantidade_medicamento1, tipo_medicamento2, quantidade_medicamento2, destinatario_nome, destinatario_tel, status) values 
(5, 2, '2025-04-21 12:30:00', '2025-04-22 16:00:00', null, 'Vacina C', 150, 'Vacina D', 250, 'Maria Oliveira', '(21) 93456-7890', 'pendente'),
(2, 6, '2025-04-20 10:00:00', '2025-04-21 14:00:00', '2025-04-21 15:00:00', 'Vacina A', 100, 'Vacina B', 200, 'João Silva', '(11) 98765-4321', 'entregue'),
(7, 1, '2025-04-23 13:00:00', '2025-04-24 15:30:00', null, 'Vacina E', 200, null, null, 'Fernanda Souza', '(31) 99876-5432', 'pendente'),
(3, 4, '2025-04-22 09:15:00', '2025-04-23 10:30:00', null, 'Medicamento X', 50, 'Medicamento Y', 120, 'Carlos Pereira', '(41) 91234-5678', 'em_transporte'),
(1, 5, '2025-04-24 08:45:00', '2025-04-25 11:00:00', '2025-04-25 12:00:00', 'Medicamento Z', 75, 'Medicamento W', 180, 'Lucas Lima', '(51) 95555-1234', 'entregue'),
(4, 3, '2025-04-25 14:00:00', '2025-04-26 18:00:00', null, 'Vacina F', 300, 'Vacina G', 100, 'Juliana Martins', '(85) 98888-7777', 'cancelado');



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
insert into leiturasensor (idsensor, idpedido, valor) values
(1, 1, 3.25),
(3, 2, 4.10),
(2, 3, 5.00),
(5, 4, 2.80),
(6, 5, 7.60),
(4, 6, 6.30);


SELECT idpedido FROM pedido;





-- Inserts
/*
insert into transportadora (nome, cnpj, telefone, email, data_cadastro, senha) values
('Translog Brasil', '12.345.678/0001-90', '(11) 91234-5678', 'contato@translogbrasil.com.br', '2023-08-15', 'translog123'),
('Rápido Norte', '98.765.432/0001-55', '(21) 99876-5432', 'suporte@rapidonorte.com.br', '2024-01-10', 'rnorte2024'),
('Expresso Sul', '11.222.333/0001-44', '(31) 91122-3344', 'expresso@expressosul.com.br', '2023-11-05', 'sul2023xp');

insert into endereco (logradouro, numero, complemento, bairro, cidade, estado, cep, idtransportadora) values
('Rua das Acácias', 125, 'Galpão 2', 'Jardim Primavera', 'São Paulo', 'SP', '01234-567', 1),
('Avenida Brasil', 3020, 'Bloco B', 'Centro', 'Rio de Janeiro', 'RJ', '22040-110', 2),
('Rua dos Pinheiros', 87, 'Sala 5', 'Pinheiros', 'São Paulo', 'SP', '05422-010', 3),
('Rua Almeida Júnior', 45, 'Fundos', 'Parque Industrial', 'Campinas', 'SP', '13036-520', 1),
('Travessa da Serra', 19, 'Casa 1', 'Vila Nova', 'Curitiba', 'PR', '80045-120', 2),
('Avenida das Nações', 501, 'Galpão logístico', 'Distrito Industrial', 'Belo Horizonte', 'MG', '31080-300', 3),
('Rua do Comércio', 213, null, 'Centro', 'Fortaleza', 'CE', '60060-000', 1);


insert into veiculo (idtransportadora, tipo, placa, modelo, ano) values
(1, 'Automóvel', 'APC1D23', 'Mercedes-Benz Accelo 1016', 2020),
(2, 'Automóvel', 'DRF4G56', 'Volkswagen Delivery 11.180', 2022),
(3, 'Aeronave', 'PP-XCZ', 'Embraer 190F Cargo', 2021),
(1, 'Aeronave', 'PT-MTG', 'Boeing 737-800BCF', 2018),
(2, 'Automóvel', 'GDI7J89', 'Iveco Daily 70C17', 2019),
(3, 'Automóvel', 'JWL0M12', 'Ford Cargo 1119', 2023),
(1, 'Aeronave', 'PR-YLF', 'Airbus A330-200F', 2015);

insert into sensor(idveiculo)
	values	(1), (2), (3), (4), (5), (6), (7);




    
insert into enderecopedido (logradouro, numero, complemento, bairro, cidade, estado, cep, destinatario_nome, destinatario_telefone) values
('Rua das Laranjeiras', 456, 'Apto 203', 'Jardim América', 'São Paulo', 'SP', '01426-000', 'Carlos Henrique', '(11) 98877-6655'),
('Avenida Central', 7890, null, 'Centro', 'Porto Alegre', 'RS', '90010-320', 'Fernanda Souza', '(51) 98444-3322'),
('Travessa Mar Azul', 112, 'Casa 2', 'Praia Grande', 'Salvador', 'BA', '40301-280', 'João Lima', '(71) 99123-4567'),
('Rua Esperança', 350, null, 'Vila Nova', 'Recife', 'PE', '50030-100', 'Marina Duarte', '(81) 99888-7766'),
('Alameda das Rosas', 27, 'Fundos', 'Jardim das Flores', 'Goiânia', 'GO', '74000-500', 'Rafael Mendes', '(62) 98765-4321');

insert into pedido (
  idtransportadora, idveiculo, cliente_nome, cliente_documento, data_pedido, data_entrega_prevista, data_entrega_real,
  idendereco_origem, idendereco_destino,
  tipo_medicamento1, quantidade_medicamento1,
  tipo_medicamento2, quantidade_medicamento2,
  status
) values
(2, 2, 'Farmaclin Medicamentos', '12.345.678/0001-22', '2025-04-29 08:30:00', '2025-05-01 11:00:00', null, 2, 3, 'Vacina Covid-19', 100, null, null, 'em_transporte'),
(2, 5, 'BioVida Saúde', '98.765.432/0001-88', '2025-04-15 08:30:00', '2025-04-18 17:00:00', '2025-04-18 16:20:00', 5, 4, 'Insulina', 200, 'Vacina Influenza', 150, 'entregue'),
(2, 2, 'MediPlus Distribuição', '45.678.912/0001-05', '2025-04-20 08:30:00', '2025-04-22 17:00:00', '2025-04-21 11:45:00', 2, 2, 'Hormônio do Crescimento', 50, null, null, 'entregue'),
(2, 5, 'PharmaLog Express', '34.567.890/0001-01', '2025-04-10 08:30:00', '2025-04-12 17:00:00', '2025-04-13 10:05:00', 5, 3, 'Vacina BCG', 80, 'Vacina Hepatite B', 60, 'entregue'),
(2, 2, 'NeoPharma Brasil', '88.123.456/0001-55', '2025-04-17 08:30:00', '2025-04-20 17:00:00', '2025-04-20 13:10:00', 2, 4, 'Vacina Tríplice Viral', 150, null, null, 'entregue'),
(2, 5, 'Distribuidora Imuno', '56.789.123/0001-11', '2025-04-21 08:30:00', '2025-04-23 17:00:00', '2025-04-24 14:00:00', 5, 2, 'Vacina HPV', 90, null, null, 'entregue'),
(2, 2, 'CliniMed Transportes', '23.456.789/0001-77', '2025-04-11 08:30:00', '2025-04-13 17:00:00', '2025-04-14 09:40:00', 2, 3, 'Insulina', 110, 'Vacina Tétano', 70, 'entregue'),
(2, 5, 'Pharmalink Cargas', '67.890.123/0001-44', '2025-04-16 08:30:00', '2025-04-19 17:00:00', '2025-04-19 17:15:00', 5, 4, 'Hormônio do Crescimento', 65, null, null, 'entregue'),
(2, 2, 'GenMed Pharma', '77.888.999/0001-33', '2025-04-18 08:30:00', '2025-04-20 17:00:00', null, 2, 2, 'Vacina Varicela', 75, 'Vacina Febre Amarela', 60, 'em_transporte'),
(2, 5, 'FarmaMais', '90.123.456/0001-09', '2025-04-25 08:30:00', '2025-04-27 17:00:00', '2025-04-28 12:30:00', 5, 3, 'Vacina Dengue', 130, null, null, 'entregue'),
(2, 2, 'VitaTrans', '32.100.200/0001-88', '2025-04-22 08:30:00', '2025-04-24 17:00:00', '2025-04-25 18:25:00', 2, 4, 'Insulina', 140, 'Vacina Hepatite A', 90, 'entregue'),
(2, 5, 'BioExpress Medicamentos', '66.200.300/0001-77', '2025-04-19 08:30:00', '2025-04-22 17:00:00', null, 5, 2, 'Vacina Covid-19', 120, null, null, 'em_transporte'),
(2, 2, 'FarmaSul Logística', '10.200.300/0001-66', '2025-04-12 08:30:00', '2025-04-14 17:00:00', '2025-04-15 10:10:00', 2, 3, 'Vacina Raiva', 85, 'Vacina Rotavírus', 45, 'entregue'),
(2, 5, 'MedServ Express', '30.400.500/0001-21', '2025-04-08 08:30:00', '2025-04-10 17:00:00', '2025-04-10 08:50:00', 5, 4, 'Vacina Meningite C', 105, null, null, 'entregue'),
(2, 2, 'LogFarma Transportes', '11.999.888/0001-50', '2025-04-05 08:30:00', '2025-04-07 17:00:00', '2025-04-06 16:35:00', 2, 2, 'Insulina', 95, null, null, 'entregue');

insert into leiturasensor (idsensor, valor, data_hora, idpedido) values
(2, 2, '2025-05-01 10:30:00', 9),
(2, 1, '2025-05-01 10:31:00', 9),
(2, 4, '2025-05-01 10:32:00', 9),
(2, 6, '2025-05-01 10:33:00', 9),
(2, 6, '2025-05-01 10:34:00', 9),
(2, 7, '2025-05-01 10:35:00', 9),
(2, 9, '2025-05-01 10:36:00', 9),
(2, 9, '2025-05-01 10:37:00', 9),
(2, 9, '2025-05-01 10:38:00', 9),
(2, 8, '2025-05-01 10:39:00', 9);

-- select p/ tabela de pedidos

select p.idpedido as Pedido, p.cliente_nome as Cliente, p.cliente_documento as Documento_Cliente, p.data_pedido as Dt_pedido, p.data_entrega_prevista as Dt_prevista, p.data_entrega_real as Dt_real, 
	p.tipo_medicamento1 as Tipo_de_medicamento, p.quantidade_medicamento1 as Qtd, p.tipo_medicamento2 as Tipo_de_medicamento, p.quantidade_medicamento2 as Qtde, p.status as Status,
	v.tipo as Veículo, v.placa as Placa,
    eOrig.logradouro as Partida, eOrig.numero as N°, eOrig.cep as CEP, 
    eDest.logradouro as Destino, eDest.numero as N°_dest, eDest.cep as CEP_dest, eDest.destinatario_nome as Destinatário, eDest.destinatario_telefone as Tel_Destinatário
	from pedido as p
    inner join veiculo as v on v.idveiculo = p.idveiculo
    inner join endereco as eOrig on eOrig.idendereco = p.idendereco_origem
    inner join enderecopedido as eDest on eDest.idendereco_pedido = p.idendereco_destino
    where p.idtransportadora = 2
    order by p.status;
    
-- select p/ tabela de alertas 

select ls.idleitura_sensor as Alerta, ls.idpedido as Pedido, ls.idsensor as Sensor, ls.valor as Valor_do_alerta, ls.data_hora as Data_Hora
	from leiturasensor as ls
    where ls.idpedido = 9 and ls.valor > 8 or ls.valor < 2;
    
-- mensagens alertas
    
    select 
	case 
		when valor  > 8 then Concat('Alerta crítico de segurança aos medicamentos! O Id ',idsensor,' está detectando temperatura acima do suportado')
	
		when valor < 2 then Concat('Alerta crítico de segurança aos medicamentos! O Id ',idsensor,' está detectando temperatura abaixo do suportado')
	
		else concat('Nível de temperatura adequado no(s) sensor(es) ', idsensor ) 
	
	end as situação
from leiturasensor;

select valor from leiturasensor; */

