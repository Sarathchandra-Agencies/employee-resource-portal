(function(){

/* ============ DATA ============ */
const forms = [
    {
        id: "warranty-card",
        code: "FRM–01",
        category: "Warranty",
        title: "Warranty Repair Payment Voucher",
        description: "A voucher form used to authorize and process warranty repair payments for eligible products.",
        url: "./resources/forms/warranty_repair_payment_voucher.html"
    },
    {
        id: "service-repair-invoice",
        code: "FRM–02",
        category: "Service",
        title: "Service / Repair Invoice",
        description: "A standard invoice form used to record customer details, service work performed, itemized repair charges, and payment confirmations.",
        url: "./resources/forms/service_repair_invoice.html"
    }

    // [example registration forms]
    // { id:"extended-warranty", code:"FRM–002", category:"Warranty", title:"Extended Warranty Registration", description:"Registration form for customers extending coverage beyond the standard warranty term.", url:"./forms/extended-warranty-registration.html" },
    // { id:"lifetime-warranty", code:"FRM–003", category:"Warranty", title:"Limited Lifetime Warranty", description:"A formal warranty certificate outlining lifetime coverage terms and conditions.", url:"./forms/limited-lifetime-warranty.html" },
    // { id:"product-registration", code:"FRM–004", category:"Registration", title:"Product Registration Form", description:"Simple registration form collecting purchase details to activate product support.", url:"./forms/product-registration.html" },
    // { id:"account-registration", code:"FRM–005", category:"Registration", title:"Customer Account Registration", description:"New account sign‑up form for contact details, preferences, and communication.", url:"./forms/customer-account-registration.html" },
    // { id:"event-registration", code:"FRM–006", category:"Registration", title:"Event Registration Form", description:"Attendee registration form for workshops, product launches, and private events.", url:"./forms/event-registration.html" },
];

function docPreview(category){
    switch(category){
    case "Warranty":
        return `<div class="doc-sheet">
        <span class="doc-ribbon" aria-hidden="true"></span>
        <div class="doc-head"><span class="doc-mark"></span><div class="doc-title"></div></div>
        <div class="doc-chip"><i></i></div>
        <div class="doc-line"></div><div class="doc-line w-60"></div>
        <div class="doc-bottom"><span class="doc-sig"></span><span class="doc-stamp"><i class="doc-check-icon"></i></span></div>
        </div>`;
    case "Registration":
        return `<div class="doc-sheet">
        <div class="doc-title" style="width:40%"></div>
        <div class="doc-field-row">
            <div class="doc-field"><span class="doc-label"></span><span class="doc-box"></span></div>
            <div class="doc-field"><span class="doc-label short"></span><span class="doc-box"></span></div>
        </div>
        <div class="doc-field"><span class="doc-label"></span><span class="doc-box"></span></div>
        <div class="doc-radio-row"><span class="doc-radio checked"></span><span class="doc-radio"></span><span class="doc-radio"></span></div>
        <span class="doc-btn"></span>
        </div>`;
    case "Service":
        return `<div class="doc-sheet">
        <div class="doc-title" style="width:50%"></div>
        <div class="doc-table">
            <span class="head"></span><span class="head"></span><span class="head"></span>
            <span></span><span></span><span></span>
        </div>
        <div class="doc-total"><i></i></div>
        </div>`;
    case "Inspection":
        return `<div class="doc-sheet">
        <div class="doc-title" style="width:44%"></div>
        <div class="doc-check-row"><span class="doc-box-check checked"></span><div class="doc-line"></div></div>
        <div class="doc-check-row"><span class="doc-box-check flag"></span><div class="doc-line"></div></div>
        <div class="doc-check-row"><span class="doc-box-check checked"></span><div class="doc-line w-60"></div></div>
        <div class="doc-check-row"><span class="doc-box-check"></span><div class="doc-line w-40"></div></div>
        </div>`;
    case "Certificate":
        return `<div class="doc-sheet">
        <div class="doc-title center" style="width:40%"></div>
        <div class="doc-frame">
            <span class="doc-corner tl" aria-hidden="true"></span>
            <span class="doc-corner tr" aria-hidden="true"></span>
            <span class="doc-corner bl" aria-hidden="true"></span>
            <span class="doc-corner br" aria-hidden="true"></span>
            <span class="doc-seal"></span>
            <div class="doc-tie-wrap"><span class="doc-tie left"></span><span class="doc-tie right"></span></div>
            <div class="doc-line center w-60"></div>
            <div class="doc-line center w-40"></div>
        </div>
        </div>`;
    case "Label":
        return `<div class="doc-sheet">
        <span class="doc-notch"></span>
        <div class="doc-perf"></div>
        <div class="doc-row">
            <div class="doc-barcode"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div class="doc-qr">
            <i class="on"></i><i></i><i class="on"></i>
            <i></i><i class="on"></i><i></i>
            <i class="on"></i><i></i><i class="on"></i>
            </div>
        </div>
        <div class="doc-line w-60"></div>
        <div class="doc-line short"></div>
        </div>`;
    default:
        return `<div class="doc-sheet"><div class="doc-line"></div><div class="doc-line w-60"></div></div>`;
    }
}

/* CARD TEMPLATE */
function cardTemplate(form, index){
    return `<article class="card reveal" style="transition-delay:${(index % 4) * 55}ms">
    <a class="card-link" href="${form.url}" target="_blank">
        <div class="card-preview">${docPreview(form.category)}</div>
        <div class="card-body">
        <span class="card-eyebrow">${form.category}</span>
        <h3 class="card-title">${form.title}</h3>
        <p class="card-desc">${form.description}</p>
        <div class="card-foot">
            <span class="doc-code">${form.code}</span>
            <span class="open-link">Open Form <span class="arrow" aria-hidden="true">↗</span></span>
        </div>
        </div>
    </a>
    </article>`;
}

/* REVEAL OBSERVER */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

function observeReveals(root){
    root.querySelectorAll(".reveal:not(.in-view)").forEach(el => observer.observe(el));
}

/* GRID RENDER + FILTER */
const grid = document.getElementById("grid");
const emptyState = document.getElementById("empty-state");
const resultsMeta = document.getElementById("results-meta");
const searchInput = document.getElementById("search-input");
const filtersEl = document.getElementById("filters");

let activeCategory = "All";
let query = "";

function renderGrid(list){
    grid.innerHTML = list.map(cardTemplate).join("");
    observeReveals(grid);
}

function applyFilters(){
    const q = query.trim().toLowerCase();
    const filtered = forms.filter(f => {
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    const haystack = (f.title + " " + f.description + " " + f.category).toLowerCase();
    const matchesQuery = !q || haystack.includes(q);
    return matchesCategory && matchesQuery;
    });
    renderGrid(filtered);
    resultsMeta.textContent = `Showing ${filtered.length} of ${forms.length}`;
    emptyState.classList.toggle("show", filtered.length === 0);
}

searchInput.addEventListener("input", (e) => {
    query = e.target.value;
    applyFilters();
});

/* CATEGORY FILTERS (generated) */
const categories = ["All", ...Array.from(new Set(forms.map(f => f.category)))];
filtersEl.innerHTML = categories.map(cat => {
    const count = cat === "All" ? forms.length : forms.filter(f => f.category === cat).length;
    return `<button type="button" class="filter-pill${cat === "All" ? " active" : ""}" data-category="${cat}">${cat} <span class="pill-count">${count}</span></button>`;
}).join("");

filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    filtersEl.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    applyFilters();
});


const featured = forms[forms.length - 1]; // last form in the list
document.getElementById("featured-preview").innerHTML = docPreview(featured.category);
document.getElementById("featured-eyebrow-cat").textContent = featured.category;
document.getElementById("featured-title").textContent = featured.title;
document.getElementById("featured-desc").textContent = featured.description;
document.getElementById("featured-code").textContent = featured.code;
document.getElementById("featured-link").href = featured.url;
document.getElementById("stack-1").innerHTML = docPreview("Registration");
document.getElementById("stack-2").innerHTML = docPreview("Service");
document.getElementById("stack-3").innerHTML = docPreview("Warranty");
document.getElementById("hero-count").textContent = forms.length;
document.getElementById("hero-cat-count").textContent = categories.length - 1;

const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

document.getElementById("nav-search-btn").addEventListener("click", () => {
    document.getElementById("library").scrollIntoView({ behavior: "smooth", block: "start" });
    searchInput.focus();
});

applyFilters();
observeReveals(document);
})();