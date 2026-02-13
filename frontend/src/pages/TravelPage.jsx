import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import FlightSearch from "./FlightSearch"

export default function TravelPage() {
  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="flight" className="w-full">

        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="flight">Flight</TabsTrigger>
          <TabsTrigger value="train">Train</TabsTrigger>
          <TabsTrigger value="bus">Bus</TabsTrigger>
        </TabsList>

        <TabsContent value="flight">
          <FlightSearch />
        </TabsContent>

        <TabsContent value="train">
          <div className="text-muted-foreground">
            Train booking coming soon...
          </div>
        </TabsContent>

        <TabsContent value="bus">
          <div className="text-muted-foreground">
            Bus booking coming soon...
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}
