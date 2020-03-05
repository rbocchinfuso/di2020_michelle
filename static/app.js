
var pollMembers = document.querySelectorAll('.poll-member')
var members = ['Bocchie', 'Alec Baldwin as Trump', 'Lisa Vanderpump', 'Hytham']

  // Sets up click events for all the cards on the DOM
pollMembers.forEach((pollMember, index) => {
  pollMember.addEventListener('click', (event) => {
    // Calls the event handler
    handlePoll(members[index])
  }, true)
})

  // Sends a POST request to the server using axios
var handlePoll = function(member) {
  axios.post('http://144.217.88.113:5000/vote', {member: member})
  .then((data) => {
    console.log('data sent')
  })
}

  
    // Configure Pusher instance
    var pusher = new Pusher('4580dd45c06697418063', {
        cluster: 'mt1',
        forceTLS: true
      });
      
      // Subscribe to poll trigger
      var channel = pusher.subscribe('poll');
      
      // Listen to vote event
      channel.bind('vote', function(data) {
        console.log(data)

        for (i = 0; i < (data.length - 1); i++) { 
          var total = data[0].votes + data[1].votes + data[2].votes + data[3].votes
          document.getElementById(data[i].name).style.width = calculatePercentage(total, data[i].votes)
          document.getElementById(data[i].name).style.background = "#388e3c" 

      }
      });

      let calculatePercentage = function(total, amount){
        return (amount / total) * 100 + "%"
      }

