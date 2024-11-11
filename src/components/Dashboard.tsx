'use client'

import { Menu, MoreHorizontal, Box } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  // const [selectedWeek, setSelectedWeek] = useState("current")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const energyData = [
    { name: "Lighting", consumption: 71, range: "52-71" },
    { name: "Refrigerator", consumption: 37, range: "29-37" },
    { name: "Air Conditioner", consumption: 85, range: "49-85" },
  ]

  const weeklyData = [
    { day: "Mon", value: 276 },
    { day: "Tue", value: 191 },
    { day: "Wed", value: 297 },
    { day: "Thu", value: 174 },
    { day: "Fri", value: 211 },
    { day: "Sat", value: 173 },
    { day: "Sun", value: 131 },
  ]

  const timeSlots = ["11AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM"]

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      <header className="border-b border-[#2a2a2a] bg-[#1c1c1c]">
        <div className="container flex h-14 items-center px-4">
          <a href="/" className="flex items-center gap-2">
            <Box className="h-6 w-6" />
          </a>
          <nav className="hidden md:flex md:flex-1 md:justify-start md:gap-6 md:pl-6">
            <a href="/" className="text-sm font-medium text-white">Dashboard</a>
            <a href="/department" className="text-sm font-medium text-[#7a8c8f]">My apartments</a>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] bg-[#1c1c1c] text-white">
              <nav className="flex flex-col gap-4">
                <a href="/" className="text-sm font-medium">Dashboard</a>
                <a href="/department" className="text-sm font-medium text-[#7a8c8f]">Departments</a>
                {/* <a href="/reporting" className="text-sm font-medium text-[#7a8c8f]">Reporting</a>
                <a href="/settings" className="text-sm font-medium text-[#7a8c8f]">Settings</a> */}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:block text-sm">
              Account: Marlene Novak
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">Overview</h1>
          <div className="text-sm text-[#7a8c8f]">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            <span className="mx-2">•</span>
            {currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2 bg-[#253234] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Total energy consumption</CardTitle>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent border-[#7a8c8f]/20">
                Change module
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                energy: {
                  label: "Energy Consumption",
                  color: "hsl(var(--chart-1))",
                },
              }}
               className="h-[300px]">
                <ResponsiveContainer width="100%" height='100%'>
                  <BarChart data={energyData}>
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Bar dataKey="consumption" fill="var(--color-energy)" radius={[4, 4, 0, 0]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="grid gap-4 md:grid-cols-3 mt-4">
                {energyData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#7a8c8f]">{item.name}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-2xl font-bold">{item.range}</div>
                    <div className="text-xs text-[#7a8c8f]">kWh per month</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#253234] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Green connections</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Office</span>
                  <span className="text-sm text-[#7a8c8f]">Connected</span>
                  <Switch defaultChecked />
                </div>
                <div className="aspect-square bg-[#2a2a2a] rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border border-[#4cd471]/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-[#7a8c8f]">Available energy</div>
                  <div className="text-2xl font-bold">83%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#253234] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Recommendations</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-[#2a2a2a] p-4">
                <div className="text-sm font-medium">Sunny day ahead!</div>
                <p className="text-xs text-[#7a8c8f] mt-1">
                  We recommend maximizing solar energy usage between 11 AM and 3 PM.
                </p>
                <div className="text-xs text-[#7a8c8f] mt-2">Today recommendation</div>
              </div>
              <div className="rounded-lg bg-[#2a2a2a] p-4">
                <div className="text-sm font-medium">Run appliances after 8 PM</div>
                <p className="text-xs text-[#7a8c8f] mt-1">to reduce peak load.</p>
                <div className="flex items-center justify-between mt-2 text-xs text-[#7a8c8f]">
                  <span>Analysis</span>
                  <span>5 min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#253234] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Tracking</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-[#7a8c8f]">Solar energy tomorrow</div>
                <div className="text-3xl font-bold">5.7</div>
                <div className="text-xs text-[#7a8c8f]">kWh</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#253234] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Detailed report</CardTitle>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent border-[#7a8c8f]/20">
                Week
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weeklyData.map((item) => (
                  <div key={item.day} className="text-center">
                    <div className="text-xs text-[#7a8c8f] mb-2">{item.day}</div>
                    <div className="h-20 bg-[#2a2a2a] rounded relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[#4cd471]/20 rounded"
                        style={{ height: `${(item.value / 300) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs mt-2">{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#253234] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Green energy usage</CardTitle>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent border-[#7a8c8f]/20">
                Change
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold">47%</div>
                <div className="text-sm text-[#7a8c8f]">11AM — 3PM</div>
                <div className="flex items-center justify-between gap-2">
                  {timeSlots.map((time, index) => (
                    <div
                      key={time + index}
                      className={`h-2 w-2 rounded-full ${
                        index > 0 && index < 6 ? 'bg-[#4cd471]' : 'bg-[#2a2a2a]'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-[#7a8c8f]">
                  <span>11AM</span>
                  <span>4PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}