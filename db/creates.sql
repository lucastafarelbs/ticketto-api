CREATE TABLE public.entity_type (
	id bigserial NOT NULL,
	description varchar(200) NOT NULL,
	CONSTRAINT entity_type_pk PRIMARY KEY (id)
);

CREATE TABLE public.entity (
	id bigserial NOT NULL,
	"name" varchar(200) NOT NULL,
	"document" varchar(100) NOT NULL,
	entity_type_id bigint NOT NULL,
	CONSTRAINT entity_pk PRIMARY KEY (id),
	CONSTRAINT entity_fk FOREIGN KEY (entity_type_id) REFERENCES public.entity_type(id)
);

CREATE TABLE public.event_type (
	id bigserial NOT NULL,
	description varchar(200) NOT NULL,
	CONSTRAINT event_type_pk PRIMARY KEY (id)
);

CREATE TABLE public.event (
	id bigserial NOT NULL,
  entity_id bigint not null,
	event_type_id bigint NOT NULL,
	"description" varchar(200) NOT NULL,
	"minimal_age" int NOT NULL,
  "url" varchar(3000),
	CONSTRAINT event_pk PRIMARY KEY (id),
	CONSTRAINT event_entity_fk FOREIGN KEY (entity_id) REFERENCES public.entity(id),
	CONSTRAINT event_type_fk FOREIGN KEY (event_type_id) REFERENCES public.event_type(id)
);

CREATE TABLE public.event_duration (
	id bigserial NOT NULL,
	event_id bigint NOT NULL,
	description varchar(200) NOT NULL,
	"begin" timestamp NULL,
	"end" timestamp NULL,
	CONSTRAINT event_duration_pk PRIMARY KEY (id),
	CONSTRAINT event_duration_event_fk FOREIGN KEY (event_id) REFERENCES public."event"(id)
);

CREATE TABLE public.event_location (
  id bigserial NOT NULL,
  event_id bigint NOT NULL,
  zipcode varchar(20),
  address varchar(200),
  neighborhood varchar(200),
  "number" varchar(10),
  city varchar(100),
  complement varchar(300),
  constraint event_location_pk primary key (id),
  constraint event_location_event_fk FOREIGN KEY (event_id)
    REFERENCES public."event"(id)
 )


CREATE TABLE public.event_information (
  id bigserial NOT NULL,
  event_id bigint NOT NULL,
  description varchar(200) not null,
  "content" varchar(2000),
  constraint event_information_pk primary key (id),
  constraint event_information_event_fk FOREIGN KEY (event_id)
    REFERENCES public."event"(id)
)

CREATE TABLE public.event_media (
  id bigserial NOT NULL,
  event_id bigint NOT NULL,
  file_extension varchar(10) NOT null,
  value numeric(10,2),
  public_url varchar(3000),
  private_url varchar(3000),
  constraint event_media_pk primary key (id),
  constraint event_media_event_fk FOREIGN KEY (event_id)
    REFERENCES public."event"(id)
  )

CREATE TABLE public."user" (
	id bigserial NOT NULL,
	email varchar(300) NOT NULL,
	"password" varchar(300) NOT NULL,
	"name" varchar(200) NOT NULL,
	"document" varchar(20) NULL,
	main_phone_number varchar(20) NULL,
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT user_un UNIQUE (email)
);

CREATE TABLE public.role (
  id bigserial NOT NULL,
  description varchar(200) not null,
  constraint tabela_pk primary key (id)
)

CREATE TABLE public.user_role (
  id bigserial NOT NULL,
  user_id bigint NOT NULL,
  role_id bigint NOT NULL,
  entity_id bigint NOT NULL,
  constraint user_role_pk primary key (id),
  constraint user_role_user_fk FOREIGN KEY (user_id) REFERENCES public."user"(id),
  constraint user_role_role_fk FOREIGN KEY (user_id) REFERENCES public."role"(id),
  constraint user_role_entity_fk FOREIGN KEY (entity_id) REFERENCES public."entity"(id)
)

CREATE TABLE public.permission (
  id bigserial NOT NULL,
  context varchar(1000),
  functionality varchar(1000),
  constraint permission_pk primary key (id)
)

CREATE TABLE public.role_permission (
  id bigserial NOT NULL,
  role_id bigint NOT NULL,
  permission_id bigint NOT NULL,
  active boolean,
  constraint role_permission_pk primary key (id),
  constraint role_permission_role_fk FOREIGN KEY (role_id) REFERENCES public."role"(id),
  constraint role_permission_permission_fk FOREIGN KEY (permission_id) REFERENCES public."permission"(id)
)

CREATE TABLE public.payment_method (
  id bigserial NOT NULL,
  description varchar NOT NULL,
  constraint payment_method_pk primary key (id)
)

CREATE TABLE public.payment_status (
  id bigserial NOT NULL,
  description varchar NOT NULL,
  constraint payment_status_pk primary key (id)
)

CREATE TABLE public.payment (
  id bigserial NOT NULL,
  payment_method_id bigint NOT NULL,
  payment_status_id bigint NOT NULL,
  description varchar(200) not null,
  created_at timestamp,
  updated_at timestamp,
  constraint payment_pk primary key (id),
  constraint payment_payment_method_fk FOREIGN KEY (payment_method_id) REFERENCES public."payment_method"(id),
  constraint payment_payment_status_fk FOREIGN KEY (payment_status_id) REFERENCES public."payment_status"(id)
)

CREATE TABLE public.event_media_user_payment (
  id bigserial NOT NULL,
  event_media_id bigint NOT NULL,
  user_id bigint NOT NULL,
  payment_id bigint NOT NULL,
  constraint event_media_user_payment_pk primary key (id),
  constraint event_media_user_payment_event_fk FOREIGN KEY (event_media_id) REFERENCES public."event_media"(id),
  constraint event_media_user_payment_user_fk FOREIGN KEY (user_id) REFERENCES public."user"(id),
  constraint event_media_user_payment_payment_fk FOREIGN KEY (payment_id) REFERENCES public."payment"(id)
)

CREATE TABLE public.ticket (
  id bigserial NOT NULL,
  event_id bigint NOT NULL,
  description varchar(200) not null,
  price numeric(10,2) not null,
  "limit" int not null,
  constraint ticket_pk primary key (id),
  constraint ticket_event_fk FOREIGN KEY (event_id) REFERENCES public."event"(id)
)

CREATE TABLE public.ticket_user (
  id bigserial NOT NULL,
  ticket_id bigint not null,
  user_id bigint NOT NULL,
  payment_id bigint not null,
  created_at timestamp not null,
  constraint ticket_user_pk primary key (id),
  constraint ticket_user_ticket_fk FOREIGN KEY (ticket_id) REFERENCES public."ticket"(id),
  constraint ticket_user_user_fk FOREIGN KEY (user_id) REFERENCES public."user"(id),
  constraint ticket_user_payment_fk FOREIGN KEY (payment_id) REFERENCES public."payment"(id)
)

/* example

CREATE TABLE public.tabela (
  id bigserial NOT NULL,
  estrangeira bigint NOT NULL,
  constraint tabela_pk primary key (id),
  constraint tabela_ligacao_fk FOREIGN KEY (estrangeira) REFERENCES public."ligacao"(id)
)

 */
