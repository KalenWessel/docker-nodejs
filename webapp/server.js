var express = require('express');
var app = express();
var path = require('path');
var public_path = path.join(__dirname + '/public')

// Setup prometheus metrics endpoint
Prometheus = require("prometheus-client")
var client = new Prometheus()

var counter = client.newCounter({
    namespace: "counter_test",
    name: "elapsed_counters_total",
    help: "The number of counter intervals that have elapsed."
});

gauge = client.newGauge({
    namespace: "counter_test",
    name: "random_number",
    help: "A random number we occasionally set."
});

setInterval(function() {
    counter.increment({
        period: "1sec" //period is a custom label name in this case with a value of "1sec"
    });
}, 1000);

setInterval(function() {
    counter.increment({
        period: "2sec" //creating a new series with a period label of "2sec"
    });
}, 2000);

setInterval(function() {
    gauge.set({
        period: "1sec"
    }, Math.random() * 1000);
}, 1000);

app.get("/metrics",client.metricsFunc())

// viewed at http://localhost:8080
app.use(express.static(public_path));
app.get('/', function(req, res) {
    res.sendFile(path.join(public_path + '/index.html'));
});



app.listen(8080);
