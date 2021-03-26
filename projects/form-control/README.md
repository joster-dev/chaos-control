# form-control

form-control is an [Angular](https://angular.io/) library with dynamic components that enable type-safe value binding and can be used be utilized inside a form element
- [Repository](https://github.com/joster-dev/form-control)
- [Github Package](https://github.com/joster-dev/form-control/packages/322201)
- [Demo](https://joster-dev.github.io/form-control/)

## getting started
update your `package.json`
```bash
npm install @joster-dev/form-control --save
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

## components

- main
  - `fc-number`
    - `number | null`
  - `fc-text`
    - `string | null`
  - `fc-choice`
    - `primitive | null`
  - `fc-multi-choice`
    - `primitive[] | null`
  - `fc-color`
    - `string | null`
  - `fc-file`
    - `FileList | null`

- utility
  - `fc-button`

- upcoming
  - `fc-select`
  - `fc-multi-select`
  - `fc-date`
  - `fc-date-time`
  - `fc-time`
