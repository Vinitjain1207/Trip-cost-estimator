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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Restaurantpage() {
  const dispatch = useContext(BookDispatchContext);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [priceRange, setPriceRange] = useState([300, 1500]);
  const [date, setDate] = useState();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [guests, setGuests] = useState(2);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" });
  const restaurantsData = [
    {
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.5,
      date: date,
      guest: guests,
      Table: selectedTable,
      Time: selectedTime,
      Cost: 500,
      image: "./src/assets/restaurant1.jpg",
      menuImages: [
        "./src/assets/menu1.jpg",
        "./src/assets/menu2.jpg",
        "./src/assets/menu3.jpg",
      ],
    },
    {
      name: "Italiano Bistro",
      cuisine: "Italian",
      rating: 4.2,
      date: date,
      guest: guests,
      Table: selectedTable,
      Time: selectedTime,
      Cost: 800,
      image: "./src/assets/restaurant2.jpg",
      menuImages: [
        "./src/assets/menu4.jpg",
        "./src/assets/menu5.jpg",
        "./src/assets/menu6.jpg",
      ],
    },
    {
      id: 3,
      name: "Dragon Wok",
      cuisine: "Chinese",
      rating: 4.0,
      date: date,
      guest: guests,
      Table: selectedTable,
      Time: selectedTime,
      Cost: 600,
      image: "./src/assets/restaurant3.jpg",
      menuImages: [
        "./src/assets/menu7.jpg",
        "./src/assets/menu8.jpg",
        "./src/assets/menu9.jpg",
      ],
    },
  ];

  const timeSlots = [
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
  ];

  const tablesLayout = [
    { id: 1, type: "2-Seater" },
    { id: 2, type: "3-Seater" },
    { id: 3, type: "4-Seater" },
    { id: 4, type: "5-Seater" },
    { id: 5, type: "VIP" },
    { id: 6, type: "VIP+" },
  ];
  const filteredRestaurants = restaurantsData.filter((res) => {
    const cuisineMatch =
      selectedCuisine.length === 0 || selectedCuisine.includes(res.cuisine);
    const priceMatch =
      res.Cost >= priceRange[0] &&
      res.Cost <= priceRange[1];
    return cuisineMatch && priceMatch;
  });

  const totalCost = guests * (selectedRestaurant?.Cost || 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Search */}
        <Card className="mb-6 shadow">
          <CardHeader>
            <CardTitle>Search Restaurants</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-4">
            <Input placeholder="Location" defaultValue="Ahmedabad"/>
            <Input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <Input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              placeholder="Guests"
            />
            <Select onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select Time Slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Filters */}
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Cuisine</h3>
                {["Indian", "Italian", "Chinese"].map((cuisine) => (
                  <div key={cuisine} className="flex gap-2">
                    <Checkbox
                      checked={selectedCuisine.includes(cuisine)}
                      onCheckedChange={(checked) => {
                        checked
                          ? setSelectedCuisine([...selectedCuisine, cuisine])
                          : setSelectedCuisine(
                              selectedCuisine.filter((c) => c !== cuisine),
                            );
                      }}
                    />
                    <label>{cuisine}</label>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <Slider
                  defaultValue={[300, 1500]}
                  min={300}
                  max={1500}
                  step={100}
                  onValueChange={setPriceRange}
                />
                <p className="text-sm mt-2">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Restaurant Gallery */}
          <div className="md:col-span-3 grid md:grid-cols-3 gap-6">
            {filteredRestaurants.map((res) => (
              <Card key={res.name} className="shadow hover:shadow-xl transition">
                <img
                  src={res.image}
                  alt={res.name}
                  className="h-40 w-full object-cover rounded-t-lg"
                />
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-bold">{res.name}</h3>
                  <Badge>{res.cuisine}</Badge>
                  <p>⭐ {res.rating}</p>
                  <p>₹{res.Cost} / person</p>
                  <Button
                    className="w-full mt-2"
                    onClick={() => {
                      setSelectedRestaurant(res);
                      setOpenDialog(true);
                    }}
                  >
                    Book Table
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Table - {selectedRestaurant?.name}</DialogTitle>
          </DialogHeader>

          {/* Menu Gallery */}
          <h3 className="font-bold mt-2">Menu Gallery</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {selectedRestaurant?.menuImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="menu"
                className="h-28 w-full object-cover rounded shadow"
              />
            ))}
          </div>

          {/* Time */}
          <h3 className="font-bold">Select Time Slot</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`px-3 py-2 rounded border
                ${selectedTime === slot ? "bg-black text-white" : "bg-white"}`}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* Tables */}
          <h3 className="font-bold">Select Table</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {tablesLayout.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table.type)}
                className={`p-3 border rounded
                ${selectedTable === table.type ? "bg-gray-900 text-white" : "bg-white"}`}
              >
                Table {table.id}
                <p className="text-xs">{table.type}</p>
              </button>
            ))}
          </div>

          {/* Cost */}
          <div className="bg-gray-100 p-3 rounded mb-4">
            <p>Guests: {guests}</p>
            <p>Price per person: ₹{selectedRestaurant?.Cost}</p>
            <p className="font-bold">Total: ₹{totalCost}</p>
          </div>

          {/* Customer */}
          <div className="space-y-3">
            <Input
              placeholder="Full Name"
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />
            <Input
              placeholder="Phone Number"
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />
          </div>

          <Button
            className="w-full mt-5"
            onClick={() => {
              toast.success("Restaurant has been added", {
                position: "top-right",
              });
              dispatch({
                type: "Restaurantchanged",
                new: {...selectedRestaurant,Table:selectedTable,Cost:totalCost},
              });
              setOpenDialog(false);
            }}
            disabled={!selectedTable || !selectedTime || !customer.name}
          >
            Confirm Reservation
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
