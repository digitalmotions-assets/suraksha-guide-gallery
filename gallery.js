/* ==========================================================
   Suraksha Guide Gallery
   File      : gallery.js
   Version   : 2.0.0
   Part      : 1
==========================================================*/

'use strict';

/* ==========================================================
   CONFIG
==========================================================*/

const SG_CONFIG = {

    json: 'https://raw.githubusercontent.com/digitalmotions-assets/suraksha-guide/main/gallery/gallery.json',

    perPage: 20,

    imagePath: 'https://raw.githubusercontent.com/digitalmotions-assets/suraksha-guide/main/gallery/images/',

    animation: 300

};

/* ==========================================================
   GLOBAL VARIABLES
==========================================================*/

let galleryData = [];

let filteredData = [];

let currentCategory = "All";

let currentSearch = "";

let visibleItems = SG_CONFIG.perPage;

let currentIndex = 0;

/* ==========================================================
   DOM ELEMENTS
==========================================================*/

const gallery = document.querySelector("#sg-gallery");

const searchBox = document.querySelector("#sg-search");

const categoryBar = document.querySelector("#sg-categories");

const loadMoreBtn = document.querySelector("#sg-load-more");

const loader = document.querySelector("#sg-loader");

const emptyState = document.querySelector("#sg-empty");

/* ==========================================================
   INITIALIZE
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initGallery();

});

/* ==========================================================
   INIT
==========================================================*/

async function initGallery(){

    showLoader();

    await loadGallery();

    renderGallery();

    bindEvents();

    hideLoader();

}

/* ==========================================================
   LOAD JSON
==========================================================*/

async function loadGallery(){

    try{

        const response = await fetch(SG_CONFIG.json);

        if(!response.ok){

            throw new Error("Unable to load gallery.");

        }

        galleryData = await response.json();

        filteredData = [...galleryData];

    }

    catch(error){

        console.error(error);

        showEmpty();

    }

}

/* ==========================================================
   RENDER
==========================================================*/

function renderGallery(){

    gallery.innerHTML = "";

    if(filteredData.length===0){

        showEmpty();

        return;

    }

    hideEmpty();

    filteredData
        .slice(0,visibleItems)
        .forEach((item,index)=>{

            gallery.appendChild(createCard(item,index));

        });

    toggleLoadMore();

}

/* ==========================================================
   CREATE CARD
==========================================================*/

function createCard(item,index){

    const card=document.createElement("div");

    card.className="sg-card";

    card.dataset.index=index;

    card.dataset.category=item.category;

    card.innerHTML=`

<div class="sg-image">

<img
loading="lazy"
src="${item.thumb}"
alt="${item.title}"
>

<div class="sg-overlay">

<button
class="sg-open"
data-index="${index}"
title="View"
>

<i class="bi bi-arrows-fullscreen"></i>

</button>

</div>

${item.featured ? '<div class="sg-featured"><i class="bi bi-star-fill"></i></div>' : ''}

<span class="sg-badge">

${item.category}

</span>

</div>

<div class="sg-body">

<h3 class="sg-card-title">

${item.title}

</h3>

<p class="sg-card-desc">

${item.description}

</p>

<div class="sg-tags">

${renderTags(item.tags)}

</div>

<button
class="sg-view"
data-index="${index}"
>

View Guide

</button>

</div>

<div class="sg-footer">

<div class="sg-views">

<i class="bi bi-eye"></i>

${item.views}

</div>

<div class="sg-actions">

<button
class="sg-icon sg-share"
title="Share"
>

<i class="bi bi-share"></i>

</button>

<button
class="sg-icon sg-bookmark"
title="Bookmark"
>

<i class="bi bi-bookmark"></i>

</button>

</div>

</div>

`;

    return card;

}

/* ==========================================================
   TAGS
==========================================================*/

function renderTags(tags){

    if(!tags) return "";

    return tags.map(tag=>`

<span class="sg-tag">

${tag}

</span>

`).join("");

}

/* ==========================================================
   LOADER
==========================================================*/

function showLoader(){

    if(loader){

        loader.style.display="flex";

    }

}

function hideLoader(){

    if(loader){

        loader.style.display="none";

    }

}
/* ==========================================================
   EMPTY STATE
==========================================================*/

function showEmpty(){

    if(emptyState){

        emptyState.style.display="block";

    }

    if(gallery){

        gallery.style.display="none";

    }

    if(loadMoreBtn){

        loadMoreBtn.style.display="none";

    }

}

function hideEmpty(){

    if(emptyState){

        emptyState.style.display="none";

    }

    if(gallery){

        gallery.style.display="block";

    }

}

/* ==========================================================
   LOAD MORE
==========================================================*/

