package main

type emesg struct {
	From    int32
	Until   int32
	BatchID string
}

func (e *emesg) isVerified() bool {
	if e.BatchID != "" && e.From != 0 && e.Until != 0 {
		return true
	}
	return false
}
