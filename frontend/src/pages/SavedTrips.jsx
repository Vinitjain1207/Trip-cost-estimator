import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Users, Trash2, Eye } from "lucide-react";
import { Sidebar } from "./BookingPage";

export default function SavedTripsDashboard() {

  const savedtrips = (localStorage.getItem('savedlocaltrips') || 0);
  const localtrips = JSON.parse(savedtrips);
  const [search, setSearch] = useState("");
  const [trips, setTrips] = useState(localtrips);

  const deleteTrip = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  const filteredTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(search.toLowerCase()),
  );
if(savedtrips)
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-5 text-2xl font-bold text-center">
          Saved Trips Dashboard
        </header>

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search trips by destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />

          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <Card key={trip.id} className="shadow hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {trip.destination}
                    <Badge variant="outline">₹{trip.budget}</Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{trip.destination}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      {trip.startDate} → {trip.endDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{trip.travelers} Travelers</span>
                  </div>

                  <div>
                    <p className="font-semibold">Transport</p>
                    <p>{trip.transport}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Hotel</p>
                    <p>{trip.hotel}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Activities</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {trip.activities.map((act, i) => (
                        <Badge key={i} variant="secondary">
                          {act}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTrips.length === 0 && (
            <div className="text-center text-gray-500 pt-20">
              No trips found
            </div>
          )}
        </div>
      </div>
    </>
  );

  return(<>
          <Sidebar />
  </>);
}
