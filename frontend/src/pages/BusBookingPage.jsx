import { useContext, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { BookDispatchContext } from "./BookingContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const busesData = [
  {
    BusName: "Volvo AC Sleeper",
    BusType: "Sleeper",
    Cost: 1200,
    Depart: "10:00 AM",
    Arrival: "4:00 PM",
  },
  {
    BusName: "Express AC Seater",
    BusType: "Seater",
    Cost: 900,
    Depart: "1:00 PM",
    Arrival: "7:30 PM",
  },
  {
    BusName: "Luxury Coach",
    BusType: "Sleeper",
    Cost: 1500,
    Depart: "9:00 PM",
    Arrival: "5:00 AM",
  },
];

export default function BusBookingPage() {
  const dispatch = useContext(BookDispatchContext);
  const [selectedType, setSelectedType] = useState([]);
  const [date, setDate] = useState("");
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [openSeats, setOpenSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const filteredBuses = busesData.filter((bus) => {
    const typeMatch =
      selectedType.length === 0 || selectedType.includes(bus.BusType);
    const priceMatch = bus.Cost >= priceRange[0] && bus.Cost <= priceRange[1];
    return typeMatch && priceMatch;
  });

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
    const newseats = selectedSeats.includes(seat)
      ? selectedSeats.filter((s) => s !== seat)
      : [...selectedSeats, seat];
    dispatch({
      type: "Books7changed",
      field: "Seats",
      new: newseats,
    });
  };

    const totalFare = selectedSeats.length * (selectedBus?.Cost || 0);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="max-w-7xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Buses</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input defaultValue="Bombay" placeholder="From" />
            <Input defaultValue="Ahmedabad" placeholder="To" />
            <Input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                dispatch({
                  type: "Books7changed",
                  new: e.target.value,
                  field: "date",
                });
              }}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Bus Type</h3>
                <div className="space-y-2">
                  {["Sleeper", "Seater"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedType.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedType([...selectedType, type]);
                          else
                            setSelectedType(
                              selectedType.filter((t) => t !== type),
                            );
                        }}
                      />
                      <label>{type}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <Slider
                  defaultValue={[500, 2000]}
                  min={500}
                  max={2000}
                  step={100}
                  onValueChange={setPriceRange}
                />
                <p className="text-sm mt-2">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bus Results */}
          <div className="md:col-span-3 space-y-4">
            {filteredBuses.map((bus) => (
              <Card key={bus.BusName} className="hover:shadow-lg transition">
                <CardContent className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h3 className="font-bold text-lg">{bus.BusName}</h3>
                    <Badge variant="secondary">{bus.BusType}</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p>{bus.Depart}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Arrival</p>
                    <p>{bus.Arrival}</p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <p className="text-xl font-bold">₹{bus.Cost}</p>
                    <Button
                      onClick={() => {
                        setSelectedBus(bus);
                        setOpenSeats(true);
                      }}
                    >
                      Select Seats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Seat Selection Modal */}
      <Dialog open={openSeats} onOpenChange={setOpenSeats}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Select Seats - {selectedBus?.BusName}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-5 gap-3 my-4">
            {Array.from({ length: 20 }).map((_, i) => {
              const seat = i + 1;
              return (
                <button
                  key={seat}
                  onClick={() => toggleSeat(seat)}
                  className={`p-2 rounded border text-sm font-medium ${
                    selectedSeats.includes(seat)
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {seat}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <p className="font-semibold">
              Selected Seats: {selectedSeats.join(", ") || "None"}
              <br></br>
              Total Fare: {totalFare}
            </p>
            <Button
              disabled={selectedSeats.length === 0}
              onClick={() =>{
                toast.success("Bus has been added", { position: "top-right" });
                 dispatch({
                  type:"Busselected",
                  new: {...selectedBus,Cost: totalFare}
                });
                setOpenSeats(false);}
              }
            >
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
