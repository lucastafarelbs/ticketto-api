
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

-- payment_status
insert into payment_status (description) values ('Reservado');
insert into payment_status (description) values ('Processando');
insert into payment_status (description) values ('Recusado');
insert into payment_status (description) values ('Pago');

-- permission
insert into public."permission" (context, functionality) values ('user', 'getAll');
insert into public."permission" (context, functionality) values ('user', 'create');
insert into public."permission" (context, functionality) values ('entity', 'getAll');
insert into public."permission" (context, functionality) values ('entity', 'create');
insert into public."permission" (context, functionality) values ('event', 'createDuration');
insert into public."permission" (context, functionality) values ('event', 'createInformation');
insert into public."permission" (context, functionality) values ('event', 'createTicket');
insert into public."permission" (context, functionality) values ('event', 'purchaseTicket');
insert into public."permission" (context, functionality) values ('event', 'getAll');
insert into public."permission" (context, functionality) values ('event', 'getAllType');
insert into public."permission" (context, functionality) values ('event', 'getAllDuration');
insert into public."permission" (context, functionality) values ('event', 'getInformation');
insert into public."permission" (context, functionality) values ('event', 'getTicket');
