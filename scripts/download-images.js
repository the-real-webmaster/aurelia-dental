/**
 * Downloads curated Unsplash images for Aurelia Dental portfolio site.
 * Run: node scripts/download-images.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const OUT = path.join(__dirname, "..", "assets", "images");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const images = {
  "hero-clinic.jpg": "photo-1588776814546-1ffcf47267a5?w=1800&h=1200&fit=crop&q=85",
  "hero-detail.jpg": "photo-1527613426441-4da17471b66d?w=1400&h=900&fit=crop&q=85",
  "service-veneers.jpg": "photo-1629909613654-28e377c37b09?w=1000&h=1250&fit=crop&q=85",
  "service-implants.jpg": "photo-1579684385127-1ef15d508118?w=1000&h=1250&fit=crop&q=85",
  "service-whitening.jpg": "photo-1582750433449-648ed127bb54?w=1000&h=1250&fit=crop&q=85",
  "service-ortho.jpg": "photo-1516549655169-df83a0774514?w=1000&h=1250&fit=crop&q=85",
  "service-therapy.jpg": "photo-1629909613654-28e377c37b09?w=1000&h=1250&fit=crop&q=85",
  "service-hygiene.jpg": "photo-1527613426441-4da17471b66d?w=1000&h=700&fit=crop&q=85",
  "service-crowns.jpg": "photo-1629909613654-28e377c37b09?w=1000&h=700&fit=crop&q=85",
  "portrait-editorial.jpg": "photo-1494790108377-be9c29b29330?w=900&h=1125&fit=crop&q=85",
  "doctor-volkov.jpg": "photo-1612349317150-e413f6a5b16d?w=800&h=1000&fit=crop&q=85",
  "doctor-morozova.jpg": "photo-1594824476967-48c8b964273f?w=800&h=1000&fit=crop&q=85",
  "doctor-sokolov.jpg": "photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop&q=85",
  "doctor-petrova.jpg": "photo-1551836022-d5d88e9218df?w=800&h=1000&fit=crop&q=85",
  "doctor-orlov.jpg": "photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop&q=85",
  "doctor-ivanova.jpg": "photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&q=85",
  "clinic-reception.jpg": "photo-1588776814546-1ffcf47267a5?w=1200&h=1600&fit=crop&q=85",
  "clinic-waiting.jpg": "photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&q=85",
  "clinic-treatment.jpg": "photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop&q=85",
  "clinic-light.jpg": "photo-1588776814546-1ffcf47267a5?w=1400&h=700&fit=crop&q=85",
  "clinic-architecture.jpg": "photo-1516549655169-df83a0774514?w=900&h=1125&fit=crop&q=85",
  "clinic-equipment.jpg": "photo-1579684385127-1ef15d508118?w=900&h=600&fit=crop&q=85",
  "clinic-detail.jpg": "photo-1527613426441-4da17471b66d?w=900&h=600&fit=crop&q=85",
  "clinic-corridor.jpg": "photo-1516549655169-df83a0774514?w=900&h=600&fit=crop&q=85",
  "contact-space.jpg": "photo-1588776814546-1ffcf47267a5?w=1200&h=675&fit=crop&q=85",
  "tech-surgery.jpg": "photo-1579684385127-1ef15d508118?w=1400&h=900&fit=crop&q=85",
  "tech-scanner.jpg": "photo-1582750433449-648ed127bb54?w=900&h=600&fit=crop&q=85",
  "tech-room.jpg": "photo-1629909613654-28e377c37b09?w=900&h=600&fit=crop&q=85",
  "journal-1.jpg": "photo-1516549655169-df83a0774514?w=1200&h=800&fit=crop&q=85",
  "journal-2.jpg": "photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop&q=85",
  "journal-3.jpg": "photo-1582750433449-648ed127bb54?w=800&h=500&fit=crop&q=85",
  "journal-4.jpg": "photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop&q=85",
  "journal-5.jpg": "photo-1629909613654-28e377c37b09?w=800&h=500&fit=crop&q=85",
  "journal-6.jpg": "photo-1588776814546-1ffcf47267a5?w=800&h=500&fit=crop&q=85",
  "gallery-3.jpg": "photo-1527613426441-4da17471b66d?w=800&h=1000&fit=crop&q=85",
  "gallery-4.jpg": "photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop&q=85",
  "gallery-smile.jpg": "photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop&q=85",
  "gallery-tools.jpg": "photo-1629909613654-28e377c37b09?w=800&h=1000&fit=crop&q=85",
  "consultation.jpg": "photo-1582750433449-648ed127bb54?w=1200&h=800&fit=crop&q=85",
  "ba-case.jpg": "photo-1629909613654-28e377c37b09?w=1200&h=900&fit=crop&crop=faces&q=85"
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "AureliaDental/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error("HTTP " + res.statusCode + " for " + url));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

async function download(name, query) {
  const url = "https://images.unsplash.com/" + query;
  const dest = path.join(OUT, name);
  const buf = await fetchUrl(url);
  if (buf.length < 2048) {
    throw new Error("file too small (" + buf.length + " bytes), likely not an image");
  }
  fs.writeFileSync(dest, buf);
  return name;
}

(async () => {
  const entries = Object.entries(images);
  console.log("Downloading " + entries.length + " images…");
  let ok = 0;
  for (const [name, query] of entries) {
    try {
      await download(name, query);
      const size = fs.statSync(path.join(OUT, name)).size;
      console.log("✓", name, "(" + Math.round(size / 1024) + " KB)");
      ok += 1;
    } catch (e) {
      console.error("✗", name, e.message);
    }
  }
  console.log("Done.", ok + "/" + entries.length, "ok");
})();
