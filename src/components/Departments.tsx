import { Menu, MoreHorizontal, Power } from "lucide-react"
import { useState } from "react"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Switch } from "../components/ui/switch"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
// import { Slider } from "../components/ui/slider"
import { NavLink } from "react-router-dom"

export default function Department({totalConsumption, energy1Consumption, energy2Consumption}: any) {
  const [selectedLocation, setSelectedLocation] = useState("office")
  const [greenEnergy, setGreenEnergy] = useState(true)
  const [relayStates, setRelayStates] = useState({
    SteamPlant: true,
    BoilerPlant: true,
  })

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const consumptionData = Array(7).fill(0).map(() => Math.floor(Math.random() * 100))

  const toggleRelay = (department: keyof typeof relayStates) => {
    setRelayStates(prev => ({ ...prev, [department]: !prev[department] }))
  }

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[#2a2a2a] bg-[#1c1c1c]">
        <div className="container flex h-14 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-[#1c1c1c] text-white">
              <nav className="flex flex-col gap-4">
              <NavLink to={"/"} className="text-sm font-medium">Dashboard</NavLink>
              <NavLink to={"/department"} className="text-sm font-medium">Department</NavLink>

              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4">
            <div className="flex items-center space-x-2">
              <NavLink to={'/department'} className="text-lg font-bold sm:text-xl">Departments</NavLink>
            </div>
            <nav className="hidden md:flex md:flex-1 md:justify-center">
            <NavLink to={"/"} className="text-sm font-medium">Dashboard</NavLink>
            <NavLink to={"/department"} className="text-sm font-medium">Department</NavLink>
            </nav>
            {/* <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-[#7a8c8f]">
                Account: Energy Pilot
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-[1200px] space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <Tabs defaultValue={selectedLocation} className="w-full sm:w-[400px]">
              <TabsList className="grid w-full grid-cols-3 bg-[#2a2a2a]">
                <TabsTrigger value="apartments" onClick={() => setSelectedLocation("apartments")} className="data-[state=active]:bg-[#3a3a3a]">
                  Departments
                </TabsTrigger>
                {/* <TabsTrigger value="office" onClick={() => setSelectedLocation("office")} className="data-[state=active]:bg-[#3a3a3a]">
                  Office
                </TabsTrigger>
                <TabsTrigger value="factory" onClick={() => setSelectedLocation("factory")} className="data-[state=active]:bg-[#3a3a3a]">
                  Factory
                </TabsTrigger> */}
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-sm">Green Energy</span>
              <Switch checked={greenEnergy} onCheckedChange={setGreenEnergy} />
              {/* <Button variant="outline" size="sm" className="text-white border-white/20">
                More filters
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button> */}
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr,2fr,1fr]">
            <div className="space-y-4 sm:space-y-6">
              <Card className="bg-[#253234] border-none">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-[#7a8c8f]">Available energy</div>
                    <div className="text-4xl font-bold text-[#4cd471]">83%</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#253234] border-none">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-[#7a8c8f]">Total</div>
                    <div className="text-4xl font-bold text-white">{totalConsumption}</div>
                    <div className="text-sm text-[#7a8c8f]">kWh per month</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#253234] border-none">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="font-medium">Run appliances after 8 PM</div>
                    <p className="text-sm text-[#7a8c8f]">to reduce peak load.</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-[#7a8c8f]">
                      <span>Analysis</span>
                      <span>5 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="relative overflow-hidden bg-[#253234] border-none h-[300px] md:h-auto">
              <CardContent className="p-4 h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full max-w-[600px]">
                    <div className="relative aspect-square w-full h-full">
                      <div className="absolute inset-0 border border-[#4cd471]/20" />
                      <div className="absolute inset-[10%] border border-[#4cd471]/20" />
                      <div className="absolute inset-[20%] border border-[#4cd471]/20" />
                      <div className="absolute inset-[30%] border border-[#4cd471]/20" />
                      <div className="absolute inset-[40%] border border-[#4cd471]/20" />
                      <div className="absolute inset-[25%] w-1/2 h-1/2 bg-[#4cd471]/10" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 sm:space-y-6">
              <Card className="bg-[#253234] border-none">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-[#7a8c8f]">Steam plant</div>
                    <div className="text-2xl font-bold">{energy1Consumption}</div>
                    <div className="text-xs text-[#7a8c8f]">kWh per month</div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-[#7a8c8f]">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#253234] border-none">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-[#7a8c8f]">Boiler plant</div>
                    <div className="text-2xl font-bold">{energy2Consumption}</div>
                    <div className="text-xs text-[#7a8c8f]">kWh per month</div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-[#7a8c8f]">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* <Card className="bg-[#253234] border-none">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-[#7a8c8f]">Computer</div>
                    <div className="text-2xl font-bold">37-84</div>
                    <div className="text-xs text-[#7a8c8f]">kWh per month</div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-[#7a8c8f]">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card> */}
            </div>
          </div>

          <Card className="bg-[#253234] border-none">
            <CardContent className="p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Energy consumption / week</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day, index) => (
                    <div key={day} className="space-y-2">
                      <div className="text-sm text-center text-[#7a8c8f]">{day}</div>
                      <div className="h-24 sm:h-32 bg-[#2a2a2a] relative">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-[#4cd471]/20"
                          style={{ height: `${consumptionData[index]}%` }}
                        >
                          <div className="grid grid-rows-10 h-full">
                            {Array(10).fill(0).map((_, i) => (
                              <div key={i} className="flex justify-around items-center">
                                <div className="w-1 h-1 rounded-full bg-[#4cd471]" />
                                <div className="w-1 h-1 rounded-full bg-[#4cd471]" />
                                <div className="w-1 h-1 rounded-full bg-[#4cd471]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Relay Control Component */}
          <Card className="bg-[#253234] border-none">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Department Relay Control</h3>
              <div className="space-y-4">
                {Object.entries(relayStates).map(([department, isOn]) => (
                  <div key={department} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant={isOn ? "default" : "destructive"}
                        size="icon"
                        onClick={() => toggleRelay(department as keyof typeof relayStates)}
                      >
                        <Power className="h-4 w-4" />
                      </Button>
                      <span className="capitalize">{department}</span>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#7a8c8f]">Power limit:</span>
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className="w-[100px]"
                      />
                      <span className="text-sm text-[#7a8c8f] w-8">50%</span>
                    </div> */}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}