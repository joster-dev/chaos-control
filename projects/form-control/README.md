# FormControl

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.0.

## About

Styled customizable components, that enable type-safe value binding. Can be utilized inside a `<form>...</form>` element.

## Contents

- form controls
  - `fc-number`
    - `number | null`
  - `fc-text`
    - `string | null`
  - `fc-choice`
    - `primitive | null`
  - `fc-multi-choice`
    - `primitive[] | null`
  - `fc-color`
    - `hexstring | null`

- utility
  - `fc-button`

- upcoming
  - `fc-select`
  - `fc-multi-select`
  - `fc-date`
  - `fc-date-time`
  - `fc-time`

## Wiki

[Visit the Form Control Resource](https://github.com/joster-dev/form-control)

- definitions
  1. `primitive` = `null | boolean | number | string`
  1. `hexstring` = `string` that passes [`/^[0-9A-Fa-f]{6}$/`](https://regexper.com/#%2F%5E%5B0-9A-Fa-f%5D%7B6%7D%24%2F)
