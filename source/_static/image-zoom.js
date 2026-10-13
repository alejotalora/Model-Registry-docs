(function () {
    "use strict";

    const MIN_ZOOM = 1;
    const MAX_ZOOM = 8;
    const ZOOM_STEP = 1.25;

    function initializeImageZoom() {
        const images = document.querySelectorAll(
            "div.body img:not(.no-zoom)"
        );

        images.forEach(function (image) {
            if (image.dataset.zoomInitialized === "true") {
                return;
            }

            image.dataset.zoomInitialized = "true";
            image.classList.add("zoomable-image");
            image.setAttribute("tabindex", "0");
            image.setAttribute("role", "button");
            image.setAttribute(
                "aria-label",
                "Open enlarged image: " +
                (image.alt || "Documentation image")
            );

            image.addEventListener("click", openLightbox);

            image.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openLightbox(event);
                }
            });

            function openLightbox(event) {
                event.preventDefault();
                event.stopPropagation();

                if (document.querySelector(".image-lightbox-overlay")) {
                    return;
                }

                const previousOverflow = document.body.style.overflow;

                let zoom = MIN_ZOOM;
                let panX = 0;
                let panY = 0;
                let baseWidth = 0;
                let baseHeight = 0;
                let dragging = false;
                let startPointerX = 0;
                let startPointerY = 0;
                let startPanX = 0;
                let startPanY = 0;

                const overlay = document.createElement("div");
                overlay.className = "image-lightbox-overlay";
                overlay.setAttribute("role", "dialog");
                overlay.setAttribute("aria-modal", "true");
                overlay.setAttribute(
                    "aria-label",
                    image.alt || "Enlarged documentation image"
                );

                const toolbar = document.createElement("div");
                toolbar.className = "image-lightbox-toolbar";

                const viewer = document.createElement("div");
                viewer.className = "image-lightbox-viewer";
                viewer.setAttribute("tabindex", "0");
                viewer.setAttribute(
                    "aria-label",
                    "Image viewer. Use the mouse wheel to zoom and drag to move."
                );

                const enlargedImage = document.createElement("img");
                enlargedImage.className = "image-lightbox-image";
                enlargedImage.alt = image.alt || "Enlarged documentation image";
                enlargedImage.draggable = false;

                const zoomLevel = document.createElement("span");
                zoomLevel.className = "image-lightbox-level";
                zoomLevel.setAttribute("aria-live", "polite");

                const help = document.createElement("div");
                help.className = "image-lightbox-help";
                help.textContent =
                    "Scroll to zoom · Drag to pan · Esc to close";

                function createButton(label, accessibleName, className) {
                    const button = document.createElement("button");
                    button.type = "button";
                    button.className = className || "image-lightbox-button";
                    button.textContent = label;
                    button.setAttribute("aria-label", accessibleName);
                    button.title = accessibleName;
                    toolbar.appendChild(button);
                    return button;
                }

                const zoomOutButton = createButton(
                    "−",
                    "Zoom out"
                );

                const fitButton = createButton(
                    "Fit",
                    "Fit image to viewer"
                );

                const zoomInButton = createButton(
                    "+",
                    "Zoom in"
                );

                toolbar.appendChild(zoomLevel);

                const closeButton = createButton(
                    "\u00d7",
                    "Close enlarged image",
                    "image-lightbox-button image-lightbox-close"
                );

                viewer.appendChild(enlargedImage);
                overlay.appendChild(toolbar);
                overlay.appendChild(viewer);
                overlay.appendChild(help);

                document.body.appendChild(overlay);
                document.body.style.overflow = "hidden";

                function clampZoom(value) {
                    return Math.min(
                        MAX_ZOOM,
                        Math.max(MIN_ZOOM, value)
                    );
                }

                function clampPan() {
                    const maxPanX = Math.max(
                        0,
                        (baseWidth * zoom - viewer.clientWidth) / 2
                    );

                    const maxPanY = Math.max(
                        0,
                        (baseHeight * zoom - viewer.clientHeight) / 2
                    );

                    panX = Math.max(
                        -maxPanX,
                        Math.min(maxPanX, panX)
                    );

                    panY = Math.max(
                        -maxPanY,
                        Math.min(maxPanY, panY)
                    );
                }

                function applyTransform() {
                    enlargedImage.style.transform =
                        "translate(calc(-50% + " + panX + "px), " +
                        "calc(-50% + " + panY + "px)) " +
                        "scale(" + zoom + ")";

                    zoomLevel.textContent =
                        Math.round(zoom * 100) + "%";

                    viewer.classList.toggle(
                        "is-zoomed",
                        zoom > MIN_ZOOM
                    );
                }

                function measureBaseImage() {
                    enlargedImage.style.transform =
                        "translate(-50%, -50%) scale(1)";

                    const rect = enlargedImage.getBoundingClientRect();
                    baseWidth = rect.width;
                    baseHeight = rect.height;

                    applyTransform();
                }

                function fitImage() {
                    zoom = MIN_ZOOM;
                    panX = 0;
                    panY = 0;
                    measureBaseImage();
                }

                function zoomAt(nextZoom, clientX, clientY) {
                    nextZoom = clampZoom(nextZoom);

                    if (nextZoom === zoom) {
                        return;
                    }

                    const rect = viewer.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    const cursorX = clientX - centerX;
                    const cursorY = clientY - centerY;
                    const factor = nextZoom / zoom;

                    // Keep the point under the cursor in the same
                    // screen position while changing the zoom.
                    panX = cursorX - (cursorX - panX) * factor;
                    panY = cursorY - (cursorY - panY) * factor;

                    zoom = nextZoom;

                    clampPan();
                    applyTransform();
                }

                function zoomFromCenter(factor) {
                    const rect = viewer.getBoundingClientRect();

                    zoomAt(
                        zoom * factor,
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2
                    );
                }

                function closeLightbox() {
                    if (!overlay.isConnected) {
                        return;
                    }

                    document.removeEventListener(
                        "keydown",
                        handleKeyDown
                    );

                    window.removeEventListener(
                        "resize",
                        handleResize
                    );

                    overlay.remove();
                    document.body.style.overflow = previousOverflow;
                    image.focus();
                }

                function handleKeyDown(keyEvent) {
                    if (keyEvent.key === "Escape") {
                        closeLightbox();
                        return;
                    }

                    if (keyEvent.key === "+" || keyEvent.key === "=") {
                        keyEvent.preventDefault();
                        zoomFromCenter(ZOOM_STEP);
                    } else if (keyEvent.key === "-") {
                        keyEvent.preventDefault();
                        zoomFromCenter(1 / ZOOM_STEP);
                    } else if (keyEvent.key === "0") {
                        keyEvent.preventDefault();
                        fitImage();
                    } else if (zoom > MIN_ZOOM) {
                        const movement = 40;

                        if (keyEvent.key === "ArrowLeft") {
                            panX += movement;
                        } else if (keyEvent.key === "ArrowRight") {
                            panX -= movement;
                        } else if (keyEvent.key === "ArrowUp") {
                            panY += movement;
                        } else if (keyEvent.key === "ArrowDown") {
                            panY -= movement;
                        } else {
                            return;
                        }

                        keyEvent.preventDefault();
                        clampPan();
                        applyTransform();
                    }
                }

                function handleResize() {
                    measureBaseImage();
                    clampPan();
                    applyTransform();
                }

                zoomInButton.addEventListener("click", function () {
                    zoomFromCenter(ZOOM_STEP);
                });

                zoomOutButton.addEventListener("click", function () {
                    zoomFromCenter(1 / ZOOM_STEP);
                });

                fitButton.addEventListener("click", fitImage);
                closeButton.addEventListener("click", closeLightbox);

                overlay.addEventListener("click", function (clickEvent) {
                    if (clickEvent.target === overlay) {
                        closeLightbox();
                    }
                });

                viewer.addEventListener(
                    "wheel",
                    function (wheelEvent) {
                        wheelEvent.preventDefault();

                        const factor =
                            wheelEvent.deltaY < 0
                                ? ZOOM_STEP
                                : 1 / ZOOM_STEP;

                        zoomAt(
                            zoom * factor,
                            wheelEvent.clientX,
                            wheelEvent.clientY
                        );
                    },
                    { passive: false }
                );

                viewer.addEventListener("pointerdown", function (pointerEvent) {
                    if (zoom <= MIN_ZOOM) {
                        return;
                    }

                    if (pointerEvent.button !== 0) {
                        return;
                    }

                    dragging = true;
                    startPointerX = pointerEvent.clientX;
                    startPointerY = pointerEvent.clientY;
                    startPanX = panX;
                    startPanY = panY;

                    viewer.classList.add("is-dragging");
                    viewer.setPointerCapture(pointerEvent.pointerId);
                    pointerEvent.preventDefault();
                });

                viewer.addEventListener("pointermove", function (pointerEvent) {
                    if (!dragging) {
                        return;
                    }

                    panX =
                        startPanX +
                        pointerEvent.clientX -
                        startPointerX;

                    panY =
                        startPanY +
                        pointerEvent.clientY -
                        startPointerY;

                    clampPan();
                    applyTransform();
                });

                function stopDragging(pointerEvent) {
                    if (!dragging) {
                        return;
                    }

                    dragging = false;
                    viewer.classList.remove("is-dragging");

                    if (
                        viewer.hasPointerCapture &&
                        viewer.hasPointerCapture(pointerEvent.pointerId)
                    ) {
                        viewer.releasePointerCapture(pointerEvent.pointerId);
                    }
                }

                viewer.addEventListener("pointerup", stopDragging);
                viewer.addEventListener("pointercancel", stopDragging);

                document.addEventListener("keydown", handleKeyDown);
                window.addEventListener("resize", handleResize);

                enlargedImage.addEventListener("load", fitImage);

                enlargedImage.src = image.currentSrc || image.src;

                if (enlargedImage.complete) {
                    requestAnimationFrame(fitImage);
                }

                closeButton.focus();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeImageZoom
        );
    } else {
        initializeImageZoom();
    }
})();