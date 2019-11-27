### Stage 1: Base
FROM alpine:3.7 AS base
WORKDIR /go/bin
EXPOSE 5001

### Stage 2: Build
FROM golang:1.12.5 as builder

# Set the working directory
WORKDIR $GOPATH/src/provisioner
RUN go get k8s.io/klog && cd $GOPATH/src/k8s.io/klog && git checkout v0.4.0; cd $GOPATH/src/provisioner;
ADD . ./
RUN chmod +x scripts/replace.sh; ./scripts/replace.sh
RUN go get -d -v ./...
RUN cd src/ ; CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o $GOPATH/bin/provisioner . ; cd ../

### Stage 3: Tests
FROM builder as tests
ARG TEST_IMAGE_UNIQUE_ID=0
LABEL provisionertest_${TEST_IMAGE_UNIQUE_ID}=true
WORKDIR /go/src/provisioner
# Installing pre-requisites for test report generation
RUN go get github.com/jstemmer/go-junit-report;go get github.com/axw/gocov/gocov;go get github.com/t-yuki/gocover-cobertura;go get -u gopkg.in/matm/v1/gocov-html
# Add code coverage check script
ADD scripts/codeCoverage.sh .
# Create dir to save test reports
# Running the unit tests and generating junit report
RUN mkdir -p testReport/coverage; cd src/; go test . -tags test -v -coverprofile ../testReport/coverage/coverage.out | go-junit-report > ../testReport/junit.xml; cd ../
# Checking code coverage
RUN chmod +x codeCoverage.sh;./codeCoverage.sh
# Generating coverage reports
RUN gocov convert ./testReport/coverage/coverage.out > ./testReport/coverage/gocov_coverage.json;gocover-cobertura < ./testReport/coverage/coverage.out > ./testReport/coverage/cobertura_coverage.xml;gocov report ./testReport/coverage/gocov_coverage.json > ./testReport/coverage/gocov_report.txt;cat ./testReport/coverage/gocov_coverage.json | gocov-html > ./testReport/coverage/index.html


### Stage 4: Production 
FROM base as production
COPY --from=builder /go/bin /go/bin
CMD ["./provisioner"]