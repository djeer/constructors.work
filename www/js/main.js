/* constructors.work — vanilla JS, no dependencies */
(function () {
	"use strict";

	/* ---------- Header: solid background after scroll ---------- */
	var header = document.getElementById("header");
	function onScroll() {
		header.classList.toggle("header--scrolled", window.scrollY > 24);
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---------- Mobile menu ---------- */
	var burger = document.getElementById("burger");
	var nav = document.getElementById("nav");

	burger.addEventListener("click", function () {
		var open = nav.classList.toggle("is-open");
		burger.setAttribute("aria-expanded", open ? "true" : "false");
		burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
	});

	nav.addEventListener("click", function (e) {
		if (e.target.tagName === "A") {
			nav.classList.remove("is-open");
			burger.setAttribute("aria-expanded", "false");
		}
	});

	/* ---------- Reveal on scroll ---------- */
	var revealEls = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window) {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12 }
		);
		revealEls.forEach(function (el) { io.observe(el); });
	} else {
		revealEls.forEach(function (el) { el.classList.add("is-visible"); });
	}

	/* ---------- Lightbox for project images ---------- */
	var lightbox = document.getElementById("lightbox");
	var lightboxImg = document.getElementById("lightboxImg");
	var lightboxCaption = document.getElementById("lightboxCaption");
	var lightboxClose = document.getElementById("lightboxClose");
	var lastFocused = null;

	function openLightbox(src, caption) {
		lastFocused = document.activeElement;
		lightboxImg.src = src;
		lightboxImg.alt = caption || "";
		lightboxCaption.textContent = caption || "";
		lightbox.hidden = false;
		document.body.style.overflow = "hidden";
		lightboxClose.focus();
	}

	function closeLightbox() {
		lightbox.hidden = true;
		lightboxImg.src = "";
		document.body.style.overflow = "";
		if (lastFocused) lastFocused.focus();
	}

	document.querySelectorAll("[data-lightbox]").forEach(function (card) {
		card.addEventListener("click", function () {
			var title = card.querySelector("h3");
			openLightbox(card.getAttribute("data-lightbox"), title ? title.textContent : "");
		});
	});

	lightboxClose.addEventListener("click", closeLightbox);
	lightbox.addEventListener("click", function (e) {
		if (e.target === lightbox) closeLightbox();
	});
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
	});
})();
