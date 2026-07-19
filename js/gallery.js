/* ==========================================================
   Suraksha Guide Gallery
   gallery.js
   Version : 1.0
========================================================== */

"use strict";

const Gallery = {

    data: [],
    filtered: [],
    visible: 12,

    config: {
        json: "https://digitalmotions-assets.github.io/suraksha-guide/data/gallery.json",
        grid: "#galleryGrid",
        search: "#gallerySearch",
        category: "#galleryCategories",
        loadMore: "#loadMoreBtn"
    },

    async init() {

        await this.fetchGallery();

        this.render();

        this.events();

    },

    async fetchGallery() {

        try {

            const response = await fetch(this.config.json);

            this.data = await response.json();

            this.filtered = [...this.data];

        } catch (e) {

            console.error(e);

            document.querySelector(this.config.grid).innerHTML =
                `<div class="alert alert-danger">
                    Gallery failed to load.
                </div>`;

        }

    },

    render() {

        const grid = document.querySelector(this.config.grid);

        grid.innerHTML = "";

        const items = this.filtered.slice(0, this.visible);

        items.forEach(item => {

            grid.insertAdjacentHTML(
                "beforeend",
                this.card(item)
            );

        });

        this.updateLoadMore();

    },

    card(item) {

        return `

<div class="sg-card" data-id="${item.id}">

<div class="sg-image">

<img
loading="lazy"
src="${item.thumb}"
alt="${item.title}">

<span class="sg-badge">

${item.category}

</span>

</div>

<div class="sg-body">

<h5 class="sg-title">

${item.title}

</h5>

<p class="sg-desc">

${item.description}

</p>

</div>

<div class="sg-footer">

<div class="sg-stats">

<span>👁 ${item.views || 0}</span>

</div>

<button
class="sg-btn view-image"
data-id="${item.id}">

View

</button>

</div>

</div>

`;

    },

    updateLoadMore() {

        const btn = document.querySelector(this.config.loadMore);

        if (!btn) return;

        if (this.visible >= this.filtered.length) {

            btn.style.display = "none";

        } else {

            btn.style.display = "inline-block";

        }

    },

    loadMore() {

        this.visible += 12;

        this.render();

    },

    search(keyword) {

        keyword = keyword.toLowerCase();

        this.filtered = this.data.filter(item => {

            return (

                item.title.toLowerCase().includes(keyword) ||

                item.description.toLowerCase().includes(keyword) ||

                item.category.toLowerCase().includes(keyword)

            );

        });

        this.visible = 12;

        this.render();

    },

    filter(category) {

        if (category === "All") {

            this.filtered = [...this.data];

        } else {

            this.filtered = this.data.filter(

                item => item.category === category

            );

        }

        this.visible = 12;

        this.render();

    },

    open(id) {

        const item = this.data.find(

            x => x.id == id

        );

        if (!item) return;

        if (typeof GalleryModal !== "undefined") {

            GalleryModal.open(item);

        }

    },

    events() {

        const loadBtn = document.querySelector(this.config.loadMore);

        if (loadBtn) {

            loadBtn.addEventListener(

                "click",

                () => this.loadMore()

            );

        }

        const search = document.querySelector(this.config.search);

        if (search) {

            search.addEventListener(

                "keyup",

                e => this.search(e.target.value)

            );

        }

        document.addEventListener(

            "click",

            e => {

                if (

                    e.target.classList.contains("view-image")

                ) {

                    this.open(

                        e.target.dataset.id

                    );

                }

            }

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => Gallery.init()

);
