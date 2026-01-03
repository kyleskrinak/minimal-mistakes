# Drift Status Report

**Generated:** January 3, 2026  
**Comparison:** `master` (upstream MM 4.27.3) vs `feature/sass-use-modules` (this fork)

---

## Executive Summary

✅ **ZERO DRIFT from upstream master**

Your `master` branch is **identical** to `mmistakes/minimal-mistakes` master (commit ffa59904).  
Your modernization work is isolated in `feature/sass-use-modules` branch.

---

## Branch Comparison

```bash
# Upstream status
origin/master (mmistakes): ffa59904 "Replace private YouTube video"
fork/master (yours):       ffa59904 "Replace private YouTube video" 
                           ↑ IDENTICAL ↑

# Your modernization branch
feature/sass-use-modules:  13 commits ahead of master
                           All changes isolated to Sass files + docs
```

**Result:** You can pull upstream updates anytime with zero conflicts.

---

## What Changed in `feature/sass-use-modules`

### Files Modified (14 Sass files)

**Core Sass files with modernization:**
- `_sass/minimal-mistakes.scss` - Removed vendor imports
- `_sass/minimal-mistakes/_archive.scss` - Susy → percentages
- `_sass/minimal-mistakes/_utilities.scss` - Susy → percentages  
- `_sass/minimal-mistakes/_base.scss` - Breakpoint → @media
- `_sass/minimal-mistakes/_footer.scss` - Breakpoint → @media
- `_sass/minimal-mistakes/_forms.scss` - Breakpoint → @media
- `_sass/minimal-mistakes/_masthead.scss` - Breakpoint → @media
- `_sass/minimal-mistakes/_mixins.scss` - Added math module
- `_sass/minimal-mistakes/_navigation.scss` - Breakpoint → @media
- `_sass/minimal-mistakes/_page.scss` - Breakpoint → @media
- `_sass/minimal-mistakes/_reset.scss` - Breakpoint → @media
- `_sass/minimal-mistakes/_search.scss` - Breakpoint → @media
- `_sass/minimal-mistakes/_sidebar.scss` - Breakpoint → @media

**Vendor files deleted:**
- All Susy files (35 files removed)
- All Magnific Popup files (2 files removed)
- Breakpoint still present (not yet removed from filesystem)

**JavaScript modified:**
- `assets/js/_main.js` - Removed Magnific Popup initialization

**Documentation added:**
- `docs/BREAKING_CHANGES.md`
- `docs/DECISIONS.md`
- `docs/MODERNIZATION_PLAN.md`
- `docs/VENDOR_AUDIT.md`
- `docs/README.md`
- `baseline-build.log`, `main-baseline.css` (testing artifacts)

### Files NOT Modified (100% Compatible)

✅ **Zero changes to:**
- `_config.yml` - Configuration unchanged
- `Gemfile` - Dependencies unchanged
- `minimal-mistakes-jekyll.gemspec` - Gem spec unchanged
- `_layouts/` - All 13 layouts unchanged
- `_includes/` - All 50+ includes unchanged
- `_data/` - All data files unchanged
- All skins (9 color schemes) unchanged
- All Jekyll templates unchanged

---

## Compatibility Assessment

### Your Customizations Will Work With Both

If you have customizations in your site, they're compatible with both upstream MM and this fork IF:

✅ **You're NOT using:**
- Magnific Popup lightbox JavaScript
- Susy grid mixins in custom Sass
- Breakpoint mixin in custom Sass

✅ **You ARE using:**
- Jekyll template overrides → Compatible
- Variable overrides via `_config.yml` → Compatible
- Variable overrides via custom Sass → Compatible
- Custom layouts/includes → Compatible
- Any Jekyll plugins → Compatible
- Custom JavaScript → Compatible (unless it requires Magnific Popup)

### Switching Between Versions

**Upstream MM → This Fork:**
```bash
# In your site's Gemfile
gem "minimal-mistakes-jekyll", github: "kyleskrinak/minimal-mistakes", branch: "feature/sass-use-modules"
bundle update
bundle exec jekyll build
```

**This Fork → Upstream MM:**
```bash
# In your site's Gemfile
gem "minimal-mistakes-jekyll"
bundle update
bundle exec jekyll build
```

