import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function EssentialsPage() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("");

  const exchangeRate = 0.012; 
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return (
    <div className="min-h-screen max-w-4xl bg-gray-100">

      {/* Header */}
      <header className="bg-white shadow p-5 text-center text-2xl font-bold">
        🧳 Travel Essentials - Ahmedabad
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Essentials Kits */}
        <section>
          <h2 className="text-xl font-bold mb-4">Essential Kits</h2>
          <div className="grid md:grid-cols-4 gap-6">

            <Card className="shadow">
              <CardHeader>
                <CardTitle>🩺 Health Kit</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>✔ First Aid</li>
                  <li>✔ Medicines</li>
                  <li>✔ ORS</li>
                  <li>✔ Bandages</li>
                </ul>
                <p className="mt-2 font-semibold">₹499</p>
                <Button className="w-full mt-3">Add to Trip</Button>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader>
                <CardTitle>💧 Water & Refreshments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>✔ Mineral Water</li>
                  <li>✔ Energy Drinks</li>
                  <li>✔ Snacks</li>
                </ul>
                <p className="mt-2 font-semibold">₹299</p>
                <Button className="w-full mt-3">Add to Trip</Button>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader>
                <CardTitle>🧻 Hygiene Kit</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>✔ Tissues</li>
                  <li>✔ Wet Wipes</li>
                  <li>✔ Sanitizer</li>
                  <li>✔ Face Mask</li>
                </ul>
                <p className="mt-2 font-semibold">₹199</p>
                <Button className="w-full mt-3">Add to Trip</Button>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader>
                <CardTitle>🧳 Travel Combo Kit</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>✔ Health</li>
                  <li>✔ Water</li>
                  <li>✔ Hygiene</li>
                  <li>✔ Snacks</li>
                </ul>
                <Badge className="mt-2">Best Value</Badge>
                <p className="mt-2 font-semibold">₹799</p>
                <Button className="w-full mt-3">Add to Trip</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Currency Exchange */}
        <section>
          <h2 className="text-xl font-bold mb-4">💱 Currency Exchange</h2>
          <Card className="shadow">
            <CardContent className="grid md:grid-cols-4 gap-4 p-4">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount"
              />

              <Select onValueChange={setFromCurrency} defaultValue="INR">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setToCurrency} defaultValue="USD">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>

              <div className="bg-gray-100 p-2 rounded text-center">
                <p className="text-sm">Converted</p>
                <p className="font-bold">{convertedAmount} {toCurrency}</p>
              </div>

             
            </CardContent>
          </Card>
        </section>

        {/* Payment Options */}
        <section>
          <h2 className="text-xl font-bold mb-4">💳 Payment Options</h2>
          <Card className="shadow">
            <CardContent className="grid md:grid-cols-4 gap-4 p-4">
              <Button variant="outline">Credit Card</Button>
              <Button variant="outline">Debit Card</Button>
              <Button variant="outline">UPI</Button>
              <Button variant="outline">Cash</Button>
            </CardContent>
          </Card>
        </section>

        {/* SIM / eSIM */}
        <section>
          <h2 className="text-xl font-bold mb-4">📱 SIM & eSIM</h2>
          <div className="grid md:grid-cols-3 gap-6">

            <Card className="shadow">
              <CardHeader>
                <CardTitle>Local SIM</CardTitle>
              </CardHeader>
              <CardContent>
                <p>✔ 2GB/day</p>
                <p>✔ Unlimited calls</p>
                <p>✔ 7 Days</p>
                <p className="font-semibold mt-2">₹299</p>
                <Button className="w-full mt-3">Buy SIM</Button>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader>
                <CardTitle>Tourist SIM</CardTitle>
              </CardHeader>
              <CardContent>
                <p>✔ 3GB/day</p>
                <p>✔ International calls</p>
                <p>✔ 10 Days</p>
                <p className="font-semibold mt-2">₹499</p>
                <Button className="w-full mt-3">Buy SIM</Button>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader>
                <CardTitle>eSIM</CardTitle>
              </CardHeader>
              <CardContent>
                <p>✔ Instant Activation</p>
                <p>✔ Global Coverage</p>
                <p>✔ QR Code</p>
                <p className="font-semibold mt-2">₹699</p>
                <Button className="w-full mt-3">Buy eSIM</Button>
              </CardContent>
            </Card>

          </div>
        </section>
      </div>
    </div>
  );
}