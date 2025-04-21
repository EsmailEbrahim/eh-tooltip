> 🇸🇦 [اقرأ هذا باللغة العربية](README.ar.md)

## Overview

`eh-tooltip` is a tiny, zero‑dependency Vue 3 directive that makes it super easy to add tooltips anywhere in your app. It supports:

- **String** or **object** binding syntax  
- Eight placement options (`top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`)  
- Optional **clickable** tooltips that stay open until you click outside

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
<button v-eh_tooltip="'Save changes'">Save</button>

<!-- with options -->
<span
  v-eh_tooltip="{
    text: 'Back to home page',
    location: 'bottom',
    clickable: true
  }"
>
  Home
</span>
```

### HTML Example
```html
<span v-eh_tooltip="{ html: true, text: '<b>Bold</b> text' }">
  Hover for HTML
</span>
```

---

### Directive API

Pass **either** a string **or** an object to `v-eh_tooltip`:

| Prop           | Type      | Default     | Description                                            |
|----------------|-----------|-------------|--------------------------------------------------------|
| `text`         | `string`  | —           | The HTML/text to display inside the tooltip            |
| `location`     | `string`  | `null`      | Position relative to the element (see “Placements”)    |
| `clickable`    | `boolean` | `false`     | If `true`, stays open until you click outside          |
| `html`         | `boolean` | `false`     | Allow HTML content                                     |
| `background`   | `string`  | `#000000`   | Background color                                       |
| `textColor`    | `string`  | `#FFFFFF`   | Text color                                             |
| `borderColor`  | `string`  | `#000000`   | Border color                                           |
| `darkMode`     | `boolean` | `false`     | Force dark theme                                       |
| `padding`      | `string`  | `8px`       | Tooltip padding                                        |
| `borderRadius` | `string`  | `4px`       | Border radius                                          |
| `maxWidth`     | `string`  | `300px`     | Maximum width                                          |

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

Customize via CSS variables in your global styles. These variables will automatically apply to all tooltips:

```css
:root {
  --eh-tooltip-bg: #2d3748;
  --eh-tooltip-text: #f7fafc;
  --eh-tooltip-border: #4a5568;
}

.dark { /* For dark mode */
  --eh-tooltip-bg-dark: #1a202c;
  --eh-tooltip-text-dark: #f7fafc;
}
```

Or override per-tooltip using props:

```html
<span
  v-eh_tooltip="{
    text: 'Custom colored',
    background: '#4fd1c5',
    textColor: '#1a202c'
  }"
>
  Hover me
</span>
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

---

> **Security Note**  
> When using `html: true`, ensure you sanitize any user-provided content to prevent XSS attacks.
