"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, Battery, AlertCircle } from "lucide-react"

export function DeviceSettings() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-8 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <h1 className="text-3xl font-bold text-foreground mb-2">Device Settings</h1>
        <p className="text-foreground/60">Manage your connected IoT devices and sensors</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-6">
        {/* Connected Devices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Main Weather Station</h3>
              <Wifi className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-2 text-sm text-foreground/70 mb-4">
              <p>
                Status: <span className="text-primary font-semibold">Connected</span>
              </p>
              <p>
                Battery: <span className="text-foreground font-semibold">94%</span>
              </p>
              <p>Last Update: 2 mins ago</p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-sm">Configure</Button>
          </Card>

          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Soil Moisture Sensor</h3>
              <Battery className="w-5 h-5 text-secondary" />
            </div>
            <div className="space-y-2 text-sm text-foreground/70 mb-4">
              <p>
                Status: <span className="text-primary font-semibold">Connected</span>
              </p>
              <p>
                Battery: <span className="text-foreground font-semibold">67%</span>
              </p>
              <p>Last Update: 5 mins ago</p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-sm">Configure</Button>
          </Card>

          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Air Quality Monitor</h3>
              <AlertCircle className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-2 text-sm text-foreground/70 mb-4">
              <p>
                Status: <span className="text-yellow-600 font-semibold">Low Battery</span>
              </p>
              <p>
                Battery: <span className="text-foreground font-semibold">18%</span>
              </p>
              <p>Last Update: 1 min ago</p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-sm">Configure</Button>
          </Card>

          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Add New Device</h3>
              <Wifi className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-foreground/70 mb-4">Connect additional sensors to expand your monitoring</p>
            <Button className="w-full bg-primary hover:bg-primary/90 text-sm">Add Device</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
