// (function () {
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
    },

    saveCat: function (cat) {
        var c = this.getCurrentCat();
        c.name = cat.name;
        c.photo = cat.image_url;
        c.counter - cat.counter;
    },

    init: function () {
        model.current_cat = model.cats[0];

        nav_view.init();
        cat_view.init();
        admin_view.init();
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
            listElem = document.createElement("button");
            listElem.innerHTML = cat.name;

            listElem.addEventListener("click", (function (cat) {
                return function () {
                    controller.setCurrentCat(cat);
                    cat_view.render();
                    admin_view.render();
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
        var cat = controller.getCurrentCat();
        this.catNameElem.textElement = cat.name;
        var i = cat.counter.toString();
        document.getElementById('cat-count').innerHTML = cat.counter;
        // TODO: Figure out why the following line doesn't work
        // this.catCountElem.textElement = cat.counter.toString();
        this.catImgElem.src = cat.photo;
    }
};

var admin_view = {
    enabled: false,

    init: function () {
        this.view = document.getElementById('admin');
        this.admin_button = document.getElementById('admin_button');
        this.form = document.getElementById('catform');
        this.name = this.form.name;
        this.counter = this.form.counter;
        this.image_url = this.form.image_url;
        this.save_button = document.getElementById('save');
        this.cancel_button = document.getElementById('cancel');

        // Attach event to Admin Button
        this.admin_button.addEventListener("click", (function () {
            return function () {
                admin_view.enabled = true;
                admin_view.render();
            };
        })());
        // Attach event to Submit
        this.save_button.addEventListener("click", (function (form_copy) {
            return function (evt) {
                cat = controller.getCurrentCat();
                cat.name = form_copy.name.value;
                cat.photo = form_copy.image_url.value;
                cat.counter = parseInt(form_copy.counter.value);
                cat_view.render();

                admin_view.enabled = false;
                admin_view.render();
            }
        })(this.form));

        // Attach event to Cancel button
        this.cancel_button.addEventListener("click", (function () {
            return function () {
                admin_view.enabled = false;
                admin_view.render();
            }
        })());
        this.render();
    },

    render: function () {
        if (this.enabled) {
            var cat = controller.getCurrentCat();
            this.name.value = cat.name;
            this.counter.value = cat.counter;
            this.image_url.value = cat.photo;
            this.form.style.display = "block";
        } else {
            this.form.style.display = "none";
        }


    }
};
controller.init();
// })();