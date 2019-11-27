package main

import (
	"fmt"
	"os"
	"testing"
)

func TestMain(m *testing.M) {
	setup()
	code := m.Run()
	shutdown()
	os.Exit(code)
}
func setup() {
	os.Setenv("RunMode", "TEST")
	fmt.Println("setting up..")
	initChannelMapAndClientSet()
}
func shutdown() {
	fmt.Println("shutting down..")
}
