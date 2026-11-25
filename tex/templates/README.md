# Clifford Seminar Group — LaTeX Templates

Standard Springer-inspired LaTeX templates for the **Thesenpapier** (position paper) and **Sitzungsprotokoll** (session record), built on the shared style package [`clifford-seminar.sty`](clifford-seminar.sty).

## Design Overview

- **Classic academic Springer typography:** Latin Modern serif (`lmodern`) for body prose, mathematics, headings, captions, and small-caps running headers, paired with `amsmath`, `amssymb`, `amsthm`, `microtype`, and `booktabs`.
- **Restrained Clifford Seminar Group identity:**
  - Pure black body prose, section headings, theorem statements, tables, and list markers for maximum print and screen readability.
  - A single deep oxblood crimson (`#7D1128`, darkened from the logo) is reserved strictly for the masthead series name, double-weight editorial title rule, subtle section callout headings (`Abstract`, `Thesis I`, etc.), and muted burgundy links (`#5E0D1E`).
  - No shaded boxes, colored bullets, or rounded webpage cards — purely traditional print typesetting.
  - The seminar logo (`assets/logo.jpg`) is automatically located and placed as a crisp square publisher emblem in the top-right masthead.

## Directory Layout

```text
tex/templates/
├── clifford-seminar.sty                               # Shared style package
├── README.md                                          # This guide
├── thesenpapier/
│   ├── thesenpapier-template.tex                      # Position paper template
│   └── thesenpapier-template.pdf                      # Compiled reference preview
└── sitzungsprotokoll/
    ├── sitzungsprotokoll-template.tex                 # Session record template
    └── sitzungsprotokoll-template.pdf                 # Compiled reference preview
```

## Quick Start

Because `tex/templates/<kind>/` sits at the same directory depth as `tex/<kind>/sessionNN-<slug>/`, copying a template requires **no path edits** to the style package, logo, or shared Zotero bibliography.

### New Thesenpapier

```bash
mkdir -p tex/thesenpapier/session02-universal-clifford
cp tex/templates/thesenpapier/thesenpapier-template.tex \
   tex/thesenpapier/session02-universal-clifford/session02-thesenpapier.tex
cd tex/thesenpapier/session02-universal-clifford
latexmk -pdf session02-thesenpapier.tex
```

### New Sitzungsprotokoll

```bash
mkdir -p tex/sitzungsprotokoll/session02-universal-clifford
cp tex/templates/sitzungsprotokoll/sitzungsprotokoll-template.tex \
   tex/sitzungsprotokoll/session02-universal-clifford/session02-sitzungsprotokoll-YYYY-MM-DD.tex
cd tex/sitzungsprotokoll/session02-universal-clifford
latexmk -pdf session02-sitzungsprotokoll-YYYY-MM-DD.tex
```

> **Note:** If a protocol contains no citations, you can pass `[sitzungsprotokoll,nobib]` to `\usepackage` and omit `\printbibliography`, allowing compilation with `pdflatex` alone.

## Package Options & Environments

Load the package with one of:

```latex
\usepackage[thesenpapier]{../../templates/clifford-seminar}
\usepackage[sitzungsprotokoll]{../../templates/clifford-seminar}
\usepackage[sitzungsprotokoll,nobib]{../../templates/clifford-seminar}
```

### Metadata Commands

| Command | Applies to | Purpose |
| :--- | :--- | :--- |
| `\seminartitle[Short Title]{Full Title}` | Both | Masthead title and running-header short title |
| `\seminarsubtitle{...}` | Both | Optional subtitle line |
| `\seminarsession{Session NN}` | Both | Session badge in masthead and running header |
| `\seminarmodule{...}` | Both | Syllabus module label |
| `\seminardate{DD Month YYYY}` | Both | Session or circulation date |
| `\seminarauthors{A \and B}` | Thesenpapier | Author line |
| `\seminarreferat{...}` | Both | Lead exposition speakers (at the board) |
| `\seminarkorreferat{...}` | Both | Respondent critique speaker |
| `\seminartopicref{...}` | Sitzungsprotokoll | Reference to the session's Thesenpapier / topic |
| `\seminarscribe{...}` | Sitzungsprotokoll | Protocol scribe |
| `\seminarpresent{...}` | Sitzungsprotokoll | In-person attendees |
| `\seminaronline{...}` | Sitzungsprotokoll | Online attendees (omitted automatically if empty) |

### Provided Environments

- **Mathematical:** `definition`, `axiom`, `theorem`, `proposition`, `lemma`, `corollary`, `remark`, `example`, `proof`, and `keyresult` (highlighted equation/result box).
- **Thesenpapier:** `seminarabstract` (shaded scope/abstract card) and `thesis` (automatically numbered `Thesis I`, `Thesis II`, ... with optional title).
- **Sitzungsprotokoll:** `discussionnote` (board clarifications / plenary remarks), `takeaways` (resolved conclusions), and `nextsession` (collar-gold callout for open questions and preparation).

### Shared Mathematical Macros

`\Cl`, `\R`, `\C`, `\Q`, `\Z`, `\N`, `\K`, `\ev`, `\rad`, `\Hom`, `\End`, `\id`, `\tr`, `\Span`, `\Spin`, `\Pin`, `\SO`, `\SU`, `\pair{a}{b}`, `\grade{A}{k}` (or `\grade{A}` for the scalar projection), `\lc`, `\rc`, `\rev{u}`, `\ginv{u}`, `\clconj{u}`, `\dd`. All are defined with `\providecommand` so documents can override any symbol cleanly if needed.
