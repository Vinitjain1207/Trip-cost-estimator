import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const trainsData = [
  {
    id: 1,
    name: "Rajdhani Express",
    class: "2A",
    departure: "06:00 AM",
    arrival: "2:00 PM",
    price: 1400,
  },
  {
    id: 2,
    name: "Shatabdi Express",
    class: "1A",
    departure: "09:00 AM",
    arrival: "5:00 PM",
    price: 2000,
  },
  {
    id: 3,
    name: "Duronto Express",
    class: "3A",
    departure: "10:00 PM",
    arrival: "6:00 AM",
    price: 1100,
  },
];

const coachLayout = [
  { id: 1, type: "Lower" },
  { id: 2, type: "Upper" },
  { id: 3, type: "Lower" },
  { id: 4, type: "Upper" },
  { id: 5, type: "Side Lower" },
  { id: 6, type: "Side Upper" },
  { id: 7, type: "Lower" },
  { id: 8, type: "Upper" },
  { id: 9, type: "Lower" },
  { id: 10, type: "Upper" },
];

export default function TrainBookingUnified() {
  const [selectedClass, setSelectedClass] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 3000]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [openSeats, setOpenSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);

  const filteredTrains = trainsData.filter((train) => {
    const classMatch =
      selectedClass.length === 0 || selectedClass.includes(train.class);
    const priceMatch =
      train.price >= priceRange[0] && train.price <= priceRange[1];
    return classMatch && priceMatch;
  });

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const totalFare = selectedSeats.length * (selectedTrain?.price || 0);

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { name: "", age: "", gender: "" },
    ]);
  };

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Search Section */}
      <div className="max-w-7xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Trains</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="From Station" />
            <Input placeholder="To Station" />
            <Input type="date" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Class Filter */}
              <div>
                <h3 className="font-semibold mb-2">Class</h3>
                {["1A", "2A", "3A"].map((cls) => (
                  <div key={cls} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedClass.includes(cls)}
                      onCheckedChange={(checked) => {
                        if (checked)
                          setSelectedClass([...selectedClass, cls]);
                        else
                          setSelectedClass(
                            selectedClass.filter((c) => c !== cls)
                          );
                      }}
                    />
                    <label>{cls}</label>
                  </div>
                ))}
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <Slider
                  defaultValue={[500, 3000]}
                  min={500}
                  max={3000}
                  step={100}
                  onValueChange={setPriceRange}
                />
                <p className="text-sm mt-2">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Train Results */}
          <div className="md:col-span-3 space-y-4">
            {filteredTrains.map((train) => (
              <Card key={train.id} className="hover:shadow-lg transition">
                <CardContent className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h3 className="font-bold text-lg">{train.name}</h3>
                    <Badge variant="secondary">{train.class}</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p>{train.departure}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Arrival</p>
                    <p>{train.arrival}</p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <p className="text-xl font-bold">₹{train.price}</p>
                    <Button
                      onClick={() => {
                        setSelectedTrain(train);
                        setOpenSeats(true);
                        setSelectedSeats([]);
                        setPassengers([]);
                      }}
                    >
                      Select Berths
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Select Berths - {selectedTrain?.name}
            </DialogTitle>
          </DialogHeader>

          {/* Coach Layout */}
          <div className="grid grid-cols-4 gap-4 my-4">
            {coachLayout.map((seat) => (
              <button
                key={seat.id}
                onClick={() => toggleSeat(seat.id)}
                className={`p-3 border rounded text-sm font-semibold ${
                  selectedSeats.includes(seat.id)
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {seat.id}
                <p className="text-xs">{seat.type}</p>
              </button>
            ))}
          </div>

          {/* Fare Calculator */}
          <div className="bg-gray-100 p-4 rounded mb-4">
            <h3 className="font-bold">Fare Summary</h3>
            <p>Seats Selected: {selectedSeats.length}</p>
            <p>Price per Seat: ₹{selectedTrain?.price}</p>
            <p className="font-bold">Total Fare: ₹{totalFare}</p>
          </div>

          {/* Passenger Form */}
          <div className="space-y-4">
            <h3 className="font-bold">Passenger Details</h3>

            {passengers.map((p, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <Input
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) =>
                    updatePassenger(index, "name", e.target.value)
                  }
                />
                <Input
                  placeholder="Age"
                  type="number"
                  value={p.age}
                  onChange={(e) =>
                    updatePassenger(index, "age", e.target.value)
                  }
                />
                <Select
                  onValueChange={(value) =>
                    updatePassenger(index, "gender", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}

            <Button variant="outline" onClick={addPassenger}>
              + Add Passenger
            </Button>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              disabled={selectedSeats.length === 0 || passengers.length === 0}
            >
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}