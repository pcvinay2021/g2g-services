import { useMemo, useState } from "react";
import { FaDownload, FaMagic, FaRedo, FaShareAlt } from "react-icons/fa";
import logo from "../assets/logo/g2g-logo.png";
import "./DailyPoster.css";

const G2G_PROFILE = Object.freeze({
  company: "G2G SERVICES",
  tagline: "Connecting Solutions, Delivering Excellence",
  phone: "+91 70800 10039",
  email: "info@g2gservices.in",
  website: "www.g2gservices.in",
  location: "India",
  logo,
});

const TEMPLATES = [
  { id: "corporate", name: "Corporate", description: "Clean blue-orange business style" },
  { id: "modern", name: "Modern", description: "Bold social-media layout" },
  { id: "minimal", name: "Minimal", description: "Simple premium layout" },
];

const pad = (value) => String(value).padStart(2, "0");

const formatLongDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

function wrapText(ctx, text, maxWidth) {
  const words = text.trim().split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function drawPoster({ format, template, dateText, specialDay, message }) {
  const isStory = format === "story";
  const width = isStory ? 1080 : 1080;
  const height = isStory ? 1920 : 1080;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, width, height);
  if (template === "minimal") {
    bg.addColorStop(0, "#ffffff");
    bg.addColorStop(1, "#eef5ff");
  } else if (template === "modern") {
    bg.addColorStop(0, "#061b3a");
    bg.addColorStop(0.58, "#0b3f78");
    bg.addColorStop(1, "#f26522");
  } else {
    bg.addColorStop(0, "#f7fbff");
    bg.addColorStop(0.72, "#ffffff");
    bg.addColorStop(1, "#eef4ff");
  }
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Decorative brand shapes.
  ctx.globalAlpha = template === "minimal" ? 0.08 : 0.16;
  ctx.fillStyle = "#0b4ea2";
  ctx.beginPath();
  ctx.arc(width * 0.92, height * 0.11, isStory ? 250 : 170, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f26522";
  ctx.beginPath();
  ctx.arc(width * 0.08, height * 0.88, isStory ? 230 : 160, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  const dark = template === "modern" ? "#ffffff" : "#072b62";
  const muted = template === "modern" ? "#d8e6f7" : "#5c6f84";
  const accent = "#f26522";
  const blue = "#0b4ea2";

  // Header / logo.
  const image = new Image();
  image.src = G2G_PROFILE.logo;
  const logoBoxW = isStory ? 420 : 330;
  const logoBoxH = isStory ? 150 : 115;
  const logoX = (width - logoBoxW) / 2;
  const logoY = isStory ? 72 : 48;
  const drawLogo = () => {
    const ratio = image.naturalWidth / image.naturalHeight || 4;
    let dw = logoBoxW;
    let dh = dw / ratio;
    if (dh > logoBoxH) {
      dh = logoBoxH;
      dw = dh * ratio;
    }
    ctx.drawImage(image, (width - dw) / 2, logoY + (logoBoxH - dh) / 2, dw, dh);
  };

  const drawContent = () => {
    drawLogo();

    const top = logoY + logoBoxH + (isStory ? 100 : 55);
    ctx.textAlign = "center";
    ctx.fillStyle = accent;
    ctx.font = `800 ${isStory ? 34 : 28}px Arial`;
    ctx.fillText(dateText.toUpperCase(), width / 2, top);

    ctx.fillStyle = dark;
    ctx.font = `800 ${isStory ? 72 : 55}px Arial`;
    const specialLines = wrapText(ctx, specialDay || "Today's Special", width - 130);
    specialLines.slice(0, 2).forEach((line, i) => {
      ctx.fillText(line, width / 2, top + 100 + i * (isStory ? 82 : 65));
    });

    const messageTop = top + 100 + Math.min(specialLines.length, 2) * (isStory ? 82 : 65) + (isStory ? 80 : 55);
    const boxX = 70;
    const boxW = width - 140;
    const boxH = isStory ? 570 : 350;
    ctx.fillStyle = template === "modern" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.92)";
    ctx.beginPath();
    ctx.roundRect(boxX, messageTop, boxW, boxH, 34);
    ctx.fill();
    ctx.strokeStyle = template === "modern" ? "rgba(255,255,255,0.28)" : "rgba(11,78,162,0.12)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = template === "modern" ? "#ffffff" : blue;
    ctx.font = `700 ${isStory ? 29 : 25}px Arial`;
    ctx.fillText("G2G SERVICES", width / 2, messageTop + 58);

    ctx.fillStyle = template === "modern" ? "#ffffff" : "#25364a";
    ctx.font = `500 ${isStory ? 38 : 31}px Arial`;
    const messageLines = wrapText(ctx, message || "Connecting solutions. Delivering excellence.", width - 210);
    const lineHeight = isStory ? 58 : 47;
    const maxLines = isStory ? 6 : 4;
    messageLines.slice(0, maxLines).forEach((line, i) => {
      ctx.fillText(line, width / 2, messageTop + 125 + i * lineHeight);
    });

    const footerY = height - (isStory ? 125 : 78);
    ctx.fillStyle = template === "modern" ? "rgba(255,255,255,0.18)" : "rgba(11,78,162,0.09)";
    ctx.fillRect(70, footerY - 25, width - 140, 2);
    ctx.fillStyle = muted;
    ctx.font = `600 ${isStory ? 23 : 18}px Arial`;
    ctx.fillText(`${G2G_PROFILE.phone}  •  ${G2G_PROFILE.email}`, width / 2, footerY + 18);
    ctx.fillStyle = template === "modern" ? "#ffffff" : blue;
    ctx.font = `800 ${isStory ? 24 : 20}px Arial`;
    ctx.fillText(G2G_PROFILE.website, width / 2, footerY + 52);

    return canvas;
  };

  if (image.complete && image.naturalWidth) return drawContent();
  return new Promise((resolve) => {
    image.onload = () => resolve(drawContent());
    image.onerror = () => resolve(drawContent());
  });
}

function DailyPoster() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  });
  const [specialDay, setSpecialDay] = useState("");
  const [message, setMessage] = useState("Connecting solutions. Delivering excellence.");
  const [template, setTemplate] = useState("corporate");
  const [format, setFormat] = useState("story");
  const [previewUrl, setPreviewUrl] = useState("");
  const [generating, setGenerating] = useState(false);

  const longDate = useMemo(() => formatLongDate(new Date(`${selectedDate}T12:00:00`)), [selectedDate]);

  const generatePreview = async () => {
    setGenerating(true);
    try {
      const canvas = await drawPoster({
        format,
        template,
        dateText: longDate,
        specialDay,
        message,
      });
      setPreviewUrl(canvas.toDataURL("image/png"));
    } finally {
      setGenerating(false);
    }
  };

  const downloadPoster = async () => {
    setGenerating(true);
    try {
      const canvas = await drawPoster({ format, template, dateText: longDate, specialDay, message });
      const link = document.createElement("a");
      link.download = `G2G-Daily-Poster-${selectedDate}-${format}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setPreviewUrl(link.href);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="daily-poster-page">
      <div className="daily-poster-header">
        <div>
          <span>G2G SERVICES • CONTENT STUDIO</span>
          <h1>Daily Poster Generator</h1>
          <p>Create a branded poster for today's special day, activity or business message.</p>
        </div>
        <div className="daily-poster-badge"><FaShareAlt /> Social Ready</div>
      </div>

      <div className="daily-poster-grid">
        <section className="daily-poster-controls">
          <div className="poster-control-card">
            <div className="poster-card-title"><span>01</span><div><strong>Poster Details</strong><small>These fields control today's design.</small></div></div>
            <label>Date<input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /></label>
            <label>Special Day / Activity<input value={specialDay} onChange={(e) => setSpecialDay(e.target.value)} placeholder="e.g. National Sports Day / CCTV Awareness" /></label>
            <label>Poster Message<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="4" placeholder="Write the main message for the poster..." /></label>
          </div>

          <div className="poster-control-card">
            <div className="poster-card-title"><span>02</span><div><strong>Template</strong><small>Choose the visual style.</small></div></div>
            <div className="poster-template-list">
              {TEMPLATES.map((item) => (
                <button key={item.id} type="button" className={template === item.id ? "selected" : ""} onClick={() => setTemplate(item.id)}>
                  <b>{item.name}</b><small>{item.description}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="poster-control-card">
            <div className="poster-card-title"><span>03</span><div><strong>Output Format</strong><small>Optimized dimensions.</small></div></div>
            <div className="poster-format-switch">
              <button type="button" className={format === "story" ? "selected" : ""} onClick={() => setFormat("story")}>Story <small>1080 × 1920</small></button>
              <button type="button" className={format === "post" ? "selected" : ""} onClick={() => setFormat("post")}>Post <small>1080 × 1080</small></button>
            </div>
          </div>

          <div className="poster-master-profile">
            <div><strong>🔒 G2G Master Profile</strong><span>Locked branding — poster generator uses these details only.</span></div>
            <p>{G2G_PROFILE.company} • {G2G_PROFILE.phone}</p>
            <p>{G2G_PROFILE.email} • {G2G_PROFILE.website} • {G2G_PROFILE.location}</p>
          </div>

          <div className="poster-action-row">
            <button className="poster-primary" type="button" onClick={generatePreview} disabled={generating}><FaMagic /> {generating ? "Generating..." : "Generate Preview"}</button>
            <button className="poster-secondary" type="button" onClick={() => { setSpecialDay(""); setMessage("Connecting solutions. Delivering excellence."); setPreviewUrl(""); }}><FaRedo /> Reset</button>
          </div>
          <button className="poster-download" type="button" onClick={downloadPoster} disabled={generating}><FaDownload /> Download PNG</button>
        </section>

        <section className="daily-poster-preview-section">
          <div className="preview-heading"><div><span>LIVE PREVIEW</span><h2>{format === "story" ? "1080 × 1920 Story" : "1080 × 1080 Post"}</h2></div><small>{longDate}</small></div>
          <div className={`poster-preview-frame ${format}`}>
            {previewUrl ? <img src={previewUrl} alt="G2G daily poster preview" /> : <div className="poster-empty-preview"><img src={G2G_PROFILE.logo} alt="G2G Services" /><strong>Your poster preview will appear here</strong><span>Enter a special day/activity and message, then click Generate Preview.</span></div>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DailyPoster;
