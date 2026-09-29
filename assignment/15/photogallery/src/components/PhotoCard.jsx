import { useState } from "react";

// jsonplaceholder-এর URL-এর শেষ অংশ হলো color code (যেমন .../600/92c952)
export const colorFromUrl = (url) => "#" + url.split("/").pop();

function PhotoCard({ photo, onSelect }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="card">
      <button className="card-media" onClick={() => onSelect(photo)}>
        {failed ? (
          <div
            className="fallback"
            style={{ background: colorFromUrl(photo.thumbnailUrl) }}
            role="img"
            aria-label={photo.title}
          >
            #{photo.id}
          </div>
        ) : (
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
        <span className="frame-no">{String(photo.id).padStart(3, "0")}</span>
      </button>

      <div className="card-body">
        <h3 className="card-title">{photo.title}</h3>
        <dl className="meta">
          <div>
            <dt>Photo ID</dt>
            <dd>{photo.id}</dd>
          </div>
          <div>
            <dt>Album ID</dt>
            <dd>{photo.albumId}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default PhotoCard;
