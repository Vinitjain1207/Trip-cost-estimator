import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Login } from "@/App";
import { Signup } from "@/App";
import TravelPage from "./TravelPage";
import HotelsPage from "./HotelsPage";
import {
  User,
  Menu,
  LayoutDashboard,
  Calculator,
  History,
  Settings,
} from "lucide-react";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CalendarIcon, ChevronsUpDown, Check } from "lucide-react";
import { Eye, EyeOff, X } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="booking">
      <TabsList>
        <TabsTrigger value="booking">Booking</TabsTrigger>
        <TabsTrigger value="travel">Travel</TabsTrigger>
        <TabsTrigger value="hotel">Hotels</TabsTrigger>
        <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
      </TabsList>
      <TabsContent value="booking">
        <Card>
          <BookingForm />
        </Card>
      </TabsContent>
      <TabsContent value="travel">
        <Card>
          <TravelPage />
        </Card>
      </TabsContent>
      <TabsContent value="hotel">
        <Card>
          <HotelsPage />
        </Card>
      </TabsContent>
      <TabsContent value="restaurants">
        <Card>
          <CardHeader>
            <CardTitle>Restaurant</CardTitle>
            <CardDescription>
              Manage your account preferences and options. Customize your
              experience to fit your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Configure notifications, security, and themes.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

const menuItems = [
  { path: "/book", label: "Booking Details", icon: LayoutDashboard },
  { path: "/estimate", label: "Trip Estimator", icon: Calculator },
  { path: "/history", label: "Saved Trips", icon: History },
  { path: "/settings", label: "Settings", icon: Settings },
];

const destinations = [
  { value: "paris", label: "Paris" },
  { value: "dubai", label: "Dubai" },
  { value: "tokyo", label: "Tokyo" },
  { value: "new-york", label: "New York" },
];

export function BookingForm() {
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState();
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [roomType, setRoomType] = useState("");
  const [budget, setBudget] = useState([3000]);
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [promo, setPromo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  // Checkbox states
  const [extras, setExtras] = useState({
    insurance: false,
    visa: false,
    cityTour: false,
    airportTransfer: false,
    adventure: false,
    breakfast: false,
    flexibleCancellation: false,
  });

  const toggleExtra = (key) => {
    setExtras((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = () => {
    const formData = {
      destination,
      dates,
      adults,
      children,
      rooms,
      roomType,
      budget: budget[0],
      extras,
      email,
      phone,
      promo,
      paymentMethod,
      notes,
    };

    console.log("Complete Booking Data:", formData);
  };

  return (
    <Card>
      <CardContent className="space-y-8 pt-6">
        {/* Destination */}
        <div className="space-y-2">
          <Label>Destination</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {destination
                  ? destinations.find((d) => d.value === destination)?.label
                  : "Select destination"}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search destination..." />
                <CommandEmpty>No destination found.</CommandEmpty>
                <CommandGroup>
                  {destinations.map((d) => (
                    <CommandItem
                      key={d.value}
                      value={d.value}
                      onSelect={(value) => {
                        setDestination(value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          destination === d.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {d.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label>Travel Dates</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dates?.from
                  ? `${format(dates.from, "PPP")} - ${
                      dates.to ? format(dates.to, "PPP") : ""
                    }`
                  : "Select date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dates}
                onSelect={setDates}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests & Rooms */}
        <div className="grid grid-cols-3 gap-4">
          <Counter label="Adults" value={adults} setValue={setAdults} min={1} />
          <Counter
            label="Children"
            value={children}
            setValue={setChildren}
            min={0}
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

        {/* Budget */}
        <div className="space-y-2">
          <Label>Budget (${budget[0]})</Label>
          <Slider
            defaultValue={[3000]}
            max={15000}
            step={500}
            onValueChange={setBudget}
          />
        </div>

        {/* Extras Section */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Add-ons & Services</Label>

          {[
            { key: "insurance", label: "Travel Insurance" },
            { key: "visa", label: "Visa Assistance" },
            { key: "cityTour", label: "Guided City Tour" },
            { key: "airportTransfer", label: "Airport Pickup & Drop" },
            { key: "adventure", label: "Adventure Activities" },
            { key: "breakfast", label: "Breakfast Included" },
            { key: "flexibleCancellation", label: "Flexible Cancellation" },
          ].map((item) => (
            <div key={item.key} className="flex items-center space-x-2">
              <Checkbox
                checked={extras[item.key]}
                onCheckedChange={() => toggleExtra(item.key)}
              />
              <Label>{item.label}</Label>
            </div>
          ))}
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        {/* Payment */}
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit-card">Credit Card</SelectItem>
              <SelectItem value="debit-card">Debit Card</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="netbanking">Net Banking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Promo Code */}
        <div className="space-y-2">
          <Label>Promo Code</Label>
          <Input
            placeholder="Enter promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label>Special Requests</Label>
          <Textarea
            placeholder="Any additional preferences..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleSubmit}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

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

export function Sidebar({ togglelogin }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={cn(
        "h-screen border-r bg-background transition-all duration-300 flex flex-col fixed top-0 left-0",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <>
            <h2 className="text-lg font-semibold">TripCalc</h2>
            <Button
              className="absolute right-14"
              variant="ghost"
              size="icon"
              onClick={togglelogin}
            >
              <User />
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.path} to={item.path} end>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingPage() {
  const [islogin, setIsLogin] = useState(false);
  const [issignup, setSignup] = useState(false);

  function toggleloginon() {
    setSignup(false);
    setIsLogin(!islogin);
  }
  function togglesignupon() {
    setIsLogin(false);
    setSignup(!issignup);
  }

  let x = islogin || issignup;

  return (
    <div className="min-w-15xl">
      <Sidebar togglelogin={toggleloginon} />
      {islogin ? (
        <Login togglelogin={toggleloginon} togglesignup={togglesignupon} />
      ) : (
        ""
      )}
      {issignup ? <Signup togglesignup={togglesignupon} /> : ""}
      {x ? "" : <TabsDemo />}
    </div>
  );
}
