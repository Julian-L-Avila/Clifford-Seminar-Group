// ==========================================================================
// Clifford Seminar Group — Official Seminar Webpage
// Bilingual Toggle (EN / ES) · Light/Dark Theme · Materials Filter & Search
// Syllabus Switcher · BibTeX & CLI Copy Utilities
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const langBtn = document.getElementById('lang-toggle');
  const themeBtn = document.getElementById('theme-toggle');
  const menuBtn = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const toastEl = document.getElementById('toast');

  let toastTimer = null;
  const showToast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('visible');
    }, 2400);
  };

  // ------------------------------------------------------------------------
  // 1. Bilingual Toggle (EN / ES, default 'en')
  // ------------------------------------------------------------------------
  const materialSearch = document.getElementById('material-search');
  const bibSearch = document.getElementById('bib-search');

  let currentLang = localStorage.getItem('csg_lang') || 'en';
  const applyLang = (lang) => {
    htmlEl.setAttribute('data-lang', lang);
    htmlEl.setAttribute('lang', lang);
    if (langBtn) {
      const label = langBtn.querySelector('#lang-label');
      if (label) label.textContent = lang === 'en' ? 'ES' : 'EN';
    }
    if (materialSearch) {
      materialSearch.placeholder = lang === 'en'
        ? 'Search sessions, papers, topics (e.g. dual spaces, Kepler, template)...'
        : 'Buscar sesiones, documentos, temas (ej. espacios duales, Kepler, plantilla)...';
    }
    if (bibSearch) {
      bibSearch.placeholder = lang === 'en'
        ? 'Filter references by author, title, or abbreviation (e.g. VR, Hestenes, Axler)...'
        : 'Filtrar referencias por autor, título o sigla (ej. VR, Hestenes, Axler)...';
    }
    localStorage.setItem('csg_lang', lang);
  };
  applyLang(currentLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'es' : 'en';
      applyLang(currentLang);
    });
  }

  // ------------------------------------------------------------------------
  // 2. Theme Toggle (Light Monograph Default / Dark Mode)
  // ------------------------------------------------------------------------
  let currentTheme = localStorage.getItem('csg_theme') || 'light';
  const applyTheme = (theme) => {
    htmlEl.setAttribute('data-theme', theme);
    if (themeBtn) {
      const icon = themeBtn.querySelector('#theme-icon');
      if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
    }
    localStorage.setItem('csg_theme', theme);
  };
  applyTheme(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  // ------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // ------------------------------------------------------------------------
  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. Seminar Materials Filter & Live Search
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const materialCards = document.querySelectorAll('.material-card');
  const materialEmpty = document.getElementById('materials-empty');
  let activeKind = 'all';
  let materialQuery = '';

  const applyMaterialFilter = () => {
    let visibleCount = 0;
    materialCards.forEach((card) => {
      const kind = card.getAttribute('data-kind') || '';
      const haystack = (card.textContent + ' ' + (card.getAttribute('data-keywords') || '')).toLowerCase();
      const matchKind = activeKind === 'all' || kind === activeKind;
      const matchQuery = !materialQuery || haystack.includes(materialQuery);
      const show = matchKind && matchQuery;
      card.style.display = show ? 'flex' : 'none';
      if (show) visibleCount += 1;
    });
    if (materialEmpty) {
      materialEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeKind = btn.getAttribute('data-filter') || 'all';
      applyMaterialFilter();
    });
  });

  if (materialSearch) {
    materialSearch.addEventListener('input', (e) => {
      materialQuery = e.target.value.trim().toLowerCase();
      applyMaterialFilter();
    });
  }

  // ------------------------------------------------------------------------
  // 5. Syllabus & Work Plan Tab Switcher
  // ------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab-target]');
  const tabPanels = document.querySelectorAll('.syllabus-panel[data-tab-panel]');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab-target');
      tabBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', String(active));
      });
      tabPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.getAttribute('data-tab-panel') === target);
      });
    });
  });

  // ------------------------------------------------------------------------
  // 6. Bibliography Search & One-Click Clean BibTeX Copy
  // ------------------------------------------------------------------------
  const bibCards = document.querySelectorAll('.bib-card');
  const bibEmpty = document.getElementById('bib-empty');

  if (bibSearch) {
    bibSearch.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      let count = 0;
      bibCards.forEach((card) => {
        const match = !q || card.textContent.toLowerCase().includes(q);
        card.style.display = match ? 'flex' : 'none';
        if (match) count += 1;
      });
      if (bibEmpty) bibEmpty.style.display = count === 0 ? 'block' : 'none';
    });
  }

  const BIBTEX_ENTRIES = {
    vazIntroductionCliffordAlgebras2016: `@book{vazIntroductionCliffordAlgebras2016,
  title = {Introduction to Clifford Algebras and Spinors},
  author = {Vaz, Jayme and da Rocha, Rold\\~{a}o},
  year = {2016},
  publisher = {Oxford University Press},
  address = {Oxford},
  isbn = {978-0-19-878292-6}
}`,
    doranGeometricAlgebraPhysicists2013: `@book{doranGeometricAlgebraPhysicists2013,
  title = {Geometric Algebra for Physicists},
  author = {Doran, Chris and Lasenby, Anthony},
  year = {2013},
  publisher = {Cambridge University Press},
  address = {Cambridge},
  doi = {10.1017/CBO9780511807497},
  isbn = {978-0-521-48022-2}
}`,
    hestenesCliffordAlgebraGeometric1984: `@book{hestenesCliffordAlgebraGeometric1984,
  title = {Clifford Algebra to Geometric Calculus},
  author = {Hestenes, David and Sobczyk, Garret},
  year = {1984},
  publisher = {Springer Netherlands},
  address = {Dordrecht},
  doi = {10.1007/978-94-009-6292-7},
  isbn = {978-90-277-2561-5}
}`,
    hestenesNewFoundationsClassical2002: `@book{hestenesNewFoundationsClassical2002,
  title = {New Foundations for Classical Mechanics},
  author = {Hestenes, David},
  year = {2002},
  edition = {2nd},
  series = {Fundamental Theories of Physics},
  volume = {99},
  publisher = {Kluwer Academic Publishers},
  address = {Dordrecht},
  doi = {10.1007/0-306-47122-1},
  isbn = {978-0-306-47122-3}
}`,
    hestenesSpaceTimeAlgebra2015: `@book{hestenesSpaceTimeAlgebra2015,
  title = {Space-Time Algebra},
  author = {Hestenes, David},
  year = {2015},
  publisher = {Springer International Publishing},
  address = {Cham},
  doi = {10.1007/978-3-319-18413-5},
  isbn = {978-3-319-18412-8}
}`,
    hestenesOerstedMedalLecture2003: `@article{hestenesOerstedMedalLecture2003,
  title = {Oersted Medal Lecture 2002: Reforming the Mathematical Language of Physics},
  author = {Hestenes, David},
  journal = {American Journal of Physics},
  year = {2003},
  volume = {71},
  number = {2},
  pages = {104--121},
  doi = {10.1119/1.1522700}
}`,
    garlingCliffordAlgebrasIntroduction2011: `@book{garlingCliffordAlgebrasIntroduction2011,
  title = {Clifford Algebras: An Introduction},
  author = {Garling, D. J. H.},
  year = {2011},
  series = {London Mathematical Society Student Texts},
  volume = {78},
  publisher = {Cambridge University Press},
  address = {Cambridge},
  doi = {10.1017/CBO9780511972997},
  isbn = {978-1-107-09638-7}
}`,
    lounestoCliffordAlgebrasSpinors2001: `@book{lounestoCliffordAlgebrasSpinors2001,
  title = {Clifford Algebras and Spinors},
  author = {Lounesto, Pertti},
  year = {2001},
  edition = {2nd},
  series = {London Mathematical Society Lecture Note Series},
  volume = {286},
  publisher = {Cambridge University Press},
  address = {Cambridge},
  doi = {10.1017/CBO9780511526022},
  isbn = {978-0-521-00551-7}
}`,
    girardQuaternionsCliffordAlgebras2007: `@book{girardQuaternionsCliffordAlgebras2007,
  title = {Quaternions, Clifford Algebras and Relativistic Physics},
  editor = {Girard, Patrick R.},
  year = {2007},
  publisher = {Birkh\\"{a}user Verlag},
  address = {Basel},
  doi = {10.1007/978-3-7643-7791-5},
  isbn = {978-3-7643-7790-8}
}`,
    axlerLinearAlgebraDone2015: `@book{axlerLinearAlgebraDone2015,
  title = {Linear Algebra Done Right},
  author = {Axler, Sheldon},
  year = {2015},
  series = {Undergraduate Texts in Mathematics},
  publisher = {Springer International Publishing},
  address = {Cham},
  doi = {10.1007/978-3-319-11080-6},
  isbn = {978-3-319-11079-0}
}`,
    fraleighFirstCourseAbstract2021: `@book{fraleighFirstCourseAbstract2021,
  title = {A First Course in Abstract Algebra},
  author = {Fraleigh, John B. and Katz, Victor J.},
  year = {2021},
  edition = {8th},
  publisher = {Pearson},
  address = {Hoboken, NJ},
  isbn = {978-0-13-575816-8}
}`
  };

  const copyText = async (text, btn) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (btn) {
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1400);
    }
    showToast(currentLang === 'en' ? 'Copied to clipboard.' : 'Copiado al portapapeles.');
  };

  document.querySelectorAll('[data-copy-bib]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-copy-bib');
      if (key && BIBTEX_ENTRIES[key]) {
        copyText(BIBTEX_ENTRIES[key], btn);
      }
    });
  });

  document.querySelectorAll('[data-copy-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const el = targetId ? document.getElementById(targetId) : null;
      if (el) {
        copyText(el.textContent.trim(), btn);
      }
    });
  });
});
