/* ==========================================================
   Suraksha Guide Gallery
   gallery-bookmark.js
   Version : 1.0
========================================================== */

"use strict";

const GalleryBookmark = {

    key: "sg_gallery_bookmarks",

    items: [],

    init() {

        this.load();

        this.events();

        this.updateIcons();

    },

    load() {

        try {

            this.items = JSON.parse(

                localStorage.getItem(this.key)

            ) || [];

        } catch {

            this.items = [];

        }

    },

    save() {

        localStorage.setItem(

            this.key,

            JSON.stringify(this.items)

        );

    },

    exists(id) {

        return this.items.includes(Number(id));

    },

    add(id) {

        id = Number(id);

        if (this.exists(id)) return;

        this.items.push(id);

        this.save();

        this.updateIcons();

    },

    remove(id) {

        id = Number(id);

        this.items = this.items.filter(

            item => item !== id

        );

        this.save();

        this.updateIcons();

    },

    toggle(id) {

        if (this.exists(id)) {

            this.remove(id);

        } else {

            this.add(id);

        }

    },

    updateIcons() {

        document

        .querySelectorAll(".bookmark-image")

        .forEach(btn => {

            const id = Number(btn.dataset.id);

            if (this.exists(id)) {

                btn.classList.add("active");

                btn.innerHTML = "★ Saved";

            } else {

                btn.classList.remove("active");

                btn.innerHTML = "☆ Save";

            }

        });

    },

    getBookmarks() {

        return Gallery.data.filter(

            item => this.exists(item.id)

        );

    },

    clear() {

        this.items = [];

        this.save();

        this.updateIcons();

    },

    events() {

        document.addEventListener(

            "click",

            e => {

                const btn = e.target.closest(

                    ".bookmark-image"

                );

                if (!btn) return;

                this.toggle(btn.dataset.id);

            }

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => GalleryBookmark.init()

);
