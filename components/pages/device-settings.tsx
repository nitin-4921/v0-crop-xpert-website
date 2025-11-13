"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Thermometer, Droplets, Leaf, Wind, Plus, RefreshCw, X } from "lucide-react"

interface Device {
  id: string
  name: string
  type: "temperature" | "humidity" | "soil" | "air-quality"
  status: "online" | "offline"
  lastUpdated: string
  location: string
  enabled: boolean
}

const deviceTypeIcons: Record<Device["type"], React.ReactNode> = {
  temperature: <Thermometer className="w-5 h-5" />,
  humidity: <Droplets className="w-5 h-5" />,
  soil: <Leaf className="w-5 h-5" />,
  "air-quality": <Wind className="w-5 h-5" />,
}

const deviceTypeLabels: Record<Device["type"], string> = {
  temperature: "Temperature Sensor",
  humidity: "Humidity Sensor",
  soil: "Soil Moisture Sensor",
  "air-quality": "Air Quality Monitor",
}

export function DeviceSettings() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Main Weather Station",
      type: "temperature",
      status: "online",
      lastUpdated: "2 mins ago",
      location: "North Field",
      enabled: true,
    },
    {
      id: "2",
      name: "Soil Moisture Sensor",
      type: "soil",
      status: "online",
      lastUpdated: "5 mins ago",
      location: "South Field",
      enabled: true,
    },
    {
      id: "3",
      name: "Humidity Monitor",
      type: "humidity",
      status: "online",
      lastUpdated: "1 min ago",
      location: "Greenhouse",
      enabled: true,
    },
    {
      id: "4",
      name: "Air Quality Monitor",
      type: "air-quality",
      status: "offline",
      lastUpdated: "15 mins ago",
      location: "East Wing",
      enabled: false,
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newDevice, setNewDevice] = useState({ name: "", type: "temperature", id: "" })

  const handleToggleDevice = (id: string) => {
    setDevices(devices.map((d) => (d.id === id ? { ...d, enabled: !d.enabled } : d)))
  }

  const handleRefreshDevice = (id: string) => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setDevices(devices.map((d) => (d.id === id ? { ...d, lastUpdated: `Just now (${timeStr})` } : d)))
  }

  const handleAddDevice = () => {
    if (newDevice.name && newDevice.id) {
      const device: Device = {
        id: Date.now().toString(),
        name: newDevice.name,
        type: (newDevice.type as Device["type"]) || "temperature",
        status: "online",
        lastUpdated: "Just added",
        location: "",
        enabled: true,
      }
      setDevices([...devices, device])
      setNewDevice({ name: "", type: "temperature", id: "" })
      setIsModalOpen(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-8 border-b border-[#e8e8e8] bg-gradient-to-r from-[#3BB273]/10 to-[#f5f0e8]/50">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Device Settings</h1>
            <p className="text-foreground/70">Manage your connected IoT devices and sensors</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3BB273] hover:bg-[#2d9059] text-white flex items-center gap-2 rounded-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Device
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device, index) => (
            <Card
              key={device.id}
              className="p-6 border border-[#e8e8e8] bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Device Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#3BB273]/10 rounded-lg text-[#3BB273]">{deviceTypeIcons[device.type]}</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base">{device.name}</h3>
                    <p className="text-xs text-foreground/60">{deviceTypeLabels[device.type]}</p>
                  </div>
                </div>
              </div>

              {/* Device Info */}
              <div className="space-y-2.5 mb-5 pb-5 border-b border-[#e8e8e8]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Status:</span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      device.status === "online" ? "bg-[#3BB273]/20 text-[#2d9059]" : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        device.status === "online" ? "bg-[#3BB273]" : "bg-red-500"
                      }`}
                    ></span>
                    {device.status === "online" ? "Online" : "Offline"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">Last Updated:</span>
                  <span className="text-foreground font-medium">{device.lastUpdated}</span>
                </div>

                {device.location && (
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">Location:</span>
                    <span className="text-foreground font-medium">{device.location}</span>
                  </div>
                )}
              </div>

              {/* Device Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={device.enabled}
                      onChange={() => handleToggleDevice(device.id)}
                      className="w-5 h-5 rounded border-[#3BB273] text-[#3BB273] cursor-pointer"
                    />
                    <span className="ml-2 text-xs text-foreground/70">{device.enabled ? "Enabled" : "Disabled"}</span>
                  </label>
                </div>

                <button
                  onClick={() => handleRefreshDevice(device.id)}
                  className="p-2 hover:bg-[#f5f0e8] rounded-lg transition-colors duration-200 text-[#3BB273] hover:text-[#2d9059]"
                  title="Manually sync device data"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer note */}
        <div className="bg-[#f5f0e8] border border-[#3BB273]/20 rounded-lg p-4 flex items-start gap-3 mt-8">
          <div className="w-1 h-1 rounded-full bg-[#3BB273] mt-2 flex-shrink-0"></div>
          <p className="text-sm text-foreground/80">
            <span className="font-semibold text-foreground">Ensure all devices are online</span> for real-time data
            updates. Check battery levels regularly and update device firmware as needed.
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 bg-white rounded-xl border border-[#e8e8e8]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Add New Device</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-[#f5f0e8] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-foreground/60" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Device Name</label>
                <input
                  type="text"
                  placeholder="e.g., North Field Sensor"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e8e8e8] rounded-lg focus:ring-2 focus:ring-[#3BB273] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Device Type</label>
                <select
                  value={newDevice.type}
                  onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e8e8e8] rounded-lg focus:ring-2 focus:ring-[#3BB273] focus:border-transparent outline-none"
                >
                  <option value="temperature">Temperature Sensor</option>
                  <option value="humidity">Humidity Sensor</option>
                  <option value="soil">Soil Moisture Sensor</option>
                  <option value="air-quality">Air Quality Monitor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Device ID</label>
                <input
                  type="text"
                  placeholder="e.g., SENSOR-001"
                  value={newDevice.id}
                  onChange={(e) => setNewDevice({ ...newDevice, id: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e8e8e8] rounded-lg focus:ring-2 focus:ring-[#3BB273] focus:border-transparent outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  className="flex-1 border-[#e8e8e8] text-foreground hover:bg-[#f5f0e8]"
                >
                  Cancel
                </Button>
                <Button onClick={handleAddDevice} className="flex-1 bg-[#3BB273] hover:bg-[#2d9059] text-white">
                  Add Device
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
