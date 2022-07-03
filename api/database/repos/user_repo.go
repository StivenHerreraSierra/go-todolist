package repos

import (
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
	err := util.GetUser.QueryRow(user.Email).Err()

	if err == nil {
		return fmt.Errorf("duplicated email")
	}

	_, err = util.SignUp.Exec(user.First_name, user.Last_name, user.Email, user.Password)
	return err
}

func ValidateLogin(email string) (string, error) {
	var password string
	err := util.ValidateLogin.QueryRow(email).Scan(&password)

	return password, err
}
