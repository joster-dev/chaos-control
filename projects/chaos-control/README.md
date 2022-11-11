# Chaos Control Library

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0.
<!-- - provide accessible components to 
  - visual indication for validity
- visual and utility components
  - consistent style -->
<!-- - styled print view -->
<!-- - readonly  -->

> [Repository](https://github.com/joster-dev/chaos-control)

> [Github Package](https://github.com/joster-dev/chaos-control/packages/TODO)

> [Demo](https://joster-dev.github.io/chaos-control/)

## Getting Started
update your `package.json`
```bash
npm install @joster-dev/chaos-control --save
```
import the module
```diff
+ import { FormControlModule } from '@joster-dev/form-control';

@NgModule({
  imports: [
+    FormControlModule
  ],
})
```
## `fc-button` utility component
to handle click events in an accessible manner
- style: outset border
### inputs
- `isActive: boolean = false`
  - style: inset border
- `isDisabled: boolean = false`
  - style: solid border
  - when disabled, button will not be tab indexable
- `isValid: boolean = true`
- `type: 'button' | 'submit' = 'button'`
- `borderRadiusLeft: boolean = true`
- `borderRadiusRight: boolean = true`
### outputs
- `onBlur` emits `FocusEvent` 
- `onClick` emits `MouseEvent`
## `fc-readonly` utility component
to display information alongside controls
### inputs
- `model: string`
## `fc-text` control component
result will be `string | null`
- if line break or overflow
  - height increases
- if cleared by the user or form
  - height resets
## `fc-number` control component
result will be `number | null`
- if user enters `e` character
  - will not change
- if user enters `.` character
  - if `[step]` is `>= 1`
    - will not change
## `fc-choice` control component
to ask the user to choose from a few items

result will be `<item-key>[] | <item-key> | null`
  - where `<item-key>` is the `key` property of the `items` input
### inputs
- `isMultiple: boolean = false`
- `items: { key: boolean | number | string, value: string }[] = []`
## `fc-color` control component
result will be `string | null`
- `string` result matches [`/^[0-9a-fA-F]{6}$/`](https://regexper.com/#%2F%5E%5B0-9a-fA-F%5D%7B6%7D%24%2F)
##  `fc-file` control component
result will be `FileList | null`

## `fc-select` control component
to ask the user to choose from many items
- `items: { key: boolean | number | string, value: string }[] = []`
<!-- ## `fc-select` component -->
<!-- ## `fc-multi-select` component -->
<!-- ## `fc-date` component -->
<!-- ## `fc-date-time` component -->
<!-- ## `fc-time` component -->
