var dataPoints = [
    { label: "Bocchie", y: 0 },
    { label: "Alec Baldwin as Trump", y: 0 },
    { label: "Lisa Vanderpump", y: 0 },
    { label: "Hytham", y: 0 },
  ]
  var chartContainer = document.querySelector('#chartContainer');
  
  if(chartContainer) {
    var chart = new CanvasJS.Chart("chartContainer",
      {
        animationEnabled: true,
        theme: "theme2",
        data: [
        {
          type: "column",
          dataPoints: dataPoints
        }
        ]
      });
    chart.render();
  }
  
  Pusher.logToConsole = true;
  
  // Configure Pusher instance
  var pusher = new Pusher('4580dd45c06697418063', {
      cluster: 'mt1',
      forceTLS: true
  });
  
  // Subscribe to poll trigger
  var channel = pusher.subscribe('poll');
  
  // Listen to vote event
  channel.bind('vote', function(data) {
    dataPoints = dataPoints.map(dataPoint => {
      console.log(data[4])
      if(dataPoint.label == data[4].name[0]) {
        // VOTE
        dataPoint.y += 10;
      }
      return dataPoint
    });
  
    // Re-render chart
    chart.render()
  });
