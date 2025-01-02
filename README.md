# Kritos Awesome Talk Service

A chat server thingy.

# Installation

1.	Install dependencies: `nodejs`, `npm`.
2.	You'll also need a MySQL server.

## Database

1.	In your MySQL server, create a databse and invoke `database/init.sql`.
2.	Create file `kats-backend/sql_credentials.json` with the following format:

```json
{
	"host": "[server ip address here]",
	"user": "[db username here]",
	"password": "[db user password here]",
	"database": "[your database name here]"
}
```

## Backend

1.	Invoke `npm i` in `kats-backend`.
2.	Ensure that `kats-backend/start-server.sh` is executable.
3.	Copy all of `kats-backend` into `/var/kats`.
4.	Copy `kats.service` into `/etc/systemd/system`.

## Frontend

1.	Invoke `npm i` in `kats-frontend`.
2.	Invoke `npm run build` in `kats-frontend`.
3.	Copy all of `kats-frontend` into `/var/kats`.

# Usage

1.	Ensure that your MySQL server is running.
2.	Start the `kats` service: `systemctl start kats`.