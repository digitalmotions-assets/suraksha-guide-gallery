/* ==========================================================
   Suraksha Guide Gallery
   gallery-share.js
   Version : 1.0
========================================================== */

"use strict";

const GalleryShare = {

    async share(item) {

        if (!item) return;

        if (navigator.share) {

            try {

                await navigator.share({

                    title: item.title,

                    text: item.description,

                    url: item.article

                });

            } catch (e) {

                console.log("Share cancelled");

            }

            return;

        }

        this.copy(item.article);

    },

    async copy(url) {

        try {

            await navigator.clipboard.writeText(url);

            this.toast("Link copied successfully.");

        } catch (e) {

            this.fallback(url);

        }

    },

    fallback(url) {

        const input = document.createElement("input");

        input.value = url;

        document.body.appendChild(input);

        input.select();

        document.execCommand("copy");

        input.remove();

        this.toast("Link copied successfully.");

    },

    toast(message) {

        if (typeof Toast !== "undefined") {

            Toast.success(message);

            return;

        }

        console.log(message);

    }

};

document.addEventListener("click", function (e) {

    const button = e.target.closest(".share-image");

    if (!button) return;

    const id = Number(button.dataset.id);

    const item = Gallery.data.find(x => x.id === id);

    GalleryShare.share(item);

});
