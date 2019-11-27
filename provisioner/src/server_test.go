package main

import (
	"context"
	"testing"

	pb "../proto"
)

// func TestLaunchWorkers(t *testing.T) {
// 	c := launchWorkers("test", 2, 10)
// 	if c == nil {
// 		t.Error("Channel cannot be null")
// 	}
// }

func TestGRPCWorker(t *testing.T) {
	s := WorkerServer{}
	req := &pb.TotalPrimesResponse{
		Total:   100,
		BatchID: "test",
	}
	res, _ := s.SendPrimeCountResult(context.Background(), req)
	if res.Message != "ok" {
		t.Error("Should be ok response")
	}
}
func TestGRPCClient(t *testing.T) {
	s := ClientServer{}
	req := &pb.PrimeCounterPayload{
		From:  2,
		Until: 10,
	}
	res, err := s.SendPrimeCountRequest(context.Background(), req)
	if err != nil {
		t.Error("Should not be any error")
	} else if res == nil {
		t.Error("Result cannot be null")
	} else if res.Total != 100 {
		t.Error("Result should be equal to what is specified")
	}
}
