import { useState, useEffect } from 'react'
import { Power } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Slider } from "../components/ui/slider"
import { mqtt, iot, auth } from "aws-iot-device-sdk-v2"

const MQTTRelayControl = () => {
  const [connection, setConnection] = useState(null)
  const [relayStates, setRelayStates] = useState({
    relay1: false,
    relay2: false
  })

  // MQTT Connection setup
  useEffect(() => {
    const connect = async () => {
      try {
        const config = iot.AwsIotMqttConnectionConfigBuilder.new_builder_for_websocket()
          .with_clean_session(true)
          .with_client_id("dashboard-" + Math.floor(Math.random() * 100000000))
          .with_endpoint(process.env.NEXT_PUBLIC_AWS_IOT_ENDPOINT)
          .with_credentials(provider)
          .with_keep_alive_seconds(30)
          .build()

        const client = new mqtt.MqttClient()
        const mqttConnection = client.new_connection(config)

        mqttConnection.on("connect", () => {
          console.log("Connected to MQTT")
          setConnection(mqttConnection)
        })

        mqttConnection.on("error", (error) => {
          console.error("MQTT error:", error)
        })

        mqttConnection.connect()
      } catch (err) {
        console.error("Failed to connect:", err)
      }
    }

    connect()

    return () => {
      if (connection) {
        connection.disconnect()
      }
    }
  }, [])

  // Function to publish MQTT messages
  const publishMessage = (message) => {
    if (connection) {
      connection.publish(
        "esp32/sub",
        message,
        mqtt.QoS.AtLeastOnce
      )
    }
  }

  // Toggle handler for relays
  const toggleRelay = (relay) => {
    setRelayStates(prev => {
      const newState = !prev[relay]
      const message = newState ? 
        (relay === 'relay1' ? 'ON1' : 'ON2') : 
        (relay === 'relay1' ? 'OFF1' : 'OFF2')
      
      publishMessage(message)
      return { ...prev, [relay]: newState }
    })
  }

  return (
    <Card className="bg-[#253234] border-none">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Department Relay Control</h3>
        <div className="space-y-4">
          {Object.entries(relayStates).map(([relay, isOn]) => (
            <div key={relay} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant={isOn ? "default" : "destructive"}
                  size="icon"
                  onClick={() => toggleRelay(relay)}
                >
                  <Power className="h-4 w-4" />
                </Button>
                <span className="capitalize">{relay.replace("relay", "Load ")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#7a8c8f]">Power limit:</span>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="w-[100px]"
                />
                <span className="text-sm text-[#7a8c8f] w-8">50%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default MQTTRelayControl