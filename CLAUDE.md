# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An Angular 22 workspace publishing **`@joster-dev/chaos-control`** — a library of styled, reactive-forms-ready input controls. It contains two projects:

- `projects/chaos-control` — the publishable library (`projectType: library`, prefix `cc`).
- `projects/demo` — a demo/docs app (prefix `demo`) deployed to GitHub Pages.

## Commands

```bash
ng serve                       # run the demo app at http://localhost:4200
ng test                        # run all unit tests (vitest runner via @angular/build)
ng test chaos-control          # test only the library
ng test demo                   # test only the demo app
ng build chaos-control         # build the library to dist/chaos-control
npm run pages                  # build demo into docs/ for GitHub Pages (sets base-href)
npm run package                # build the lib AND npm-publish it (see caveat below)
```

Tests run on **vitest + jsdom** (configured in `angular.json` per project), not Karma — the README's mention of Karma is stale.

**Publishing caveat:** `npm run package` → `_copy-license` shells out to `pwsh` (PowerShell `Copy-Item`), so the publish flow assumes a Windows/PowerShell environment. On Linux this step fails; copy `LICENSE` into `dist/chaos-control/lib` manually or build with `npm run _build-lib`'s `ng build` step alone.

## Architecture

### Directive inheritance chain (the core abstraction)

Form controls share behavior through directive inheritance rather than composition:

```
BorderRadiusDirective  (borderRadiusLeft/Right inputs)
  └─ ControlDirective  ([ccControl]: required input, isDisabled signal, onTouched/registerOnTouched/setDisabledState)
       └─ ItemDirective ([ccItem]: items/limit/isMultiple, model signal, CVA + validators for key-based controls)
```

- `ControlDirective` carries the disabled/touched/required state common to every control.
- `ItemDirective` adds full `ControlValueAccessor` + validation for controls whose value is one or more `Item.key`s (`ChoiceComponent`, `SelectComponent` extend it).
- Simpler controls (`TextComponent`, etc.) extend `ControlDirective` directly and implement `ControlValueAccessor` themselves.

### ControlValueAccessor wiring pattern

Every control follows the same conventions — match them when adding a control:

- Inject `NgControl` with `{ self: true }` and set `this.ngControl.valueAccessor = this` in the constructor (no `NG_VALUE_ACCESSOR` provider).
- Hold state in a `model` **signal**; `writeValue` coerces/normalizes input (e.g. `''` → `null`) before `model.set`.
- **Validators are set imperatively, not declared.** A constructor `effect()` reads the validation-relevant inputs (`required()`, `minLength()`, …) and calls a private `validate()` that builds a `ValidatorFn[]`, then `ngControl.control?.setValidators(...)` + `updateValueAndValidity()`. This is what repaints validity under zoneless change detection.

### Strict input transforms

Signal `input(..., { transform })` functions **throw `Error` on invalid input** (see `toItems`, `toLimit`, `toLength`, `toPlaceholder`). Inputs validate their own contract at the boundary; preserve this fail-loud style rather than silently coercing.

### Zoneless

The demo uses `provideZonelessChangeDetection()` and components declare `ChangeDetectionStrategy.Eager`. There is no Zone.js — anything relying on automatic change detection from async callbacks won't work; drive updates through signals/effects.

### Module vs standalone

All components/directives are **standalone**. `ChaosControlModule` exists only as a convenience aggregator that imports+exports the public set for legacy consumers; new code should import standalone pieces directly. `public-api.ts` is the published surface and also re-exports `@joster-dev/icon` (`IconComponent`, `IconStackComponent`, `iconTypes`, `icon`).

### Models

`primitive = boolean | number | string`. `Item = { key: primitive; value: string; [x]: unknown }`. The `models/` folder pairs each type with a runtime type-guard (`isItem`, `isItems`, `isNumber`, `isPrimitive`) used by the input transforms.

### Styling

Shared SCSS lives in `projects/chaos-control/src/lib/scss/` and `styles.scss`. Components pull in `'../../styles.scss'` alongside their own `.scss` via `styleUrls`. `ng-package.json` ships the `scss/` folder and top-level `*.scss` as library assets so consumers can import them.
