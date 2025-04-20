> 🇸🇦 [اقرأ هذا باللغة العربية](README.ar.md)

## Overview

`eh-tooltip` is a tiny, zero‑dependency Vue 3 directive that makes it super easy to add tooltips anywhere in your app. It supports:

- **String** or **object** binding syntax  
- Eight placement options (`top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`)  
- Optional **clickable** tooltips that stay open until you click outside  
- Tailwind‑friendly styling via `@apply` in the CSS  

---

## Installation

```bash
npm install eh-tooltip
# or
yarn add eh-tooltip
```

---

## Usage

### 1. Register globally

In your main entry (e.g. `main.js`):

```js
import { createApp } from 'vue'
import App from './App.vue'
import EHTooltip from 'eh-tooltip'
import 'eh-tooltip/dist/EH-Tooltip.css'

const app = createApp(App)
app.use(EHTooltip)
app.mount('#app')
```

### 2. Use in templates

```html
<!-- simple string -->
<button v-tooltip="'Save changes'">Save</button>

<!-- with options -->
<span
  v-tooltip="{
    description: 'Back to home page',
    location: 'bottom',
    clickable: true
  }"
>
  Home
</span>
```

---

## Directive API

Pass **either** a string **or** an object to `v-tooltip`:

| Prop         | Type      | Default  | Description                                            |
| ------------ | --------- | -------- | ------------------------------------------------------ |
| `description`| `string`  | —        | The HTML/text to display inside the tooltip            |
| `location`   | `string`  | `null`   | Position relative to the element (see “Placements”)    |
| `clickable`  | `boolean` | `false`  | If `true`, stays open until you click outside          |

### Placements

- `top`  
- `bottom`  
- `left`  
- `right`  
- `top-left`  
- `top-right`  
- `bottom-left`  
- `bottom-right`  

If you omit `location`, the tooltip will follow your mouse cursor (and automatically avoid viewport edges).

---

## Styles & Customization

The bundled CSS lives in `dist/EH-Tooltip.css`. It uses Tailwind’s `@apply` so you can override or extend:

```css
/* e.g. override border radius */
.tooltip-content {
  @apply rounded-lg;
}
```

You can also import the CSS directly in your own stylesheet:

```css
@import 'eh-tooltip/dist/EH-Tooltip.css';
```

---

## Development

1. **Clone** this repo  
2. Run `npm install`  
3. Build locally with `npm run build`  
4. Link into a demo project:  
   ```bash
   npm link
   cd ../your-vue-app
   npm link eh-tooltip
   ```

---

## Contributing

Feel free to open issues, submit PRs, or suggest new features. Please follow the existing code style and add tests/examples where applicable.

---

## License

Released under the [MIT License](LICENSE).

---

## Author

- [Esmail Ebrahim Hamza](https://github.com/EsmailEbrahim)
