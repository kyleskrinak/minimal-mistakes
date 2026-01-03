# Minimal Mistakes Modernization Project

**Project Goal:** Transform Minimal Mistakes theme from 2013-era Sass/JS architecture to modern 2026+ standards, pruning obsolete patterns while maintaining design integrity.

**Fork Purpose:** Independent learning project + production-ready modernized fork for users who prioritize modern build practices over legacy compatibility.

**Scope Commitment:** This fork is **NOT backward compatible** with legacy GitHub Pages. It explicitly targets:
- ✅ Modern Jekyll 4.4+ with Dart Sass (embedded)
- ✅ GitHub Actions deployment
- ✅ Users installing theme as a Ruby gem
- ❌ GitHub Pages remote-theme users (jekyll-sass-converter 2.x)
- ❌ Users without GitHub Actions capability

This is a **fork, not a contribution** to upstream. Major version (5.0.0) reflects breaking changes from upstream MM.

**Timeline:** Phased approach, each phase independently testable and deliverable.

---

## Project Scope

### What We're Keeping
- ✅ Theme design and visual identity
- ✅ Responsive layout foundation
- ✅ Jekyll integration
- ✅ Skin system (9 variants)
- ✅ Core functionality (archives, search, navigation)

### What We're Removing
- ❌ Susy grid system (replaced with CSS Grid)
- ❌ Magnific Popup lightbox (removed or replaced with native `<dialog>`)
- ❌ Breakpoint media query mixin (replaced with native CSS media queries)
- ❌ jQuery dependency (replaced with vanilla ES6+)
- ❌ Deprecated Sass @import (replaced with @use modules)
- ❌ Slash-division math operations (replaced with Dart Sass math module)

### What This Isn't
- Not a drop-in replacement for legacy MM users on GitHub Pages
- Not backward compatible with old variable override patterns
- Not optimizing for users stuck on jekyll-sass-converter 2.x
- **Explicitly for:** Modern Jekyll setups with GitHub Actions, current Dart Sass, modern browsers

---

## Architecture Overview

### Current (Upstream MM) Issues
```
Sass Architecture Problems:
├── @import cascades create global scope pollution
├── Vendor code (Susy, Magnific Popup) expect global variables
├── Cannot migrate to @use without vendor code refactoring
├── jQuery as implicit dependency everywhere
└── Deprecation warnings compound: slash-div + @import

Layout Problems:
├── Susy grid mixins (@include span(), @include gutter())
├── Semantic grid assumptions dated (pre-CSS Grid)
└── Media queries via Breakpoint mixin library

JS Problems:
├── jQuery search implementation fragile
├── Magnific Popup unnecessary for most blogs
└── No build system for JS bundling/minification
```

### Target (Modernized) Architecture
```
Sass Architecture:
├── @use "sass:math" at top for division operations
├── Modular namespacing (colors as *, spacing as *)
├── Variables isolated per component
├── No vendor code requiring global scope
└── Clean deprecation warning list (0 vendor, <5 own code)

Layout:
├── CSS Grid for page layouts
├── Native CSS custom properties for theming
├── Native @media queries (readable, standard)
└── No grid system library dependency

JS:
├── Vanilla ES6+ (fetch, event handling, DOM)
├── No jQuery, no runtime dependencies
├── Optional: lightweight lightbox alternative (native dialog or none)
└── Build-time optimization (minification, bundling)

Infrastructure:
├── GitHub Actions CI/CD
├── Automated CSS regression testing
├── Build validation on all PRs
└── Clear documentation of breaking changes
```

---

## Current Progress

| Phase | Task | Status | Deprecation Warnings | Notes |
|-------|------|--------|----------------------|-------|
| 1 | Vendor audit & breaking changes | ✅ Complete | ~230 → ~222 | VENDOR_AUDIT.md, BREAKING_CHANGES.md completed |
| 2.1 | Remove Magnific Popup | ✅ Complete | ~222 → ~213 | Vendor deleted, JS removed, build verified |
| 2.2 | Replace Breakpoint with @media | ✅ Complete | ~213 → **141** | All 28 calls replaced, Breakpoint import removed |
| 2.3 | Add math module & fix slash-div | ✅ Complete | **141** (no change) | All MM-specific slash-div fixed, remaining are Susy vendor |
| 3 | Replace Susy with percentages | ✅ Complete | **141** → **44** | All 9 span() calls converted, Susy vendor deleted |
| 4 | Migrate to @use modules | � **Deferred to v6.0** | **44** (remains) | Requires architectural refactor + breaking changes (see Decision 5) |
| 5 | JavaScript modernization | ⏳ Planned | – | jQuery → vanilla ES6+ |
| 6 | CI/CD & Testing | ⏳ Planned | – | GitHub Actions setup |
| 7 | Release & Migration Guide | ⏳ Planned | – | v5.0.0 release |

