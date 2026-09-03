import OstadLogo from "./OstadLogo";

import paymentImage from "./assets/images/ostad-payments image.webp";

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://facebook.com/ostadapp",
    icon:
      "https://cdn.ostad.app/public/upload/2022-11-29T10-22-57.171Z-image12.svg",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ostad_app",
    icon:
      "https://cdn.ostad.app/public/upload/2022-11-29T10-26-20.794Z-image13.svg",
  },
  {
    name: "Youtube",
    href:
      "https://www.youtube.com/channel/UCs5ytUqwsRy1zPGRElhZ38Q",
    icon:
      "https://cdn.ostad.app/public/upload/2022-11-29T10-29-50.991Z-image5.svg",
  },
  {
    name: "LinkedIn",
    href:
      "https://www.linkedin.com/company/ostad-inc",
    icon:
      "https://cdn.ostad.app/public/upload/2024-05-21T04-59-24.972Z-LinkedIn.webp",
  },
];

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="font-semibold text-neutral-900 mb-3">
        {title}
      </h4>

      <ul className="space-y-2 text-sm text-neutral-600">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href || "#"}
              className="hover:text-neutral-900 hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-[#FFFBEB] border-t border-neutral-200 pt-10 pb-6 px-4">

      {/* Footer Main Content */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <OstadLogo size={26} />

          <p className="text-sm text-neutral-600 mt-3 max-w-[220px]">
            অনলাইন লাইভ স্কিল ডেভেলপমেন্ট প্ল্যাটফর্ম।
          </p>

          {/* Download App */}
          <p className="text-sm font-medium text-neutral-800 mt-4 mb-2">
            ডাউনলোড করুন ওস্তাদ অ্যাপ
          </p>

          <div className="flex gap-2 mb-4">
            <div className="w-20 h-10 rounded-md bg-neutral-900 flex items-center justify-center text-white text-xs">
              ▶ Google
            </div>

            <div className="w-20 h-10 rounded-md bg-neutral-900 flex items-center justify-center text-white text-xs">
               App
            </div>

            <div className="w-20 h-10 rounded-md bg-neutral-900 flex items-center justify-center text-white text-xs">
              ⊞ Windows
            </div>
          </div>

          {/* Social Media */}
          <p className="text-sm font-medium text-neutral-800 mb-2">
            কমিউনিটির সাথে কানেক্টেড থাকতে
          </p>

          <div className="flex gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-white border border-neutral-200 flex items-center justify-center"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-4 h-4 object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <FooterColumn
          title="কুইক লিংক"
          items={[
            {
              label: "আপকামিং লাইভ ব্যাচ",
              href: "https://ostad.app/courses",
            },
            {
              label: "ফ্রি কোর্সসমূহ",
              href: "https://ostad.app/learn-free",
            },
            {
              label: "লাইভ ওয়ার্কশপ",
              href: "https://ostad.app/workshops",
            },
            {
              label: "AI Academy (Robi & Cirkle)",
              href: "https://ostad.app/bdapps",
            },
            {
              label: "ইন্সট্রাক্টর হিসেবে জয়েন করুন",
              href: "https://ostad.app/apply-as-instructor",
            },
          ]}
        />

        {/* Contact */}
        <FooterColumn
          title="যোগাযোগ"
          items={[
            {
              label: "support@ostad.app",
            },
            {
              label:
                "Ka-6/a, Navana Sylvania, Baridhara Road, Nadda, Gulshan-2, Dhaka-1212",
            },
          ]}
        />

        {/* Company */}
        <FooterColumn
          title="কোম্পানি"
          items={[
            {
              label: "আমাদের সম্পর্কে",
              href: "https://ostad.app/about-us",
            },
            {
              label: "রিফান্ড পলিসি",
              href: "https://ostad.app/refund-policy",
            },
            {
              label: "প্রাইভেসী পলিসি",
              href: "https://ostad.app/privacy-policy",
            },
            {
              label: "টার্মস এবং শর্তাবলী",
              href: "https://ostad.app/terms-and-conditions",
            },
          ]}
        />
      </div>

      {/* Payment Image - Last Position */}
      <div className="mx-auto max-w-7xl mt-8 pt-4 border-t border-neutral-200">
        <img
          src={paymentImage}
          alt="Ostad Payment Methods"
          className="w-full h-auto object-contain"
        />
      </div>

    </footer>
  );
}

export default Footer;