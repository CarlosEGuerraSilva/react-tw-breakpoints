# Tailwind Safelist Configuration

When using the `Container` or `Grid` components from `react-tw-breakpoints`, you need to configure Tailwind to include dynamically generated classes.

## The Problem

Tailwind CSS uses static analysis to detect which classes are used in your code. However, the `Container` and `Grid` components generate class names dynamically based on props, which Tailwind cannot detect automatically.

For example:

```tsx
<Grid size={{ xs: 12, md: 6 }} />
```

This generates classes like `basis-full` and `md:basis-6/12`, but Tailwind won't know to include them unless you tell it explicitly.

## The Solution

Use Tailwind v4's `@source inline()` directive to explicitly include the needed classes.

### For Tailwind v4

Add the following to your `app.css` or main CSS file:

```css
@import 'tailwindcss';

@source inline("{ ,}{sm:,md:,lg:,xl:,2xl:}basis-{1/12,2/12,3/12,4/12,5/12,6/12,7/12,8/12,9/12,10/12,11/12,full}");
@source inline("max-w-sm");
@source inline("max-w-md");
@source inline("max-w-lg");
@source inline("max-w-xl");
@source inline("max-w-2xl");
@source inline("max-w-3xl");
@source inline("max-w-4xl");
@source inline("max-w-5xl");
@source inline("max-w-6xl");
@source inline("max-w-7xl");
@source inline("max-w-[1600px]");
@source inline("max-w-[1800px]");
@source inline("basis-full");
```

**Explanation:**

- `{ ,}` generates both with and without prefix (e.g., `basis-*` and `sm:basis-*`)
- `{sm:,md:,lg:,xl:,2xl:}` lists all responsive prefixes
- `basis-{1/12,2/12,...}` lists all fraction values from 1-12
- Individual `max-w-*` classes for Container component
- Arbitrary values for `8xl` and `9xl` sizes

### For Tailwind v3 (Legacy)

If you're still using Tailwind v3, use the `safelist` configuration in `tailwind.config.js`:

```javascript
module.exports = {
  safelist: [
    // Grid basis classes
    'basis-1/12',
    'basis-2/12',
    'basis-3/12',
    'basis-4/12',
    'basis-5/12',
    'basis-6/12',
    'basis-7/12',
    'basis-8/12',
    'basis-9/12',
    'basis-10/12',
    'basis-11/12',
    'basis-full',

    // Responsive Grid basis classes
    {
      pattern: /(sm|md|lg|xl|2xl):basis-(1|2|3|4|5|6|7|8|9|10|11)\/(12)/,
    },
    {
      pattern: /(sm|md|lg|xl|2xl):basis-full/,
    },

    // Container max-width classes
    'max-w-sm',
    'max-w-md',
    'max-w-lg',
    'max-w-xl',
    'max-w-2xl',
    'max-w-3xl',
    'max-w-4xl',
    'max-w-5xl',
    'max-w-6xl',
    'max-w-7xl',
    'max-w-[1600px]',
    'max-w-[1800px]',
    'max-w-full',
  ],
  // ... rest of your config
};
```

## Verification

After adding the safelist configuration:

1. **Rebuild your CSS**: Restart your development server or rebuild your production bundle
2. **Inspect the output**: Check that the classes are present in your compiled CSS
3. **Test the components**: Verify that `Grid` and `Container` display correctly

### Quick Test

```tsx
import { Grid, Container } from 'react-tw-breakpoints';

export function Test() {
  return (
    <Container maxWidth="xl" className="bg-gray-100 py-8">
      <Grid container className="gap-4">
        <Grid size={{ xs: 12, md: 6 }} className="bg-blue-500 h-20" />
        <Grid size={{ xs: 12, md: 6 }} className="bg-green-500 h-20" />
      </Grid>
    </Container>
  );
}
```

If the layout works correctly and colors are visible, the safelist is properly configured.

## Performance Impact

**Is safelisting bad for performance?**

Not significantly. Here's why:

1. **Targeted**: Only includes classes you actually use via these components
2. **Purge-friendly**: Unused responsive variants are still removed in production
3. **Compressed**: Gzip/Brotli compression reduces the impact further
4. **Trade-off**: Small size increase for better developer experience

**Estimated impact**: ~3-5KB additional CSS (before compression)

## Alternative: Avoid Dynamic Classes

If you want to avoid safelisting entirely, use Tailwind classes directly instead of the components:

```tsx
{
  /* Instead of Grid */
}
<div className="flex flex-wrap">
  <div className="basis-full md:basis-6/12">
    <Card />
  </div>
</div>;

{
  /* Instead of Container */
}
<div className="container mx-auto px-2 max-w-xl">
  <Content />
</div>;
```

This approach:

- ✅ No safelist needed
- ✅ Tailwind auto-detects classes
- ❌ More verbose
- ❌ Manual breakpoint management

## Troubleshooting

### Classes Not Applied

**Symptom**: Components render but layout is broken, classes missing in DevTools

**Solution**:

1. Check that safelist is in the correct file (`app.css` for v4, `tailwind.config.js` for v3)
2. Restart your dev server
3. Clear `.next` or `dist` build cache
4. Verify Tailwind version (`npx tailwindcss --help`)

### Arbitrary Values Not Working

**Symptom**: `max-w-[1600px]` classes don't work

**Solution**:

- Ensure arbitrary value support is enabled (default in v3+)
- Check that the exact syntax matches: `max-w-[1600px]` not `max-w-1600px`

### Only Some Breakpoints Work

**Symptom**: `basis-6/12` works but `md:basis-6/12` doesn't

**Solution**:

- Verify all responsive prefixes are included in safelist
- Check for typos in breakpoint names (`2xl` not `xxl`)

### Production Build Issues

**Symptom**: Works in development but broken in production

**Solution**:

1. Ensure safelist is committed to version control
2. Verify build process includes CSS compilation
3. Check that purge/content paths include component files

## Additional Resources

- [Tailwind v4 Documentation](https://tailwindcss.com/docs)
- [Safelist Configuration](https://tailwindcss.com/docs/content-configuration#safelisting-classes)
- [Grid Component API](../api/components.md#grid)
- [Container Component API](../api/components.md#container)

---

**Need Help?**

If you're still having issues, please [open an issue](https://github.com/CarlosEGuerraSilva/react-tw-breakpoints/issues) with:

- Your Tailwind version
- Your safelist configuration
- A minimal reproduction example
