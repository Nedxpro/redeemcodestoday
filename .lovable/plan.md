

## Add Google Site Verification Meta Tag

This is a simple change to add the Google Search Console verification meta tag to your `index.html` file.

### What I'll Do

Add the following meta tag to the `<head>` section of `index.html`:
```html
<meta name="google-site-verification" content="8vFyS0dG0hRHtRE9Kyarfkch9YIzFBBcTOLbfCvcL58" />
```

### File Change

**index.html** - Add the verification tag after the charset meta tag (line 5):

```html
<head>
    <meta charset="UTF-8" />
    <meta name="google-site-verification" content="8vFyS0dG0hRHtRE9Kyarfkch9YIzFBBcTOLbfCvcL58" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    ... rest of head content
</head>
```

### Why This Matters

This verification tag will allow you to:
1. Verify ownership of your site in Google Search Console
2. Request a security review to remove the "Dangerous site" warning
3. Monitor how Google sees and indexes your website

### Next Steps After Implementation

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://redeemcodestoday.lovable.app`
3. Click "Verify" - Google will find the meta tag
4. Once verified, go to Security Issues and request a review

