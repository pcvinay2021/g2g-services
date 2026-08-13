const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// =====================================================
// PATHS
// =====================================================

const ROOT = path.join(__dirname, "..");

const LOGO = path.join(
  ROOT,
  "client",
  "src",
  "assets",
  "logo",
  "g2g-logo.png"
);

const PRODUCTS_DIR = path.join(
  ROOT,
  "client",
  "src",
  "assets",
  "products"
);

const OUTPUT_DIR = path.join(
  ROOT,
  "src",
  "assets",
  "datasheets"
);

// =====================================================
// CREATE OUTPUT FOLDER
// =====================================================

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, {
    recursive: true
  });
}

// =====================================================
// PRODUCT IMAGE MAP
// =====================================================

const imageMap = {
  camera: "camera.png",
  nvr: "nvr.png",
  dvr: "dvr.png",
  server: "server.png",
  switch: "cisco-switch.png",
  biometric: "biometric.png",
  barrier: "barrier.png",
  storage: "storage.png",
  router: "router.png",
  fireAlarm: "fire-alarm.png",
  accessControl: "access-control.png",
  ups: "ups.png",
  epabx: "epabx.png",
  laptop: "laptop.png"
};

// =====================================================
// PRODUCTS
// =====================================================

const products = [

  {
    id: "camera",
    brand: "CP Plus",
    category: "CCTV Surveillance",
    name: "4MP AI Network Bullet Camera",

    description:
      "Professional AI-enabled network bullet camera designed for enterprise security, commercial premises, offices and surveillance applications.",

    features: [
      "4MP High Resolution",
      "AI Smart Video Analytics",
      "IR Night Vision",
      "Weather Resistant Design",
      "Remote Monitoring",
      "Motion Detection"
    ],

    specifications: [
      ["Resolution", "4MP"],
      ["Camera Type", "IP Bullet Camera"],
      ["Night Vision", "IR"],
      ["Connectivity", "IP Network"],
      ["Application", "Indoor / Outdoor"],
      ["Brand", "CP Plus"]
    ]
  },

  {
    id: "nvr",
    brand: "Hikvision",
    category: "Video Recording",
    name: "32 Channel AI Network Video Recorder",

    description:
      "Enterprise-grade network video recorder designed for centralized IP camera recording, monitoring and intelligent surveillance management.",

    features: [
      "32 Channel Network Recording",
      "AI Video Analytics",
      "Remote Monitoring",
      "High Capacity Storage",
      "HD Video Output",
      "Enterprise Surveillance"
    ],

    specifications: [
      ["Device Type", "Network Video Recorder"],
      ["Channels", "32 Channel"],
      ["Recording", "Network IP Cameras"],
      ["Video Output", "HD"],
      ["Application", "CCTV"],
      ["Brand", "Hikvision"]
    ]
  },

  {
    id: "dvr",
    brand: "CP Plus",
    category: "Video Recording",
    name: "AI HD Digital Video Recorder",

    description:
      "Professional HD digital video recorder designed for centralized CCTV recording, monitoring and security management.",

    features: [
      "HD Video Recording",
      "AI Smart Detection",
      "Multiple Camera Support",
      "Remote Monitoring",
      "Motion Detection",
      "Professional Surveillance"
    ],

    specifications: [
      ["Device Type", "Digital Video Recorder"],
      ["Recording", "HD"],
      ["Connectivity", "Network"],
      ["Monitoring", "Remote"],
      ["Application", "CCTV"],
      ["Brand", "CP Plus"]
    ]
  },

  {
    id: "server",
    brand: "Dell",
    category: "Data Center",
    name: "PowerEdge Enterprise Server",

    description:
      "Enterprise rack server designed for virtualization, databases, applications, storage and mission-critical IT infrastructure.",

    features: [
      "Enterprise Performance",
      "Rack Mount Design",
      "Virtualization Ready",
      "High Availability",
      "Remote Management",
      "Data Center Ready"
    ],

    specifications: [
      ["Device Type", "Rack Server"],
      ["Application", "Data Center"],
      ["Virtualization", "Supported"],
      ["Management", "Remote"],
      ["Deployment", "Enterprise"],
      ["Brand", "Dell"]
    ]
  },

  {
    id: "switch",
    brand: "Cisco",
    category: "Enterprise Networking",
    name: "Managed Enterprise Network Switch",

    description:
      "Enterprise managed network switch designed for secure, reliable and high-performance business networking environments.",

    features: [
      "Managed Layer-3 Networking",
      "High-Speed Ethernet",
      "VLAN Support",
      "Network Security",
      "Enterprise Reliability",
      "Centralized Management"
    ],

    specifications: [
      ["Device Type", "Managed Switch"],
      ["Network", "Enterprise Ethernet"],
      ["Management", "Managed"],
      ["Security", "Network Security"],
      ["Application", "Enterprise"],
      ["Brand", "Cisco"]
    ]
  },

  {
    id: "biometric",
    brand: "TimeWatch",
    category: "Access & Attendance",
    name: "Face & Fingerprint Biometric Device",

    description:
      "Advanced biometric attendance and access control solution designed for offices, enterprises and commercial installations.",

    features: [
      "Fingerprint Recognition",
      "Face Recognition",
      "Employee Attendance",
      "Access Control",
      "Fast Authentication",
      "Enterprise Management"
    ],

    specifications: [
      ["Device Type", "Biometric Terminal"],
      ["Authentication", "Face + Fingerprint"],
      ["Application", "Attendance & Access"],
      ["Connectivity", "Network"],
      ["Usage", "Enterprise / Office"],
      ["Brand", "TimeWatch"]
    ]
  },

  {
    id: "barrier",
    brand: "FAAC",
    category: "Entrance Automation",
    name: "Automatic Boom Barrier",

    description:
      "Professional automatic boom barrier solution for controlled vehicle entry and exit at offices, industries, parking areas and secured premises.",

    features: [
      "Automatic Vehicle Access",
      "Fast Barrier Operation",
      "Heavy-Duty Construction",
      "Access Control Integration",
      "Parking Management",
      "Outdoor Installation"
    ],

    specifications: [
      ["Device Type", "Automatic Boom Barrier"],
      ["Operation", "Automatic"],
      ["Application", "Vehicle Access"],
      ["Installation", "Indoor / Outdoor"],
      ["Integration", "Access Control"],
      ["Brand", "FAAC"]
    ]
  },

  {
    id: "storage",
    brand: "Dell",
    category: "Data Center",
    name: "Enterprise Storage Solution",

    description:
      "Enterprise storage solution designed for secure data management, backup, virtualization and high-availability infrastructure.",

    features: [
      "Enterprise Storage",
      "High Availability",
      "Data Protection",
      "Backup Support",
      "Scalable Capacity",
      "Data Center Ready"
    ],

    specifications: [
      ["Device Type", "Enterprise Storage"],
      ["Application", "Data Center"],
      ["Data Protection", "Supported"],
      ["Backup", "Supported"],
      ["Scalability", "Enterprise"],
      ["Brand", "Dell"]
    ]
  },

  {
    id: "router",
    brand: "Cisco",
    category: "Enterprise Networking",
    name: "Enterprise Network Router",

    description:
      "Reliable enterprise routing solution for secure connectivity, branch networking and business infrastructure.",

    features: [
      "Enterprise Routing",
      "Secure Connectivity",
      "WAN Support",
      "Network Management",
      "High Reliability",
      "Business Networking"
    ],

    specifications: [
      ["Device Type", "Enterprise Router"],
      ["Application", "WAN / LAN"],
      ["Connectivity", "Ethernet"],
      ["Management", "Network Management"],
      ["Security", "Supported"],
      ["Brand", "Cisco"]
    ]
  },

  {
    id: "fireAlarm",
    brand: "G2G Solutions",
    category: "Fire & Safety",
    name: "Addressable Fire Alarm System",

    description:
      "Professional fire detection and alarm solution designed for offices, commercial buildings, industries and critical infrastructure.",

    features: [
      "Fire Detection",
      "Smoke Detection",
      "Heat Detection",
      "Alarm Notification",
      "Zone Monitoring",
      "Safety Integration"
    ],

    specifications: [
      ["System Type", "Addressable Fire Alarm"],
      ["Application", "Fire & Safety"],
      ["Detection", "Smoke / Heat"],
      ["Alarm", "Audible & Visual"],
      ["Installation", "Commercial / Industrial"],
      ["Brand", "G2G Solutions"]
    ]
  },

  {
    id: "accessControl",
    brand: "G2G Services",
    category: "Security",
    name: "Access Control System",

    description:
      "Complete access control solution for managing and securing entry points across offices, industries, institutions and commercial premises.",

    features: [
      "Secure Door Access",
      "Card Authentication",
      "Biometric Integration",
      "Exit Management",
      "Access Logs",
      "Centralized Control"
    ],

    specifications: [
      ["System Type", "Access Control"],
      ["Authentication", "Card / Biometric"],
      ["Application", "Security"],
      ["Management", "Centralized"],
      ["Access Logs", "Supported"],
      ["Brand", "G2G Services"]
    ]
  },

  {
    id: "ups",
    brand: "APC",
    category: "Power Protection",
    name: "Online UPS System",

    description:
      "Reliable online UPS solution providing uninterrupted and protected power for servers, networking equipment and critical IT infrastructure.",

    features: [
      "Online Double Conversion",
      "Uninterrupted Power",
      "Battery Backup",
      "Surge Protection",
      "Server Protection",
      "Data Center Ready"
    ],

    specifications: [
      ["Device Type", "Online UPS"],
      ["Application", "IT Infrastructure"],
      ["Protection", "Power & Surge"],
      ["Backup", "Battery Backup"],
      ["Usage", "Server / Network"],
      ["Brand", "APC"]
    ]
  },

  {
    id: "epabx",
    brand: "Enterprise Communication",
    category: "Communication",
    name: "IP EPABX & Office Communication System",

    description:
      "Professional IP EPABX and office communication solution for organizations requiring reliable internal voice communication.",

    features: [
      "IP Telephony Support",
      "Multiple Extensions",
      "Call Transfer",
      "Auto Attendant",
      "Conference Calling",
      "Centralized Management"
    ],

    specifications: [
      ["Device Type", "IP EPABX System"],
      ["Application", "Office Communication"],
      ["Extensions", "Scalable"],
      ["Connectivity", "IP / Network"],
      ["Features", "Call Management"],
      ["Category", "Enterprise Communication"]
    ]
  },

  {
    id: "laptop",
    brand: "HP / Dell / Lenovo",
    category: "IT Products",
    name: "Business Laptop & Desktop Systems",

    description:
      "Business-class laptops and desktop systems for offices, enterprises, educational institutions and professional users.",

    features: [
      "Business Performance",
      "Latest Processors",
      "SSD Storage",
      "Enterprise Security",
      "Professional Design",
      "Warranty Support"
    ],

    specifications: [
      ["Product Type", "Laptop / Desktop"],
      ["Application", "Business / Enterprise"],
      ["Processor", "Multiple Options"],
      ["Storage", "SSD / HDD"],
      ["Operating System", "Windows"],
      ["Brands", "HP / Dell / Lenovo"]
    ]
  }

];

