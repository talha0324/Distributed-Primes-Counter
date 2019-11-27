package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"regexp"
)

func launch(vars emesg) (string, error) {
	var backofflimit int32 = 3
	imageNameTag, err := ioutil.ReadFile("/etc/config/IMAGE.NAME_TAG")
	if os.Getenv("RunMode") == "TEST" {
		imageNameTag, err = []byte("test:test"), nil
	}
	if err != nil {
		// fmt.Println(err)
		return "", err
	}
	imagePullSecret, err1 := ioutil.ReadFile("/etc/config/IMAGE.PULLSECRET")
	if os.Getenv("RunMode") == "TEST" {
		imagePullSecret, err1 = []byte("test"), nil
	}
	if err1 != nil {
		// fmt.Println(err1)
		return "", err
	}
	requestCPU, err2 := ioutil.ReadFile("/etc/config/REQUEST.CPU")
	if err2 != nil {
		fmt.Println(err2)
		requestCPU = []byte("50m")
	}
	requestMemory, err3 := ioutil.ReadFile("/etc/config/REQUEST.MEMORY")
	if err3 != nil {
		fmt.Println(err3)
		requestMemory = []byte("100Mi")
	}

	specs := JobSpecBuilder{
		backofflimit:    backofflimit,
		envVars:         vars,
		imageNameTag:    string(imageNameTag),
		imagePullSecret: string(imagePullSecret),
		requestCPU:      string(requestCPU),
		requestMemory:   string(requestMemory),
		commandToRun:    "start",
		serverURL:       os.Args[1],
	}
	job := specs.buildJobSpecs()
	newjob, err := clientset.createJob(job)
	err6 := check(err, "checking error for:"+vars.BatchID)
	if err6 != nil {
		return "", (err6)
	}
	return ("job created with the name:" + newjob.Name), nil
}

func check(err error, message string) error {
	if err != nil {
		matched, merr := regexp.MatchString("jobs.batch \\S\\w*\\S already exists", err.Error())
		if matched {
			fmt.Println(err.Error())
		} else {
			fmt.Println(message, merr)
		}
	}
	return err
}