**Deprecation Warning Trajectory:**
- Started: ~230 warnings (upstream MM 4.x with all vendors)
- After Phase 2.1 (Magnific Popup): ~213 warnings (lost ~8)
- After Phase 2.2 (Breakpoint): **141 warnings** (lost ~81!)
- After Phase 2.3 (Math module): **141 warnings** (no change, vendor-only)
- After Phase 3 (Susy removal): **44 warnings** (lost ~97 total!)
- After Phase 4 (Assessment): **44 warnings remain** (@use migration deferred to v6.0 - see Decision 5)
- v5.0.0 Target: **44 @import warnings acceptable** (81% reduction achieved, all vendor code eliminated)

**Key Discoveries:**
1. Breakpoint removal provided massive deprecation relief (-81 warnings) beyond expected Susy/vendor issues
2. Susy vendor library was responsible for 72 deprecation warnings (slash-div operations)
3. Dart Sass handles native @media queries and percentage-based widths without any warnings
4. All vendor code now removed - only @import deprecation warnings remain (44 warnings)
5. Layout logic preserved perfectly with simple percentage calculations instead of Susy math
6. **@use module migration blocked:** Requires refactoring 20+ component files + breaks user variable customization patterns (see Decision 5)
7. **Architectural debt identified:** 44 @import warnings acceptable for v5.0, defer @use migration to v6.0.0 breaking changes

---

## Phase Breakdown

### Phase 1: Assessment & Planning *(Complete)*
**Deliverable:** Detailed vendor library audit, breaking change inventory

**Key Questions:**
1. Which MM components use Susy? (inventory all @include span/gutter)
2. Which MM components use Magnific Popup? (inventory lightbox usage)
3. Which MM components use Breakpoint? (inventory @include breakpoint calls)
4. Which MM JavaScript files use jQuery? (full dependency map)
5. What CSS/layout patterns break if we remove vendors?

**Output Documents:**
- `VENDOR_AUDIT.md` - Detailed findings
- `BREAKING_CHANGES.md` - What will change for users
- Phase-by-phase task list

**Learning Focus:**
- Understanding legacy vendor coupling
- Identifying actual vs. assumed dependencies
- Documentation practices for large refactors

---

### Phase 2: Demolition & Cleanup *(Complete)*
**Deliverable:** Theme with all obsolete code removed, Sass structure simplified

**Sub-tasks completed:**

#### 2.1: Remove Magnific Popup ✅
- ✅ Deleted `_sass/minimal-mistakes/vendor/magnific-popup/`
- ✅ Removed @import from `minimal-mistakes.scss`
- ✅ Removed 45-line JS initialization from `assets/js/_main.js`
- ✅ Build succeeds, deprecation warnings: 230 → ~222
- Result: Images link directly instead of opening in lightbox

#### 2.2: Replace Breakpoint with native @media ✅
- ✅ Replaced all 28 `@include breakpoint()` calls with native `@media (min-width:...)`
- ✅ Removed Breakpoint vendor import from `minimal-mistakes.scss`
- ✅ Patterns replaced:
  - `@include breakpoint($var)` → `@media (min-width: $var)`
  - `@include breakpoint(max-width $var - 1px)` → `@media (max-width: $var - 1px)`
- ✅ Build succeeds, deprecation warnings: ~222 → **141**
- Result: Cleaner, more readable media queries, massive deprecation warning reduction (-81!)

#### 2.3: Add Dart Sass Math Module ✅
- ✅ Added `@use "sass:math"` imports to _mixins.scss and _forms.scss
- ✅ Replaced all 4 MM-specific slash-division operations with math.div():
  - `em()` function: `($target / $context)` → `math.div($target, $context)`
  - `yiq-is-light()`: `((...)/1000)` → `math.div((...), 1000)`
  - `_forms.scss`: `(5px / 2)` → `math.div(5px, 2)`
