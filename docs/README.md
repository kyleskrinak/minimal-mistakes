# Documentation - Minimal Mistakes Modernization

This directory contains comprehensive documentation for the Minimal Mistakes modernization project (v5.0.0+).

---

## Core Documents

### [MODERNIZATION_PLAN.md](MODERNIZATION_PLAN.md)
**Project roadmap and phased approach**
- 7-phase breakdown with deliverables
- Architecture overview (current vs. target)
- Success criteria for each phase
- Timeline and effort estimates
- **Audience:** Project managers, long-term planners

### [DECISIONS.md](DECISIONS.md)
**Architectural decision record**
- Why we removed Magnific Popup
- Why we're removing Breakpoint
- Why we're keeping Susy (for now)
- Historical context (2012 vs. 2024 standards)
- Learning outcomes from each decision
- **Audience:** Architects, contributors, future maintainers

### [VENDOR_AUDIT.md](VENDOR_AUDIT.md)
**Detailed vendor library analysis**
- Susy grid system usage inventory (9 span() calls found)
- Breakpoint media query usage (28 calls mapped)
- Magnific Popup lightbox analysis (removed in Phase 2.1)
- Deprecation warning breakdown
- **Audience:** Developers implementing modernization phases

### [BREAKING_CHANGES.md](BREAKING_CHANGES.md)
**User-facing migration guide**
- What changed and why
- Compatibility matrix
- Migration steps for users switching from upstream MM
- FAQ addressing common concerns
- Support matrix by use case
- **Audience:** Users considering adoption, existing MM users

---

## Quick Reference

**What was removed:**
- ✅ Magnific Popup (Phase 2.1 complete)
- ⏳ Breakpoint (Phase 2.2 ready)
- ⏳ @import statements (Phase 4 planned)

**What was kept:**
- ✅ Susy (will be replaced with CSS Grid in Phase 3)
- ✅ Variables (essential for DRY principle)
- ✅ Breakpoint variables (will be used with native @media)

**Current status:**
- Phase 1: ✅ Complete (audit finished)
- Phase 2.1: ✅ Complete (Magnific Popup removed, docs created)
- Phase 2.2: 🔄 Ready (Breakpoint replacement ready to execute)
- Phase 3-7: ⏳ Planned

---

## Understanding the Modernization

### Why This Matters
Minimal Mistakes uses 2013-era vendor code (Susy, Magnific Popup, Breakpoint). This fork modernizes it to 2024+ patterns while maintaining design integrity.

### Key Principles
1. **Remove unnecessary abstractions** - Breakpoint, jQuery
2. **Use modern standards** - Native CSS @media, CSS Grid, @use modules
3. **Document decisions** - Why we chose to remove/keep things
4. **Test after each phase** - Prevent regressions

### Learning Value
This project teaches:
- Recognizing when libraries become technical debt
- Understanding how standards evolve (Breakpoint 2012 → native 2024)
- Careful refactoring methodology
- Version management for breaking changes

---

## For Different Audiences

### If you're a **User considering adoption:**
- Start with [BREAKING_CHANGES.md](BREAKING_CHANGES.md)
- Check the support matrix for your use case
- Understand what features are gone/changed

### If you're a **Contributor to this fork:**
- Read [DECISIONS.md](DECISIONS.md) for architectural context
- Reference [VENDOR_AUDIT.md](VENDOR_AUDIT.md) for technical details
- Follow [MODERNIZATION_PLAN.md](MODERNIZATION_PLAN.md) for phasing

### If you're **Evaluating for portfolio/learning:**
- [DECISIONS.md](DECISIONS.md) shows engineering judgment
- [MODERNIZATION_PLAN.md](MODERNIZATION_PLAN.md) shows project management
- [VENDOR_AUDIT.md](VENDOR_AUDIT.md) shows technical depth

### If you're the **Fork maintainer:**
- [MODERNIZATION_PLAN.md](MODERNIZATION_PLAN.md) is your roadmap
- [DECISIONS.md](DECISIONS.md) documents choices for future reference
- [VENDOR_AUDIT.md](VENDOR_AUDIT.md) is your technical reference

---

## Project Status

| Phase | Status | Effort | Risk |
|-------|--------|--------|------|
| 1: Assessment | ✅ Complete | 2h | - |
| 2.1: Remove Magnific Popup | ✅ Complete | 1h | ✅ Low |
| 2.2: Replace Breakpoint | 🔄 Ready | 1-2h | ✅ Low |
| 2.3: Susy span() analysis | ⏳ Planned | 2h | ⏳ Medium |
| 3: Replace Susy with CSS Grid | ⏳ Planned | 3-4h | ⏳ Medium |
| 4: Migrate to @use modules | ⏳ Planned | 2-3h | ⏳ Medium |
| 5: Modernize JavaScript | ⏳ Planned | 4-5h | ⏳ Medium |
| 6: Testing & CI/CD | ⏳ Planned | 3h | ✅ Low |
| 7: Release & documentation | ⏳ Planned | 2h | ✅ Low |

---

## Questions?

Each document includes FAQ sections relevant to its audience. Check the appropriate document for your role/question.

---

**Fork:** minimal-mistakes-modernized  
**Target:** Modern Jekyll 4.4+ with Dart Sass  
**Scope:** NOT compatible with legacy GitHub Pages  
**Version:** 5.0.0 (Major breaking changes from upstream MM 4.x)

*Documentation updated: January 3, 2026*
