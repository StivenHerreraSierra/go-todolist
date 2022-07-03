package util

import (
	"database/sql"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var Database *sql.DB
var err error
var db_conf *mysql.Config

func config() error {
	db_conf = mysql.NewConfig()

	err := godotenv.Load()

	if err != nil {
		return err
	}

	db_conf.User = os.Getenv("DB_USER")
	db_conf.Passwd = os.Getenv("DB_PASSWORD")
	db_conf.Addr = os.Getenv("DB_ADDRESS")
	db_conf.DBName = os.Getenv("DB_NAME")
	db_conf.Net = "tcp"

	return nil
}

func connect() error {
	Database, err = sql.Open("mysql", db_conf.FormatDSN())

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
