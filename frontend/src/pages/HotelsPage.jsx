import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Slider } from "@/components/ui/slider"
import { CalendarIcon } from "lucide-react"

// Mock hotel data
const hotels = [
  {
    name: "Grand Palace Hotel",
    location: "Paris",
    price: 250,
    rating: 5,
    image: "./src/assets/paris hotel.jpg",
    amenities: ["Pool", "Spa", "Gym"],
  },
  {
    name: "City Inn",
    location: "London",
    price: 120,
    rating: 4,
    image: "./src/assets/london hotel.jpg",
    amenities: ["WiFi", "Breakfast", "Gym"],
  },
  {
    name: "Sea View Resort",
    location: "Dubai",
    price: 300,
    rating: 5,
    image: "./src/assets/duabai resort.jpg",
    amenities: ["Pool", "Spa", "Beach"],
  },
]

export default function HotelsPage() {
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState()
  const [checkOut, setCheckOut] = useState()
  const [guests, setGuests] = useState(1)
  const [rooms, setRooms] = useState(1)
  const [price, setPrice] = useState([500])
  const [stars, setStars] = useState("any")
  const [amenities, setAmenities] = useState({
    pool: false,
    spa: false,
    gym: false,
    wifi: false,
    breakfast: false,
  })
  const [sortBy, setSortBy] = useState("price")
  const [showResults, setShowResults] = useState(false)

  const toggleAmenity = (key) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSearch = () => {
    setShowResults(true)
  }

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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <DatePicker label="Check-in" date={checkIn} setDate={setCheckIn} />
            <DatePicker label="Check-out" date={checkOut} setDate={setCheckOut} />
          </div>

          {/* Guests & Rooms */}
          <div className="grid md:grid-cols-2 gap-4">
            <Select onValueChange={(v) => setGuests(Number(v))}>
              <SelectTrigger>
                <SelectValue placeholder={`Guests: ${guests}`} />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={n.toString()}>{n} Guest(s)</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(v) => setRooms(Number(v))}>
              <SelectTrigger>
                <SelectValue placeholder={`Rooms: ${rooms}`} />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((n) => (
                  <SelectItem key={n} value={n.toString()}>{n} Room(s)</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Max Price (${price[0]})</Label>
            <Slider defaultValue={[500]} max={1000} step={50} onValueChange={setPrice} />
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
                  <Checkbox checked={amenities[amenity]} onCheckedChange={() => toggleAmenity(amenity)} />
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

          <Button className="w-full" onClick={handleSearch}>Search Hotels</Button>
        </CardContent>
      </Card>

      {/* Hotel Results */}
      {showResults && <HotelResults hotels={hotels} sortBy={sortBy} />}

    </div>
  )
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
  )
}

/* Hotel Results Cards */
function HotelResults({ hotels, sortBy }) {
  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {sortedHotels.map((hotel, idx) => (
        <Card key={idx} className="overflow-hidden">
          <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
          <CardContent className="space-y-2">
            <h3 className="text-lg font-semibold">{hotel.name}</h3>
            <p className="text-sm text-muted-foreground">{hotel.location}</p>
            <p className="font-bold">${hotel.price} / night</p>
            <p className="text-sm">Rating: {hotel.rating} ⭐</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {hotel.amenities.map((a) => (
                <span key={a} className="text-xs bg-muted px-2 py-1 rounded">{a}</span>
              ))}
            </div>
            <Button className="w-full mt-2">Book Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
