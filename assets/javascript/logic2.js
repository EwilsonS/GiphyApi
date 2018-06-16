var topics = ["funny", "fail", "shark", "bruce lee", "trump"]

$("#search-area").html("<input type='text' id='user-input' class='form-group mt-3' placeholder='Find Your Gif'>" +
    "<span><button id='submit' type='submit' class='btn btn-info btn-sm m-1 mb-2' >Search</button><br>" +
    " <p>Hi, welcom to Evan's gif generator.<br><br>Press a button or make your own, then click the picture to animate.</p>")

$("#user-input").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#submit").click();
        $(this).val('');
        
    }
});

$("#submit").on("click", function () {
    $("#button-area").empty();

    var newTopic = $("#user-input").val().trim();


    topics.push(newTopic)
    console.log(newTopic)
    console.log(topics)
    go();
    $("#user-input").val('');

})

function go() {
    for (var i = 0; i < topics.length; i++) {

        var topicButton = $("<button>");
        topicButton.attr("data-name", topics[i]);
        topicButton.attr("class", "btn btn-info m-2 topics");
        topicButton.text(topics[i].toUpperCase());
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
                    var ratingLabel = $("<h4>").text("Rated: " + rating.toUpperCase())

                    var topicImage = $("<img class='gif img-thumbnail ml-5 mt-5 mb-1 text-center rounded'>");
                    topicImage.attr("src", results[i].images.fixed_width_still.url)
                    topicImage.attr("data-still", results[i].images.fixed_width_still.url)
                    topicImage.attr("data-animate", results[i].images.fixed_width.url)
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