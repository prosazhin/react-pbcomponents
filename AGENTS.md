# AGENTS.md

## Язык ответов

- Всегда отвечать **только на русском языке**.
- Не переключаться на английский, если это отдельно не потребовал пользователь в явном виде.

## Назначение репозитория

`pbcomponents` — монорепозиторий UI-библиотеки компонентов `pbcomponents` и playground на Storybook.

## Workspace-структура проекта

### Корень репозитория

- `package.json` — root workspace-конфиг (`workspaces/*`), общие скрипты (`dev`, `build`, `lint`, `format`).
- `package-lock.json` — lockfile npm.
- `README.md` — краткая документация проекта.
- `LICENSE` — лицензия.
- `vercel.json` — конфиг деплоя.
- `.github/` — CI/workflows.
- `.vscode/` — локальные настройки IDE.

### Пакеты

- `workspaces/pbcomponents` — исходники библиотеки компонентов React.

### Playground

- `workspaces/storybook` — Storybook playground для демонстрации компонентов.

---

## Подробно: `workspaces/pbcomponents`

### Основные директории

- `workspaces/pbcomponents/src/assets/`
  - `index.css` (подключение Tailwind с префиксом `pbc` и темы `@prosazhin/pbstyles`)
  - `x-mark-16.svg`
  - `x-mark-20.svg`
- `workspaces/pbcomponents/src/components/`
  - `index.ts` (экспорты компонентов)
  - `helpers/`
  - `shared/`
- `workspaces/pbcomponents/src/hooks/`
- `workspaces/pbcomponents/src/index.ts` (публичная точка входа)
- `workspaces/pbcomponents/src/types.ts` (общие типы пропсов: размеры, цвета, `LinkComponentType` и т.д.)
- `workspaces/pbcomponents/src/vite-env.d.ts`

### Components: helpers

Каждый компонент — отдельная папка с `index.tsx`.

- `workspaces/pbcomponents/src/components/helpers/content/`
- `workspaces/pbcomponents/src/components/helpers/icon/`
- `workspaces/pbcomponents/src/components/helpers/text/`

### Components: shared

Каждый компонент — отдельная папка с `index.tsx`; группы и провайдеры — тоже отдельные папки, а не вложенные файлы.

- `workspaces/pbcomponents/src/components/shared/alert/`
- `workspaces/pbcomponents/src/components/shared/badge/`
- `workspaces/pbcomponents/src/components/shared/button/`
- `workspaces/pbcomponents/src/components/shared/button-group/`
- `workspaces/pbcomponents/src/components/shared/checkbox/`
- `workspaces/pbcomponents/src/components/shared/checkbox-group/`
- `workspaces/pbcomponents/src/components/shared/collapse/`
- `workspaces/pbcomponents/src/components/shared/collapse-group/`
- `workspaces/pbcomponents/src/components/shared/container/`
- `workspaces/pbcomponents/src/components/shared/dialog/`
- `workspaces/pbcomponents/src/components/shared/dialog-provider/` (`index.ts`, `provider.tsx`, `store.ts`, `types.ts`)
- `workspaces/pbcomponents/src/components/shared/dropdown/`
- `workspaces/pbcomponents/src/components/shared/dropdown-item/`
- `workspaces/pbcomponents/src/components/shared/field/`
- `workspaces/pbcomponents/src/components/shared/headline/`
- `workspaces/pbcomponents/src/components/shared/inline-radio/`
- `workspaces/pbcomponents/src/components/shared/inline-radio-group/`
- `workspaces/pbcomponents/src/components/shared/input/`
- `workspaces/pbcomponents/src/components/shared/notification/`
- `workspaces/pbcomponents/src/components/shared/notifications-provider/` (`index.ts`, `provider.tsx`, `store.ts`, `types.ts`)
- `workspaces/pbcomponents/src/components/shared/pbc-provider/` (агрегирующий провайдер)
- `workspaces/pbcomponents/src/components/shared/radio/`
- `workspaces/pbcomponents/src/components/shared/radio-group/`
- `workspaces/pbcomponents/src/components/shared/search/`
- `workspaces/pbcomponents/src/components/shared/select/`
- `workspaces/pbcomponents/src/components/shared/switch/`
- `workspaces/pbcomponents/src/components/shared/tab/`
- `workspaces/pbcomponents/src/components/shared/tabs/`
- `workspaces/pbcomponents/src/components/shared/tag/`
- `workspaces/pbcomponents/src/components/shared/textarea/`

### Hooks

- `workspaces/pbcomponents/src/hooks/use-click-outside.ts`
- `workspaces/pbcomponents/src/hooks/use-controllable-state.ts`
- `workspaces/pbcomponents/src/hooks/use-countdown.ts`
- `workspaces/pbcomponents/src/hooks/use-hover-controllable.ts`
- `workspaces/pbcomponents/src/hooks/use-keydown.ts`
- `workspaces/pbcomponents/src/hooks/use-merge-refs.ts`
- `workspaces/pbcomponents/src/hooks/use-screen-size.ts`

### Цвета и темы

- Цветовые токены приходят из `@prosazhin/pbstyles` (`styles/tailwind/theme.css`), в компонентах используются только семантические имена: `basic-*`, `primary-*`, `secondary-*`, `success-*`, `danger-*` (шкала `50`–`400`), `text-primary` / `text-secondary` / `text-contrast`, `outline-*`. Палитру (`gray-*`, `blue-*` и т.д.) и хардкод цветов в компонентах не использовать.
- Тёмная тема работает через токены: автоматически по `prefers-color-scheme` или принудительно через `data-theme="light" | "dark"` на `<html>` или любом контейнере. В компонентах отдельных dark-классов нет и быть не должно.

