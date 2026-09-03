const LOGO_URL =
  "https://cdn.ostad.app/public/upload/2024-03-10T05-11-30.796Z-single-logo.svg";

function OstadLogo({ size = 28, textClass = "text-neutral-900" }) {
  return (
    <a href="https://ostad.app/" className="flex items-center gap-2">
      <img src={LOGO_URL} alt="Ostad" style={{ height: size }} />
      <span className={`text-xl font-bold ${textClass}`}>Ostad</span>
    </a>
  );
}

export default OstadLogo;
