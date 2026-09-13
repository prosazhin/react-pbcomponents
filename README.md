# pbcomponents

[Figma community](https://www.figma.com/community/file/1214486013859546496/pbcomponents) | [Behance](https://www.behance.net/gallery/206064847/pbcomponents)

## prosazhin basic components

UI component library for React with Typescript and Tailwind.

## Installation & Usage

### React

[Preview](https://pbcomponents.vercel.app/?path=/docs/intro--documentation) | [GitHub](https://github.com/prosazhin/pbcomponents/tree/main/workspaces/pbcomponents) | [NPM](https://www.npmjs.com/package/@prosazhin/pbcomponents)

```bash
npm install @prosazhin/pbcomponents
```

```javascript
import { Button } from '@prosazhin/pbcomponents';

const Page = () => (
  <>
    <Button size='m' color='primary' theme='filled' onClick={() => {}}>
      Button
    </Button>
  </>
);
```

### Dark theme

Colors come from [pbstyles](https://github.com/prosazhin/pbstyles) tokens and support light and dark themes. Without any setup the theme follows the system `prefers-color-scheme`. To control it manually, set `data-theme` on `<html>` or on any container:

```html
<html data-theme="dark">
  <div data-theme="light">This block is always light</div>
</html>
```

### Links in Next.js

Components that render as a link when `href` is set (`Button`, `Tab`, `DropdownItem`, `Tag`) accept a `linkComponent` prop to use a custom link, e.g. `next/link`:

```javascript
import NextLink from 'next/link';

<Button href='/about' linkComponent={NextLink}>
  About
</Button>;
```
