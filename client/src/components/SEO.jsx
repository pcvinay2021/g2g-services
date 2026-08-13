import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://g2gservices.in";
const DEFAULT_IMAGE = `${SITE_URL}/about-company.png`;

const pages = {
  "/": {
    title: "G2G Services | IT, Networking, CCTV & Security Solutions",
    description:
      "G2G Services provides IT infrastructure, networking, CCTV surveillance, access control, server, storage and security solutions across India.",
  },
  "/about": {
    title: "About G2G Services | IT & Security Solutions",
    description:
      "Learn about G2G Services and our expertise in IT infrastructure, networking, surveillance, security and technology projects.",
  },
  "/services": {
    title: "IT, Networking & Security Services | G2G Services",
    description:
      "Explore G2G Services for networking, CCTV surveillance, IT infrastructure, access control, server, storage and security solutions.",
  },
  "/products": {
    title: "CCTV, Networking & IT Products | G2G Services",
    description:
      "Browse CCTV cameras, NVR, DVR, networking equipment, servers, storage, access control, biometric and other IT products from G2G Services.",
  },
  "/projects": {
    title: "Projects | G2G Services",
    description:
      "Explore technology projects delivered by G2G Services across IT infrastructure, networking, surveillance and security environments.",
  },
  "/careers": {
    title: "Careers at G2G Services | Join Our Technology Team",
    description:
      "View career opportunities at G2G Services in networking, projects, CCTV surveillance and IT infrastructure.",
  },
  "/gallery": {
    title: "Gallery | G2G Services",
    description:
      "View G2G Services project, technology and solution images.",
  },
  "/contact": {
    title: "Contact G2G Services | IT & Security Solutions",
    description:
      "Contact G2G Services for IT infrastructure, networking, CCTV, surveillance, access control and security technology requirements.",
  },
};

function setMeta(name, content) {
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setProperty(property, content) {
  let tag = document.head.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function SEO() {
  const { pathname } = useLocation();
  const page = pages[pathname] || {
    title: "G2G Services | Technology & Security Solutions",
    description:
      "G2G Services delivers IT, networking, surveillance, security and technology solutions.",
  };

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

    document.title = page.title;
    setMeta("description", page.description);
    setMeta("robots", "index, follow, max-image-preview:large");
    setMeta("theme-color", "#052B35");

    setProperty("og:type", "website");
    setProperty("og:site_name", "G2G Services");
    setProperty("og:title", page.title);
    setProperty("og:description", page.description);
    setProperty("og:url", canonicalUrl);
    setProperty("og:image", DEFAULT_IMAGE);

    setProperty("twitter:card", "summary_large_image");
    setProperty("twitter:title", page.title);
    setProperty("twitter:description", page.description);
    setProperty("twitter:image", DEFAULT_IMAGE);

    setCanonical(canonicalUrl);

    const existingSchema = document.getElementById("g2g-organization-schema");
    if (existingSchema) existingSchema.remove();

    const schema = document.createElement("script");
    schema.id = "g2g-organization-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "G2G Services",
      url: SITE_URL,
      logo: `${SITE_URL}/about-company.png`,
      email: "mailto:info@g2gservices.in",
      telephone: "+91-70800-10039",
      description:
        "IT infrastructure, networking, CCTV surveillance, access control and security technology solutions.",
    });
    document.head.appendChild(schema);

    return () => {
      schema.remove();
    };
  }, [pathname, page.title, page.description]);

  return null;
}

export default SEO;
