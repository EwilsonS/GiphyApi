var topics = ["cars", "games", "guitar", "food", "spiders", "coasters"]

$("#search-area").html("<input type='text' id='user-input' class='form-group'>" +
    "<span><button id='submit' type='submit' class='btn btn-info btn-sm m-1'>Submit</button>")

$("#submit").on("click", function () {
    $("#button-area").empty();
    var newTopic = $("#user-input").val().trim();


    topics.push(newTopic)
    console.log(newTopic)
    console.log(topics)
    go();
})

function go() {
    for (var i = 0; i < topics.length; i++) {

        var topicButton = $("<button>");
        topicButton.attr("data-name", topics[i]);
        topicButton.attr("class", "btn btn-info btn-sm m-1 topics");
        topicButton.text(topics[i]);
        $("#button-area").append(topicButton);
    }


    $(".topics").on("click", function () {
        event.preventDefault();

        var searchWord = $(this).attr("data-name");
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchWord + "&api_key=33dbXZtSVdT9qRXABAxgAN2FtGTormNK&limit=10";
        $("#gif-area").empty();
        console.log(searchWord);
        console.log(queryUrl);


        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                console.log(results)

                for (var i = 0; i < results.length; i++) {
                    var rating = results[i].rating
                    var ratingLabel = $("<p>").text("This GIF is Rated:" + rating)

                    var topicImage = $("<img class='gif'>");
                    topicImage.attr("src", results[i].images.fixed_width_small_still.url)
                    topicImage.attr("data-still", results[i].images.fixed_width_small_still.url)
                    topicImage.attr("data-animate", results[i].images.fixed_width_small.url)
                    topicImage.attr("data-state", "still")
                    topicImage.text(results[i].rating)
                    $("#gif-area").append(topicImage)
                    $("#gif-area").append(ratingLabel)

                }
                $(".gif").on("click", function () {

                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"))
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }




                })

            })
    })
}
go()