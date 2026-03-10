import { useContext, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { BookDispatchContext } from "./BookingContext";
import { BookContext } from "./BookingContext";
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
    TrainName: "Rajdhani Express",
    Trainclass: "2A",
    Cost: 1400,
    Coach: "B1",
    Depart: "06:00 AM",
    Arrival: "2:00 PM",
  },
  {
    TrainName: "Shatabdi Express",
    Trainclass: "1A",
    Cost: 2000,
    Coach: "M1",
    Depart: "09:00 AM",
    Arrival: "5:00 PM",
  },
  {
    TrainName: "Duronto Express",
    Trainclass: "3A",
    Cost: 1100,
    Coach: "B2",
    Depart: "10:00 PM",
    Arrival: "6:00 AM",
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
  const dispatch = useContext(BookDispatchContext);
  const Books = useContext(BookContext);
  const [date, setDate] = useState(Books[5].date);
  const [selectedClass, setSelectedClass] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 3000]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [openSeats, setOpenSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);

  const filteredTrains = trainsData.filter((train) => {
    const classMatch =
      selectedClass.length === 0 || selectedClass.includes(train.Trainclass);
    const priceMatch =
      train.Cost >= priceRange[0] && train.Cost <= priceRange[1];
    return classMatch && priceMatch;
  });

  const toggleSeat = (seat) => {
    setSelectedSeats((p) =>
      p.includes(seat) ? p.filter((s) => s !== seat) : [...p, seat],
    );
    const newseats = selectedSeats.includes(seat)
      ? selectedSeats.filter((s) => s !== seat)
      : [...selectedSeats, seat];
    dispatch({
      type: "Books5changed",
      field: "Berth",
      new: newseats,
    });
  };

  const totalFare = selectedSeats.length * (selectedTrain?.Cost || 0);

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", gender: "" }]);
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
            <Input defaultValue="Bombay" placeholder="From Station" />
            <Input defaultValue="Ahmedabad" placeholder="To Station" />
            <Input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                dispatch({
                  type: "Books5changed",
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
              {/* Class Filter */}
              <div>
                <h3 className="font-semibold mb-2">Class</h3>
                {["1A", "2A", "3A"].map((cls) => (
                  <div key={cls} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedClass.includes(cls)}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedClass([...selectedClass, cls]);
                        else
                          setSelectedClass(
                            selectedClass.filter((c) => c !== cls),
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
              <Card key={train.TrainName} className="hover:shadow-lg transition">
                <CardContent className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h3 className="font-bold text-lg">{train.TrainName}</h3>
                    <Badge variant="secondary">{train.Trainclass}</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p>{train.Depart}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Arrival</p>
                    <p>{train.Arrival}</p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <p className="text-xl font-bold">₹{train.Cost}</p>
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
            <DialogTitle>Select Berths - {selectedTrain?.TrainName}</DialogTitle>
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
            <p>Price per Seat: ₹{selectedTrain?.Cost}</p>
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
              onClick={() =>{
                toast.success("Train has been added", { position: "top-right" });
                dispatch({
                  type:"Trainselected",
                  new: {...selectedTrain,Cost: totalFare}
                });
                setOpenSeats(false);
                }
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
