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
        let doc;
        let items;

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        docs = data.response.docs;
        for (doc of docs) {
            $nytElem.append('<li class="article">' +
                '<a href="' + doc.web_url + '">' + doc.headline.main + '</a>' +
                '<p>' + doc.snippet + '</p>' +
                '</li>');
        }

        // console.log(JSON.stringify(data));
    }).fail(function () {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr + ' Could Not Be Loaded');
    });
    return false;
}

$('#form-container').submit(loadData);
