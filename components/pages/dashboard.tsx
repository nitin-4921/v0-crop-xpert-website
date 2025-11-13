"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IoTChart } from "@/components/charts/iot-chart"
import { GaugeChart } from "@/components/charts/gauge-chart"
import { AlertBox } from "@/components/alert-box"
import { Cloud, Droplets, Leaf, Wind, TrendingUp, RefreshCw } from "lucide-react"

interface SensorData {
  temperature: number
  humidity: number
  soilMoisture: number
  airQuality: number
  cropHealth: number
  lastUpdated: string
}

export function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateMockData()
  }, [])

  const generateMockData = () => {
    const data: SensorData = {
      temperature: 24 + Math.random() * 8,
      humidity: 55 + Math.random() * 25,
      soilMoisture: 45 + Math.random() * 30,
      airQuality: 60 + Math.random() * 30,
      cropHealth: 78 + Math.random() * 15,
      lastUpdated: new Date().toLocaleTimeString(),
    }
    setSensorData(data)
    setLoading(false)
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => generateMockData(), 500)
  }

  const getAlert = () => {
    if (!sensorData) return null
    if (sensorData.soilMoisture < 30) return "Low soil moisture detected!"
    if (sensorData.temperature > 32) return "High temperature alert!"
    if (sensorData.airQuality < 40) return "Air quality needs attention"
    return null
  }

  if (loading || !sensorData) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="animate-pulse text-foreground/60">Loading farm data...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-8 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-foreground">Farm Dashboard</h1>
          <Button onClick={handleRefresh} className="bg-primary hover:bg-primary/90 flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>
        <p className="text-foreground/60">Real-time IoT monitoring • Last updated: {sensorData.lastUpdated}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-6">
        {/* Alerts */}
        {getAlert() && (
          <div className="animate-slide-in">
            <AlertBox message={getAlert()!} />
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Temperature Card */}
          <Card className="p-6 border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Temperature</h3>
              <Cloud className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">{sensorData.temperature.toFixed(1)}°C</div>
            <div className="h-20">
              <IoTChart value={sensorData.temperature} range={[15, 35]} color="#6B8B3A" />
            </div>
          </Card>

          {/* Humidity Card */}
          <Card
            className="p-6 border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Humidity</h3>
              <Droplets className="w-5 h-5 text-accent animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">{sensorData.humidity.toFixed(1)}%</div>
            <div className="h-20">
              <IoTChart value={sensorData.humidity} range={[30, 80]} color="#D4A574" />
            </div>
          </Card>

          {/* Soil Moisture Card */}
          <Card
            className="p-6 border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Soil Moisture</h3>
              <Leaf className="w-5 h-5 text-secondary animate-pulse" />
            </div>
            <div className="h-32 flex items-center justify-center">
              <GaugeChart value={sensorData.soilMoisture} />
            </div>
          </Card>

          {/* Air Quality Card */}
          <Card
            className="p-6 border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Air Quality</h3>
              <Wind className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">{sensorData.airQuality.toFixed(0)}</div>
            <p className="text-sm text-foreground/60">
              {sensorData.airQuality > 75 ? "Excellent" : sensorData.airQuality > 50 ? "Good" : "Fair"}
            </p>
          </Card>

          {/* Crop Health Card */}
          <Card
            className="p-6 border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Crop Health Index</h3>
              <TrendingUp className="w-5 h-5 text-secondary animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">{sensorData.cropHealth.toFixed(0)}%</div>
            <p className="text-sm text-foreground/60">AI-based analysis</p>
          </Card>
        </div>

        {/* Footer */}
        <div className="py-6 text-center text-sm text-foreground/50 animate-fade-in">
          <p>Real-time data from connected IoT sensors across your farm</p>
        </div>
      </div>
    </div>
  )
}
