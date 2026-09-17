const themeToggle = document.querySelector(".theme-toggle");
const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  const next = theme === "dark" ? "light" : "dark";
  themeToggle.textContent = `${next === "light" ? "Light" : "Dark"} mode`;
  themeToggle.setAttribute("aria-label", `Switch to ${next} mode`);
  document.querySelector('meta[name="theme-color"]').content = theme === "light" ? "#f4f3ef" : "#111111";
};
applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(theme);
  try { localStorage.setItem("weave-theme", theme); } catch (_) {}
});

document.documentElement.classList.add("js");

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const projects = [...document.querySelectorAll(".atlas-project")];
const projectIndex = document.querySelector(".project-index");
const projectRail = document.querySelector(".project-rail");
const enquiryDialog = document.querySelector("#enquiry-dialog");
const enquiryForm = document.querySelector("#enquiry-form");

document.querySelectorAll("[data-enquiry-open]").forEach((opener) => {
  opener.addEventListener("click", (event) => {
    event.preventDefault();
    enquiryDialog.showModal();
  });
});

document.querySelector(".enquiry-close").addEventListener("click", () => enquiryDialog.close());
enquiryDialog.addEventListener("click", (event) => {
  if (event.target !== enquiryDialog) return;
  const bounds = enquiryDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) enquiryDialog.close();
});

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answers = new FormData(enquiryForm);
  const valueOrPrompt = (name) => answers.get(name)?.toString().trim() || "Not provided";
  const body = [
    `Name: ${valueOrPrompt("name")}`,
    `Email: ${valueOrPrompt("email")}`,
    `Project type: ${valueOrPrompt("projectType")}`,
    `Project location: ${valueOrPrompt("location")}`,
    `Indicative project budget: ${valueOrPrompt("budget")}`,
    `Desired timeline: ${valueOrPrompt("timeline")}`,
    "",
    "What are you hoping to achieve?",
    valueOrPrompt("goals"),
  ].join("\n");
  const subject = `Project enquiry — ${valueOrPrompt("projectType")}`;
  const mailto = `mailto:hello@weavedesignstudio.my?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  enquiryDialog.close();
  window.location.href = mailto;
});

const studioSection = document.querySelector(".atlas-studio");
const servicesSection = document.querySelector(".atlas-services");
const processSection = document.querySelector(".atlas-process");
const contactSection = document.querySelector(".atlas-contact");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const projectDialog = document.querySelector("#project-details-dialog");
const projectDialogPanel = projectDialog.querySelector(".project-dialog-panel");
const projectDialogImage = projectDialog.querySelector("#project-dialog-image");
const projectDialogCategory = projectDialog.querySelector("#project-dialog-category");
const projectDialogTitle = projectDialog.querySelector("#project-dialog-title");
const projectDialogMeta = projectDialog.querySelector("#project-dialog-meta");
const projectDialogStory = projectDialog.querySelector("#project-dialog-story");
const projectDialogSource = projectDialog.querySelector("#project-dialog-source");
let projectDialogClosing = false;

const projectDetails = {
  factory: {
    category: "Industrial, workplaces and brand architecture",
    title: "6+ Factory",
    image: "assets/factory.jpg",
    imageAlt: "6+ Factory, an industrial workplace concept in Jenjarom",
    source: "https://weavedesignstudio.my/projects/6-plus-factory",
    meta: [
      ["Year", "2026"],
      ["Type", "Industrial Architecture"],
      ["Location", "Jenjarom, Selangor"],
      ["Status", "Concept Proposal"],
      ["Role", "Lead Designer"],
    ],
    sections: [
      ["Overview", [
        "6+ Factory explores how an industrial building can do more than house production. Conceived for an industrial site in Jenjarom, the proposal reimagines the factory as a workplace, a public-facing identity and a more welcoming part of its surroundings.",
        "The design moves away from the closed and repetitive character often associated with factory buildings. A clear entrance, generous glazing and a recognisable orange volume give the company a stronger presence, while the office spaces are designed to feel open, comfortable and connected to daily operations.",
      ]],
      ["Design approach", [
        "The proposal brings people, operations and brand identity together through six architectural ideas. Depth, shade and repetition help manage the building’s scale and exposure, while transparent work areas allow everyday activity to become part of its expression.",
        "Rather than treating branding as a separate layer, the architecture itself becomes part of the company’s identity. The result is intended to remain practical for an industrial setting while creating a more considered experience for staff, visitors and the surrounding context.",
      ]],
    ],
  },
  travelfrez: {
    category: "Brand experience, spatial design and airport retail",
    title: "TravelFrez Experience Point",
    image: "assets/travelfrez.jpg",
    imageAlt: "TravelFrez Experience Point at KLIA2 airport",
    source: "https://weavedesignstudio.my/projects/travelfrez-experience-point",
    meta: [
      ["Year", "2026"],
      ["Type", "Brand Experience"],
      ["Location", "KLIA2, Selangor"],
      ["Status", "Design Development"],
      ["Scope", "Spatial Design, Brand Experience"],
      ["Built-up area", "188 sq.ft"],
    ],
    sections: [
      ["Overview", [
        "TravelFrez Experience Point is a compact airport activation space designed to introduce travellers to the brand through visibility, interaction and convenience.",
        "Positioned along a key pedestrian route at KLIA2, the space responds to the fast-moving nature of the airport environment. Attention is brief, movement is continuous and purchasing decisions are often made at the last minute.",
        "Rather than functioning as a conventional enclosed retail unit, the experience point creates an open and approachable brand presence within the circulation space.",
      ]],
      ["Design approach", [
        "The design organises travel essentials into clear product zones that can be understood at a glance. Strong brand colours, vertical display elements and accessible product arrangements help the kiosk remain visible while allowing travellers to move around it comfortably.",
        "Different product moments respond to the needs of adults, families and young travellers, from comfort accessories and essential travel kits to compact toys and junior products.",
        "Within its limited footprint, the design brings together product display, brand communication and customer interaction to create a recognisable stopping point without interrupting the flow of the airport.",
      ]],
    ],
  },
  luma: {
    category: "Island hospitality and community development",
    title: "Luma’ Selakan Dive Lodge",
    image: "assets/luma.jpg",
    imageAlt: "Completed guest accommodation at Luma’ Selakan Dive Lodge",
    source: "https://weavedesignstudio.my/projects/luma-selakan-dive-lodge",
    meta: [
      ["Year", "2018 to Present"],
      ["Type", "Community-based Eco Tourism"],
      ["Location", "Pulau Selakan, Semporna, Sabah"],
      ["Status", "Ongoing Community Initiative"],
      ["Role", "Lead Designer"],
    ],
    sections: [
      ["Overview", [
        "Luma’ Selakan Dive Lodge is an ongoing, phased hospitality and community development project on Pulau Selakan. Rather than being developed through a single fixed masterplan, the project has evolved gradually in response to the operator’s needs, available resources and changing business opportunities.",
        "The work brings together completed guest accommodation, site planning studies and a series of proposed unit types that explore how the lodge could grow over time. Some ideas have been realised, while others remain as future possibilities awaiting the appropriate budget and timing.",
        "The lodge offers a quieter alternative to conventional island resorts, inviting guests to experience the rhythms of island life, engage with the local community and explore the natural setting of Tun Sakaran Marine Park.",
      ]],
      ["Design approach", [
        "The design process treats each phase as part of a longer exploration for the business. New accommodation types, shared facilities and possible site arrangements are studied individually, allowing the client to assess priorities before committing to construction.",
        "Completed units use straightforward timber construction, practical detailing and locally available resources. Proposed concepts build upon the same principles while testing different relationships between guest spaces, the shoreline, existing village activity and views towards the sea.",
        "This allows the architecture to support gradual, realistic growth. Each intervention can stand on its own while contributing to a broader long-term vision for the lodge.",
      ]],
      ["Community and place", [
        "The project was developed with the local community at its centre. Day-to-day operations involve local workers, while the development seeks to create economic opportunities that directly benefit the people of Selakan.",
        "Rather than introducing an entirely new tourism model, the lodge builds upon the existing strengths of the island while preserving its identity and character. Its value lies in offering a meaningful connection to place.",
      ]],
    ],
  },
};

const renderProjectDetails = (details) => {
  projectDialogCategory.textContent = details.category;
  projectDialogTitle.textContent = details.title;
  projectDialogImage.src = details.image;
  projectDialogImage.alt = details.imageAlt;
  projectDialogSource.href = details.source;
  projectDialogMeta.replaceChildren(...details.meta.map(([label, value]) => {
    const item = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    item.append(term, description);
    return item;
  }));
  projectDialogStory.replaceChildren(...details.sections.map(([heading, paragraphs]) => {
    const section = document.createElement("section");
    const title = document.createElement("h3");
    title.textContent = heading;
    section.append(title, ...paragraphs.map((copy) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = copy;
      return paragraph;
    }));
    return section;
  }));
};

const openProjectDialog = (projectId) => {
  const details = projectDetails[projectId];
  if (!details) return;
  renderProjectDetails(details);
  projectDialog.scrollTop = 0;
  projectDialog.querySelector(".project-dialog-copy").scrollTop = 0;
  projectDialog.showModal();
  projectDialogPanel.scrollTop = 0;
  projectDialogClosing = false;

  if (window.gsap && !reducedMotion) {
    window.gsap.fromTo(projectDialogPanel, { autoAlpha: 0, y: 22, scale: 0.985 }, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.42,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
    });
    window.gsap.from([
      projectDialogCategory,
      projectDialogTitle,
      projectDialogMeta,
      projectDialogStory,
      projectDialogSource,
    ], {
      y: 13,
      autoAlpha: 0,
      duration: 0.42,
      stagger: 0.055,
      delay: 0.07,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
    });
  }
};

const closeProjectDialog = () => {
  if (!projectDialog.open || projectDialogClosing) return;
  if (!window.gsap || reducedMotion) {
    projectDialog.close();
    return;
  }

  projectDialogClosing = true;
  window.gsap.to(projectDialogPanel, {
    overwrite: true,
    autoAlpha: 0,
    y: 16,
    scale: 0.99,
    duration: 0.22,
    ease: "power2.in",
    onComplete: () => {
      projectDialog.close();
      window.gsap.set(projectDialogPanel, { clearProps: "transform,opacity,visibility" });
      projectDialogClosing = false;
    },
  });
};

document.querySelectorAll("[data-project-open]").forEach((card) => {
  card.addEventListener("click", (event) => {
    event.preventDefault();
    openProjectDialog(card.dataset.projectOpen);
  });
});
projectDialog.querySelector(".project-dialog-close").addEventListener("click", closeProjectDialog);
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) closeProjectDialog();
});
projectDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeProjectDialog();
});

if (window.gsap && window.ScrollTrigger && !reducedMotion) {
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (projectIndex && projectRail) {
    document.documentElement.classList.add("horizontal-projects");
    let gallery;
    let galleryContext;
    let revealDistance;
    const introHold = 90;
    const buildGallery = () => {
    galleryContext = gsap.context(() => {
    revealDistance = Math.max(480, window.innerHeight * 0.95);
    const getTravel = () => projects.at(-1).offsetLeft - projects[0].offsetLeft;
    const squareClip = (figure) => {
      const side = 0;
      return `inset(${(figure.clientHeight - side) / 2}px ${(figure.clientWidth - side) / 2}px)`;
    };

    if (projects.length) {
      gallery = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: projectIndex,
          start: "top top",
          end: () => `+=${getTravel() + introHold + revealDistance + projects.length * 100}`,
          scrub: 0.45,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      projects.forEach((project, index) => {
        const figure = project.querySelector(".project-image");
        if (index > 0) {
          gallery.fromTo(projectRail, {
            x: () => -(projects[index - 1].offsetLeft - projects[0].offsetLeft),
          }, {
            x: () => -(project.offsetLeft - projects[0].offsetLeft),
            duration: project.offsetLeft - projects[index - 1].offsetLeft,
            immediateRender: false,
          });
        }
        if (index === 0) {
          // A short reading beat, then one continuous handover to the photograph.
          const intro = project.querySelector('.project-intro');
          gallery.fromTo(intro, {
            autoAlpha: 1, y: 0,
          }, {
            autoAlpha: 0, y: -24,
            duration: revealDistance * 0.48,
            ease: "power2.inOut",
          }, introHold);
          gallery.fromTo(figure, {
            clipPath: () => squareClip(figure),
          }, {
            clipPath: "inset(0px 0px)",
            duration: revealDistance,
            ease: "power2.inOut",
          }, introHold);
          // Keep the expanding photograph subdued until the copy has cleared.
          gallery.fromTo(figure, { autoAlpha: 0 }, {
            autoAlpha: 1,
            duration: revealDistance * 0.6,
            ease: "power1.inOut",
          }, introHold);
          gallery.fromTo(project.querySelectorAll('.project-label, .project-caption'), {
            autoAlpha: 0, y: 12,
          }, {
            autoAlpha: 1, y: 0,
            duration: revealDistance * 0.2,
            ease: "power2.out",
          }, introHold + revealDistance * 0.8);
        }
        gallery.to({}, { duration: 100 });
      });
    }
    }, projectIndex);
    };
    buildGallery();
    document.querySelector('[data-view-work]')?.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: gallery.scrollTrigger.start + introHold + revealDistance + 40, behavior: 'smooth' });
    });

    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let resizeTimer;
    let resizePosition;
    window.addEventListener("resize", () => {
      if (window.innerWidth === viewportWidth && window.innerHeight === viewportHeight) return;
      if (!resizePosition) {
        const trigger = gallery.scrollTrigger;
        resizePosition = {
          y: window.scrollY,
          start: trigger.start,
          end: trigger.end,
          progress: gallery.progress(),
        };
      }
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const previous = resizePosition;
        resizePosition = null;
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        // Revert pin styles and rebuild pixel-based timings for the new viewport.
        galleryContext.revert();
        buildGallery();
        ScrollTrigger.refresh();
        const trigger = gallery.scrollTrigger;
        const target = previous.y >= previous.end
          ? previous.y + trigger.end - previous.end
          : previous.y >= previous.start
            ? trigger.start + previous.progress * (trigger.end - trigger.start)
            : previous.y;
        const root = document.documentElement;
        const behavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        window.scrollTo(0, target);
        ScrollTrigger.update();
        gallery.progress(trigger.progress);
        root.style.scrollBehavior = behavior;
      }, 180);
    });
  }

  const splitIntoWords = (element) => {
    const text = element.textContent;
    const visibleText = document.createElement("span");
    const accessibleText = document.createElement("span");
    const words = [];
    visibleText.setAttribute("aria-hidden", "true");
    accessibleText.className = "visually-hidden";
    accessibleText.textContent = text;
    // Keep italic accents and other inline typography intact.
    [...element.childNodes].forEach(node => visibleText.append(node.cloneNode(true)));
    const walker = document.createTreeWalker(visibleText, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      (node.textContent.match(/\s+|\S+/g) ?? []).forEach(token => {
        if (/^\s+$/.test(token)) {
          fragment.append(document.createTextNode(token));
          return;
        }
        const mask = document.createElement("span");
        const word = document.createElement("span");
        mask.className = "word-mask";
        word.className = "gsap-word";
        word.textContent = token;
        mask.append(word);
        fragment.append(mask);
        words.push(word);
      });
      node.replaceWith(fragment);
    });
    element.replaceChildren(visibleText, accessibleText);
    return words;
  };

  const revealWordsOnScroll = (trigger, elements, start = "top 86%", stagger = 0.012) => {
    const words = elements.flatMap(splitIntoWords);
    if (!words.length) return;

    gsap.fromTo(words, {
      yPercent: 112,
    }, {
      yPercent: 0,
      duration: 0.5,
      stagger,
      ease: "power3.out",
      onComplete: () => gsap.set(words, { clearProps: "transform" }),
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    });
  };

  const revealElementOnScroll = (element, start = "top 88%") => {
    if (!element) return;
    gsap.fromTo(element, { y: 16 }, {
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => gsap.set(element, { clearProps: "transform" }),
      scrollTrigger: {
        trigger: element,
        start,
        once: true,
      },
    });
  };

  const revealReadingBlock = (element) => {
    if (!element) return;
    const words = splitIntoWords(element);
    gsap.fromTo(words, { autoAlpha: 0, y: 14 }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.48,
      stagger: 0.055,
      ease: "power2.out",
      clearProps: "opacity,visibility,transform",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true,
      },
    });
  };

  document.querySelectorAll(".project-intro h1, .project-intro > p").forEach(revealReadingBlock);

  if (studioSection) {
    revealReadingBlock(studioSection.querySelector("h2"));
    studioSection.querySelectorAll(".studio-copy > p").forEach((element) => {
      revealReadingBlock(element);
    });
    revealElementOnScroll(studioSection.querySelector(".plain-link"));
  }

  [...document.querySelectorAll(".atlas-services"), processSection].filter(Boolean).forEach((section) => {
    revealReadingBlock(section.querySelector("h2"));

    const rows = [...section.querySelectorAll(".service-index article, .atlas-process li")];
    rows.forEach((row) => {
      [row.querySelector("h3"), row.querySelector("p")].forEach(revealReadingBlock);
    });
  });

  document.querySelectorAll(".section-intro, .fit-kicker, .selected-work-entry h3, .selected-work-entry p").forEach(revealReadingBlock);

  if (contactSection) {
    revealReadingBlock(contactSection.querySelector(".footer-prompt"));
    revealElementOnScroll(contactSection.querySelector(".footer-email"));
    contactSection.querySelectorAll(".footer-bottom > span").forEach((element) => revealElementOnScroll(element, "top 94%"));
  }

  if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  else window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

  projects.flatMap((project) => [...project.querySelectorAll("img")]).forEach((image) => {
    if (image.complete) return;
    image.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    image.addEventListener("error", () => ScrollTrigger.refresh(), { once: true });
  });
}
