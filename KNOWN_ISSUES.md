# Known Issues

## 2026-03-11 - Tab switch route intent can freeze the current tab state

### Status

Fixed in a follow-up change on 2026-03-11 after reproducing it in both horizontal mode and stack mode.

### Summary

When a tab click calls `focusTab()` but does not produce a real URL change, the queued `fromTabSwitch` intent can leak into the next unrelated navigation. The next navigation is then ignored by the route-sync handlers, and the current tab appears to be frozen.

### Confirmed Modes

- Horizontal mode
- Stack mode

Both modes can hit this bug because they both call the same `focusTab()` path:

- `src/extension.tsx`
- `src/stack/components/PageCard.tsx`

### Trigger Condition

The bug requires two actions in sequence:

1. A tab-focus action queues `fromTabSwitch`, but the main window URL does not actually change.
2. A real navigation happens within about 1 second.

The second navigation may come from:

- Clicking a page reference
- Clicking a block reference
- Opening a search result
- Using Roam/browser history navigation

### Reproduction - Horizontal Mode

1. Open page A and make sure tab A is the current active tab.
2. Click tab A again in the horizontal tab bar.
3. Within 1 second, trigger a real navigation to page B, for example by clicking `[[B]]` or opening B from search.
4. Observe that the main window moves to B, but the current tab state can stay on A.

### Reproduction - Stack Mode

1. Open page A and make sure the A card is the current focused card.
2. Click a blank area in the body of the A card.
3. Within 1 second, trigger a real navigation to page B.
4. Observe that the main window moves to B, but the current tab state can stay on A.

### Observed Result

- The main window has already navigated to the new page.
- The current tab metadata does not update.
- The active tab, title, `uid`, or `blockUid` may still point to the previous page.
- In stack mode, the focused card can also appear stuck on the previous page.

This feels like "the current tab is frozen" from the user's perspective.

### Expected Result

`fromTabSwitch` should only suppress the route update caused by the tab switch itself. It should not affect the next unrelated navigation.

### Root Cause

`focusTab()` queues a route intent before `openBlock()`:

- `src/config.tsx`

That queued intent is only cleared when route sync consumes it:

- `src/hooks/useOnUidChangeElementClicked.tsx`

If the first tab click does not cause a real URL change, the intent can survive long enough to be attached to the next navigation. Both route handlers then return early:

- `src/extension.tsx`
- `src/stack/Context.tsx`

### Notes

- This issue has been reproduced manually.
- Based on the current code paths, the issue is confirmed in both horizontal mode and stack mode.