---

## Подробно: `workspaces/storybook` (Storybook)

### Storybook-конфиг

- `workspaces/storybook/.storybook/main.ts`
- `workspaces/storybook/.storybook/preview.tsx` (глобальный `PBCProvider`, переключатель темы Light/Dark в тулбаре — ставит `data-theme` на `<html>`)
- `workspaces/storybook/.storybook/manager.js` (синхронизирует оформление Storybook с переключателем темы)
- `workspaces/storybook/.storybook/theme.js` (светлая и тёмная темы оформления Storybook)
- `workspaces/storybook/.storybook/manager-head.html`

### Stories

- `workspaces/storybook/stories/Intro.mdx`

#### Components stories

Одна история на файл: при нескольких `export const` Storybook разворачивает страницу компонента в папку.

- `workspaces/storybook/stories/components/Alert.stories.tsx`
- `workspaces/storybook/stories/components/Badge.stories.tsx`
- `workspaces/storybook/stories/components/Container.stories.tsx`
- `workspaces/storybook/stories/components/Headline.stories.tsx`
- `workspaces/storybook/stories/components/Tag.stories.tsx`
- `workspaces/storybook/stories/components/button/Button.stories.tsx`
- `workspaces/storybook/stories/components/button/Group.stories.tsx`
- `workspaces/storybook/stories/components/checkbox/Checkbox.stories.tsx`
- `workspaces/storybook/stories/components/checkbox/Group.stories.tsx`
- `workspaces/storybook/stories/components/checkbox/Switch.stories.tsx`
- `workspaces/storybook/stories/components/collapse/Collapse.stories.tsx`
- `workspaces/storybook/stories/components/collapse/Group.stories.tsx`
- `workspaces/storybook/stories/components/dialog/Dialog.stories.tsx`
- `workspaces/storybook/stories/components/dialog/DialogProvider.stories.tsx`
- `workspaces/storybook/stories/components/dropdown/Dropdown.stories.tsx`
- `workspaces/storybook/stories/components/dropdown/DropdownItem.stories.tsx`
- `workspaces/storybook/stories/components/field/Field.stories.tsx`
- `workspaces/storybook/stories/components/field/Input.stories.tsx`
- `workspaces/storybook/stories/components/field/Search.stories.tsx`
- `workspaces/storybook/stories/components/field/Select.stories.tsx`
- `workspaces/storybook/stories/components/field/Textarea.stories.tsx`
- `workspaces/storybook/stories/components/inline-radio/Group.stories.tsx`
- `workspaces/storybook/stories/components/inline-radio/InlineRadio.stories.tsx`
- `workspaces/storybook/stories/components/notification/Notification.stories.tsx`
- `workspaces/storybook/stories/components/notification/NotificationsProvider.stories.tsx`
- `workspaces/storybook/stories/components/pbc-provider/PBCProvider.stories.tsx`
- `workspaces/storybook/stories/components/radio/Group.stories.tsx`
- `workspaces/storybook/stories/components/radio/Radio.stories.tsx`
- `workspaces/storybook/stories/components/tabs/Tab.stories.tsx`
- `workspaces/storybook/stories/components/tabs/Tabs.stories.tsx`

#### Helpers stories

- `workspaces/storybook/stories/helpers/Content.stories.tsx`
- `workspaces/storybook/stories/helpers/Icon.stories.tsx`
- `workspaces/storybook/stories/helpers/Text.stories.tsx`

---

## Быстрые команды

### В корне

- `npm run dev` — параллельно библиотека + Storybook.
- `npm run dev:components` — watch-сборка библиотеки.
- `npm run dev:storybook` — запуск Storybook.
- `npm run build` — сборка всего workspace.
- `npm run lint` — линт по всем workspace.

### Библиотека

- `npm run --workspace=pbcomponents dev`
- `npm run --workspace=pbcomponents build`
- `npm run --workspace=pbcomponents lint`

### Storybook playground

- `npm run --workspace=pbcomponents-storybook dev`
- `npm run --workspace=pbcomponents-storybook build`
- `npm run --workspace=pbcomponents-storybook lint`

---

## Автотесты

- В этом репозитории автотесты не ведутся: нет unit/integration/e2e-практики как обязательной части разработки.
- Не предлагать писать автотесты и не добавлять тестовую инфраструктуру в `workspaces/pbcomponents`.
- Для `workspaces/storybook` действует то же правило: не писать и не предлагать автотесты для сторис, конфигов и playground-сценариев.

---

## Правила для агентных правок

- Не ломать публичные экспорты из `workspaces/pbcomponents/src/index.ts`.
- Для новых компонентов добавлять:
  1. папку компонента с `index.tsx` в `src/components/shared/<kebab-name>/` (группа — отдельная папка `<name>-group/`),
  2. экспорт в `src/components/index.ts`,
  3. реэкспорт в `src/index.ts`,
  4. историю в `workspaces/storybook/stories/...`.
- Для провайдеров и сценариев с порталом использовать отдельные demo-истории.
- Поддерживать единый стиль stories: типизация через `Meta`/`StoryObj`, рабочие `args`, валидные `argTypes`.
