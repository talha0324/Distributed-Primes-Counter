//+build !test

package main

import (
	"fmt"
	"log"
	"net"

	pb "../proto"
	"google.golang.org/grpc"
)

const port = ":5001"

func main() {
	initChannelMapAndClientSet()
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	cs := grpc.NewServer()
	pb.RegisterClientServer(cs, &ClientServer{})
	pb.RegisterWorkerServer(cs, &WorkerServer{})
	fmt.Println("init..")
	// var err error
	err = cs.Serve(lis)
	if err != nil {
		log.Fatalf("failed to serve: %v", err)
	} else {
		fmt.Println("started")
	}
}
