(function () {
    var cats = [
        {
            "name": "cat1",
            "photo": "cat1.jpg",
            "counter": 0
        },
        {
            "name": "cat2",
            "photo": "cat2.jpg",
            "counter": 0
        }
    ];


    function getCounterStr(c) {
        return ("Current click count: " + c.toString());
    }
    function increment_counter(i) {

        cats[i]['counter']++;
        $counter = document.getElementById('counter_cat'+i.toString());
        $counter.innerHTML = getCounterStr(cats[i]["counter"].toString());
    }

    // $('#cat').click(function (e) {
    //     increment_counter();
    // });

    // Add cats to the page
    for (var i = 0; i < cats.length; i++) {
        // Create a new div for each cat
        newCatDiv = document.createElement("div");
        newCatDiv.setAttribute('id', 'cat' + i);

        // Add cat's name to div
        newCatName = document.createElement("h2");
        newCatName.innerHTML = cats[i].name;
        newCatDiv.append(newCatName);

        // Add Cat Photo to div
        newCatPhoto = document.createElement("img");
        newCatPhoto.setAttribute('id', 'catphoto' + i.toString())
        newCatPhoto.setAttribute("src", "image/" + cats[i].photo);
        newCatPhoto.setAttribute('alt', "Cat's name is " + cats[i].name);

        // Add cat counter event handler
        newCatPhoto.addEventListener("click", (function(i) {
            return function(){
                increment_counter(i);
            }
        })(i));
        newCatDiv.append(newCatPhoto);

        newCatVoteCount = document.createElement("p");
        newCatVoteCount.setAttribute('id','counter_cat'+i.toString());
        newCatVoteCount.innerHTML = getCounterStr(cats[i].counter);
        newCatDiv.append(newCatVoteCount);


        // Add new cat to cats div
        $("#cats").append(newCatDiv);
    }
})();