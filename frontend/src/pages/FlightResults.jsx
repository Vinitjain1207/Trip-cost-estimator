import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockFlights = [
  {
    airline: "Emirates",
    price: 750,
    duration: "7h 30m",
    departure: "08:00 AM",
    stops: "Non-stop",
  },
  {
    airline: "Qatar Airways",
    price: 680,
    duration: "9h 10m",
    departure: "11:30 AM",
    stops: "1 Stop",
  },
  {
    airline: "Indigo",
    price: 50,
    duration: "1h 30m",
    departure: "08:00 AM",
    stops: "Non-stop",
  }
]

export default function FlightResults({ sortBy }) {
  const sortedFlights = [...mockFlights].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price
    if (sortBy === "departure") return a.departure.localeCompare(b.departure)
    return 0
  })

  return (
    <div className="space-y-4 mt-6">
      {sortedFlights.map((flight, index) => (
        <Card key={index}>
          <CardContent className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
            <div>
              <h3 className="font-semibold">{flight.airline}</h3>
              <p className="text-sm text-muted-foreground">
                {flight.duration} • {flight.stops}
              </p>
              <p className="text-sm">{flight.departure}</p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold">${flight.price}</p>
              <Button size="sm">Book Now</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
