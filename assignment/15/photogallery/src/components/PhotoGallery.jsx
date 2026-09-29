import PhotoCard from "./PhotoCard";

function PhotoGallery({ photos, loading, error, onSelect }) {
  if (loading) return <p className="status">Photo load হচ্ছে...</p>;
  if (error) return <p className="status error">Error: {error}</p>;
  if (photos.length === 0)
    return <p className="status">কোনো photo পাওয়া যায়নি। Search বা Album বদলে দেখুন।</p>;

  return (
    <section className="gallery">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onSelect={onSelect} />
      ))}
    </section>
  );
}

export default PhotoGallery;
