import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Counter } from "./BookingPage";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import AirportCombobox from "./AirportCombobox";
import FlightResults from "./FlightResults";

export default function FlightSearch() {
  const [tripType, setTripType] = useState("round");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [maxPrice, setMaxPrice] = useState([1000]);
  const [nonStop, setNonStop] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [showResults, setShowResults] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      {/* Multi-city toggle */}
      <Select value={tripType} onValueChange={setTripType}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="oneway">One Way</SelectItem>
          <SelectItem value="round">Round Trip</SelectItem>
          <SelectItem value="multicity">Multi-City</SelectItem>
        </SelectContent>
      </Select>

      {/* Airport Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <AirportCombobox label="From" value={from} onChange={setFrom} />
        <AirportCombobox label="To" value={to} onChange={setTo} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Counter
          label="Quantity"
          value={quantity}
          setValue={(value) => {
            setQuantity(value);
          }}
          min={1}
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox checked={nonStop} onCheckedChange={setNonStop} />
          <span>Non-stop Flights Only</span>
        </div>

        <div>
          <label className="text-sm font-medium">
            Max Price (₹{maxPrice[0]})
          </label>
          <Slider
            defaultValue={[1000]}
            max={5000}
            step={100}
            onValueChange={setMaxPrice}
          />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Lowest Price</SelectItem>
            <SelectItem value="duration">Shortest Duration</SelectItem>
            <SelectItem value="departure">Earliest Departure</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full" onClick={handleSearch}>
        Search Flights
      </Button>

      {showResults && <FlightResults quantity={quantity} sortBy={sortBy} />}
    </div>
  );
}
