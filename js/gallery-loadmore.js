/* ==========================================================
   Suraksha Guide Gallery
   gallery-loadmore.js
   Version : 1.0
========================================================== */

"use strict";

const GalleryLoadMore = {

    button: null,

    step: 12,

    init() {

        this.button = document.getElementById("loadMoreBtn");

        if (!this.button) return;

        this.events();

        this.update();

    },

    events() {

        this.button.addEventListener("click", () => {

            this.load();

        });

    },

    load() {

        Gallery.visible += this.step;

        Gallery.render();

        this.update();

        GalleryLoadMore.scrollToNewItems();

    },

    update() {

        if (!this.button) return;

        const remaining = Gallery.filtered.length - Gallery.visible;

        if (remaining <= 0) {

            this.button.style.display = "none";

            return;

        }

        this.button.style.display = "inline-block";

        this.button.innerHTML = `Load More (${remaining} Remaining)`;

    },

    reset() {

        Gallery.visible = this.step;

        Gallery.render();

        this.update();

    },

    scrollToNewItems() {

        const cards = document.querySelectorAll(".sg-card");

        if (!cards.length) return;

        cards[cards.length - this.step]?.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    const timer = setInterval(() => {

        if (typeof Gallery !== "undefined") {

            clearInterval(timer);

            GalleryLoadMore.init();

        }

    }, 100);

});