// =====================================================
// GENERATE ONE PDF
// =====================================================

function generatePDF(product) {

  const outputFile = path.join(
    OUTPUT_DIR,
    `${product.id}.pdf`
  );

  const imageFile = imageMap[product.id]
    ? path.join(
        PRODUCTS_DIR,
        imageMap[product.id]
      )
    : null;

  console.log("");
  console.log("------------------------------------------");
  console.log(`Generating: ${product.name}`);
  console.log(`Logo exists: ${fs.existsSync(LOGO)}`);
  console.log(
    `Product image exists: ${
      imageFile
        ? fs.existsSync(imageFile)
        : false
    }`
  );

  const doc = new PDFDocument({
    size: "A4",
    margin: 0
  });

  doc.pipe(
    fs.createWriteStream(outputFile)
  );

  // =================================================
  // BACKGROUND
  // =================================================

  doc
    .rect(0, 0, 595, 842)
    .fill("#FFFFFF");

  // =================================================
  // HEADER
  // =================================================

  doc
    .rect(0, 0, 595, 105)
    .fill("#052B35");

  if (fs.existsSync(LOGO)) {

    doc.image(
      LOGO,
      40,
      18,
      {
        fit: [190, 68]
      }
    );

  }

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor("#FFFFFF")
    .text(
      "ENTERPRISE IT  •  NETWORKING  •  SECURITY  •  AUTOMATION",
      285,
      48,
      {
        width: 270,
        align: "right"
      }
    );

  // =================================================
  // PRODUCT TITLE
  // =================================================

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#00A89D")
    .text(
      product.brand.toUpperCase(),
      40,
      130
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .fillColor("#052B35")
    .text(
      product.name,
      40,
      150,
      {
        width: 515
      }
    );

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#777777")
    .text(
      product.category.toUpperCase(),
      40,
      183
    );

  // =================================================
  // PRODUCT IMAGE
  // =================================================

  doc
    .roundedRect(
      40,
      210,
      515,
      195,
      12
    )
    .fill("#F4F9F9");

  if (
    imageFile &&
    fs.existsSync(imageFile)
  ) {

    try {

      doc.image(
        imageFile,
        95,
        225,
        {
          fit: [405, 165],
          align: "center",
          valign: "center"
        }
      );

    } catch (error) {

      console.log(
        `Image error: ${error.message}`
      );

    }

  }

  // =================================================
  // OVERVIEW
  // =================================================

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#052B35")
    .text(
      "PRODUCT OVERVIEW",
      40,
      430
    );

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#444444")
    .text(
      product.description,
      40,
      454,
      {
        width: 515,
        lineGap: 3
      }
    );

  // =================================================
  // FEATURES
  // =================================================

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#052B35")
    .text(
      "KEY FEATURES",
      40,
      500
    );

  let featureY = 525;

  product.features.forEach(
    (feature) => {

      doc
        .font("Helvetica")
        .fontSize(8.8)
        .fillColor("#333333")
        .text(
          `✓  ${feature}`,
          50,
          featureY
        );

      featureY += 17;
    }
  );

  // =================================================
  // SPECIFICATIONS
  // =================================================

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#052B35")
    .text(
      "TECHNICAL SPECIFICATIONS",
      300,
      500
    );

  let specY = 525;

  product.specifications.forEach(
    ([label, value], index) => {

      const rowHeight = 23;

      doc
        .rect(
          300,
          specY,
          105,
          rowHeight
        )
        .fill(
          index % 2 === 0
            ? "#087F87"
            : "#066E75"
        );

      doc
        .font("Helvetica-Bold")
        .fontSize(7.5)
        .fillColor("#FFFFFF")
        .text(
          label,
          307,
          specY + 7,
          {
            width: 90
          }
        );

      doc
        .rect(
          405,
          specY,
          150,
          rowHeight
        )
        .fill("#F1F7F7");

      doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor("#333333")
        .text(
          value,
          412,
          specY + 7,
          {
            width: 135
          }
        );

      specY += rowHeight;
    }
  );

  // =================================================
  // FOOTER
  // =================================================

  doc
    .rect(
      0,
      755,
      595,
      87
    )
    .fill("#052B35");

  if (fs.existsSync(LOGO)) {

    doc.image(
      LOGO,
      35,
      770,
      {
        fit: [115, 42]
      }
    );

  }

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#FFFFFF")
    .text(
      "Prayagraj, Uttar Pradesh, India",
      180,
      766
    );

  doc
    .text(
      "+91 7080010039",
      180,
      781
    );

  doc
    .text(
      "info@g2gservices.in",
      180,
      796
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(7.5)
    .fillColor("#00C4B3")
    .text(
      "G2G Services • Enterprise Technology Solutions",
      180,
      812
    );

  // =================================================
  // FINISH
  // =================================================

  doc.end();

  console.log(
    `✓ Generated: ${product.id}.pdf`
  );
}


// =====================================================
// GENERATE ALL PRODUCTS
// =====================================================

console.log("");
console.log("==========================================");
console.log(" G2G SERVICES DATASHEET GENERATOR");
console.log("==========================================");

products.forEach(
  generatePDF
);

console.log("");
console.log("==========================================");
console.log(" ALL DATASHEETS GENERATED SUCCESSFULLY");
console.log("==========================================");
console.log("");