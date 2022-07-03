package repos

import (
	"database/sql"
	"fmt"

	"dev.com/web/database/util"
	"dev.com/web/models"
)

func GetAllTasks(email string) ([]models.Task, error) {
	var tasks []models.Task
	results, err := util.GetAllTasks.Query(email)

	if err != nil {
		return tasks, err
	}

	for results.Next() {
		var task models.Task
		err := results.Scan(
			&task.Code,
			&task.Title,
			&task.Description,
			&task.Start_date,
			&task.Due_date,
			&task.Status,
			&task.User,
		)

		if err != nil {
			return tasks, err
		}
		tasks = append(tasks, task)
	}

	err = results.Err()

	return tasks, err

}

func GetTask(code int) (models.Task, error) {
	var task models.Task
	err := util.GetTask.QueryRow(code).Scan(
		&task.Code,
		&task.Title,
		&task.Description,
		&task.Start_date,
		&task.Due_date,
		&task.Status,
		&task.User,
	)

	return task, err
}

func InsertTask(task models.Task) (models.Task, error) {
	var results sql.Result
	var err error
	var insertedTask models.Task

	results, err = util.InsertTask.Exec(
		task.Title,
		task.Description,
		task.Start_date,
		task.Due_date,
		task.Status,
		task.User,
	)

	if err != nil {
		return insertedTask, err
	}

	insertedTask = task
	lastId, err := results.LastInsertId()

	if err != nil {
		return insertedTask, err
	}

	insertedTask.Code = int(lastId)

	return insertedTask, err
}

func UpdateTask(userEmail string, task models.Task) (models.Task, error) {
	var updatedTask models.Task

	foundTask, err := GetTask(task.Code)

	if err != nil {
		return updatedTask, err
	}

	if foundTask.User != userEmail {
		return updatedTask, fmt.Errorf("the user is not the owner of the task")
	}

	result, err := util.UpdateTask.Exec(task.Title, task.Description, task.Due_date, task.Status, task.Code, userEmail)

	if err != nil {
		return updatedTask, err
	}

	rows, err := result.RowsAffected()

	if err != nil {
		return updatedTask, err
	}

	if rows == 0 {
		return updatedTask, fmt.Errorf("no rows affected")
	}

	if err == nil {
		updatedTask, err = GetTask(task.Code)
	}

	return updatedTask, err
}

func DeleteTask(userEmail string, taskCode int) error {
	task, err := GetTask(taskCode)

	if err != nil {
		return err
	}

	if task.User != userEmail {
		return fmt.Errorf("the user is not the owner of the task")
	}

	result, err := util.DeleteTask.Exec(taskCode, userEmail)

	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()

	if rows == 0 {
		return fmt.Errorf("no rows affected")
	}

	return err
}
