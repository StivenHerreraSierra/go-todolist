package util

import (
	"database/sql"
	"log"
)

var GetUser *sql.Stmt
var SignUp *sql.Stmt
var ValidateLogin *sql.Stmt

func prepareGetUserStmt() error {
	GetUser, err = Database.Prepare("SELECT first_name, last_name, email, password FROM \"user\" WHERE email = $1")

	return err
}

func prepareSignUpStmt() error {
	SignUp, err = Database.Prepare("INSERT INTO \"user\" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)")

	return err
}

func prepareValidateLoginStmt() error {
	ValidateLogin, err = Database.Prepare("SELECT password FROM \"user\" WHERE email = $1")

	return err
}

func init() {
	err := prepareGetUserStmt()

	if err != nil {
		log.Printf("[user queries error]: %q", err)
	}

	err = prepareSignUpStmt()

	if err != nil {
		log.Printf("[user queries error]: %q", err)
	}

	err = prepareValidateLoginStmt()

	if err != nil {
		log.Printf("[user queries error]: %q", err)
	}
}
