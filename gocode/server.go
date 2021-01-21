package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type user struct {
	Name  string
	ID    string
	Email string
}

var tpl *template.Template
var fn = template.FuncMap{
	"uc": strings.ToUpper,
}
var u []user

func init() {
	tpl = template.Must(template.New("").Funcs(fn).ParseGlob("templates/**"))
}

func handleError(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusInternalServerError)
}

func requestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet && r.URL.Path == "/" {
		tpl.ExecuteTemplate(w, "index.html", u)
	} else if r.Method == http.MethodPost && r.URL.Path == "/add" {
		var s string
		fd, h, err := r.FormFile("file")
		if err != nil {
			handleError(w, err)
		}
		bs, err := ioutil.ReadAll(fd)
		s = string(bs)
		if err != nil {
			handleError(w, err)
		}
		dst, err := os.Create(filepath.Join(filepath.Dir("./images/" + h.Filename)))
		if err != nil {
			handleError(w, err)
		}
		dst.Write(bs)
		err = tpl.ExecuteTemplate(w, "add.html", []byte(s))
		if err != nil {
			handleError(w, err)
		}
	} else {
		fmt.Fprintln(w, "Method Not Allowed")
	}
}

func main() {
	http.HandleFunc("/", requestHandler)
	http.ListenAndServe(":8080", nil)
}
