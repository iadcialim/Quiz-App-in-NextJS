````markdown
# Research: Improve results and egg-game scoring cards

**Date**: 2025-10-21

## Purpose
Resolve clarifications about scoring formulas and rollout strategy for new scoring logic.

## Findings

- `NEW-QUIZ-SCORING.md` and `NEW-EGG-JUGGLING-SCORING.md` were not present in the repo root. Implementation must either be provided by stakeholders or a default testable formula used until provided.
- Best practice: implement scoring as pure functions in `src/utils/scoring/` to make unit testing straightforward.
- Feature flag approach: use runtime config via environment variable `ENABLE_NEW_SCORING` and, additionally, expose a settings toggle in the UI (persisted in PointsContext or Settings storage) to allow gradual rollout.

## Decisions

- Implement scoring utils as pure functions and test them thoroughly.
- Add environment feature flag `ENABLE_NEW_SCORING` and a UI settings toggle `enableNewScoring` to control behavior.

## Next steps

1. Request or add `NEW-QUIZ-SCORING.md` and `NEW-EGG-JUGGLING-SCORING.md` to repo; otherwise implement default formulas and mark as TODO for stakeholders to verify.
2. Implement scoring util modules and unit tests.
3. Update Results UI and add tests.

````
