import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {BookDispatchContext} from "./BookingContext"
import { useContext } from "react";

export default function FlightResults({ sortBy, quantity }) {
  const dispatch = useContext(BookDispatchContext);
  const mockFlights = [
    {
      FlightType: "Round Trip",
      Cost: 750,
      Depart: "15 March 08:00 AM",
      Return: "19 March 09:40 PM",
      Airlines: "Emirates",
      Quantity: quantity,
      Duration: "7h 30m",
    },
    {
      FlightType: "Round Trip",
      Cost: 680,
      Depart: "18 March 11:30 AM",
      Return: "22 March 06:20 PM",
      Airlines: "Qatar Airways",
      Quantity: quantity,
      Duration: "9h 10m",
    },
    {
      FlightType: "Round Trip",
      Cost: 50,
      Depart: "20 March 08:00 AM",
      Return: "26 March 09:40 PM",
      Airlines: "Indigo",
      Quantity: quantity,
      Duration: "1h 30m",
    },
  ];
const sortedFlights = [...mockFlights].sort((a, b) => {
    if (sortBy === "price") return a.Cost - b.Cost;
    if (sortBy === "departure") return a.Depart.localeCompare(b.Depart);
    return 0;
  });

  return (
    <div className="space-y-4 mt-6">
      {sortedFlights.map((flight, index) => (
        <Card key={index}>
          <CardContent className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
            <div>
              <h3 className="font-semibold">{flight.Airlines}</h3>
              <p className="text-sm text-muted-foreground">
                {flight.Duration} • Non-Stop
              </p>
              <p className="text-sm">Depart: {flight.Depart}</p>
              <p className="text-sm">Return: {flight.Return}</p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold">₹{flight.Cost }</p>
              <Button
                onClick={() =>{
                  toast.success("Flight has been added", {
                    position: "top-right",
                  });
                  dispatch({
                    type:"Books3changed",
                    new: mockFlights[index]
                  });
                }}
                size="sm"
              >
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
