# Weather App (Next.js + Tailwind CSS)

Open-Meteo-র Free API ব্যবহার করে তৈরি একটি Simple Weather App।

## Run করার নিয়ম

```bash
npm install
npm run dev
```

তারপর http://localhost:3000 খুলুন।

## Pages

- `/` — Home (Header, Weather Display, About Section, Footer)
- `/about` — About
- `/services` — Services
- `/contact` — Contact Form

## API

`GET /api/weather?lat=23.8103&lon=90.4125` — temperature, humidity, windSpeed, time, interval ফেরত দেয়। `lat`/`lon` না দিলে Dhaka ধরা হয়।
