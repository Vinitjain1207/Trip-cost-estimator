import { useContext, useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookDispatchContext } from "./BookingContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";

// Mock hotel data

function Counter({ label, value, setValue, min }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center justify-between border rounded-md px-3 py-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setValue(Math.max(min, value - 1))}
        >
          -
        </Button>
        <span>{value}</span>
        <Button variant="ghost" size="icon" onClick={() => setValue(value + 1)}>
          +
        </Button>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  const dispatch = useContext(BookDispatchContext);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [roomType, setRoomType] = useState("");
  const [Cost, setPrice] = useState([500]);
  const [stars, setStars] = useState("any");
  const [amenities, setAmenities] = useState({
    pool: false,
    spa: false,
    gym: false,
    wifi: false,
    breakfast: false,
  });
  const [sortBy, setSortBy] = useState("price");
  const [showResults, setShowResults] = useState(false);

  const toggleAmenity = (key) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const hotels = [
    {
      name: "Grand Palace Hotel",
      location: "Paris",
      Cost: 250,
      rating: 5,
      checkindate:checkIn,
      checkoutdate:checkOut,
      guest: guests,
      room: rooms, 
      roomtype: roomType,
      image: "./src/assets/paris hotel.jpg",
      amenities: ["Pool", "Spa", "Gym"],
    },
    {
      name: "City Inn",
      location: "London",
      Cost: 120,
      rating: 4,
      checkindate:checkIn,
      checkoutdate:checkOut,
      guest: guests,
      room: rooms, 
      roomtype: roomType,
      image: "./src/assets/london hotel.jpg",
      amenities: ["WiFi", "Breakfast", "Gym"],
    },
    {
      name: "Sea View Resort",
      location: "Dubai",
      Cost: 300,
      rating: 5,
      checkindate:checkIn,
      checkoutdate:checkOut,
      guest: guests,
      room: rooms,
      roomtype: roomType,
      image: "./src/assets/duabai resort.jpg",
      amenities: ["Pool", "Spa", "Beach"],
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Filters Card */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="space-y-6 pt-6">
          {/* Location */}
          <div className="space-y-2">
            <Label>City / Location</Label>
            <Input
              placeholder="Enter city or area"
              defaultValue={"Ahmedabad"}
            />
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <DatePicker label="Check-in" date={checkIn} setDate={setCheckIn} />
            <DatePicker
              label="Check-out"
              date={checkOut}
              setDate={setCheckOut}
            />
          </div>
          {/* Rooms and guests */}
          <div className="grid grid-cols-2 gap-4">
            <Counter
              label="Guests"
              value={guests}
              setValue={setGuests}
              min={1}
            />
            <Counter label="Rooms" value={rooms} setValue={setRooms} min={1} />
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <Label>Room Type</Label>
            <Select onValueChange={setRoomType}>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Max Price (${Cost[0]})</Label>
            <Slider
              defaultValue={[500]}
              max={1000}
              step={50}
              onValueChange={setPrice}
            />
          </div>

          {/* Star Rating */}
          <div className="space-y-2">
            <Label>Star Rating</Label>
            <Select onValueChange={setStars}>
              <SelectTrigger>
                <SelectValue value={stars} placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars & Up</SelectItem>
                <SelectItem value="3">3 Stars & Up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="flex flex-wrap gap-4">
              {["pool", "spa", "gym", "wifi", "breakfast"].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    checked={amenities[amenity]}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <span className="capitalize">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sorting */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price (Low to High)</SelectItem>
                <SelectItem value="rating">Rating (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={handleSearch}>
            Search Hotels
          </Button>
        </CardContent>
      </Card>

      {/* Hotel Results */}
      {showResults && <HotelResults dispatch={dispatch} hotels={hotels} sortBy={sortBy} />}
    </div>
  );
}

/* Date Picker Component */
function DatePicker({ label, date, setDate }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* Hotel Results Cards */
function HotelResults({ hotels, sortBy, dispatch }) {
  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === "price") return a.Cost - b.Cost;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {sortedHotels.map((hotel, idx) => (
        <Card key={idx} className="overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-48 object-cover"
          />
          <CardContent className="space-y-2">
            <h3 className="text-lg font-semibold">{hotel.name}</h3>
            <p className="text-sm text-muted-foreground">{hotel.location}</p>
            <p className="font-bold">${hotel.Cost} / night</p>
            <p className="text-sm">Rating: {hotel.rating} ⭐</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {hotel.amenities.map((a) => (
                <span key={a} className="text-xs bg-muted px-2 py-1 rounded">
                  {a}
                </span>
              ))}
            </div>
            <Button
              onClick={() =>{
                toast.success("Hotel has been added", { position: "top-right" })
              dispatch({
                type:"Hotelchanged",
                new: hotel,
              });
              }}
              className="w-full mt-2"
            >
              Add
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
