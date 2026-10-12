import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat") ?? "23.8103";
  const lon = searchParams.get("lon") ?? "90.4125";

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m` +
    `&timezone=auto`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Open-Meteo request failed");

    const { current, current_units } = await res.json();

    return NextResponse.json({
      temperature: `${current.temperature_2m} ${current_units.temperature_2m}`,
      humidity: `${current.relative_humidity_2m} ${current_units.relative_humidity_2m}`,
      windSpeed: `${current.wind_speed_10m} ${current_units.wind_speed_10m}`,
      time: current.time.replace("T", " "),
      interval: `${current.interval} ${current_units.interval}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Weather data আনা যায়নি" },
      { status: 500 }
    );
  }
}
