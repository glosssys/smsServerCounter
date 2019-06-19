<!-- This is the chart javascript -->

<script>
// initial function to create the bar chart
var drawChart = function (data) {
    
    // set width and height and padding of SVG
    var margin = {top: 20, right: 30, bottom: 30, left: 30};
    var width = $(window).width()-200;
    var height = 250;
    var img = "https://drive.google.com/uc?id=17fJwxtP8hNIxn13wuv26C19CebzxSvGV";
    var svg = d3.select("body").append("svg")
                           .attr("width", 500)
                           .attr("height", 0);

var defs = svg.append("defs");

var gradient = defs.append("linearGradient")
   .attr("id", "svgGradient")
   .attr("x1", "0%")
   .attr("x2", "100%")
   .attr("y1", "0%")
   .attr("y2", "100%");

gradient.append("stop")
   .attr('class', 'start')
   .attr("offset", "0%")
   .attr("stop-color", "#005DE9")
   .attr("stop-opacity", 1);

gradient.append("stop")
   .attr('class', 'end')
   .attr("offset", "100%")
   .attr("stop-color", "#ED1E79")
   .attr("stop-opacity", 1);
    
    // create x scale
    var x = d3.scale.ordinal()
      .domain(data.map(function(d) { return d.vote; }))
      .rangeRoundBands([100,width], .5,.1);
      
  
    // create y scale
    var y = d3.scale.linear()
      .domain([0,d3.max(data, function(d) { return d.count; })])
      .range([height,0]);
    // create x axis
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
    // create y axis
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
      
    // create chart element
    var chart = d3.select(".chart")
        .attr("width",width)
        .attr("height",height + margin.top + margin.bottom )
      .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
        
    
    
    // add columns
    chart.selectAll("rect")
        .data(data)
        .enter()
      .append("rect")
      .attr("class", "bar")

        .attr("x",function(d){
          return x(d.vote);
        })
        .attr("y",function(d) {
          return y(d.count);
        })
        .attr("width",x.rangeBand())
        .attr("height",function(d) {
          return (y(0) - y(d.count));
        })
         .attr("fill", "url(#svgGradient)");
       
    

    
    
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    
chart.selectAll("text.bar")
  .data(data)
  .enter().append("text")
  .attr("class", "bar")
  .attr("text-anchor", "middle")
  .attr("x", function(d) { return x(d.vote); })
  .attr("y", function(d) { return y(d.count) - 10; })
  .attr("dy", ".95em")
  .attr("dx", "3em")
  .text(function(d) { return d.count; });

  
  
    
    // add refresh functionality to get new data
    d3.select("#refresh")
      .on("click", function() {
        google.script.run
          .withSuccessHandler(updateChart)
          .getChartData();
        
        function updateChart(dataset) {
          
          // update x and y domains
          x.domain(dataset.map(function(d) { return d.vote; }));
          y.domain([0,d3.max(dataset, function(d) { return d.count; })]);
          
          // update all the rects
          var bars = chart.selectAll("rect")
            .data(dataset);
            
          // enter
          bars.enter()
            .append("rect")
              .attr("x",width)
              .attr("y",function(d) {
                return y(d.vote);
              })
              .attr("width",x.rangeBand())
              .attr("height",function(d) {
                return (y(0) - y(d.count));
              })
          
      //Update…
		  bars.transition()		//Initiate a transition on all elements in the update selection (all rects)
			.duration(500)
              .attr("x",function(d){
                return x(d.vote);
              })
              .attr("y",function(d) {
                return y(d.count);
              })
              .attr("width",x.rangeBand())
              .attr("height",function(d) {
                return (y(0) - y(d.count));
              });
          
          // exit
          bars.exit()
            .transition()
            .duration(500)
            .attr("x",width)
            .remove();
            
          //updatel labels
         var labels = chart.selectAll('text.bar')
        .data(dataset);

        labels.enter()
        .append('text')
        .attr('class', 'bar')
        .attr("x", function(d) { return x(d.vote); })
        .attr("y", height)
        .text(function(d) { return d.count; });

        labels.transition()
        .duration(500)
        .attr("x", function(d) { return x(d.vote); })
        .attr("y", function(d) { return y(d.count) - 10; })
        .text(function(d) { return d.count; });
  

        labels.exit()
        .transition()
        .duration(500)
        .attr('y', height)
        .remove(); 
            
          // update the x axis labels
          xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
          
          chart.selectAll("g.x.axis")
            .call(xAxis);
          
          // update the y axis
          yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
            
          chart.selectAll("g.y.axis")
            .call(yAxis);
            
        };
      });
};
// function to call to update the chart
var updateChart2 = function(data) {
  // set width and height and padding of SVG
  var margin = {top: 20, right: 30, bottom: 30, left: 30};
  var width = $(window).width();
    var height = 250;
    
  var chart = d3.select(".chart");
  var y = d3.scale.linear()
      .domain([0,d3.max(data, function(d) { return d.count; })])
      .range([height,0]);
  
  // update all the rects
  chart.selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y",function(d) {
          return y(d.count);
        })
        .attr("height",function(d) {
          return (y(0) - y(d.count));
        });
        
   chart.selectAll("text.bar")
  .data(data)
  .enter().append("text")
  .transition()
  .duration(1000)
  .attr("x", function(d) { return x(d.vote); })
  .attr("y", function(d) { return y(d.count) - 10; })
  .attr("dy", ".95em")
  .attr("dx", "3em")
  .text(function(d) { return d.count; });
};
</script>
