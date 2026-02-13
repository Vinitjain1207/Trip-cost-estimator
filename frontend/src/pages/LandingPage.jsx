import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Wallet, Users, BarChart3, MapPin, Globe, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const trips = [
  {
    city: "Goa",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: "₹15,000",
    days: "3 Days",
  },
  {
    city: "Manali",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    price: "₹18,000",
    days: "4 Days",
  },
  {
    city: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    price: "₹45,000",
    days: "5 Days",
  },
  {
    city: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    price: "₹95,000",
    days: "6 Days",
  },
  {
    city: "Bali",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: "₹60,000",
    days: "5 Days",
  },
  {
    city: "New York",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    price: "₹1,10,000",
    days: "6 Days",
  },
];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm px-8 py-4 flex justify-between">
        <h1 className="text-2xl font-bold text-indigo-600">TripWise</h1>
        <div className="space-x-4">
          <Link to="/book"><Button variant="outline">Login</Button></Link>
          <Link to="/book"><Button>Get Started</Button></Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative text-center px-8 py-36 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-300 blur-3xl opacity-30 rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-300 blur-3xl opacity-30 rounded-full" />

        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          Travel Planning
          <span className="block text-indigo-600">Reimagined</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
          Estimate trip costs, split expenses, compare transport modes,
          and travel with complete budget confidence.
        </p>
        <Link to="/book"><Button size="lg">Estimate My Trip</Button></Link>
      </section>

      {/* TRUST BADGES */}
      <section className="flex justify-center gap-8 py-10 text-gray-600">
        <Trust label="Secure" icon={<ShieldCheck />} />
        <Trust label="Global" icon={<Globe />} />
        <Trust label="Smart" icon={<Sparkles />} />
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-20">
        <Stat title="10K+" label="Trips Planned" />
        <Stat title="95%" label="Accuracy" />
        <Stat title="120+" label="Cities" />
        <Stat title="₹1Cr+" label="Saved" />
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-8 py-20 grid md:grid-cols-3 gap-6">
        <Feature icon={<Wallet />} title="Smart Budgeting" desc="Know your total trip cost before booking." />
        <Feature icon={<Users />} title="Group Splitting" desc="Fairly divide expenses among travelers." />
        <Feature icon={<Plane />} title="Transport Comparison" desc="Choose the most cost-effective travel." />
        <Feature icon={<MapPin />} title="Location-Based Costs" desc="Costs vary smartly by destination." />
        <Feature icon={<BarChart3 />} title="Expense Analytics" desc="Track estimated vs actual spending." />
        <Feature icon={<Globe />} title="Multi-Currency Support" desc="Perfect for international travel." />
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24 px-8">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6">
          <Step step="1" title="Enter Details" desc="Destination, days, people." />
          <Step step="2" title="Select Style" desc="Budget, mid, or luxury." />
          <Step step="3" title="Get Estimate" desc="Instant cost breakdown." />
          <Step step="4" title="Travel Smart" desc="Stay within budget." />
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-6xl mx-auto px-8 py-24">
        <h3 className="text-3xl font-bold text-center mb-12">Perfect For</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <UseCase title="Solo Travelers" desc="Plan affordable solo trips." />
          <UseCase title="Friends & Groups" desc="Split costs without confusion." />
          <UseCase title="Family Vacations" desc="Avoid unexpected expenses." />
        </div>
      </section>

      {/* TRIP GALLERY */}
<section className="px-8 py-20 max-w-7xl mx-auto">
  <h3 className="text-3xl font-bold text-center mb-4">
    Popular Trips
  </h3>
  <p className="text-center text-gray-600 mb-12">
    Hand-picked destinations with estimated budgets
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {trips.map((trip, index) => (
      <Card
        key={index}
        className="overflow-hidden rounded-2xl shadow-md 
        hover:shadow-xl transition-all hover:-translate-y-1"
      >
        <img
          src={trip.image}
          alt={trip.city}
          className="h-48 w-full object-cover"
        />

        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold">{trip.city}</h4>
            <span className="text-sm text-gray-500">
              {trip.days}
            </span>
          </div>

          <p className="text-indigo-600 font-semibold mt-2">
            Starting from {trip.price}
          </p>

          <Button className="w-full mt-4" variant="outline">
            View Estimate
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
</section>


      {/* TESTIMONIALS */}
      <section className="bg-indigo-600 text-white py-24 px-8">
        <h3 className="text-3xl font-bold text-center mb-12">What Users Say</h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <Testimonial name="Aarav" text="TripWise made planning our Goa trip super easy!" />
          <Testimonial name="Neha" text="Loved the group expense split feature." />
          <Testimonial name="Rahul" text="Accurate and simple budget estimation." />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-center py-28 px-8">
        <h3 className="text-4xl font-bold mb-4">Start Planning Smarter Trips</h3>
        <p className="mb-8 text-lg text-gray-600">No spreadsheets. No confusion.</p>
        <Link to="/book"><Button size="lg">Plan My Trip Now</Button></Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center py-6 text-gray-500">
        © 2026 TripWise | MERN Stack Project
      </footer>

{/* FAQ SECTION */}
<section className="px-8 py-20 max-w-5xl mx-auto">
  <h3 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h3>
  <div className="space-y-4">
    {[
      { q: "How accurate is the cost estimation?", a: "Our estimates are based on average real-world travel costs and give a close approximation." },
      { q: "Can I plan group trips?", a: "Yes, you can split costs among multiple travelers." },
      { q: "Is this free to use?", a: "Yes, TripWise is free for basic trip planning." },
    ].map((item, i) => (
      <Card key={i} className="rounded-xl">
        <CardContent className="p-4">
          <p className="font-semibold">{item.q}</p>
          <p className="text-sm text-gray-600 mt-1">{item.a}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</section>

{/* FINAL FLOATING CTA */}
<section className="fixed bottom-6 right-6">
  <Button className="rounded-full shadow-lg px-6 py-4 text-lg">
    Start Planning ✈️
  </Button>
</section>

    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
      <CardContent className="p-6 text-center">
        <div className="mb-4 text-indigo-600 flex justify-center">{icon}</div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-600">{desc}</p>
      </CardContent>
    </Card>
  );
}

function Stat({ title, label }) {
  return (
    <Card className="rounded-2xl shadow-md text-center">
      <CardContent className="p-6">
        <h4 className="text-3xl font-bold text-indigo-600">{title}</h4>
        <p className="text-gray-600">{label}</p>
      </CardContent>
    </Card>
  );
}

function Step({ step, title, desc }) {
  return (
    <Card className="rounded-2xl shadow-md text-center">
      <CardContent className="p-6">
        <div className="text-4xl font-bold text-indigo-600 mb-4">{step}</div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-600">{desc}</p>
      </CardContent>
    </Card>
  );
}

function UseCase({ title, desc }) {
  return (
    <Card className="rounded-2xl shadow-md text-center">
      <CardContent className="p-6">
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-600">{desc}</p>
      </CardContent>
    </Card>
  );
}

function Testimonial({ name, text }) {
  return (
    <Card className="bg-white text-gray-800 rounded-2xl shadow-md">
      <CardContent className="p-6">
        <p className="italic mb-4">“{text}”</p>
        <h5 className="font-bold">— {name}</h5>
      </CardContent>
    </Card>
  );
}

function Trust({ icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-indigo-600">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}
