const width = 700;
const height = 500;
const offset = 50;

function drawChart() {
    if(document.getElementById("chart").children.length > 0) {
        [...document.getElementById("chart").children].forEach(child => {
            child.remove();
        })
    }

    console.log(arguments)
    const years = arguments[0].map(item => item.year);
    const data = arguments[0].map(item => item.upToTwentyPercent);
    
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    const xScale = d3.scaleLinear()
        .range([0, width - 2 * offset])
        .domain([0, d3.max(years)])
        .nice()

    const yScale = d3.scaleLinear()
        .range([height - 2 * offset, 0])
        .domain([0, d3.max(data)])
        .nice()

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => "$" + d);

    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(${offset}, ${height - offset})`)
      .call(xAxis);

    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${offset}, ${offset})`)
      .call(yAxis);

    const tooltip = d3.select("#chart")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", 0);

    const legend = d3.select("#chart")
      .append("div")
      .attr("id", "legend")
      .style("position", "absolute")
      .style("top", "50px")
      .style("left", "80px")
      .html("this ma legend")

    // Chosen savings rate
    svg.append("path")
      .datum(arguments[0])
      .attr("fill", "none")
      .attr("stroke", "#0000ff")
      .attr("stroke-width", 5)
      .attr("transform", `translate(${offset}, ${offset})`)
      .attr("d", d3.line()
        .x(d => xScale(d.year) )
        .y(d => yScale(d.data) )
      )
      .on("mouseover", function(d) {
          tooltip
          .html("hello sir")
        .style("opacity", 1)
        .style("left", xScale(parseInt(d) ) - 50 + "px")
        .style("top", yScale(parseInt(d) ) - 130 + "px")
      })
      .on("mouseout", () => {
          tooltip
            .style("opacity", 0)
      })

    // Saving just 1 percent more
    svg.append("path")
      .datum(arguments[0])
      .attr("fill", "none")
      .attr("stroke", "#00ff00")
      .attr("stroke-width", 5)
      .attr("transform", `translate(${offset}, ${offset})`)
      .attr("d", d3.line()
        .x(d => xScale(d.year) )
        .y(d => yScale(d.onePercentMore) )
      )

    // Increase savings by 1% each year up to 20%
    svg.append("path")
      .datum(arguments[0])
      .attr("fill", "none")
      .attr("stroke", "#ff0000")
      .attr("stroke-width", 5)
      .attr("transform", `translate(${offset}, ${offset})`)
      .attr("d", d3.line()
        .x(d => xScale(d.year) )
        .y(d => yScale(d.upToTwentyPercent) )
      )
}