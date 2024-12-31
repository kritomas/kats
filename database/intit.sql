create table User
(
	id varchar(36) primary key default UUID(),
	username varchar(32) not null unique,
	password_hash varchar(4096) not null
);

create table Room
(
	id varchar(36) primary key default UUID(),
	Owner_id varchar(36) not null,
	is_public bit not null,

	foreign key (OWner_id) references User(id) on delete cascade
);

create table Message
(
	id integer primary key auto_increment,
	Sender_id varchar(36) not null,
	Room_id varchar(36) not null,
	creation_date datetime not null default now(),
	message text not null,

	foreign key (Sender_id) references User(id) on delete cascade,
	foreign key (Room_id) references Room(id) on delete cascade
);

create table Whitelist
(
	id integer primary key auto_increment,
	User_id varchar(36) not null,
	Room_id varchar(36) not null,

	foreign key (User_id) references User(id) on delete cascade,
	foreign key (Room_id) references Room(id) on delete cascade
);