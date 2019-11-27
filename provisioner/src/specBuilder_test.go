package main

import (
	"testing"
)

var (
	builder JobSpecBuilder
)

func TestBuildJobSpecsGivesNil(t *testing.T) { //it should give null in return because no parameter is set
	j := builder.buildJobSpecs()
	if j != nil {
		t.Errorf("it should be null")
	}
}

func TestBuildJobSpecsGivesResult(t *testing.T) {
	builder = JobSpecBuilder{
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
	j := builder.buildJobSpecs()
	if j == nil {
		t.Errorf("it shouldn't be null")
	}
}
