#!/bin/bash
echo "Checking Unit Tests Code Coverage"
linesCoveragePct=`go tool cover -func=testReport/coverage/coverage.out | grep "(statements)" | awk '{print $3}' | sed 's/%$//'`
if [[ ( "$linesCoveragePct" < 80) ]] ; then
    echo "Code coverage less than 80%. Coverage: $linesCoveragePct%"
    exit 1
fi
echo "Success! Code coverage >= 80%. Coverage: $linesCoveragePct%"
exit 0