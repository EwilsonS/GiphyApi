// create array called topics with all my fave stuff, display them as individual buttons in #button-area div
// get user input, that that appends new button on click. use push method to add to the array
// set up click event that grabs the buttons and calls ajax request to giphy
// will need a for loop and var i to creat uniqu identifiers

var topics = ["cars", "video games", "guitar", "food", "spiders", "roller coasters"]


function getTheGif() {

    // var newTopic = "";
    var apiKey = "33dbXZtSVdT9qRXABAxgAN2FtGTormNK";
    var searchWord = $(this).attr("data-name");
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchWord + "&api_key=33dbXZtSVdT9qRXABAxgAN2FtGTormNK&limit=9";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            console.log("----------------------")

            var gifURL = response.data.images.url;
            var gifImg = $("<img>");
            $("#gif-area").append(gifImg, gifURL);
            console.log(gifURL);

        });
    console.log(queryUrl);

}
function makeBtns() {


    for (var i = 0; i < topics.length; i++) {

        var topicButton = $("<button>");
        topicButton.attr("data-name", topics[i]);
        topicButton.attr("id", "topicBtn-" + i);
        topicButton.attr("class", "btn btn-info btn-sm m-1");
        topicButton.text(topics[i]);
        $("#button-area").append(topicButton);
        searchWord = topics[i];
        console.log(searchWord)


    }
    $("#submit").click(function () {
        event.preventDefault();
        newGif = $("#user-input").val().trim();
        newGifBtn = $("<button class='btn btn-info btn-sm'>");
        newGifBtn.text(newGif)
        newGifBtn.attr("data-name", topics.lentgh-1)
        topics.push(newGif);
        $("#button-area").append(newGifBtn)
        console.log(newGif)
    })
}


$(document).on("click", ".btn", getTheGif)
getTheGif();
makeBtns();
