package main

import (
	"os"

	pb "../proto"
)

// Channels is for holding reply channels
var Channels map[string](chan *pb.PrimeCounterReply)
var clientset *InClusterKubernetesClient

func initChannelMapAndClientSet() {
	Channels = make(map[string](chan *pb.PrimeCounterReply))
	if os.Getenv("RunMode") == "TEST" {
		clientset = NewInClusterTestKubernetesClient()
	} else {
		clientset = NewInClusterKubernetesClient()
	}
}
