# Breaking Changes - Minimal Mistakes Modernized v5.0.0

**Status:** Major version bump (5.0.0) due to architectural breaking changes from upstream MM 4.x

---

## Scope & Compatibility

### ⛔ This Fork Does NOT Support

- **GitHub Pages remote-theme users** - Uses jekyll-sass-converter 3.x (Dart Sass), incompatible with GitHub Pages jekyll-sass-converter 2.x
- **Users without GitHub Actions** - Requires modern CI/CD approach
- **Legacy Ruby Sass** - Dart Sass only (standard since Jekyll 4.1+)
- **Lightbox images** - Magnific Popup removed entirely
- **Susy grid system** - All Susy code removed

### ✅ This Fork REQUIRES

| Requirement | Minimum Version | Reason |
|------------|-----------------|--------|
| Ruby | 3.0+ | Bundler 4+ dependency |
| Jekyll | 4.4+ | Dart Sass support |
| GitHub Actions or local CI | Any | Build validation required |
| Node.js (optional) | 18+ | For future asset pipelines |

### ✅ This Fork IS Designed For

- Users installing theme as **Ruby gem** in `Gemfile`
- Teams using **GitHub Actions** for builds
- Developers who want **modern Sass patterns** (no @import, @use modules)
- Blogs prioritizing **clean, current architecture** over legacy support

---

## Removed Features

### 1. Magnific Popup Lightbox ❌

**What changed:**
- Vendor code deleted: `/vendor/magnific-popup/`
- JavaScript removed: Image popup initialization from `assets/js/_main.js`
- CSS removed: Magnific Popup styling

**Impact:**
- Images no longer open in lightbox overlays
- Images remain clickable → open full-size in new tab/browser default behavior
- ~20 deprecation warnings eliminated

