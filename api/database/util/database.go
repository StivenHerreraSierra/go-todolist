package util

import (
	"database/sql"
	"log"
	"os"

	"github.com/lib/pq"
	"github.com/joho/godotenv"
)

var Database *sql.DB
var err error
a = *pq

func connect() error {
    err := godotenv.Load();

    if err != nil {
        return err
    }

    connStr := os.Getenv("DB_URL")

    Database, err = sql.Open("postgres", connStr)

    if err != nil {
        return err
    }

    err = Database.Ping()

    return err
}

func init() {
	err := config()

	if err != nil {
		log.Printf("[database config]: %q", err)
	}

	err = connect()

	if err != nil {
		log.Printf("[database connection]: %q", err)
	}
}