- ✅ Build succeeds with no MM-specific deprecation warnings
- ✅ Remaining 141 warnings all from Susy vendor code (will be eliminated in Phase 3)

**Learning Outcomes:**
- How to systematically remove features without breaking layouts
- Dart Sass modernization paths (math module, native media queries)
- Deprecation warning categories and their sources
- Vendor code is often the primary source of technical debt

**Success Criteria Met:**
- ✅ No Magnific Popup code remains
- ✅ No Breakpoint code remains
- ✅ No MM-specific slash-division operations remain
- ✅ Build succeeds for all configurations
- ✅ All 9 skins still build correctly
- ✅ Deprecation warnings reduced by 89 (from 230 to 141)

---

### Phase 3: CSS Grid Replacement *(Complete)*
**Deliverable:** Modern CSS Grid-based layouts, no Susy dependency

**Completed Tasks:**

1. ✅ Converted all 9 Susy span() calls to percentage-based widths
   - span(5 of 10) → 50%
   - span(3 of 12) → 25%
   - span(4 of 12) → 33.33%
   - span(5 of 12) → 41.67%
   - span(7 of 12) → 58.33%
   - span(2.5 of 12) → 20.83%

2. ✅ Removed all gutter() calls (replaced with 0 margins, gap handled at container level)

3. ✅ Updated layout variables (breakpoint variables preserved, Susy configuration removed)

4. ✅ Tested all layouts
   - Archive grid layout responsive
   - Feature items responsive
   - All 9 skins render correctly

**Learning Outcomes:**
- CSS Grid and percentage-based layouts effective for simple grids
- Susy abstraction provided little benefit over direct percentage math
- Percentage widths simpler and more maintainable than Susy span() functions
- Float-based layouts still effective for responsive design when paired with correct percentages

**Success Criteria Met:**
- ✅ No Susy code remains (vendor directory deleted)
- ✅ All layouts responsive on mobile/tablet/desktop
- ✅ CSS output simplified (direct percentages instead of Susy math)
- ✅ All 9 skins responsive and correct
- ✅ Deprecation warnings reduced: 141 → 44 (-97 warnings!)

---

### Phase 4: Sass Architecture Modernization *(Ready)*
**Deliverable:** @use modules, proper scoping, no deprecated patterns

**Tasks:**
1. Migrate `_variables.scss` to @use-compatible structure
2. Migrate `_mixins.scss` to @use modules
3. Update all component imports to @use syntax
4. Remove @import statements entirely
5. Test variable override patterns with @use scoping

**Learning Focus:**
- Dart Sass @use vs. @import differences
- Module namespacing strategies
- Scoping implications for user customization

**Success Criteria:**
- 0 @import statements (except in Jekyll frontmatter)
- All variables accessible via `$namespace-variable`
- Build produces 0 Sass deprecation warnings

---

### Phase 6: JavaScript Modernization *(Optional)*
**Deliverable:** Vanilla ES6+ JavaScript, no jQuery, optional lightbox alternative

**Tasks:**
1. Audit jQuery usage in search functionality
   - Understand current search implementation
   - Rewrite with fetch + DOM manipulation

2. Remove jQuery from other JS files
   - Event handlers → `.addEventListener()`
   - DOM selection → `querySelector`
   - DOM manipulation → `textContent`, `classList`

3. Optional: Lightbox replacement decision
   - Native HTML `<dialog>` (simplest, limited)
   - Or remove lightbox feature entirely
   - Or choose lightweight modern library

**Learning Focus:**
- Vanilla JavaScript patterns
- Fetch API for dynamic content
- Modern DOM APIs

**Success Criteria:**
- No jQuery references in code
- Search functionality works without jQuery
- Bundle size reduced
- All interactive features work in modern browsers

---

### Phase 7: Testing & Validation
**Deliverable:** Automated testing, regression detection, CI/CD pipeline

**Tasks:**
1. Set up GitHub Actions workflow
   - Ruby + Bundler setup
   - Jekyll build for all skins
   - CSS diff against baseline
   - Report success/failure

2. CSS regression testing
   - Build all 9 skins
   - Compare generated CSS to baseline
   - Flag unexpected changes

3. Visual regression testing (manual checklist)
   - Check all component styles
   - Verify responsive behavior
   - Test on modern browsers

