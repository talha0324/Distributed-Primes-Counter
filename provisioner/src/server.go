package main

import (
	"context"
	"crypto/rand"
	"errors"
	"fmt"
	"os"
	"time"

	pb "../proto"
)

// ClientServer represents Clients' client
type ClientServer struct{}

// SendPrimeCountRequest is for getting client requests
func (cs *ClientServer) SendPrimeCountRequest(ctx context.Context, in *pb.PrimeCounterPayload) (*pb.PrimeCounterReply, error) {
	fmt.Println("---> client func")
	b := make([]byte, 8)
	_, err := rand.Read(b)
	if err != nil {
		return nil, err
	}
	uuid := fmt.Sprintf("%x-%x", b[0:4], b[4:8])
	fmt.Println(uuid)
	c := launchWorkers(uuid, in.From, in.Until)
	capacity := cap(c)
	lenght := 0
	var total int32
	total = 0
	// reply := <-c
	// test scenario
	if os.Getenv("RunMode") == "TEST" {
		Send(c, 100)
	}
	for {
		select {
		case res := <-c:
			total += res.GetTotal()
			lenght++
			fmt.Printf("received:: with total %d \n", lenght)
			if capacity == lenght {
				var rep pb.PrimeCounterReply
				rep.Total = total
				close(c)
				delete(Channels, uuid)
				return &rep, nil
			}
			// return res, nil
			break
		case <-time.After(2 * time.Minute):
			fmt.Println("timeout")
			close(c)
			delete(Channels, uuid)
			return nil, errors.New("Timeout Occured")
		}
	}
	// return reply, nil
}

// WorkerServer represents Workers' client
type WorkerServer struct{}

// SendPrimeCountResult is for receiving result from worker
func (ws *WorkerServer) SendPrimeCountResult(ctx context.Context, in *pb.TotalPrimesResponse) (*pb.SimpleReply, error) {
	fmt.Println("---> worker func")
	fmt.Println(in)
	t := Channels[in.BatchID]
	fmt.Println(t)
	if t != nil {
		// t <- &pb.PrimeCounterReply{Total: in.Total}
		ok := Send(t, in.Total)
		fmt.Println(ok)
	}
	return &pb.SimpleReply{Message: "ok"}, nil
}

// Send function to send to close channel check safely
func Send(c chan *pb.PrimeCounterReply, t int32) (ok bool) {
	defer func() { recover() }()
	c <- &pb.PrimeCounterReply{Total: t}
	return true
}
func launchWorkers(batchID string, from int32, until int32) chan *pb.PrimeCounterReply {
	var capa int32
	capa = ((until - from) / 100) + 1
	// if capa == 0 {
	// 	capa = 1
	// }
	step := ((until - from) / capa)
	start := from
	fmt.Printf("total capacity :: %d\n", capa)
	var c chan *pb.PrimeCounterReply
	c = make(chan *pb.PrimeCounterReply, capa)
	// register channel
	Channels[batchID] = c
	fmt.Println(Channels)
	var i int32
	for i = 0; i < capa; i++ {
		var s int32
		var e int32
		if i != 0 {
			s = start + 1
		} else {
			s = start
		}
		if i == (capa - 1) {
			e = until
		} else {
			e = start + step
		}
		vars := emesg{
			BatchID: batchID,
			From:    s,
			Until:   e,
		}
		fmt.Println(vars)
		start += step
		go func() {
			res, err := launch(vars)
			fmt.Println(res, err)
		}()
	}
	return c
}
