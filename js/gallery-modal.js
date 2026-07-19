/* ==========================================================
   Suraksha Guide Gallery
   gallery-modal.js
   Version : 1.0
========================================================== */

"use strict";

const GalleryModal = {

    modal: null,

    current: null,

    init() {

        if (document.getElementById("galleryModal")) return;

        document.body.insertAdjacentHTML("beforeend", `

<div class="modal fade" id="galleryModal" tabindex="-1">

<div class="modal-dialog modal-xl modal-dialog-centered">

<div class="modal-content">

<div class="modal-header">

<h5 id="galleryModalTitle" class="modal-title"></h5>

<button
type="button"
class="btn-close"
data-bs-dismiss="modal"></button>

</div>

<div class="modal-body">

<img
id="galleryModalImage"
class="img-fluid rounded w-100"
loading="lazy">

<p
id="galleryModalDescription"
class="mt-3"></p>

<div class="d-flex gap-2 flex-wrap">

<a
id="galleryReadArticle"
target="_blank"
class="btn btn-primary">

Read Guide

</a>

<button
id="galleryPrev"
class="btn btn-outline-secondary">

Previous

</button>

<button
id="galleryNext"
class="btn btn-outline-secondary">

Next

</button>

<button
id="galleryShare"
class="btn btn-success">

Share

</button>

</div>

</div>

</div>

</div>

</div>

`);

        this.modal = new bootstrap.Modal(

            document.getElementById("galleryModal")

        );

        this.events();

    },

    open(item) {

        this.current = item;

        document.getElementById(

            "galleryModalTitle"

        ).textContent = item.title;

        document.getElementById(

            "galleryModalImage"

        ).src = item.image;

        document.getElementById(

            "galleryModalImage"

        ).alt = item.title;

        document.getElementById(

            "galleryModalDescription"

        ).textContent = item.description;

        document.getElementById(

            "galleryReadArticle"

        ).href = item.article;

        this.modal.show();

    },

    next() {

        let index = Gallery.data.findIndex(

            x => x.id == this.current.id

        );

        index++;

        if (index >= Gallery.data.length)

            index = 0;

        this.open(

            Gallery.data[index]

        );

    },

    prev() {

        let index = Gallery.data.findIndex(

            x => x.id == this.current.id

        );

        index--;

        if (index < 0)

            index = Gallery.data.length - 1;

        this.open(

            Gallery.data[index]

        );

    },

    async share() {

        if (!navigator.share) {

            alert("Share not supported.");

            return;

        }

        await navigator.share({

            title: this.current.title,

            text: this.current.description,

            url: this.current.article

        });

    },

    events() {

        document

        .getElementById("galleryNext")

        .addEventListener(

            "click",

            () => this.next()

        );

        document

        .getElementById("galleryPrev")

        .addEventListener(

            "click",

            () => this.prev()

        );

        document

        .getElementById("galleryShare")

        .addEventListener(

            "click",

            () => this.share()

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => GalleryModal.init()

);
