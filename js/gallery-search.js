/* ==========================================================
   Suraksha Guide Gallery
   gallery-search.js
   Version : 1.0
========================================================== */

"use strict";

const GallerySearch = {

    input: null,

    init() {

        this.input = document.getElementById("gallerySearch");

        if (!this.input) return;

        this.events();

    },

    events() {

        this.input.addEventListener(

            "input",

            this.debounce((e) => {

                this.search(

                    e.target.value.trim()

                );

            }, 300)

        );

    },

    search(keyword) {

        keyword = keyword.toLowerCase();

        if (keyword === "") {

            Gallery.filtered = [...Gallery.data];

            Gallery.visible = 12;

            Gallery.render();

            return;

        }

        Gallery.filtered = Gallery.data.filter(item => {

            const title = item.title.toLowerCase();

            const desc = item.description.toLowerCase();

            const category = item.category.toLowerCase();

            const tags = (item.tags || []).join(" ").toLowerCase();

            return (

                title.includes(keyword) ||

                desc.includes(keyword) ||

                category.includes(keyword) ||

                tags.includes(keyword)

            );

        });

        Gallery.visible = 12;

        Gallery.render();

    },

    debounce(callback, delay = 300) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => GallerySearch.init()

);
