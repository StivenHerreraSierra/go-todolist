package models

type User struct {
	First_name string `json:"user_first_name"`
	Last_name  string `json:"user_last_name"`
	Email      string `json:"user_email"`
	Password   string `json:"user_password"`
}
