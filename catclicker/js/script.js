(function () {
    var model = {
        current_cat: null,

        cats: [
            {
                "name": "cat1",
                "photo": "image/cat1.jpg",
                "counter": 0
            },
            {
                "name": "cat2",
                "photo": "image/cat2.jpg",
                "counter": 0
            },
            {
                "name": "cat3",
                "photo": "image/cat3.jpg",
                "counter": 0
            },
            {
                "name": "cat4",
                "photo": "image/cat4.jpg",
                "counter": 0
            },
            {
                "name": "cat5",
                "photo": "image/cat5.jpeg",
                "counter": 0
            },
            {
                "name": "cat6",
                "photo": "image/cat6.jpeg",
                "counter": 0
            },
            {
                "name": "cat7",
                "photo": "image/cat7.jpeg",
                "counter": 0
            },
            {
                "name": "cat8",
                "photo": "image/cat3.jpg",
                "counter": 0
            }
        ]
    };

    var controller = {


        getCats: function () {
            return model.cats;
        },

        getCurrentCat: function () {
            return model.current_cat;
        },

        setCurrentCat: function (cat) {
            model.current_cat = cat;
            cat_view.render();
        },

        init: function () {
            model.current_cat = model.cats[0];

            nav_view.init();
            cat_view.init();
        }
    };


    var nav_view = {

        init: function () {
            // Setup reference to the catlist
            this.catListElem = document.getElementById('catlist');

            // render the view
            this.render();
        },

        render: function () {
            let cat;
            let cats = controller.getCats();

            // Clear out the cat list
            this.catListElem.innerHTML = "";

            // Populate the buttons in the view
            for (i = 0; i < cats.length; i++) {
                cat = cats[i];
                listElem = document.createElement("li");
                listElem.innerHTML = cat.name;

                listElem.addEventListener("click", (function (cat) {
                    return function () {
                        controller.setCurrentCat(cat);
                    };
                })(cat));
                this.catListElem.append(listElem);
            }
        }
    };


    var cat_view = {

        init: function () {
            // Get element references for view
            this.catNameElem = document.getElementById('cat-name');
            this.catCountElem = document.getElementById('cat-count');
            this.catImgElem = document.getElementById('cat-image');

            // Attach event listener to image
            this.catImgElem.addEventListener("click", function () {
                cat = controller.getCurrentCat();
                cat.counter++;
                cat_view.render();
            });

            this.render()
        },

        render: function () {
            cat = controller.getCurrentCat()
            this.catNameElem.innerText = cat.name;
            this.catCountElem.innerText = cat.counter;
            this.catImgElem.src = cat.photo;
        }
    };

    controller.init();
})();