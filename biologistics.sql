create database biologistics;
use biologistics;

create table transportadora (
    idtransportadora int primary key auto_increment,
    nome varchar(100) not null,
    cnpj varchar(18)  not null,
    telefone varchar(20),
    email varchar(100),
    data_cadastro date,
    senha varchar(20),
    ativo boolean default true
);

create table endereco (
    idendereco int primary key auto_increment,
    logradouro varchar(100) not null,
    numero varchar(10),
    complemento varchar(50),
    bairro varchar(50) not null,
    cidade varchar(50) not null,
    estado char(2) not null,
    cep varchar(9) not null,
    idtransportadora int not null,
    foreign key (idtransportadora) references transportadora(idtransportadora)
);

create table veiculo (
    idveiculo int primary key auto_increment,
    idtransportadora int not null,
    placa varchar(10) unique not null,
    modelo varchar(50),
    ano int,
    ativo boolean default true,
    foreign key (idtransportadora) references transportadora(idtransportadora)
);

create table sensor (
    idsensor int primary key auto_increment,
    idveiculo int not null,
    faixa_min decimal(5,2),
    faixa_max decimal(5,2),
    ativo boolean default true,
    foreign key (idveiculo) references veiculo(idveiculo)
);

create table leiturasensor (
    idleitura_sensor int primary key auto_increment,
    idsensor int not null,
    valor decimal(5,2) not null,
    data_hora datetime not null default current_timestamp,
    foreign key (idsensor) references sensor(idsensor)
);

create table lotemedicamento (
    idlote int primary key auto_increment,
    fabricante varchar(60) not null,
    nome_medicamento varchar(70) not null,
    numero_lote varchar(50) not null,
    data_fabricacao date not null,
    data_validade date not null,
    quantidade_inicial int not null,
    quantidade_disponivel int not null,
    idveiculo int not null,
    statusmedicamento varchar(50),
    foreign key (idveiculo) references veiculo(idveiculo)
);

create table enderecopedido (
    idendereco_pedido int primary key auto_increment,
    logradouro varchar(100) not null,
    numero varchar(10) not null,
    complemento varchar(50),
    bairro varchar(50) not null,
    cidade varchar(50) not null,
    estado char(2) not null,
    cep varchar(9) not null,
    referencia varchar(100),
    destinatario_nome varchar(100),
    destinatario_telefone varchar(20)
);

create table pedido (
    idpedido int primary key auto_increment,
    idtransportadora int not null,
    idveiculo int,
    cliente_nome varchar(100) not null,
    cliente_documento varchar(20) not null,
    data_pedido datetime not null,
    data_entrega_prevista datetime,
    data_entrega_real datetime,
    idendereco_origem int not null,
    idendereco_destino int not null,
    status varchar(20) default 'pendente',
    temperatura_requerida decimal(5,2),
    foreign key (idtransportadora) references transportadora(idtransportadora),
    foreign key (idveiculo) references veiculo(idveiculo),
    foreign key (idendereco_origem) references enderecopedido(idendereco_pedido),
    foreign key (idendereco_destino) references enderecopedido(idendereco_pedido),
    constraint chk_status check (status in ('pendente', 'em_transporte', 'entregue', 'cancelado'))
);