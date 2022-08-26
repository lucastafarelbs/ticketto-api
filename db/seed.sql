
-- entity type
insert into entity_type (description) values ('Empresa');
insert into entity_type (description) values ('Universidade');

-- event_type
insert into event_type (description) values ('Virtual');
insert into event_type (description) values ('Presencial');
insert into event_type (description) values ('Híbrido');

-- payment_method
insert into payment_method (description) values ('Cartão de crédito');
insert into payment_method (description) values ('Boleto');
insert into payment_method (description) values ('Pix');
insert into payment_method (description) values ('Dinheiro');

-- payment_status
insert into payment_status (description) values ('Reservado');
insert into payment_status (description) values ('Não pago');
insert into payment_status (description) values ('Recusado');
insert into payment_status (description) values ('Pago');

-- permission
insert into public."permission" (context, functionality) values ('/user', 'get');
--insert into public."permission" (context, functionality) values ('/user', 'get');
