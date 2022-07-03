package models

type Task struct {
	Code        int    `json:"task_code"`
	Title       string `json:"task_title"`
	Description string `json:"task_description"`
	Start_date  string `json:"task_start"`
	Due_date    string `json:"task_due"`
	Status      string `json:"task_status"`
	User        string `json:"task_owner"`
}
