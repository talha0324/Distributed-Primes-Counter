package main

import (
	"testing"
)

func TestNameSpace(t *testing.T) {
	//	os.Setenv("RunMode", "TEST")
	ns := clientset.getNamespace()
	if ns != "default" {
		t.Errorf("NameSpace should be default")
	}
}
func TestCreateJob(t *testing.T) {
	build := JobSpecBuilder{
		backofflimit: 4,
		commandToRun: "run",
		envVars: emesg{
			BatchID: "sss",
			From:    2,
			Until:   10,
		},
		imageNameTag:    "aaa",
		imagePullSecret: "bbb",
		requestCPU:      "50m",
		requestMemory:   "50Mi",
		serverURL:       "localhost",
	}
	j := build.buildJobSpecs()
	_, err := clientset.createJob(j)
	if err != nil {
		t.Errorf("There sould not be an error in createJob")
	}
}
