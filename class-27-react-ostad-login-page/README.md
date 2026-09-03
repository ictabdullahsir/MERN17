# Ostad Login Page (React + Vite + Tailwind)

Ostad.app-এর হেডার, লগিন পেজ, এবং ফুটার-এর ক্লোন — React + Vite + TailwindCSS দিয়ে তৈরি। লোগো ও সোশ্যাল আইকনগুলো সরাসরি `cdn.ostad.app` থেকে লোড হয়।

## ফোল্ডার স্ট্রাকচার

```
ostad-login-vite/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx      # React entry point
    ├── App.jsx       # Header + Login + Footer
    └── index.css     # Tailwind directives
```

## আগে যা লাগবে

- [Node.js](https://nodejs.org/) v18 বা তার উপরে
- npm (Node.js-এর সাথেই আসে)

টার্মিনালে চেক করুন:
```bash
node -v
npm -v
```

## কীভাবে রান করবেন

1. প্রজেক্ট ফোল্ডারে যান:
   ```bash
   cd ostad-login-vite
   ```

2. ডিপেন্ডেন্সি ইনস্টল করুন:
   ```bash
   npm install
   ```

3. ডেভেলপমেন্ট সার্ভার চালু করুন:
   ```bash
   npm run dev
   ```

4. টার্মিনালে দেখানো লোকাল URL-এ যান (ডিফল্ট):
   ```
   http://localhost:5173
   ```

## প্রোডাকশন বিল্ড

```bash
npm run build
```
বিল্ড আউটপুট পাবেন `dist/` ফোল্ডারে। এটাই DirectAdmin / যেকোনো static hosting-এ আপলোড করার জন্য রেডি।

বিল্ড লোকালি প্রিভিউ করতে:
```bash
npm run preview
```

## ব্যবহৃত টুলস

- **React 18** — UI
- **Vite** — dev server / bundler
- **TailwindCSS** — স্টাইলিং
- **lucide-react** — আইকন (সার্চ, ডাউনলোড, অ্যারো ইত্যাদি)
- Ostad-এর নিজস্ব লোগো ও সোশ্যাল আইকন সরাসরি `cdn.ostad.app` থেকে `<img>` দিয়ে লোড করা হয়েছে

## কাস্টমাইজ

- রঙ পরিবর্তন করতে `tailwind.config.js`-এর `theme.extend.colors.ostad` এডিট করুন
- হেডার/ফুটার লিংক `src/App.jsx`-এর `FooterColumn` props ও `Header` কম্পোনেন্টে পাবেন
- লগইন সাবমিট লজিক (API কল) যোগ করতে `LoginSection`-এর বাটনের `onClick` হ্যান্ডলার লিখুন
