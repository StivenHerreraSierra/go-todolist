package util

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
	"github.com/joho/godotenv"
)

var Database *sql.DB
var err error

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
	err := connect()

	if err != nil {
		log.Printf("[database connection]: %q", err)
	}
}
