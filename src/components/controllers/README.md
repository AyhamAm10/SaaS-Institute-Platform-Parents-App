# Controller catalog (parents-app design system)

Every visual primitive lives here. `src/features/**/ui` and `src/app/**` only COMPOSE these (no `View`/`Text`/`Pressable`/`style`/colors there; ESLint enforces it). Import from `@/components/controllers`. All values come from `core/theme` tokens. Spacing keys: `none xs sm md lg xl xxl huge`; radius keys: `none sm md lg xl pill`. Tones: `success warning danger info neutral accent` (`warning` = late = orange family).

Folder shape per controller: `init/` (props, variant maps) · `state/` (only if stateful) · `ui/` (parts) · `<Name>.tsx` (root, compound API) · `index.ts`. Shared internals: `_shared/PressableScale` (spring press 0.97 + haptic).

| Controller | Purpose | Compound parts | Key props (allowed values) | Example |
|---|---|---|---|---|
| layout: `Box Stack Row Grid` | Token-typed layout | none | `gap padding px py pt pb` (space keys), `align` `start center end stretch baseline`, `justify` `start center end between around`, `wrap`, `flex`, `bg`, `solid`/`soft` (tone), `radius`; `Grid columns` | `<Row gap="md" justify="between"><Text/>...</Row>` |
| `Text` | Alexandria text | none | `variant` `display title heading body label caption number`; `tone` `primary secondary muted accent success danger info warning onPrimary ink`; `align` `start center end`; `tabular` `strike` | `<Text variant="title" tone="muted">..</Text>` |
| `Icon` | Duotone Ionicons (outline + faint fill) | none | `name` (see `icon/init`), `size` `xs sm md lg xl`, `tone`, `duotone` | `<Icon name="home" tone="accentSolid" />` |
| `Screen` | Canvas + ambient blobs + safe-area header + scroll column | none | `header`, `ambient` `dawn wave pool glow ember calm login`, `withTabBar`, `onRefresh`, `refreshing`, `canvas` `default ink`, `form` | `<Screen ambient="wave" withTabBar header={<TabHeader/>}>..</Screen>` |
| `AmbientBackground` | 2-3 drifting orange blobs (static on Reduce Motion) | none | `variant` | used by `Screen` |
| `Header` | Top row | none | `title`, `onBack`, `start`, `end` | `<Header title="..." onBack={back} end={<Bell/>} />` |
| `BrandMark` | Institute logo, rounded square | none | `size` `sm lg xl`, `glow` | `<BrandMark size="xl" glow />` |
| `Card` | Surface | `Card.Header`, `Card.Body` | `variant` `glass solid hero tinted`, `tone` (tinted), `padding`, `gap`, `onPress`, `label`, `fill` | `<Card variant="hero" padding="xl">..</Card>` |
| `GlassSurface` | Frosted layer (BlurView + translucent fallback) | none | `strength` `soft strong`, `radius`, `shadow`, `glow` | internal to Card, TabBar, Sheet |
| `HeroStat` | Big ring + legend | `HeroStat.Ring`, `HeroStat.Legend` | Ring: `percent caption suffix label replayKey`; Legend: `items[{key,label,valueText,percent,tone}]` | `<HeroStat><HeroStat.Ring .../><HeroStat.Legend items={..}/></HeroStat>` |
| `Ring` | Gradient-stroke progress ring, sweep + glow | `Ring.Value` (count-up) | `percent`, `size` `sm md lg xl`, `tone` `brand`+tones, `glow`, `replayKey` | `<Ring percent={80} size="lg"><Ring.Value value={80}/></Ring>` |
| `MiniRing` | Small ring with percent text | none | `percent`, `tone`, `size` `sm md` | `<MiniRing percent={72} />` |
| `Sparkline` | Tiny trend with area fill | none | `values` (0-100), `tone` | `<Sparkline values={[40,60,80]} />` |
| `ProgressBar` | Labelled animated bar | none | `label valueText percent tone` | `<ProgressBar label=".." valueText="3" percent={30} tone="danger"/>` |
| `StatTile` | Home grid tile | none | `icon tone title sentence onPress visual` | `<StatTile icon="time" title=".." sentence=".." onPress={go}/>` |
| `IconTile` | Pastel icon square | none | `icon`, `tone`, `size` `sm md lg` | `<IconTile icon="wallet" tone="info" />` |
| `StatusPill` | Tinted status chip | none | `label`, `tone`, `icon`, `large` | `<StatusPill label=".." tone="success" />` |
| `ListItem` | Row: leading, title/subtitle, meta/end/chevron | none | `title subtitle icon tone leading meta end selected unread trailing chevron onPress label` | `<ListItem icon="call" title=".." onPress={f}/>` |
| `SectionHeader` | Title with orange bar + action | none | `title actionLabel onAction` | `<SectionHeader title=".." />` |
| `SegmentedChips` | Horizontal pill tabs | none | `items[{key,label,marker,a11yLabel}] value onChange` | `<SegmentedChips items={i} value={v} onChange={set}/>` |
| `CalendarGrid` | Month grid with status markers | none | `weekdays`, `cells[{key,day,tone,today,label,onPress}]` | `<CalendarGrid weekdays={w} cells={c} />` |
| `Timeline` | Vertical rail | `Timeline.Item` | Item: `tone active last start label` | `<Timeline><Timeline.Item tone="success">..</Timeline.Item></Timeline>` |
| `Button` | Actions | none | `variant` `primary accent ghost danger`, `label icon onPress loading disabled compact` | `<Button label=".." variant="accent" onPress={f}/>` |
| `IconButton` | Round 48pt icon button | none | `icon label onPress variant` `glass ink`, `dot`, `disabled` | `<IconButton icon="notifications" label=".." onPress={f}/>` |
| `Pill` | Glass capsule (child switcher) | none | `label leading onPress a11yLabel` | `<Pill label=".." leading={<Avatar/>} onPress={f}/>` |
| `Avatar` | Initial on soft orange | none | `name`, `size` `sm md lg` | `<Avatar name="..." />` |
| `TextField` | Glass input | none | `label error hint password` + TextInput props | `<TextField label=".." value={v} onChangeText={s}/>` |
| `Toggle` | Switch (orange when on) | none | `value onChange label` | `<Toggle value={v} onChange={s} label=".."/>` |
| `Sheet` | Glass bottom sheet, spring | none | `visible title onClose` | `<Sheet visible={o} title=".." onClose={c}>..</Sheet>` |
| `TabBar` | Floating solid ink dock (active tab = expanding pill with icon + label) + orange action button | none | `items actionLabel actionOpen onAction` (+ tab bar props) | in `features/shell` |
| `EmptyState` | SVG scene + text | none | `art` `calendar bell wallet medal smile rest cloud`, `title hint action` | `<EmptyState art="bell" title=".." />` |
| `ErrorState` | Arabic error + retry | none | `error onRetry` | used by `QueryBoundary` |
| `Skeleton` | Shimmer placeholder | none | `width height round` | `<Skeleton height={16} />` |
| `QueryBoundary` | Loading/error/data switch | none | `query skeleton children(data)` | `<QueryBoundary query={q} skeleton={<S/>}>{(d)=>..}</QueryBoundary>` |
| `Reveal` | Staggered entrance (12px, fade, 60ms) | none | `index replayKey stretch fill` | `<Reveal index={2}>..</Reveal>` |
| `AppRoot` / `BrandSplash` | Root providers / loading splash | none | `children` / `label` | in `features/shell` |

Add a controller: create `controllers/<kebab-name>/`, only the layers it needs, export from its `index.ts` and from `controllers/index.ts`, add a row here. Delete controllers nothing uses.
