package util

import (
	"database/sql"
	"fmt"
	"log"
)

var GetAllTasks *sql.Stmt
var GetTask *sql.Stmt
var InsertTask *sql.Stmt
var UpdateTask *sql.Stmt
var DeleteTask *sql.Stmt

func prepareGetAllTasks() error {
	GetAllTasks, err = Database.Prepare("SELECT code, title, description, start_date, due_date, status, user_owner FROM task WHERE user_owner = ?")

	if err != nil {
		return fmt.Errorf("error preparando consulta: %v", err)
	}

	return nil
}

func prepareGetTask() error {
	GetTask, err = Database.Prepare("Select code, title, description, start_date, due_date, status, user_owner FROM task WHERE code = ?")

	return err
}

func prepareInsertTask() error {
	InsertTask, err = Database.Prepare("INSERT INTO task (title, description, start_date, due_date, status, user_owner) VALUES(?, ?, ?, ?, ?, ?)")

	if err != nil {
		return fmt.Errorf("error preparando consulta: %v", err)
	}

	return nil
}

func prepareUpdateTask() error {
	UpdateTask, err = Database.Prepare("UPDATE task SET title = ?, description = ?, due_date = ?, status = ? WHERE code = ? AND user_owner = ?")

	return err
}

func prepareDeleteTask() error {
	DeleteTask, err = Database.Prepare("DELETE FROM task WHERE code = ? AND user_owner = ?")

	return err
}

func init() {
	err := prepareGetAllTasks()

	if err != nil {
		log.Printf("[task queries error]: %q", err)
	}

	err = prepareGetTask()

	if err != nil {
		log.Printf("[task queries error]: %q", err)
	}

	err = prepareInsertTask()

	if err != nil {
		log.Printf("[task queries error]: %q", err)
	}

	err = prepareUpdateTask()

	if err != nil {
		log.Printf("[task queries error]: %q", err)
	}

	err = prepareDeleteTask()

	if err != nil {
		log.Printf("[task queries error]: %q", err)
	}
}
