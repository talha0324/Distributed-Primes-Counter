package main

import (
	"testing"
)

var (
	testObj emesg
)

func TestIsVerified(t *testing.T) {
	res := testObj.isVerified()
	if res == true {
		t.Errorf("It shouldn't be true because no value is set so far")
	}
}

func TestIsVerifiedSecondRun(t *testing.T) {
	testObj2 := emesg{
		BatchID: "aaa",
		From:    1,
		Until:   10,
	}
	res := testObj2.isVerified()
	if res == false {
		t.Errorf("It shouldn't be false because all values are set")
	}
}
