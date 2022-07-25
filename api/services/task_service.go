package services

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"dev.com/web/database/repos"
	"dev.com/web/models"
	"dev.com/web/util/responses"
	"github.com/gorilla/mux"
)

func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	email := r.Header.Get("email")

	tasks, err := repos.GetAllTasks(email)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	jsonResponse, jsonError := json.Marshal(tasks)

	if jsonError != nil {
		log.Println(jsonError)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func InsertTask(w http.ResponseWriter, r *http.Request) {
	email := r.Header.Get("email")

	var taskBody models.Task

	err := json.NewDecoder(r.Body).Decode(&taskBody)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	if !validateTask(taskBody) {
		log.Println("empty fields")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(responses.ReportError("empty fields"))
		return
	}

	if taskBody.Status == "" {
		taskBody.Status = "PENDIENTE"
	}

	if taskBody.Start_date == "" {
		taskBody.Start_date = time.Now().Format("2006-01-02")
	}

	taskBody.User = email

	inserted, err := repos.InsertTask(taskBody)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	jsonResponse, jsonError := json.Marshal(inserted)

	if jsonError != nil {
		log.Println(jsonError)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write(jsonResponse)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	email := r.Header.Get("email")

	var taskBody models.Task
	err := json.NewDecoder(r.Body).Decode(&taskBody)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	if !validateTask(taskBody) {
		log.Println("empty fields")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(responses.ReportError("empty fields"))
		return
	}

	updatedTask, err := repos.UpdateTask(email, taskBody)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	jsonResponse, jsonError := json.Marshal(updatedTask)

	if jsonError != nil {
		log.Println(jsonError)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func validateTask(task models.Task) bool {
	return task.Title != "" && task.Due_date != ""
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	email := r.Header.Get("email")
	strTaskId := mux.Vars(r)["task_id"]
	taskId, err := strconv.Atoi(strTaskId)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	err = repos.DeleteTask(email, taskId)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	w.WriteHeader(http.StatusOK)
}

func FinishTask(w http.ResponseWriter, r *http.Request) {
    email := r.Header.Get("email")
    strTaskId := mux.Vars(r)["task_id"]
    taskId, err := strconv.Atoi(strTaskId)

    if err != nil {
        log.Println(err)
        w.WriteHeader(http.StatusInternalServerError)
        w.Write(responses.ReportError("something goes wrong"))
        return
    }

    updated, err := repos.FinishTask(email, taskId)

    if err != nil {
        log.Println(err)
	w.WriteHeader(http.StatusInternalServerError)
	w.Write(responses.ReportError("something goes wrong"))
	return
    }

    jsonResponse, jsonError := json.Marshal(updated)

    if jsonError != nil {
        log.Println(err)
	w.WriteHeader(http.StatusInternalServerError)
	w.Write(responses.ReportError("something goes wrong"))
	return
    }

    w.WriteHeader(http.StatusOK)
    w.Write(jsonResponse)
}
