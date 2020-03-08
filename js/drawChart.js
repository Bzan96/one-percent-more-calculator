const width = 700;
const height = 600;
const offset = 50;

function drawChart() {
    if(document.getElementById("chart").children.length > 0) {
        [...document.getElementById("chart").children].forEach(child => {
            child.remove();
        })
    }

    const years = arguments[0].map(item => item.year);
    const data = arguments[0].map(item => item.upToTwentyPercent);
    
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", `translate(${offset / 2}, 0)`)
        .style("background-color", "#eeeeee")

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
      .attr("transform", `translate(${offset * 1.5}, ${height - offset})`)
      .call(xAxis);

    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${offset * 1.5}, ${offset})`)
      .call(yAxis);

    const tooltip = d3.select("#chart")
      .append("div")
      .attr("id", "tooltip")
      .style("width", "200px")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("color", "#ffffff")
      .style("font-weight", "600")
      .style("padding", "5px")
      .style("bottom", "250px")
      .style("left", "105px");

    d3.select("#chart")
      .append("div")
      .attr("id", "legend")
      .style("position", "absolute")
      .style("top", "50px")
      .style("left", "105px")
      .html(`
        <div>
          <span class="legend-blue"></span>
          <h4>&nbsp;If you save at your current rate</h4>
        </div>
        <div>
          <span class="legend-green"></span>
          <h4>&nbsp;If you save 1 percent more</h4>
        </div>
        <div>
          <span class="legend-red"></span>
          <h4>&nbsp;If you increase your savings rate each year by an additional percentage point, to a maximum of 20 percent</h4>
        </div>
      `)

    // Chosen savings rate
    svg.append("path")
      .datum(arguments[0])
      .attr("fill", "none")
      .attr("stroke", "#0000bb")
      .attr("stroke-width", 5)
      .attr("transform", `translate(${offset * 1.5}, ${offset})`)
      .attr("d", d3.line()
        .x(d => xScale(d.year) )
        .y(d => yScale(d.data) )
      )
      .on("mouseover", function(d) {
        console.log(d)
          tooltip
          .html(`Under your current savings plan, you would save ${d.data} after ${d.year} years.`)
            .style("opacity", 1)
            .style("background-color", "#0000bb")
      })
      .on("mouseout", () => {
          tooltip
            .style("opacity", 0)
      })

    // Saving just 1 percent more
    svg.append("path")
      .datum(arguments[0])
      .attr("fill", "none")
      .attr("stroke", "#00bb00")
      .attr("stroke-width", 5)
      .attr("transform", `translate(${offset * 1.5}, ${offset})`)
      .attr("d", d3.line()
        .x(d => xScale(d.year) )
        .y(d => yScale(d.onePercentMore) )
      )
      .on("mouseover", function(d) {
        console.log(d)
          tooltip
          .html(`If you saved an additional 1 percent you would save ${d.data} after ${d.year} years.`)
            .style("opacity", 1)
            .style("background-color", "#00bb00")
      })
      .on("mouseout", () => {
          tooltip
            .style("opacity", 0)
      })

    // Increase savings by 1% each year up to 20%
    svg.append("path")
      .datum(arguments[0])
      .attr("fill", "none")
      .attr("stroke", "#bb0000")
      .attr("stroke-width", 5)
      .attr("transform", `translate(${offset * 1.5}, ${offset})`)
      .attr("d", d3.line()
        .x(d => xScale(d.year) )
        .y(d => yScale(d.upToTwentyPercent) )
      )
      .on("mouseover", function(d) {
        console.log(d)
          tooltip
          .html(`If you increased your savings 1 percent annually until you reached a maximum of 16 percent, you would save ${d.data} after ${d.year} years.`)
            .style("opacity", 1)
            .style("background-color", "#bb0000")
      })
      .on("mouseout", () => {
          tooltip
            .style("opacity", 0)
      })
}