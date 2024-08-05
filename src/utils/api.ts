export interface OpenWeatherData {
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
}

export async function fetchOpenWeatherData(
  city: string
): Promise<OpenWeatherData> {
  const res = await fetch(
    'https://image-generator-proxy-server.vercel.app/weather-forecast',
    // 'http://localhost:8000/weather-forecast',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city }),
    }
  )

  if (!res.ok) {
    const errorText = await res.text()
    console.error('👀 Error response text:', errorText)
    throw new Error('The weather about this city not found.')
  }

  const data: OpenWeatherData = await res.json()

  return data
}
