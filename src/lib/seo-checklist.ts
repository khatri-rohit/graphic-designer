/**
 * SEO Checklist for Portfolio Website
 *
 * Use this checklist before deployment and for regular maintenance
 */

export const SEO_CHECKLIST = {
  preDeployment: {
    technical: [
      "☐ Update siteConfig in /src/config/seo.ts with correct URL",
      "☐ Add social media profile URLs to sameAs array",
      "☐ Configure verification codes (Google, Bing, Yandex)",
      "☐ Update Twitter handle in layout.tsx",
      "☐ Verify all images have alt text",
      "☐ Check all internal links work correctly",
      "☐ Test 404 page functionality",
      "☐ Verify sitemap generates correctly at /sitemap.xml",
      "☐ Check robots.txt is accessible at /robots.txt",
      "☐ Ensure HTTPS is enabled",
      "☐ Test on mobile devices",
      "☐ Run Lighthouse audit (aim for 90+ on all metrics)",
    ],
    content: [
      "☐ Review and optimize page titles (50-60 characters)",
      "☐ Write compelling meta descriptions (150-160 characters)",
      "☐ Ensure H1 tags are unique and descriptive",
      "☐ Check heading hierarchy (H1 → H2 → H3)",
      "☐ Optimize images (compress, proper formats)",
      "☐ Add keywords naturally in content",
      "☐ Update portfolio/experience section regularly",
      "☐ Verify contact form works properly",
    ],
    structuredData: [
      "☐ Validate structured data with Google Rich Results Test",
      "☐ Check Person schema has all details",
      "☐ Verify Organization schema",
      "☐ Test all service schemas",
      "☐ Validate breadcrumb schema",
      "☐ Ensure no schema errors in Search Console",
    ],
    socialMedia: [
      "☐ Test OpenGraph preview on Facebook Debugger",
      "☐ Test Twitter Card on Twitter Card Validator",
      "☐ Verify social sharing images (1200x630px)",
      "☐ Check LinkedIn preview",
      "☐ Test WhatsApp preview",
    ],
  },

  postDeployment: {
    searchConsole: [
      "☐ Add property to Google Search Console",
      "☐ Verify ownership",
      "☐ Submit sitemap.xml",
      "☐ Request indexing for main pages",
      "☐ Set up Bing Webmaster Tools",
      "☐ Submit sitemap to Bing",
      "☐ Monitor crawl errors",
    ],
    analytics: [
      "☐ Set up Google Analytics",
      "☐ Configure goals and conversions",
      "☐ Set up event tracking",
      "☐ Monitor Core Web Vitals",
      "☐ Track 404 errors",
    ],
    performance: [
      "☐ Check PageSpeed Insights scores",
      "☐ Monitor Core Web Vitals",
      "☐ Test on multiple devices",
      "☐ Verify caching is working",
      "☐ Check asset compression",
      "☐ Monitor server response times",
    ],
  },

  monthly: {
    monitoring: [
      "☐ Review Search Console performance",
      "☐ Check for crawl errors",
      "☐ Monitor search rankings",
      "☐ Review click-through rates",
      "☐ Check for broken links",
      "☐ Analyze traffic sources",
      "☐ Review bounce rates",
    ],
    content: [
      "☐ Update portfolio with new work",
      "☐ Refresh experience section",
      "☐ Update services if changed",
      "☐ Review and update keywords",
      "☐ Check competitor websites",
    ],
    technical: [
      "☐ Run Lighthouse audit",
      "☐ Check PageSpeed scores",
      "☐ Verify all forms work",
      "☐ Test on new browsers/devices",
      "☐ Review security headers",
      "☐ Update dependencies",
    ],
  },

  quarterly: {
    audit: [
      "☐ Comprehensive SEO audit",
      "☐ Competitor analysis",
      "☐ Keyword research update",
      "☐ Content gap analysis",
      "☐ Backlink profile review",
      "☐ Technical SEO deep dive",
      "☐ Mobile usability review",
    ],
    updates: [
      "☐ Refresh website copy",
      "☐ Update images and videos",
      "☐ Review and optimize CTAs",
      "☐ Update structured data",
      "☐ Refresh OpenGraph images",
      "☐ Review and update FAQs (if any)",
    ],
  },

  yearly: {
    strategy: [
      "☐ Full website redesign assessment",
      "☐ Comprehensive content strategy review",
      "☐ SEO strategy update",
      "☐ Competitor landscape analysis",
      "☐ New feature planning",
      "☐ Technology stack review",
    ],
  },
};

// Quick validation functions
export const validateSEO = {
  titleLength: (title: string) => {
    const length = title.length;
    if (length < 30) return "⚠️ Title too short (< 30 chars)";
    if (length > 60) return "⚠️ Title too long (> 60 chars)";
    return "✓ Title length optimal";
  },

  descriptionLength: (description: string) => {
    const length = description.length;
    if (length < 120) return "⚠️ Description too short (< 120 chars)";
    if (length > 160) return "⚠️ Description too long (> 160 chars)";
    return "✓ Description length optimal";
  },

  imageAlt: (alt: string) => {
    if (!alt) return "❌ Missing alt text";
    if (alt.length < 5) return "⚠️ Alt text too short";
    if (alt.length > 125) return "⚠️ Alt text too long";
    return "✓ Alt text present";
  },

  url: (url: string) => {
    if (url.includes("_")) return "⚠️ URL contains underscores (use hyphens)";
    if (url.length > 75) return "⚠️ URL too long";
    if (!/^[a-z0-9-/]*$/.test(url)) return "⚠️ URL contains invalid characters";
    return "✓ URL structure good";
  },
};

export default SEO_CHECKLIST;
