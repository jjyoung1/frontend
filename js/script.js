function loadData() {

    let $body = $('body');
    let $wikiElem = $('#wikipedia-links');
    let $nytHeaderElem = $('#nytimes-header');
    let $nytElem = $('#nytimes-articles');
    let $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    let streetStr = $('#street').val();
    let cityStr = $('#city').val();
    let imgSrc = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + streetStr + "," + cityStr;
    $body.append('<img class="bgimg" src=' + imgSrc + '/>');

    // New York Times
    let url = 'https://api.nytimes.com/svc/search/v2/' +
        'articlesearch.json?q=' + cityStr +
        '&sort=newest&api-key=cf9c7b4041244e59b05931de84704d5e';

    // url += $.param({
    //     'api_key': "cf9c7b4041244e59b05931de84704d5e"
    // });

    $.getJSON(url, function (data) {
        let docs;
        let headline;
        let snippet;
        let link;
        let mainHeadline;
        let doc;
        let items;

        items = [];
        docs = data["response"]["docs"];
        for (doc of docs) {
            link = doc["web_url"];
            snippet = doc["snippet"];
            headline = doc["headline"];
            mainHeadline = headline["main"];

            items.push('<li class="article">');
            items.push('<a href="' + link + '">' + mainHeadline + '</a>' );
            items.push('<p>' + snippet + '</p>');
            items.push('</li>');
        }

        $("#nytimes-articles").append(items.join(""));
        // console.log(JSON.stringify(data));
    });
    return false;
}

$('#form-container').submit(loadData);
