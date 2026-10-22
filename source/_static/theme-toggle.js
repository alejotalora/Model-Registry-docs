
(function () {
    "use strict";

    const STORAGE_KEY = "stamm-model-registry-theme";

    function getSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) === "dark"
                ? "dark"
                : "light";
        } catch (error) {
            return "light";
        }
    }

    function initializeThemeToggle() {
        const navigation = document.getElementById("sidebar-toc");
        if (!navigation) return;

        let button = document.getElementById("theme-toggle-button");

        if (!button) {
            button = document.createElement("button");
            button.id = "theme-toggle-button";
            button.type = "button";
            button.className = "theme-toggle-button";

            const heading = navigation.previousElementSibling;

            if (heading && heading.tagName === "H3") {
                heading.classList.add("sidebar-toc-heading");
                heading.appendChild(button);
            } else if (navigation.parentElement) {
                navigation.parentElement.insertBefore(button, navigation);
            }
        }

        const logo = document.querySelector(
            ".sphinxsidebarwrapper p.logo img"
        );

        let lightLogoUrl = null;
        let darkLogoUrl = null;

        if (logo) {
            const originalSource = logo.getAttribute("src") || "";
            lightLogoUrl = new URL(originalSource, document.baseURI);

            const logoPath = lightLogoUrl.pathname;

            if (/\/images\/branding\/logo-light\.png$/i.test(logoPath)) {
                // The light logo is already inside images/branding.
                darkLogoUrl = new URL(lightLogoUrl.href);
                darkLogoUrl.pathname = logoPath.replace(
                    /logo-light\.png$/i,
                    "logo-dark.png"
                );
            } else if (/\/logo-light\.png$/i.test(logoPath)) {
                // Sphinx copied html_logo into the root of _static.
                // The original dark logo remains in images/branding.
                darkLogoUrl = new URL(lightLogoUrl.href);
                darkLogoUrl.pathname = logoPath.replace(
                    /logo-light\.png$/i,
                    "images/branding/logo-dark.png"
                );
            } else {
                console.warn(
                    "Unrecognized STAMM logo path:",
                    lightLogoUrl.href
                );
            }

            logo.addEventListener("error", function () {
                console.error("Unable to load STAMM logo:", logo.src);
            });
        }

        function applyTheme(theme, savePreference) {
            const isDark = theme === "dark";

            document.documentElement.classList.toggle(
                "theme-dark",
                isDark
            );

            button.textContent = isDark ? "☀️" : "🌙";
            button.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
            button.title = isDark
                ? "Switch to light mode"
                : "Switch to dark mode";
            button.setAttribute("aria-pressed", String(isDark));

            if (logo) {
                const targetUrl = isDark ? darkLogoUrl : lightLogoUrl;

                if (targetUrl) {
                    logo.src = targetUrl.href;
                }
            }

            if (savePreference) {
                try {
                    localStorage.setItem(STORAGE_KEY, theme);
                } catch (error) {
                    // Theme switching still works without local storage.
                }
            }
        }

        applyTheme(getSavedTheme(), false);

        if (button.dataset.initialized !== "true") {
            button.addEventListener("click", function () {
                const isDark =
                    document.documentElement.classList.contains("theme-dark");

                applyTheme(isDark ? "light" : "dark", true);
            });

            button.dataset.initialized = "true";
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeThemeToggle
        );
    } else {
        initializeThemeToggle();
    }
})();