Both directions should work with **zero site code changes** (assuming you don't use removed features).

---

## Upstream Update Strategy

### Current Status: Safe to Update

Since your `master` branch is identical to upstream, you can update anytime:

```bash
# Pull latest upstream changes
git fetch origin master
git checkout master
git merge origin/master --ff-only

# Rebase your modernization on top
git checkout feature/sass-use-modules
git rebase master
```

**Conflict risk:** Low - your changes only touch Sass implementation, not templates.

### When to Check for Updates

**Recommended frequency:** Quarterly (every 3 months)

**Check for:**
- Security patches
- Bug fixes to templates/includes
- New features in layouts
- Configuration option additions

**Ignore:**
- Vendor library updates (Susy, Breakpoint, Magnific Popup)
- Changes to removed code

---

## Drift Risk by Category

| Category | Drift Level | Can Merge Upstream? | Notes |
|----------|-------------|---------------------|-------|
| **Jekyll Templates** | 🟢 ZERO | ✅ YES | You haven't touched these |
| **Configuration** | 🟢 ZERO | ✅ YES | _config.yml unchanged |
| **Gem Dependencies** | 🟢 ZERO | ✅ YES | Gemspec unchanged |
| **Layouts/Includes** | 🟢 ZERO | ✅ YES | 100% compatible |
| **Sass Variables** | 🟢 ZERO | ✅ YES | Variable names unchanged |
| **Sass Implementation** | 🟡 MODERATE | ⚠️ MANUAL | You use @media, they use Breakpoint |
| **Grid System** | 🟡 MODERATE | ⚠️ MANUAL | You use %, they use Susy |
| **Lightbox Feature** | 🔴 REMOVED | ❌ NO | Permanently diverged |

---

## Your Customizations Status

To verify your own site's compatibility, check if you use:

**In your `_config.yml`:**
- All standard MM config options → ✅ Compatible

**In your custom Sass (if any):**
- `@import "minimal-mistakes"` → ✅ Compatible
- Variable overrides (`$primary-color: ...`) → ✅ Compatible
- `@include breakpoint()` → ❌ Incompatible with fork
- `@include span()` or `@include gutter()` → ❌ Incompatible with fork

**In your layouts/includes:**
- Any custom layouts → ✅ Compatible
- Any custom includes → ✅ Compatible

**In your JavaScript:**
- Magnific Popup initialization → ❌ Incompatible with fork
- Custom jQuery code → ✅ Compatible (jQuery still present)

---

## Recommendations

### For Maximum Compatibility

**If you want to maintain ability to switch between upstream and fork:**

1. ✅ **Don't use Breakpoint mixin** in your custom Sass
2. ✅ **Don't use Susy mixins** in your custom Sass  
3. ✅ **Don't rely on Magnific Popup** for lightbox
4. ✅ **Do use standard MM variables** - both versions support these
5. ✅ **Do use Jekyll template overrides** - both versions support these

### Current State: Ideal for Testing

Your setup is perfect for:
- Testing this fork vs upstream side-by-side
- Verifying visual parity
- Confirming your site works with both
- Deciding which version to use long-term

---

## Next Steps (Your Choice)

### Option A: Stabilize & Test (Recommended)

1. Build your site with `feature/sass-use-modules`
2. Compare visual output to upstream MM build
3. Test all your customizations work
4. Verify no breakage
5. Decide: keep fork or return to upstream

### Option B: Merge to Master (Release)

1. Thoroughly test `feature/sass-use-modules`
2. Merge to `master` when ready
3. Tag as `v5.0.0`
4. Push to your fork's master
5. Use in production

### Option C: Stay on Upstream

1. Keep using `mmistakes/minimal-mistakes`
2. Keep this fork as learning project
3. No commitment needed

---

## Questions to Answer

Before merging `feature/sass-use-modules` to master:

- [ ] Have you built your site with this branch?
- [ ] Does it look identical to upstream MM build?
- [ ] Do all your customizations work?
- [ ] Are you OK with 44 @import deprecation warnings?
- [ ] Do you need Magnific Popup lightbox? (removed)
- [ ] Can you use Dart Sass / jekyll-sass-converter 3.x?

If all ✅ → Safe to merge and use.

---

**Status:** ✅ Zero drift from upstream. Your fork is a clean superset with isolated modernization changes. You can switch between versions freely (with caveats for removed features).
