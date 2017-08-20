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
    var imgSrc = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+streetStr+","+cityStr;
    $body.append('<img class="bgimg" src='+imgSrc+'/>');

    return false;
};

$('#form-container').submit(loadData);
