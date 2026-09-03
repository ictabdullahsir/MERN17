import {
  Search,
  ChevronDown,
  ArrowRight,
  Download,
  Megaphone,
} from "lucide-react";
import OstadLogo from "./OstadLogo";

function Header() {
  return (
    <header className="w-full bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <OstadLogo />

        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="flex items-center w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-400">
            <Search size={16} className="mr-2 shrink-0" />
            <span>কোর্স সার্চ করুন</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-3 text-sm font-medium text-neutral-700">
          <span className="bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold">9.9 অফার</span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Megaphone size={14} className="text-pink-500" /> জব সাক্সেস
          </span>
          <span className="whitespace-nowrap">ফ্রি কোর্সেস</span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Download size={14} /> ডাউনলোড <ChevronDown size={14} />
          </span>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1 text-sm text-neutral-600">EN</span>
          <span className="hidden sm:flex items-center gap-1 text-sm bg-neutral-100 px-3 py-1.5 rounded-md text-neutral-700">
            সব কোর্স <ChevronDown size={14} />
          </span>
          <button type="button" className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 transition-colors text-neutral-900 font-semibold text-sm px-4 py-2 rounded-md">
            লগিন/সাইনআপ <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
