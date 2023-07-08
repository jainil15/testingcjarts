onload = () => {
    const d3 = window.d3;
    let svg = d3.select("#main").append("svg");
    svg.attr("width", 800).attr("height", 600);

    function createChart(data) {
        let xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)])
            .range([0, 600]);

        let yScale = d3
            .scaleBand()
            .domain(data.map((d) => d.name))
            .range([0, data.map((d) => d.name).length * 30 - 10])
            .paddingOuter(-0.15);

        let axisLeft = d3.axisLeft(yScale).tickSizeInner(8).tickSizeOuter(0);
        let xAxis = d3.axisBottom(xScale);
        svg.selectAll(".axis").remove();
        let axisGroup = svg.append("g").classed("axis", true);

        axisGroup
            .append("g")
            .attr("transform", "translate(100, 0)")
            .call(axisLeft)
            .style("font-size", "1rem")
            .classed("yAxis", true);
        axisGroup
            .append("g")
            .classed("xAxis", true)
            .attr("transform", `translate(${100}, ${data.length * 30 - 10})`)
            .call(xAxis)
            .style("font-size", "1rem");

        let selection = svg.selectAll(".trend").data(data);

        let enterSelection = selection.enter().append("g").classed("trend", true);

        enterSelection
            .append("rect")
            .attr("x", 100)
            .attr("y", (d, i) => i * 30)
            .attr("height", 20)
            .attr("width", 0)
            .transition()
            .delay(0)
            .duration(400)
            .attr("x", 100)
            .attr("y", (d, i) => i * 30)
            .attr("width", (d) => xScale(d.value))
            .attr("height", 20);

        selection
            .select("rect")
            .transition()
            .delay(0)
            .duration(400)
            .attr("width", (d) => xScale(d.value));

        selection.exit().select("rect").transition().delay(0).duration(400).attr("width", 0);
        selection.exit().remove();
    }

    let somedata = [{
        name: "Jainil144",
        value: 54
    },
        {
            name: "Idiot24",
            value: 132
        },
        {
            name: "Idon251",
            value: 43
        },
        {
            name: "Some25",
            value: 114
        },
        {
            name: "Dumb24",
            value: 33
        },
        {
            name: "Jainil546",
            value: 54
        },
        {
            name: "Idiot314",
            value: 192
        },
        {
            name: "Idon453",
            value: 13
        },
        {
            name: "Some134",
            value: 354
        },
        {
            name: "Dumb31",
            value: 323
        },
        {
            name: "Jainil132",
            value: 24
        },
        {
            name: "Idiot12",
            value: 102
        },
        {
            name: "Idon22",
            value: 43
        },
        {
            name: "Some44",
            value: 124
        },
        {
            name: "Dumb22",
            value: 123
        },
    ];
    let somedata2 = [{
        name: "Jainil",
        value: 54
    },
        {
            name: "Idiot",
            value: 192
        },
        {
            name: "Idon",
            value: 10
        },
        {
            name: "Some",
            value: 154
        },
        {
            name: "Dumb",
            value: 123
        },
        {
            name: "Dumb2",
            value: 11
        },
    ];
    let currentData = somedata;
    let index = 0;
    function startAnimation() {

        function animate() {
            createChart(currentData.slice(0, index + 1));

            index++;
            if (index >= currentData.length) {
                index = 0
                stopAnimation()
            }
        }

        interval = setInterval(animate, 100); // Adjust the interval as needed
    }

    function stopAnimation() {
        clearInterval(interval);
    }

    d3.select("body")
        .append("input")
        .attr("type", "button")
        .attr("value", "Play")
        .attr("id", "play-button")
        .on("click", function(e,d) {
            d3.select(this)
                .attr("disabled", true)
            d3.select("#stop-button")
                .attr("disabled", null)
            startAnimation();
        });

    d3.select("body")
        .append("input")
        .attr("type", "button")
        .attr("value", "Stop")
        .attr("id", "stop-button")
        .on("click", function(e,d) {
            d3.select(this)
                .attr("disabled", true)
            d3.select("#play-button")
                .attr("disabled", null)
            stopAnimation()
        });

    createChart(currentData);
};
