import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://g2g-services-1.onrender.com";
const DEFAULT_IMAGE = `${SITE_URL}/about-company.png`;

const pages = {
  "/": {
    title:
      "G2G Services | Biometric, Access Control & IT Solutions in Prayagraj",
    description:
      "G2G Services provides biometric attendance, access control, boom barrier, video conferencing, audio conferencing, EPABX, intercom, CCTV, networking and IT infrastructure solutions in Prayagraj (Allahabad) and across India.",
  },

  "/about": {
    title: "About G2G Services | IT & Security Solutions in Prayagraj",
    description:
      "Learn about G2G Services and our expertise in IT infrastructure, networking, biometric attendance, access control, surveillance and security technology solutions in Prayagraj (Allahabad).",
  },

  "/services": {
    title:
      "IT, Biometric, Access Control & Security Services in Prayagraj | G2G Services",
    description:
      "Explore G2G Services for biometric attendance, access control, boom barriers, EPABX, intercom, video conferencing, audio conferencing, CCTV, networking, server and IT infrastructure services in Prayagraj.",
  },

  "/products": {
    title:
      "Biometric, Access Control, CCTV & IT Products | G2G Services Prayagraj",
    description:
      "Browse biometric attendance systems, access control equipment, boom barriers, CCTV cameras, NVR, DVR, networking equipment, servers, storage and other IT products from G2G Services.",
  },

  "/projects": {
    title: "IT & Security Projects | G2G Services Prayagraj",
    description:
      "Explore technology projects delivered by G2G Services including biometric attendance, access control, networking, surveillance, security and IT infrastructure solutions.",
  },

  "/careers": {
    title: "Careers at G2G Services | Technology Team",
    description:
      "View career opportunities at G2G Services in networking, security systems, IT infrastructure, surveillance and technology projects.",
  },

  "/gallery": {
    title: "Project Gallery | G2G Services Prayagraj",
    description:
      "View G2G Services project, installation, technology and security solution images.",
  },

  "/contact": {
    title:
      "Contact G2G Services | IT & Security Services in Prayagraj",
    description:
      "Contact G2G Services for biometric, access control, boom barrier, EPABX, intercom, video conferencing, audio conferencing, CCTV, networking and IT infrastructure requirements.",
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
  let tag = document.head.querySelector(
    `meta[property="${property}"]`
  );

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
    title: "G2G Services | IT & Security Solutions in Prayagraj",
    description:
      "G2G Services provides IT infrastructure, biometric, access control, networking, surveillance and security technology solutions in Prayagraj (Allahabad) and across India.",
  };

  useEffect(() => {
    const cleanPath =
      pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

    const canonicalUrl = `${SITE_URL}${cleanPath}`;

    document.title = page.title;

    setMeta("description", page.description);
    setMeta(
      "robots",
      "index, follow, max-image-preview:large"
    );
    setMeta("theme-color", "#052B35");

    setProperty("og:type", "website");
    setProperty("og:site_name", "G2G Services");
    setProperty("og:title", page.title);
    setProperty("og:description", page.description);
    setProperty("og:url", canonicalUrl);
    setProperty("og:image", DEFAULT_IMAGE);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    setMeta("twitter:image", DEFAULT_IMAGE);

    setCanonical(canonicalUrl);

    const existingSchema = document.getElementById(
      "g2g-local-business-schema"
    );

    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = document.createElement("script");

    schema.id = "g2g-local-business-schema";
    schema.type = "application/ld+json";

    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "G2G Services",
      url: SITE_URL,
      image: DEFAULT_IMAGE,
      logo: `${SITE_URL}/favicon.svg`,
      telephone: "+918896282060",
      description:
        "G2G Services provides biometric attendance, access control, boom barrier, video conferencing, audio conferencing, EPABX, intercom, CCTV, networking and IT infrastructure solutions.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Civil Line",
        addressLocality: "Prayagraj",
        addressRegion: "Uttar Pradesh",
        postalCode: "211001",
        addressCountry: "IN",
      },
      areaServed: [
        {
          "@type": "City",
          name: "Prayagraj",
        },
        {
          "@type": "Place",
          name: "Allahabad",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      serviceType: [
        "Biometric Attendance System",
        "Access Control System",
        "Boom Barrier Installation",
        "Video Conferencing",
        "Audio Conferencing",
        "EPABX Installation",
        "Intercom Installation",
        "CCTV Surveillance",
        "Networking Services",
        "IT Infrastructure Services",
      ],
    });

    document.head.appendChild(schema);

    return () => {
      schema.remove();
    };
  }, [pathname, page.title, page.description]);

  return null;
}

export default SEO;