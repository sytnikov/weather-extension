export interface OpenWeatherData {
  cod: number
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    deg: number
    speed: number
  }
  message?: string
}

export type OpenWeatherTempScale = 'metric' | 'imperial'

export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> {
  try {
    const res = await fetch(
      'https://image-generator-proxy-server.vercel.app/weather-forecast',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, tempScale }),
      }
    )

    const data: OpenWeatherData = await res.json()

    if (data.cod !== 200) {
      throw new Error(`API error: ${data.message}`)
    }

    return data
  } catch (e) {
    throw e
  }
}

export function getWeatherIconSrc(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