function toggleLoadMore(){

    if(!loadMoreBtn) return;

    if(filteredData.length<=visibleItems){

        loadMoreBtn.style.display="none";

    }

    else{

        loadMoreBtn.style.display="inline-flex";

    }

}

function loadMore(){

    visibleItems += SG_CONFIG.perPage;

    renderGallery();

}

/* ==========================================================
   SEARCH
==========================================================*/

function searchGallery(keyword){

    currentSearch = keyword.toLowerCase().trim();

    applyFilters();

}

/* ==========================================================
   CATEGORY FILTER
==========================================================*/

function filterGallery(category){

    currentCategory = category;

    visibleItems = SG_CONFIG.perPage;

    applyFilters();

}

/* ==========================================================
   APPLY FILTERS
==========================================================*/

function applyFilters(){

    filteredData = galleryData.filter(item=>{

        const matchCategory =
            currentCategory==="All" ||
            item.category===currentCategory;

        const text = (

            item.title +

            " " +

            item.description +

            " " +

            (item.tags || []).join(" ")

        ).toLowerCase();

        const matchSearch =

            text.includes(currentSearch);

        return matchCategory && matchSearch;

    });

    renderGallery();

}

/* ==========================================================
   CATEGORY ACTIVE STATE
==========================================================*/

function updateCategoryButtons(){

    document

    .querySelectorAll(".sg-category")

    .forEach(btn=>{

        btn.classList.remove("active");

        if(btn.dataset.category===currentCategory){

            btn.classList.add("active");

        }

    });

}

/* ==========================================================
   SEARCH INPUT
==========================================================*/

function debounce(fn,delay){

    let timer;

    return (...args)=>{

        clearTimeout(timer);

        timer=setTimeout(()=>{

            fn(...args);

        },delay);

    };

}

const debouncedSearch = debounce(value=>{

    searchGallery(value);

},300);

/* ==========================================================
   EVENTS
==========================================================*/

function bindEvents(){

    if(searchBox){

        searchBox.addEventListener("input",e=>{

            debouncedSearch(e.target.value);

        });

    }

    if(loadMoreBtn){

        loadMoreBtn.addEventListener("click",loadMore);

    }

    if(categoryBar){

        categoryBar.addEventListener("click",e=>{

            const btn=e.target.closest(".sg-category");

            if(!btn) return;

            filterGallery(btn.dataset.category);

            updateCategoryButtons();

        });

    }

}
/* ==========================================================
   MODAL
==========================================================*/

let modal = null;

let modalImage = null;

let modalTitle = null;

let modalDescription = null;

function initModal(){

    modal = document.querySelector("#sg-modal");

    if(!modal) return;

    modalImage = modal.querySelector(".sg-modal-image");

    modalTitle = modal.querySelector(".sg-modal-title");

    modalDescription = modal.querySelector(".sg-modal-desc");

}

/* ==========================================================
   OPEN MODAL
==========================================================*/

function openModal(index){

    currentIndex = Number(index);

    const item = filteredData[currentIndex];

    if(!item || !modal) return;

    modalImage.src = item.image || item.thumb;

    modalImage.alt = item.title;

    modalTitle.textContent = item.title;

    modalDescription.textContent = item.description;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}

/* ==========================================================
   CLOSE MODAL
==========================================================*/

function closeModal(){

    if(!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

}

/* ==========================================================
   NEXT IMAGE
==========================================================*/

function nextImage(){

    if(filteredData.length===0) return;

    currentIndex++;

    if(currentIndex>=filteredData.length){

        currentIndex=0;

    }

    openModal(currentIndex);

}

/* ==========================================================
   PREVIOUS IMAGE
==========================================================*/

function previousImage(){

    if(filteredData.length===0) return;

    currentIndex--;

    if(currentIndex<0){

        currentIndex=filteredData.length-1;

    }

    openModal(currentIndex);

}

/* ==========================================================
   MODAL EVENTS
==========================================================*/

function bindModalEvents(){

    initModal();

    document.addEventListener("click",e=>{

        const openBtn=e.target.closest(".sg-open,.sg-view");

        if(openBtn){

            openModal(openBtn.dataset.index);

        }

        if(e.target.closest(".sg-close")){

            closeModal();

        }

        if(e.target.closest(".sg-next")){

            nextImage();

        }

        if(e.target.closest(".sg-prev")){

            previousImage();

        }

    });

    if(modal){

        modal.addEventListener("click",e=>{

            if(e.target===modal){

                closeModal();

            }

        });

    }

}

/* ==========================================================
   KEYBOARD SHORTCUTS
==========================================================*/

document.addEventListener("keydown",e=>{

    if(!modal || !modal.classList.contains("show")) return;

    switch(e.key){

        case "Escape":

            closeModal();

            break;

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            previousImage();

            break;

    }

});

/* ==========================================================
   INITIALIZE MODAL EVENTS
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    bindModalEvents();

});
