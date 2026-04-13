import { useEffect, useRef, useState } from "react";

const INSTAGRAM_DM_LINK = "https://www.instagram.com/direct/new/?username=celite.in";

const templates = [
  {
    id: 1,
    title: "Pavazhamalli Style Save Date Template",
    description: "Elegant save-the-date style with refined wedding aesthetics.",
    thumbnail:
      "https://preview.celite.in/preview/thumbnail/video-templates/after-effects/save-date/pavazhamalli-style-save-date-template/pavazhamalli-style-save-date-template.jpg",
    video:
      "https://preview.celite.in/preview/video/video-templates/after-effects/save-date/pavazhamalli-style-save-date-template/pavazhamalli-style-save-date-template.mp4",
    tags: ["16:9", "After Effects", "Save Date"],
  },
  {
    id: 2,
    title: "Eternal Bloom Wedding Invitation Template",
    description: "Soft floral-themed wedding invitation with premium transitions.",
    thumbnail:
      "https://preview.celite.in/preview/thumbnail/video-templates/after-effects/wedding-template/eternal-bloom-wedding-invitation-template/eternal-bloom-wedding-invitation-template.jpg",
    video:
      "https://preview.celite.in/preview/video/video-templates/after-effects/wedding-template/eternal-bloom-wedding-invitation-template/eternal-bloom-wedding-invitation-template.mp4",
    tags: ["16:9", "After Effects", "Wedding"],
  },
  {
    id: 3,
    title: "Elegant Wedding Invitation Slideshow",
    description: "Classic slideshow storytelling for memorable wedding moments.",
    thumbnail:
      "https://preview.celite.in/preview/thumbnail/video-templates/after-effects/wedding-template/elegant-wedding-invitation-slideshow/elegant-wedding-invitation-slideshow.jpg",
    video:
      "https://preview.celite.in/preview/video/video-templates/after-effects/wedding-template/elegant-wedding-invitation-slideshow/elegant-wedding-invitation-slideshow.mp4",
    tags: ["16:9", "After Effects", "Slideshow"],
  },
  {
    id: 4,
    title: "Celite Save Date Template",
    description: "Signature Celite style crafted for modern save-the-date invites.",
    thumbnail:
      "https://preview.celite.in/preview/thumbnail/video-templates/after-effects/save-date/celite-save-date-template/celite-save-date-template.jpg",
    video:
      "https://preview.celite.in/preview/video/video-templates/after-effects/save-date/celite-save-date-template/celite-save-date-template.mp4",
    tags: ["16:9", "After Effects", "Save Date"],
  },
  {
    id: 5,
    title: "Cinematic Save Date Template",
    description: "Cinematic motion style with dramatic romance-focused visuals.",
    thumbnail:
      "https://preview.celite.in/preview/thumbnail/video-templates/cinematic-save-date-template/cinematic-save-date-template.jpg",
    video:
      "https://preview.celite.in/preview/video/video-templates/after-effects/save-date/cinematic-save-date-template/cinematic-save-date-template.mp4",
    tags: ["16:9", "After Effects", "Cinematic"],
  },
  {
    id: 6,
    title: "Classic Save Date Template",
    description: "Traditional wedding storytelling template in vertical format.",
    thumbnail:
      "https://preview.celite.in/preview/thumbnail/video-templates/after-effects/wedding-template/classic-save-date-template/classic-save-date-template.jpg",
    video:
      "https://preview.celite.in/preview/video/video-templates/after-effects/wedding-template/classic-save-date-template/classic-save-date-template.mp4",
    tags: ["9:16 Source", "After Effects", "Classic"],
    sourceAspect: "9:16",
  },
];

function TemplateCard({ template, onOpenPreview }) {
  const videoRef = useRef(null);

  const handleHoverStart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  };

  const handleHoverEnd = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <article
      className="template-card"
      role="button"
      tabIndex={0}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
      onClick={() => onOpenPreview(template)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenPreview(template);
        }
      }}
    >
      <div className="media-frame">
        <img
          src={template.thumbnail}
          alt={`${template.title} thumbnail`}
          className={`thumb-image ${template.sourceAspect === "9:16" ? "portrait-source" : ""}`}
        />
        <video
          ref={videoRef}
          className={`hover-video ${template.sourceAspect === "9:16" ? "portrait-source" : ""}`}
          src={template.video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${template.title} video preview`}
        />
      </div>

      <div className="card-content">
        <h2>{template.title}</h2>
        <p>{template.description}</p>
        <div className="tag-list">
          {template.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <a
        className="more-info-btn"
        href={INSTAGRAM_DM_LINK}
        target="_blank"
        rel="noreferrer noopener"
        onClick={(event) => event.stopPropagation()}
      >
        Message on Instagram
      </a>
    </article>
  );
}

export default function App() {
  const [activeTemplate, setActiveTemplate] = useState(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveTemplate(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-top">
          <div className="brand">
            <img src="/celite-logo.png" alt="Celite Agency logo" className="brand-logo" />
            <div>
              <p className="label">Celite Agency</p>
              <h1>Wedding Invitation Showcase</h1>
            </div>
          </div>
        </div>
        <p className="subtitle">
          Premium wedding invitation templates in a high-end editor theme. Hover any thumbnail to play
          preview and click to message us directly on Instagram.
        </p>
      </header>

      <section className="template-grid" aria-label="Template showcase grid">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} onOpenPreview={setActiveTemplate} />
        ))}
      </section>

      {activeTemplate ? (
        <div
          className="preview-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeTemplate.title} preview`}
          onClick={() => setActiveTemplate(null)}
        >
          <div className="preview-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="preview-close"
              type="button"
              aria-label="Close preview"
              onClick={() => setActiveTemplate(null)}
            >
              X
            </button>
            <video
              className={`preview-video ${activeTemplate.sourceAspect === "9:16" ? "portrait-source" : ""}`}
              src={activeTemplate.video}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
