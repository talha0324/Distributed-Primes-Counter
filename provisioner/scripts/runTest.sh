cd ../src
go test . -tags test -v -coverprofile ../unit_test_results/coverage.out | go-junit-report > ../unit_test_results/junit.xml
x='_/mnt/d/GOALS/provisioner/src'
y='../src'
sed -i -e "s%$x%$y%g" ../unit_test_results/coverage.out
gocov convert ../unit_test_results/coverage.out > ../unit_test_results/gocov_coverage.json
gocover-cobertura < ../unit_test_results/coverage.out > ../unit_test_results/cobertura_coverage.xml
gocov report ../unit_test_results/gocov_coverage.json > ../unit_test_results/gocov_report.txt
cat ../unit_test_results/gocov_coverage.json | gocov-html > ../unit_test_results/index.html