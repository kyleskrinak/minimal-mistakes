/* ==========================================================================
   Vanilla JS behaviors (jQuery removed)
   ========================================================================== */

(function () {
  const ready = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  };

  const getOuterWidth = (element) => {
    if (!element) return 0;
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    return (
      rect.width +
      parseFloat(style.marginLeft || "0") +
      parseFloat(style.marginRight || "0")
    );
  };

  const injectFitVidsStyle = () => {
    if (document.getElementById("fit-vids-style")) return;
    const style = document.createElement("style");
    style.id = "fit-vids-style";
    style.textContent =
      ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed{position:absolute;top:0;left:0;width:100%;height:100%;}";
    (document.head || document.body).appendChild(style);
  };

  const initResponsiveEmbeds = () => {
    const container = document.getElementById("main");
    if (!container) return;

    injectFitVidsStyle();

    const selectors = [
      'iframe[src*="player.vimeo.com"]',
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="kickstarter.com"][src*="video.html"]',
      "object",
      "embed",
    ];
    const ignoreSelector = ".fitvidsignore";
    const wrapClass = "fluid-width-video-wrapper";

    container.querySelectorAll(selectors.join(",")).forEach((node) => {
      if (node.closest(ignoreSelector)) return;
      const parent = node.parentElement;
      if (!parent) return;
      if (parent.classList.contains(wrapClass)) return;
      const tag = node.tagName.toLowerCase();
      if (tag === "embed" && parent.tagName.toLowerCase() === "object") return;
      if (tag === "object" && parent.tagName.toLowerCase() === "object") return;

      const width =
        parseInt(node.getAttribute("width"), 10) || node.clientWidth || 16;
      const height =
        parseInt(node.getAttribute("height"), 10) || node.clientHeight || 9;
      const ratio = Number.isFinite(height / width) ? (height / width) * 100 : 56.25;

      const wrapper = document.createElement("div");
      wrapper.className = wrapClass;
      wrapper.style.paddingTop = `${ratio}%`;

      parent.insertBefore(wrapper, node);
      wrapper.appendChild(node);

      node.removeAttribute("height");
      node.removeAttribute("width");
      node.style.height = "100%";
      node.style.width = "100%";
      node.style.position = "absolute";
      node.style.top = "0";
      node.style.left = "0";
    });
  };

  const initAuthorMenu = () => {
    const toggleButton = document.querySelector(".author__urls-wrapper button");
    const urls = document.querySelector(".author__urls");
    if (!toggleButton || !urls) return;

    toggleButton.addEventListener("click", () => {
      urls.classList.toggle("is--visible");
      toggleButton.classList.toggle("open");

      const wrapper = toggleButton.closest(".author__urls-wrapper");
      if (wrapper) {
        wrapper.querySelectorAll("button").forEach((btn) => {
          if (btn !== toggleButton) {
            btn.classList.toggle("open");
          }
        });
      }
    });
  };

  const initSearchToggle = () => {
    const searchToggle = document.querySelector(".search__toggle");
    const searchContent = document.querySelector(".search-content");
    const initialContent = document.querySelector(".initial-content");

    const toggleSearch = () => {
      searchContent?.classList.toggle("is--visible");
      initialContent?.classList.toggle("is--hidden");
      window.setTimeout(() => {
        const input = searchContent?.querySelector("input");
        input?.focus();
      }, 400);
    };

    searchToggle?.addEventListener("click", toggleSearch);

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape" && initialContent?.classList.contains("is--hidden")) {
        toggleSearch();
      }
    });
  };

  const initSmoothScroll = () => {
    if (typeof SmoothScroll !== "function") return;
    new SmoothScroll('a[href*="#"]', {
      offset: 20,
      speed: 400,
      speedAsDuration: true,
      durationMax: 500,
    });
  };

  const initGumshoe = () => {
    if (typeof Gumshoe !== "function") return;
    if (!document.querySelector("nav.toc")) return;

    new Gumshoe("nav.toc a", {
      navClass: "active",
      contentClass: "active",
      nested: false,
      nestedClass: "active",
      offset: 20,
      reflow: true,
      events: true,
    });
  };

  const initStickyTocSync = () => {
    const scrollTocToContent = (event) => {
      const target = event.target;
      const scrollOptions = { behavior: "auto", block: "nearest", inline: "start" };

      const tocElement = document.querySelector("aside.sidebar__right.sticky");
      if (!tocElement) return;
      if (window.getComputedStyle(tocElement).position !== "sticky") return;

      const parent = target.parentElement;
      if (parent?.classList.contains("toc__menu") && target === parent.firstElementChild) {
        const tocHeader = document.querySelector("nav.toc header");
        tocHeader?.scrollIntoView(scrollOptions);
      } else {
        target.scrollIntoView(scrollOptions);
      }
    };

    if (window.chrome) {
      document.addEventListener("gumshoeActivate", scrollTocToContent);
    }
  };

  const initHeadingAnchors = () => {
    const pageContentElement = document.querySelector(".page__content");
    if (!pageContentElement) return;

    pageContentElement
      .querySelectorAll("h1, h2, h3, h4, h5, h6")
      .forEach((element) => {
        const id = element.getAttribute("id");
        if (!id) return;

        const anchor = document.createElement("a");
        anchor.className = "header-link";
        anchor.href = `#${id}`;
        anchor.innerHTML =
          '<span class="sr-only">Permalink</span><i class="fas fa-link"></i>';
        anchor.title = "Permalink";
        element.appendChild(anchor);
      });
  };

  const copyText = (text) => {
    if (document.queryCommandEnabled("copy") && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {
        console.error("Failed to copy text to clipboard: " + text);
      });
      return true;
    }

    const isRTL = document.documentElement.getAttribute("dir") === "rtl";
    const textarea = document.createElement("textarea");
    textarea.className = "clipboard-helper";
    textarea.style[isRTL ? "right" : "left"] = "-9999px";
    textarea.style.position = "absolute";
    textarea.style.top = `${window.pageYOffset || document.documentElement.scrollTop}px`;
    textarea.setAttribute("readonly", "");
    textarea.value = text;
    document.body.appendChild(textarea);

    let success = true;
    try {
      textarea.select();
      success = document.execCommand("copy");
    } catch (error) {
      success = false;
    }

    textarea.remove();
    return success;
  };

  const copyButtonEventListener = (event) => {
    const thisButton = event.currentTarget;

    let codeBlock = thisButton.nextElementSibling;
    while (codeBlock && codeBlock.tagName.toLowerCase() !== "code") {
      codeBlock = codeBlock.nextElementSibling;
    }

    if (!codeBlock) {
      console.warn(thisButton);
      throw new Error("No code block found for this button.");
    }

    const realCodeBlock = codeBlock.querySelector("td.code, td.rouge-code");
    if (realCodeBlock) {
      codeBlock = realCodeBlock;
    }

    const result = copyText(codeBlock.innerText);
    thisButton.focus();

    if (result) {
      if (thisButton.interval) {
        clearInterval(thisButton.interval);
      }
      thisButton.classList.add("copied");
      thisButton.interval = setTimeout(() => {
        thisButton.classList.remove("copied");
        clearInterval(thisButton.interval);
        thisButton.interval = null;
      }, 1500);
    }

    return result;
  };

  const initCopyButtons = () => {
    if (!window.enable_copy_code_button) return;

    document.querySelectorAll(".page__content pre.highlight > code").forEach((element) => {
      const container = element.parentElement;
      if (!container) return;
      if (container.firstElementChild?.tagName.toLowerCase() !== "code") return;

      const copyButton = document.createElement("button");
      copyButton.title = "Copy to clipboard";
      copyButton.className = "clipboard-copy-button";
      copyButton.innerHTML =
        '<span class="sr-only">Copy code</span><i class="far fa-fw fa-copy"></i><i class="fas fa-fw fa-check copied"></i>';
      copyButton.addEventListener("click", copyButtonEventListener);
      container.prepend(copyButton);
    });
  };

  const initGreedyNav = () => {
    const nav = document.querySelector("nav.greedy-nav");
    if (!nav) return;

    const toggleButton = nav.querySelector(".greedy-nav__toggle");
    const visibleLinks = nav.querySelector(".visible-links");
    const hiddenLinks = nav.querySelector(".hidden-links");
    const logo = nav.querySelector(".site-logo");
    const logoImg = nav.querySelector(".site-logo img");
    const title = nav.querySelector(".site-title");
    const search = nav.querySelector("button.search__toggle");

    if (!toggleButton || !visibleLinks || !hiddenLinks || !title) return;

    let numOfItems = 0;
    let breakWidths = [];
    const closingTime = 1000;
    let timer;

    const measureLinks = () => {
      numOfItems = 0;
      breakWidths = [];

      const addWidth = (width) => {
        numOfItems += 1;
        breakWidths.push((breakWidths.slice(-1)[0] || 0) + width);
      };

      Array.from(visibleLinks.children).forEach((item) => {
        addWidth(getOuterWidth(item));
      });

      Array.from(hiddenLinks.children).forEach((item) => {
        const clone = item.cloneNode(true);
        clone.style.visibility = "hidden";
        clone.style.position = "absolute";
        clone.style.pointerEvents = "none";
        visibleLinks.appendChild(clone);
        addWidth(getOuterWidth(clone));
        clone.remove();
      });
    };

    measureLinks();

    const cssBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) return 0;
      if (width < 1024) return 1;
      if (width < 1280) return 2;
      return 3;
    };

    let lastBreakpoint = cssBreakpoint();

    const rebalance = () => {
      const currentBreakpoint = cssBreakpoint();
      if (currentBreakpoint !== lastBreakpoint) {
        measureLinks();
      }
      lastBreakpoint = currentBreakpoint;

      let numOfVisibleItems = visibleLinks.children.length;

      const availableSpace =
        nav.clientWidth -
        (logo ? getOuterWidth(logo) : 0) -
        getOuterWidth(title) -
        (search ? getOuterWidth(search) : 0) -
        (numOfVisibleItems !== breakWidths.length ? getOuterWidth(toggleButton) : 0);

      const requiredSpace = breakWidths[numOfVisibleItems - 1] || 0;

      if (requiredSpace > availableSpace && numOfVisibleItems > 0) {
        const lastVisible = visibleLinks.lastElementChild;
        if (lastVisible) {
          hiddenLinks.prepend(lastVisible);
          numOfVisibleItems -= 1;
          rebalance();
        }
        return;
      }

      const toggleExtraSpace =
        numOfVisibleItems === breakWidths.length - 1 ? getOuterWidth(toggleButton) : 0;
      const nextItemWidth = breakWidths[numOfVisibleItems] || Infinity;

      if (availableSpace + toggleExtraSpace > nextItemWidth && hiddenLinks.firstElementChild) {
        visibleLinks.appendChild(hiddenLinks.firstElementChild);
        numOfVisibleItems += 1;
        rebalance();
        return;
      }

      toggleButton.setAttribute("count", `${numOfItems - numOfVisibleItems}`);
      if (numOfVisibleItems === numOfItems) {
        toggleButton.classList.add("hidden");
      } else {
        toggleButton.classList.remove("hidden");
      }
    };

    window.addEventListener("resize", rebalance);

    toggleButton.addEventListener("click", () => {
      hiddenLinks.classList.toggle("hidden");
      toggleButton.classList.toggle("close");
      clearTimeout(timer);
    });

    hiddenLinks.addEventListener("click", () => {
      hiddenLinks.classList.add("hidden");
      toggleButton.classList.remove("close");
    });

    hiddenLinks.addEventListener("mouseleave", () => {
      timer = window.setTimeout(() => {
        hiddenLinks.classList.add("hidden");
        toggleButton.classList.remove("close");
      }, closingTime);
    });

    hiddenLinks.addEventListener("mouseenter", () => {
      clearTimeout(timer);
    });

    if (logoImg) {
      if (logoImg.complete && logoImg.naturalWidth !== 0) {
        rebalance();
      } else {
        logoImg.addEventListener("load", rebalance, { once: true });
        logoImg.addEventListener("error", rebalance, { once: true });
      }
    } else {
      rebalance();
    }
  };

  const injectLightboxStyle = () => {
    if (document.getElementById("vanilla-lightbox-style")) return;
    const style = document.createElement("style");
    style.id = "vanilla-lightbox-style";
    style.textContent = [
      ".image-lightbox{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.75);z-index:9999;}",
      ".image-lightbox.is-open{display:flex;}",
      ".image-lightbox__frame{position:relative;max-width:90vw;max-height:90vh;}",
      ".image-lightbox__img{display:block;max-width:90vw;max-height:90vh;border-radius:4px;box-shadow:0 8px 24px rgba(0,0,0,0.35);}",
      ".image-lightbox__caption{margin-top:0.5rem;color:#fff;text-align:center;font-size:0.9rem;}",
      ".image-lightbox__close{position:absolute;top:-0.5rem;right:-0.5rem;border:0;border-radius:999px;width:2rem;height:2rem;background:rgba(0,0,0,0.65);color:#fff;font-size:1.25rem;cursor:pointer;}",
      ".image-lightbox__backdrop{position:absolute;inset:0;}",
    ].join("");
    document.head.appendChild(style);
  };

  const initImageLightbox = () => {
    const links = Array.from(
      document.querySelectorAll(
        "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']"
      )
    ).filter((link) => link.querySelector("img"));

    if (!links.length) return;

    injectLightboxStyle();

    const overlay = document.createElement("div");
    overlay.className = "image-lightbox";
    overlay.innerHTML =
      '<div class="image-lightbox__backdrop"></div><figure class="image-lightbox__frame"><img class="image-lightbox__img" alt=""><figcaption class="image-lightbox__caption"></figcaption><button type="button" class="image-lightbox__close" aria-label="Close image">×</button></figure>';
    document.body.appendChild(overlay);

    const imageEl = overlay.querySelector(".image-lightbox__img");
    const captionEl = overlay.querySelector(".image-lightbox__caption");
    const closeButton = overlay.querySelector(".image-lightbox__close");
    const backdrop = overlay.querySelector(".image-lightbox__backdrop");

    const close = () => overlay.classList.remove("is-open");
    const open = (href, caption) => {
      imageEl.src = href;
      if (caption) {
        captionEl.textContent = caption;
        captionEl.style.display = "block";
      } else {
        captionEl.textContent = "";
        captionEl.style.display = "none";
      }
      overlay.classList.add("is-open");
    };

    [closeButton, backdrop].forEach((el) => el?.addEventListener("click", close));
    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") close();
    });

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const nestedImg = link.querySelector("img");
        const caption = link.getAttribute("title") || nestedImg?.getAttribute("alt") || "";
        open(link.href, caption);
      });
    });
  };

  ready(() => {
    initResponsiveEmbeds();
    initAuthorMenu();
    initSearchToggle();
    initSmoothScroll();
    initGumshoe();
    initStickyTocSync();
    initHeadingAnchors();
    initCopyButtons();
    initGreedyNav();
    initImageLightbox();
  });
})();
