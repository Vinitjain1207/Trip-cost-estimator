import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const activitiesData = [
  {
    id: 1,
    name: "Sabarmati Riverfront Walk",
    category: "Nature",
    description: "Enjoy a peaceful walk along the Sabarmati River with scenic sunset views.",
    duration: "2 hrs",
    price: 100,
    image: "./src/assets/Sabarmati.jpg"
  },
  {
    id: 2,
    name: "Adalaj Stepwell",
    category: "Heritage",
    description: "Historic stepwell with beautiful Indo-Islamic architecture.",
    duration: "1.5 hrs",
    price: 150,
    image: "./src/assets/Adalaj.jpg"
  },
  {
    id: 3,
    name: "Manek Chowk Night Food Tour",
    category: "Food",
    description: "Taste Ahmedabad’s famous street food at night markets.",
    duration: "3 hrs",
    price: 500,
    image: "./src/assets/manekchowk.jpg"
  },
  {
    id: 4,
    name: "Science City",
    category: "Adventure",
    description: "Explore science exhibits, IMAX theatre and robotics park.",
    duration: "3 hrs",
    price: 400,
    image: "./src/assets/science_city.jpg"
  }
];

const categories = ["All", "Nature", "Heritage", "Food", "Adventure", "Shopping"];

export default function Activities() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState("");

  const filteredActivities =
    selectedCategory === "All"
      ? activitiesData
      : activitiesData.filter(a => a.category === selectedCategory);

  const totalCost = people * (selectedActivity?.price || 0);

  return (
    <div className="min-h-screen max-w-4xl bg-gray-50">

      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src="./src/assets/ahmedabad.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold">
            Explore :Ahmedabad
          </h1>
          <p className="mt-2 text-lg">Attractions, activities & experiences</p>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex gap-3 overflow-x-auto p-4 bg-white shadow sticky top-0 z-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap
              ${selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-6">

        {/* Activity Timeline */}
        <div className="md:col-span-2 space-y-6">
          {filteredActivities.map(activity => (
            <Card
              key={activity.id}
              className="flex flex-col md:flex-row overflow-hidden shadow hover:shadow-lg transition"
              onClick={() => setSelectedActivity(activity)}
            >
              <img
                src={activity.image}
                className="md:w-1/3 h-48 object-cover"
              />
              <CardContent className="p-4 space-y-2">
                <h2 className="text-xl font-bold">{activity.name}</h2>
                <Badge>{activity.category}</Badge>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p>⏱ {activity.duration}</p>
                <p className="font-semibold">₹{activity.price} per person</p>
                <Button variant="outline" className="mt-2">
                  View & Book
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Side Booking Panel (instead of dialog) */}
        <div className="bg-white shadow rounded-lg p-5 sticky top-24 h-fit">
          <h2 className="text-xl font-bold mb-3">Booking Panel</h2>

          {selectedActivity ? (
            <>
              <img
                src={selectedActivity.image}
                className="h-40 w-full object-cover rounded mb-3"
              />

              <h3 className="font-bold">{selectedActivity.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedActivity.description}
              </p>

              <Input
                type="date"
                className="mb-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <Input
                type="number"
                min="1"
                placeholder="Number of People"
                className="mb-2"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
              />

              <div className="bg-gray-100 p-3 rounded mb-3">
                <p>Price: ₹{selectedActivity.price} / person</p>
                <p className="font-bold">Total: ₹{totalCost}</p>
              </div>

              <Button className="w-full">Add to Trip Plan</Button>
            </>
          ) : (
            <p className="text-gray-500">
              Select an activity to book from the list.
            </p>
          )}
        </div>
      </div>

    </div>
  );
}