**Learning Focus:**
- GitHub Actions workflow syntax
- CI/CD pipeline design
- Automated testing for static sites

**Success Criteria:**
- All PRs automatically tested
- CSS regressions caught immediately
- 9 skin variants all pass validation

---

### Phase 7: Documentation & Release
**Deliverable:** Migration guide, release notes, README updates

**Tasks:**
1. Create `MIGRATION_GUIDE.md`
   - For users moving from upstream MM to this fork
   - What changed, why, what they need to update
   - Variable naming changes
   - Layout pattern changes

2. Create `CONTRIBUTING.md`
   - How to work on modernized theme
   - Build process
   - Testing requirements
   - Code style (Sass/JS)

3. Update `README.md`
   - Link to MIGRATION_GUIDE
   - Highlight "Modern" positioning
   - Clear this is fork, not upstream
   - Requirements: Jekyll 4.4+, Dart Sass, GitHub Actions recommended

4. Tag v5.0.0 release
   - Major version bump (breaking changes)
   - Comprehensive release notes
   - Announce fork direction

**Learning Focus:**
- Technical writing for migrations
- Version management & semantics
- Community communication

---

## Key Decisions & Rationale

### Why Remove Magnific Popup?
- **Cost:** Extra vendor code, Sass compilation, unused by most blogs
- **Benefit:** Simpler codebase, no lightbox feature required
- **Alternative:** Users wanting lightbox can add lightweight lib or use `<dialog>`

### Why Replace Susy with CSS Grid?
- **Susy is deprecated:** Unmaintained, no active development
- **CSS Grid is native:** Better performance, no library needed, standard syntax
- **Educational value:** Learn real modern layout techniques, not framework abstractions

### Why Migrate to @use?
- **Dart Sass direction:** @import deprecated, removed in 3.0+
- **Better architecture:** Modules prevent global scope pollution
- **Future-proof:** Aligns with official Sass standard

### Why Keep 9 Skins?
- **Design asset:** Each skin is an independent Sass variant testing our modular architecture
- **Regression detection:** If all 9 skins compile identically, architecture is sound
- **User value:** Different color themes remain supported

---

## Lessons Learned Log

*This section will be updated as we progress through phases.*

### [Phase 1 - Current]
- **Lesson 1:** Legacy vendor coupling is real—Magnific Popup uses parent variables it expects to access globally
- **Lesson 2:** Dart Sass has strict rules (@use before any other code) that forced us to recognize architectural issues
- **Lesson 3:** Maintainer decisions reflect real tradeoffs (compatibility vs. modernization), not laziness
- **Lesson 4:** Theme is "frozen" by design to protect thousands of users on legacy platforms

### [Future lessons to be documented]

---

## Success Criteria (Project Level)

✅ All vendor code removed or replaced
✅ 0 Sass deprecation warnings
✅ All 9 skins build identically to upstream (CSS binary match)
✅ No @import statements in theme code
✅ No jQuery dependencies
✅ GitHub Actions CI/CD pipeline working
✅ Comprehensive documentation for users migrating from upstream
✅ Released as v5.0.0 with clear breaking changes documentation

---

## Repository Structure

```
minimal-mistakes-modern/
├── MODERNIZATION_PLAN.md       ← This document
├── VENDOR_AUDIT.md             ← Phase 1 deliverable
├── BREAKING_CHANGES.md         ← Phase 1 deliverable
├── MIGRATION_GUIDE.md          ← Phase 7 deliverable
├── LESSONS_LEARNED.md          ← Growing document
├── .github/workflows/
│   └── build-and-test.yml      ← Phase 6 deliverable
├── _sass/
│   └── minimal-mistakes/        ← Modernized theme
├── assets/
│   ├── css/
│   ├── js/                      ← Modernized JS
│   └── images/
└── docs/
    └── modernization/           ← Supporting docs
```

---

## Next Steps

1. **Immediately:** Create `VENDOR_AUDIT.md` (Phase 1)
2. **Then:** Document all breaking changes
3. **Then:** Proceed through phases sequentially, testing after each phase
4. **Throughout:** Update LESSONS_LEARNED.md with discoveries and insights

---

*Project initiated: January 3, 2026*
*Framework: Phased modernization with learning focus*
*Target audience: Modern Jekyll users, learning-focused developers*
