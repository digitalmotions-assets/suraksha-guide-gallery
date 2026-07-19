/* ==========================================================
   Suraksha Guide Gallery
   gallery-filter.js
   Version : 1.0
========================================================== */

"use strict";

const GalleryFilter = {

    categories: [],

    container: null,

    init() {

        this.container = document.getElementById("galleryCategories");

        if (!this.container) return;

        this.loadCategories();

    },

    loadCategories() {

        this.categories = [

            "All",

            ...new Set(

                Gallery.data.map(item => item.category)

            )

        ];

        this.render();

    },

    render() {

        this.container.innerHTML = "";

        this.categories.forEach((category, index) => {

            const button = document.createElement("button");

            button.className =

                index === 0

                ? "sg-category active"

                : "sg-category";

            button.dataset.category = category;

            button.textContent = category;

            this.container.appendChild(button);

        });

        this.events();

    },

    events() {

        this.container.querySelectorAll(".sg-category")

        .forEach(button => {

            button.addEventListener("click", () => {

                this.container

                .querySelectorAll(".sg-category")

                .forEach(item =>

                    item.classList.remove("active")

                );

                button.classList.add("active");

                this.filter(

                    button.dataset.category

                );

            });

        });

    },

    filter(category) {

        if (category === "All") {

            Gallery.filtered = [...Gallery.data];

        } else {

            Gallery.filtered = Gallery.data.filter(

                item => item.category === category

            );

        }

        Gallery.visible = 12;

        Gallery.render();

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const wait = setInterval(() => {

            if (Gallery.data.length) {

                clearInterval(wait);

                GalleryFilter.init();

            }

        }, 100);

    }

);
