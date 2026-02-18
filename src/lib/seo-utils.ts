import { Metadata } from "next";
import { siteConfig } from "@/config/seo";

interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  noindex?: boolean;
}

/**
 * Generate metadata for individual pages
 * Use this function to create page-specific SEO metadata
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  noindex = false,
}: PageSEOProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageImage = image
    ? image.startsWith("http")
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.ogImage}`;
  const pageUrl = url || siteConfig.url;
  const pageKeywords = keywords || siteConfig.keywords;
  const socialTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.socialTitle;
  const socialDescription = description || siteConfig.socialDescription;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: [{ name: author || siteConfig.author.name }],
    openGraph: {
      type,
      locale: "en_US",
      url: pageUrl,
      title: socialTitle,
      description: socialDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} portfolio preview`,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [pageImage],
      creator: siteConfig.social.twitterHandle,
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Generate article metadata for blog posts
 */
export function generateArticleMetadata({
  title,
  description,
  keywords,
  image,
  url,
  publishedTime,
  modifiedTime,
  author,
  section,
}: PageSEOProps): Metadata {
  return generatePageMetadata({
    title,
    description,
    keywords,
    image,
    url,
    type: "article",
    publishedTime,
    modifiedTime,
    author,
    section,
  });
}

/**
 * Validate SEO metadata
 */
export function validateMetadata(metadata: PageSEOProps): {
  valid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Title validation
  if (metadata.title) {
    if (metadata.title.length < 30) {
      warnings.push("Title is shorter than recommended (30-60 characters)");
    }
    if (metadata.title.length > 60) {
      warnings.push("Title is longer than recommended (30-60 characters)");
    }
  }

  // Description validation
  if (metadata.description) {
    if (metadata.description.length < 120) {
      warnings.push(
        "Description is shorter than recommended (120-160 characters)",
      );
    }
    if (metadata.description.length > 160) {
      warnings.push(
        "Description is longer than recommended (120-160 characters)",
      );
    }
  } else {
    errors.push("Description is required");
  }

  // Keywords validation
  if (metadata.keywords) {
    if (metadata.keywords.length < 3) {
      warnings.push("Consider adding more keywords (3-10 recommended)");
    }
    if (metadata.keywords.length > 10) {
      warnings.push("Too many keywords might dilute focus (3-10 recommended)");
    }
  }

  // Image validation
  if (!metadata.image) {
    warnings.push("No custom image specified, using default");
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Get social media share URLs
 */
export function getSocialShareUrls(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=Check%20this%20out:%20${encodedUrl}`,
  };
}

/**
 * Generate breadcrumb list for any page
 */
export function generateBreadcrumbList(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate review/rating schema
 */
export function generateReviewSchema(review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
  };
}

export default {
  generatePageMetadata,
  generateArticleMetadata,
  validateMetadata,
  getSocialShareUrls,
  generateBreadcrumbList,
  generateFAQSchema,
  generateReviewSchema,
};
