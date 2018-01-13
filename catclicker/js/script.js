(function () {
    var current_cat;

    var model = {
        cats: [
            {
                "name": "cat1",
                "photo": "image/cat1.jpg",
                "counter": 0,
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
            }
        ],

        getCounter: function (i) {
            return (cats[i].counter);
        },

        increment_counter: function (i) {
            cats[i].counter++;
            return getCounter(i)
        }

    };

    var controller = {
        current_cat: 0,

        getCats: function () {
            return model.cats;
        },

        init: function () {
            view.init();
        }
    };


    var view = {
        init: function () {
            // Get elements for use in render function
            this.$catButtons = $("div#catbuttons");
            this.$catCandidate = $("div#cat-candidate");
            this.$catbuttonTemplate = $('script[data-template="cat-button"]').html();

            this.render()
        },
        render: function () {
            $("#cat-candidate").html("<h2>It Works</h2>");

            // Clear navbar
            this.$catButtons.html('');

            // Clear cat candidate
            this.$catCandidate.html('');

            // Add Button for each cat
            cats = controller.getCats();
            for (let i = 0; i < cats.length; i++) {
                let cbt = this.$catbuttonTemplate;
                let tb = cbt.replace(/{{catid}}/g, i.toString());
                tb = tb.replace(/{{catname}}/g, cats[i].name);
                this.$catButtons.append(tb);
            }
        }
    };

    controller.init();
})();