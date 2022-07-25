package repos

import (
	"database/sql"
	"fmt"

	"dev.com/web/database/util"
	"dev.com/web/models"
)

func GetUser(email string) (models.User, error) {
	var user models.User

	err := util.GetUser.QueryRow(email).Scan(
		&user.First_name,
		&user.Last_name,
		&user.Email,
		&user.Password,
	)

	return user, err
}

func SignUp(user models.User) error {
	var found models.User
	err := util.GetUser.QueryRow(user.Email).Scan(
		&found.First_name,
		&found.Last_name,
		&found.Email,
		&found.Password,
	)

	if err == sql.ErrNoRows {
		_, insertErr := util.SignUp.Exec(user.First_name, user.Last_name, user.Email, user.Password)

		if insertErr != nil && insertErr.Error() == "sql: no rows in result set" {
			return nil
		}

		return insertErr
	}

	return fmt.Errorf("duplicated email")
}

func ValidateLogin(email string) (string, error) {
	var password string
	err := util.ValidateLogin.QueryRow(email).Scan(&password)

	return password, err
}

