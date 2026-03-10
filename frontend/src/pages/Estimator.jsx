import { useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookContext } from "./BookingContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sidebar } from "./BookingPage";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function TripPlannerDashboard() {
  const Books = useContext(BookContext);
  const [people, setPeople] = useState(1);
  let helpinfo = "";
  for (const [key, value] of Object.entries(Books[1])) {
    if (value === true) {
      helpinfo = helpinfo + `${key}, `; // Recurse for nested objects
    }
  }
  let flightinfo = `FlightType: ${Books[3].FlightType},
    Depart: ${Books[3].Depart},
    Return: ${Books[3].Return},
    Airlines: ${Books[3].Airlines},
    Quantity: ${Books[3].Quantity},
    Duration: ${Books[3].Duration},
  `;

  let traininfo = ` 
    date: ${Books[5].date},
    Berth: ${Books[5].Berth},
    TrainName: ${Books[6].TrainName},
    Trainclass: ${Books[6].Trainclass},
    Cost: ${Books[6].Cost},
    Coach: ${Books[6].Coach},
    Depart: ${Books[6].Depart},
    Arrival: ${Books[6].Arrival}
    `;

  let businfo = `date: ${Books[7].date},
    Seats: ${Books[7].Seats},
    BusName: ${Books[8].BusName},
    BusType: ${Books[8].BusType},
    Cost: ${Books[8].Cost},
    Depart: ${Books[8].Depart},
    Arrival: ${Books[8].Arrival},
  `;
  let hotelinfo = `
  name: ${Books[9].name},
    location: ${Books[9].location},
    Cost: ${Books[9].Cost},
    rating: ${Books[9].rating},
    checkindate: ${Books[9].checkindate},
    checkoutdate: ${Books[9].checkoutdate},
    guest: ${Books[9].guest},
    room: ${Books[9].room},
    roomtype: ${Books[9].roomtype},
    amenities: ${Books[9].amenities},
  `;
  let restinfo = `
  name: ${Books[10].name},
    cuisine: ${Books[10].cuisine},
    rating: ${Books[10].rating},
    date: ${Books[10].date},
    guest: ${Books[10].guest},
    Table: ${Books[10].Table},
    Time: ${Books[10].Time},
    Cost: ${Books[10].Cost},
  `;
  let actinfo = ``;
  let activitis = [];
  let accost = 0;
  for (const obj of Books[11]) {
    if (obj.Cost !== 0) {
      actinfo = actinfo + `${obj.type}, `;
      accost = accost + obj.Cost;
      activitis.push(obj.type);
    }
  }

  let kitinfo = ``;
  let kitcost = 0;

  if (Books[12].Cost !== 0) {
    kitinfo = kitinfo + `${Books[12].type}, `;
    kitcost = kitcost + Books[12].Cost;
  }
  if (Books[13].Cost !== 0) {
    kitinfo = kitinfo + `${Books[13].type}, `;
    kitcost = kitcost + Books[13].Cost;
  }
  if (Books[14].Cost !== 0) {
    kitinfo = kitinfo + `${Books[14].type}, `;
    kitcost = kitcost + Books[14].Cost;
  }
  if (Books[15].Cost !== 0) {
    kitinfo = kitinfo + `${Books[15].type}, `;
    kitcost = kitcost + Books[15].Cost;
  }

  let currinfo = ``;
  if (Books[16].Cost !== 0) {
    currinfo = currinfo + `${Books[16].Cost}`;
  }

  let siminfo = ``;
  if (Books[17].Cost !== 0) {
    siminfo = siminfo + `${Books[17].SimCard}`;
  }

  console.log(
    helpinfo +
      flightinfo +
      traininfo +
      businfo +
      hotelinfo +
      restinfo +
      actinfo +
      kitinfo +
      currinfo +
      siminfo,
  );

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Assistance",
      category: "Assistance",
      info: helpinfo,
      price: helpinfo === `` ? 0 : 1000,
    },
    {
      id: 2,
      name: "Flight Ticket",
      category: "Transport",
      info: flightinfo,
      price: Books[3].Cost,
    },
    {
      id: 3,
      name: "Train Ticket",
      category: "Transport",
      info: traininfo,
      price: Books[6].Cost,
    },
    {
      id: 4,
      name: "Bus Ticket",
      category: "Transport",
      info: businfo,
      price: Books[8].Cost,
    },
    {
      id: 5,
      name: "Hotel",
      category: "Accomodation",
      info: hotelinfo,
      price: Books[9].Cost,
    },
    {
      id: 6,
      name: "Restaurant",
      category: "Dining",
      info: restinfo,
      price: Books[10].Cost,
    },
    {
      id: 7,
      name: "Attractions",
      category: "Activities",
      info: actinfo,
      price: accost,
    },
    {
      id: 8,
      name: "Kits",
      category: "Essentials",
      info: kitinfo,
      price: kitcost,
    },
    {
      id: 9,
      name: "Currency Exchange",
      category: "Essentials",
      info: currinfo,
      price: Books[16].CurrencyExchange,
    },
    {
      id: 10,
      name: "Sim Card",
      category: "Essentials",
      info: siminfo,
      price: Books[17].Cost,
    },
  ]);

  const removeExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const totalCost = expenses.reduce((sum, e) => sum + e.price, 0);

  const costPerPerson = (totalCost / people).toFixed(2);

  const categoryTotals = Object.values(
    expenses.reduce((acc, e) => {
      if (!acc[e.category]) acc[e.category] = { name: e.category, value: 0 };
      acc[e.category].value += e.price;
      return acc;
    }, {}),
  );

  const COLORS = ["#2563eb", "#22c55e", "#f97316", "#a855f7", "#ef4444"];

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-5 text-center text-2xl font-bold">
          Trip Estimator
        </header>

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* SUMMARY CARDS */}

          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Trip Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹{totalCost}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget</CardTitle>
              </CardHeader>
              <CardContent>
                {totalCost > Books[0].Budget ? (
                  <p className="text-3xl text-red-900 font-bold">
                    ₹{Books[0].Budget}
                  </p>
                ) : (
                  <p className="text-3xl font-bold">₹{Books[0].Budget}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>People</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  min={1}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Per Person</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹{costPerPerson}</p>
              </CardContent>
            </Card>
          </div>

          {/* EXPENSE CHART */}

          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>

            <CardContent className="h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                    {categoryTotals.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* EXPENSE LIST */}

          <Card>
            <CardHeader>
              <CardTitle>Trip Expenses</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {expenses.map((item) => {
                if (item.price > 0) {
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between border p-4 rounded-lg bg-white"
                    >
                      <div className="max-w-[500px] flex flex-start flex-col justify-start">
                        <div className="flex items-center">
                          <p className="font-semibold">{item.name}</p>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                        <p className="text-left">{item.info}</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <p className="font-bold">₹{item.price}</p>

                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeExpense(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  );
                }
              })}
            </CardContent>
          </Card>

          {/* PAYMENT */}

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-lg">Total Payable</p>
                <p className="text-3xl font-bold">₹{totalCost}</p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline">Pay via UPI</Button>

                <Button variant="outline">Credit Card</Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-blue-300" variant="outline">
                      Confirm Payment
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Continue if confirmed.
                        Details from the forms will be removed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          const oldtrips =
                            localStorage.getItem("savedlocaltrips");
                          const trips = JSON.parse(oldtrips);
                          let newid = oldtrips.length;
                          trips.push({
                            activities: activitis,
                            budget: Books[0].Budget,
                            destination: Books[0].destination,
                            endDate: Books[3].Return,
                            hotel: Books[9].name,
                            id: newid,
                            startDate: Books[3].Depart,
                            transport: "Flight",
                            travelers: Books[3].Quantity,
                          });
                          localStorage.setItem('savedlocaltrips',JSON.stringify(trips));
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
