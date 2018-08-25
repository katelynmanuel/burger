// Click event to change burger devored state. 
$(".eatButton").on("click", function(event) {
    let burgerId = $(this).attr("data-id")
    $.ajax("/" + burgerId, {
        type: "PUT"
      }).then(
        function() {
          // Reload the page to get the updated list
          location.reload();
        }
      );
});
    