**Migration path:**
- ✅ **Do nothing** - Your blog works fine without lightbox
- 🔄 **Add modern lightbox** - Install lightweight modern library if needed:
  - [pswipejs](https://photoswipe.com/) - modern, touch-friendly
  - [medium-zoom](https://github.com/francoischalifour/medium-zoom) - simple, elegant
  - Browser-native `<dialog>` element (2024+ approach)

**User action required:** None. Feature gracefully removed.

---

### 2. Susy Grid System ❌

**What changed:**
- Vendor code deleted: `/vendor/susy/` (2000+ lines)
- All `@include span()` and `@include gutter()` removed from codebase (0 actual uses found)

**Impact:**
- Susy was imported but never used by the theme
- ~130 deprecation warnings eliminated (slash-division math)
- Zero layout changes (theme never actually used Susy mixins)

**Why removed:**
- Dead code (no theme components referenced Susy)
- Unmaintained library (last update 2020-2021)
- CSS Grid is modern standard (browser native, no library needed)

**User action required:** None. Was already unused.

---

### 3. jQuery Dependency (Partial) ⚠️

**Phase 2 status:** Removed Magnific Popup jQuery code  
**Future phases:** Will migrate remaining jQuery to vanilla ES6+

**Current jQuery usage:**
- Navigation menu (greedy nav)
- TOC sidebar highlighting
- fitVids plugin (responsive video embeds)
- Search toggle

**Deprecation timeline:**
- v5.0 (now): Magnific Popup jQuery removed
- v5.1 (Phase 5): Remaining jQuery → vanilla ES6+
- v5.2 (Phase 5): Optimization for bundle size

**User action required:** None for v5.0. Will be phased gradually.

---

### 4. Sass @import Usage ⚠️ (Deferred to v6.0.0)

**v5.0 state:** Still uses @import (44 deprecation warnings - see "Known Issues" section above)  
**v6.0 future state:** Will migrate to @use modules with breaking changes

**Impact on users:** 
- v5.0: None - @import still functional, warnings non-breaking
- v6.0: Variable override patterns will change (requires migration)

**Why deferred:** @use migration requires architectural refactor affecting 20+ files and would break all existing user customization patterns. See Decision 5 in DECISIONS.md for complete rationale.

---

## Changed Patterns

### Variables & Customization (v5.0 - NO CHANGE)

**Variable override pattern in v5.0 (unchanged from upstream MM):**
```scss
// STILL WORKS in v5.0 (no breaking changes)
$primary-color: #ff0000 !default;
@import "minimal-mistakes";
```

**Future v6.0 pattern (not yet implemented):**
```scss
// NEW (explicit with @use modules)
@use "minimal-mistakes/variables" with (
  $primary-color: #ff0000
);
```

**Or use CSS custom properties** (recommended for end users):
```css
:root {
  --primary-color: #ff0000;
}
```

---

### Media Queries

**Upstream MM pattern:**
```scss
@include breakpoint($large) {
  // responsive styles
}
```

**v5.0+ pattern (native CSS):**
```scss
@media (min-width: $large) {
  // responsive styles
}
```

**Benefit:** Standard CSS syntax, no mixin library needed, more readable.

---

## Deprecation Warnings & Known Issues

### Before v5.0 (Upstream MM 4.x)
```
230+ deprecation warnings during Jekyll build
├── ~130 from Susy slash-division math
├── ~20 from Magnific Popup
├── ~30 from Breakpoint slash-division
├── ~50 from own theme slash-division
└── ~44 from @import usage
```

### After v5.0.0 (This fork - Complete)
```
44 deprecation warnings remaining (EXPECTED)
├── ✅ 0 vendor warnings (all vendors removed)
├── ✅ 0 slash-division warnings (math module implemented)
└── 44 @import warnings (architectural debt - see below)

Result: 81% reduction (230 → 44 warnings)
```

### Known Issue: @import Deprecation Warnings

**Status:** ⚠️ **Accepted for v5.0.0** (deferred to v6.0.0)

v5.0 ships with 44 `@import` deprecation warnings. This is **intentional and documented**.

**Why we're shipping with warnings:**

| Reason | Explanation |
|--------|-------------|
| **Architectural constraint** | Theme relies on @import's global scope behavior across 20+ component files |
| **Breaking changes required** | @use migration would break all user variable customization patterns |
| **Non-critical timing** | Dart Sass 3.0 (removes @import) timeline uncertain - warnings don't break builds |
| **User impact** | Avoiding breaking changes preserves smooth upgrade path for v5.0 users |
| **v6.0 plan** | Full @use/@forward migration with proper breaking change documentation |

**What this means for you:**
- ✅ v5.0 builds successfully (warnings don't prevent compilation)
- ✅ All functionality works perfectly
- ✅ 81% deprecation reduction achieved (186 warnings eliminated)
- ⚠️ Build output shows "44 repetitive deprecation warnings omitted"
- 📝 v6.0.0 will eliminate remaining warnings with @use migration

**See Decision 5 in DECISIONS.md** for complete technical analysis and rationale.

### After v6.0.0 (Future)
```
0 deprecation warnings (target)
├── Full @use/@forward module system
├── New variable override mechanism
└── Dart Sass 3.0 compliant
```

---

## Migration Guide for Upstream MM Users

### If you're currently using MM 4.x

**Choose your path:**

**Option A: Stay on MM 4.x (Upstream)**
- Continue using remote-theme or gem
- Upgrade to GitHub Actions to avoid old jekyll-sass-converter
- Accept deprecation warnings (no breaking changes planned)
- ✅ Fully supported by upstream maintainer
- ❌ Stuck with legacy code architecture

**Option B: Switch to MM-Modernized v5.0**
- **Requirement:** Install as gem (not remote-theme)
- **Requirement:** Use GitHub Actions or local modern Jekyll
- **Requirement:** Accept breaking changes (document customizations)
- ✅ Get modern Sass architecture
- ✅ Get clean deprecation-free builds
- ✅ Get current development patterns
- ❌ Not upstream-compatible (intentional fork)

### Migration Steps (if switching to v5.0)

1. **Update Gemfile:**
   ```ruby
   # Old (upstream MM)
   gem "minimal-mistakes-jekyll"
   
   # New (this fork)
   gem "minimal-mistakes-jekyll", github: "YOUR_FORK_URL"
   ```

2. **Update variable overrides** (if using custom variables):
   ```scss
   # Old way (won't work)
   $primary-color: #ff0000 !default;
   @import "minimal-mistakes";
   
   # New way (use CSS custom properties instead)
   :root {
     --primary-color: #ff0000;
   }
   ```

3. **Test responsive design:**
   - All breakpoints work identically
   - Just no longer using Breakpoint mixin (pure CSS @media now)

4. **Verify image behavior:**
   - Images no longer pop up in lightbox
   - Still clickable (open full-size in new tab)
   - If you need lightbox, install modern library

5. **Run Jekyll with GitHub Actions** (or locally with modern Ruby):
   ```bash
   bundle exec jekyll serve
   ```

---

## Support Matrix

| Use Case | Upstream MM 4.x | MM-Modernized v5.0 |
|----------|---|---|
| GitHub Pages remote-theme | ✅ Supported | ❌ Not supported |
| GitHub Pages with Actions | ⚠️ Warnings | ✅ Full support |
| Gem + modern Jekyll | ✅ Works | ✅ Better support |
| Gem + GitHub Actions | ✅ Works | ✅ Optimal support |
| Local dev (Mac/Linux) | ✅ Works | ✅ Works |
| Customizing variables | ✅ Works (pattern) | ⚠️ Different pattern |
| Lightbox images | ✅ Default feature | ❌ Removed |
| Clean build output | ❌ ~230 warnings | ✅ ~0 warnings (target) |

---

## FAQ

**Q: Will this break my current theme?**  
A: Only if you're using remote-theme on GitHub Pages. If you're using it as a gem, you need to update your custom variable overrides.

**Q: Why remove features I might use (lightbox)?**  
A: Lightbox is an optional enhancement, not essential. Modern approach: users who want it install a lightweight library that fits their needs.

**Q: Can I still customize colors/fonts?**  
A: Yes! Use CSS custom properties (`:root { --variable: value }`). More flexible and doesn't require Sass knowledge.

**Q: What if I need Susy grid for custom layouts?**  
A: Susy was never used by the theme anyway. Use CSS Grid instead (modern, native, better browser support).

**Q: Will there be a v5.1, v5.2?**  
A: Yes! Phases 3-7 will continue modernizing (Sass @use modules, vanilla JS, better testing). Each tagged release with clear migration guide.

**Q: Can I contribute back to upstream MM with these changes?**  
A: No—this is an independent fork. Upstream maintains legacy compatibility intentionally. This fork is for those wanting modern patterns.

---

## Questions or Issues?

This is a **learning project + modernized fork**. If you encounter issues:
1. Check that you meet minimum requirements (Ruby 3.0+, Jekyll 4.4+)
2. Verify GitHub Actions workflow is running
3. Review custom variable overrides (different pattern in v5.0)
4. Open issues with details about your setup

---

*Last updated: January 3, 2026*  
*Version: 5.0.0 (Major breaking changes from upstream MM 4.x)*
