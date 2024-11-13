'use client'

import { Menu, MoreHorizontal, Box } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartConfig,ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { EnergyTable } from "./EnergyTable"
import { columns } from "./energyColumn"
import { NavLink } from "react-router-dom"




export default function Dashboard({data, energyData}:any) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // const energyData = [
  //   { name: "Boiler", consumption: 71, range: "52-71" },
  //   { name: "heater ", consumption: 37, range: "29-37" },
  // ]

  const weeklyData = [
    { day: "Mon", value: 276 },
    { day: "Tue", value: 191 },
    { day: "Wed", value: 297 },
    { day: "Thu", value: 174 },
    { day: "Fri", value: 211 },
    { day: "Sat", value: 173 },
    { day: "Sun", value: 131 },
  ]

  const chartConfig = {
    desktop: {
      label: "heater",
      color: "#ffffff",
    },
    mobile: {
      label: "Boiler",
      color: "#ffffff",
    },
  } satisfies ChartConfig;

  const timeSlots = ["11AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM"]

  return (
    <div className="min-h-screen w-full overflow-x-none bg-[#1c1c1c] text-white">
      <header className="sticky top-0 z-50 border-b border-[#2a2a2a] bg-[#1c1c1c]">
        <div className="container flex h-14 items-center px-4">
          <a href="/" className="flex items-center gap-2">
            <Box className="h-6 w-6" />
          </a>
          <nav className="hidden md:flex md:flex-1 md:justify-start md:gap-6 md:pl-6">
          <NavLink to={"/"} className="text-sm font-medium">Dashboard</NavLink>
          <NavLink to={"/department"} className="text-sm font-medium">Department</NavLink>
            {/* <a href="/" className="text-sm font-medium text-white">Dashboard</a>
            <a href="/department" className="text-sm font-medium text-[#7a8c8f]">Departments</a> */}
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
                <NavLink to={"/"} className="text-sm font-medium">Dashboard</NavLink>
                <NavLink to={"/department"} className="text-sm font-medium">Department</NavLink>
                {/* <Routes> */}
                  {/* <Route path="/"  className="text-sm font-medium">Dashboard</a> */}
                  {/* <Route path="/department" className="text-sm font-medium text-[#7a8c8f]">Departments</a> */}
                {/* </Routes> */}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:block text-sm">
              ACCOUNT: ENERGY PILOT
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold mb-4 sm:mb-0">Overview</h1>
          <div className="text-sm text-[#7a8c8f]">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            <span className="mx-2">•</span>
            {currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full overflow-hidden">
          <Card className="col-span-full lg:col-span-2 w-full bg-[#253234] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">TOTAL ENERGY CONSUMPTION</CardTitle>
              {/* <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent border-[#7a8c8f]/20">
                Change module
              </Button> */}
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] h-[300px] w-[60%] text-white"
                // className="h-[200px] sm:h-[200px] sm:w-96"
              >
                {/* <ResponsiveContainer width="100%" height='100%'> */}
                  <BarChart className="bg-white" data={energyData}>
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Bar dataKey="consumption" fill="#000000" radius={[10, 10, 0, 0]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                {/* </ResponsiveContainer> */}
              </ChartContainer>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {/* @ts-ignore */}
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

          <Card className="bg-[#253234] border-none w-[90%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">ACTIVE APPLIANCES</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">USAGE ESTIMATE: 164.1KWh</span>
                  <span className="text-sm text-[#7a8c8f]"></span>
                  <Switch defaultChecked />
                </div>
                <div className="aspect-square bg-[#2a2a2a] rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border border-[#4cd471]/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-[#7a8c8f]">PREDICTED ESTIMATE</div>
                  <div className="text-2xl font-bold">439 KW/h</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#253234] border-none w-[90%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">ALERTS</CardTitle>
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
                <div className="text-sm font-medium">Switch to renewable energy at 12pm</div>
                <p className="text-xs text-[#7a8c8f] mt-1">to reduce peak load</p>
                <div className="flex items-center justify-between mt-2 text-xs text-[#7a8c8f]">
                  <span>Analysis</span>
                  <span>5 min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#253234] border-none w-[90%]">
            <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">TRACKING</CardTitle>
              <EnergyTable columns={columns} data={data}/>
            </CardHeader>
            {/* <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-[#7a8c8f]">Solar energy tomorrow</div>
                <div className="text-3xl font-bold">5.7</div>
                <div className="text-xs text-[#7a8c8f]">kWh</div>
              </div>
            </CardContent> */}
          </Card>

          <Card className="bg-[#253234] border-none w-[90%]">
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
                    <div className="h-16 sm:h-20 bg-[#2a2a2a] rounded relative">
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

          <Card className="bg-[#253234] border-none w-[90%]">
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