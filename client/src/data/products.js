const products = [
  {
    id: "camera",
    brand: "CP Plus",
    category: "CCTV Surveillance",
    name: "4MP AI Network Bullet Camera",
    image: "/assets/products/camera.png",
    datasheet: "/assets/datasheets/camera.pdf",

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
    brand: "CP Plus",
    category: "CCTV Surveillance",
    name: "4K Network Video Recorder",
    image: "/assets/products/nvr.png",
    datasheet: "/assets/datasheets/nvr.pdf",

    description:
      "Professional network video recorder designed for centralized IP camera recording and enterprise surveillance systems.",

    features: [
      "4K Video Recording",
      "Multiple IP Camera Support",
      "Remote Monitoring",
      "HDD Storage Support",
      "Smart Search",
      "Network Management"
    ],

    specifications: [
      ["Device Type", "Network Video Recorder"],
      ["Resolution", "4K"],
      ["Recording", "IP Camera"],
      ["Storage", "HDD Supported"],
      ["Connectivity", "Ethernet"],
      ["Brand", "CP Plus"]
    ]
  },

  {
    id: "dvr",
    brand: "CP Plus",
    category: "CCTV Surveillance",
    name: "16 Channel Digital Video Recorder",
    image: "/assets/products/dvr.png",
    datasheet: "/assets/datasheets/dvr.pdf",

    description:
      "Reliable digital video recorder for professional CCTV surveillance systems with centralized recording and monitoring.",

    features: [
      "16 Channel Support",
      "High Definition Recording",
      "Remote Monitoring",
      "HDD Support",
      "Motion Detection",
      "Easy Installation"
    ],

    specifications: [
      ["Device Type", "Digital Video Recorder"],
      ["Channels", "16 Channel"],
      ["Recording", "HD"],
      ["Storage", "HDD Supported"],
      ["Remote Access", "Supported"],
      ["Brand", "CP Plus"]
    ]
  },

  {
    id: "server",
    brand: "Dell",
    category: "IT Infrastructure",
    name: "Enterprise Rack Server",
    image: "/assets/products/server.png",
    datasheet: "/assets/datasheets/server.pdf",

    description:
      "Enterprise-grade rack server designed for virtualization, business applications, databases and data center workloads.",

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
      ["Application", "Enterprise IT"],
      ["Form Factor", "Rack Mount"],
      ["Virtualization", "Supported"],
      ["Management", "Remote Management"],
      ["Brand", "Dell"]
    ]
  },

  {
    id: "switch",
    brand: "Cisco",
    category: "Enterprise Networking",
    name: "Managed Enterprise Network Switch",
    image: "/assets/products/cisco-switch.png",
    datasheet: "/assets/datasheets/cisco-switch.pdf",

    description:
      "Enterprise managed network switch designed for reliable, secure and high-performance business networking environments.",

    features: [
      "Managed Layer-3 Networking",
      "High-Speed Ethernet",
      "VLAN Support",
      "Network Security",
      "Enterprise Reliability",
      "Centralized Management"
    ],

    specifications: [
      ["Device Type", "Managed Network Switch"],
      ["Network", "Enterprise Ethernet"],
      ["Management", "Managed"],
      ["Application", "Enterprise Networking"],
      ["Security", "Network Security Features"],
      ["Brand", "Cisco"]
    ]
  },

  {
    id: "biometric",
    brand: "TimeWatch",
    category: "Access & Attendance",
    name: "Face & Fingerprint Biometric Device",
    image: "/assets/products/biometric.png",
    datasheet: "/assets/datasheets/biometric.pdf",

    description:
      "Advanced biometric attendance and access control solution designed for offices, enterprises and commercial installations.",

    features: [
      "Fingerprint Recognition",
      "Face Recognition",
      "Employee Attendance",
      "Access Control Support",
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
    image: "/assets/products/barrier.png",
    datasheet: "/assets/datasheets/barrier.pdf",

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
      ["Application", "Vehicle Access Control"],
      ["Operation", "Automatic"],
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
    image: "/assets/products/storage.png",
    datasheet: "/assets/datasheets/storage.pdf",

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
    image: "/assets/products/router.png",
    datasheet: "/assets/datasheets/router.pdf",

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
    id: "fire-alarm",
    brand: "G2G Solutions",
    category: "Fire & Safety",
    name: "Addressable Fire Alarm System",
    image: "/assets/products/fire-alarm.png",
    datasheet: "/assets/datasheets/fire-alarm.pdf",

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
    id: "access-control",
    brand: "G2G Services",
    category: "Security",
    name: "Access Control System",
    image: "/assets/products/access-control.png",
    datasheet: "/assets/datasheets/access-control.pdf",

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
    image: "/assets/products/ups.png",
    datasheet: "/assets/datasheets/ups.pdf",

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
    image: "/assets/products/epabx.png",
    datasheet: "/assets/datasheets/epabx.pdf",

    description:
      "Professional IP EPABX and office communication solution for organizations requiring reliable internal voice communication and centralized telephony management.",

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
    image: "/assets/products/laptop.png",
    datasheet: "/assets/datasheets/laptop.pdf",

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
  },
];
export default products;