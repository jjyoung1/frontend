function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val()
    var cityStr = $('#city').val()
    var imgSrc = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + streetStr + "," + cityStr;
    $body.append('<img class="bgimg" src=' + imgSrc + '/>');

    // New York Times
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    url += $.param({
        'api_key': "cf9c7b4041244e59b05931de84704d5e"
    });

    $.getJSON(url, function (data) {
        var headline;
        var snippet;
        var link;
        var mainHeadline;
        var doc;

        var items = [];
        var docs = data["response"]["docs"];
        for (doc of docs) {
            link = doc["web_url"];
            snippet = doc["snippet"];
            headline = doc["headline"];
            mainHeadline = headline["main"];

            items.push('<li class="article">');
            items.push('<a href="' + link + '">' + mainHeadline + '</a>' );
            items.push('<p>' + snippet + '</p>');
        }

        $("#nytimes-articles").append(items.join(""));
        console.log(JSON.stringify(data));
    });
    return false;
}

$('#form-container').submit(loadData);
