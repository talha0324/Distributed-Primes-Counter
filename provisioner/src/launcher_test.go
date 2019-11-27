package main

import (
	"fmt"
	"testing"
)

var vars = emesg{
	BatchID: "test",
	From:    2,
	Until:   10,
}

func TestLaunchJobOne(t *testing.T) { //it should give null in return because no parameter is set
	res, err := launch(vars)
	fmt.Print(res, err)
}
func TestLaunchJobTwo(t *testing.T) { //it should give null in return because no parameter is set
	res, err := launch(vars)
	fmt.Print(res, err)
}
