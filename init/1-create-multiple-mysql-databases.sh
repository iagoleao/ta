#!/bin/bash

set -e
set -u

function create_user_and_database() {
	local database=$1
	echo "Creating user and database '$database'"
	mysql  --user="root" --password="$MYSQL_ROOT_PASSWORD" <<-EOSQL
	    CREATE DATABASE IF NOT EXISTS $database;
        GRANT ALL PRIVILEGES ON $database.* TO $MYSQL_USER@"%" WITH GRANT OPTION;
EOSQL
}

if [ -n "$MYSQL_MULTIPLE_DATABASE" ]; then
	echo "Multiple database creation requested: $MYSQL_MULTIPLE_DATABASE"
	for db in $(echo $MYSQL_MULTIPLE_DATABASE | tr ',' ' '); do
		create_user_and_database $db
	done
	echo "Multiple databases created"
fi
