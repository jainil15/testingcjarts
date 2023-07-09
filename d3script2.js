onload = () => {
    const d3 = window.d3;
    let svg = d3.select("#main").append("svg").attr("width", 800).attr("height", 600).append("g");
    svg.attr("transform", `translate(${20}, ${20})` )

    function createChart(data) {
        let barWidth = 20
        let barGap = 10
        let startingX = 100
        let startingY = 100

        let xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.population)])
            .range([0, 600]);

        let yScale = d3
            .scaleBand()
            .domain(data.map((d) => d.country))
            .range([0, data.map((d) => d.country).length * 30 - 10])
            .paddingOuter(-0.15);

        let yAxis = d3
            .axisLeft(yScale)
            .tickSizeInner(8)
            .tickSizeOuter(0)

        let xAxis = d3.axisBottom(xScale)
            .ticks(6)
            .tickFormat((d, i)=>`${d/1000000} M`);;
        svg.selectAll(".axis").remove();
        let axisGroup = svg.append("g").classed("axis", true);

        axisGroup
            .append("g")
            .attr("transform", "translate(100, 0)")
            .call(yAxis)
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
            .attr("y", (d, i) => i * (barWidth+barGap))
            .attr("height", barWidth)
            .attr("width", 0)
            .style("fill", "steelblue")
            .transition()
            .ease(d3.easeLinear)
            .delay(0)
            .duration(500)
            .attr("x", startingX)
            .attr("y", (d, i) => i * (barWidth+barGap))
            .attr("width", (d) => xScale(d.population))

        selection
            .select("rect")
            .transition()
            .ease(d3.easeLinear)
            .delay(0)
            .duration(500)
            .attr("width", (d) => xScale(d.population));

        selection.exit()
            .select("rect")
            .transition()
            .ease(d3.easeLinear)
            .delay(0)
            .duration(500)
            .attr("width", 0);
        selection.exit().remove();
    }

    d3.json("pop12.json").then(function(data) {
        //let currentData = somedata;
        let index = 0;
        function startAnimation() {

            function animate() {
                createChart(data[index].data);
                console.log(data[index].data)
                d3.select("h1").text(data[index].year)
                index++;
                if (index >= data.length) {
                    index = 0
                    stopAnimation()
                }
            }

            interval = setInterval(animate, 500); // Adjust the interval as needed
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

        function stopAnimation() {
            clearInterval(interval);
        }

    })



};
