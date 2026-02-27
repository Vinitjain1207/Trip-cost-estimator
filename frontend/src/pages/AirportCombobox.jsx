import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandGroup } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from "lucide-react"

const airports = [
  { code: "JFK", name: "New York (JFK)" },
  { code: "LHR", name: "London Heathrow (LHR)" },
  { code: "DXB", name: "Dubai (DXB)" },
  { code: "CDG", name: "Paris (CDG)" },
  { code: "AMD", name: "Ahmedabad" },
  { code: "BOM", name: "Mumbai" },

]

export default function AirportCombobox({ label, value, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {value || "Select Airport"}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search airport..." />
            <CommandGroup>
              {airports.map((airport) => (
                <CommandItem
                  key={airport.code}
                  onSelect={() => {
                    onChange(airport.code)
                    setOpen(false)
                  }}
                >
                  {airport.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
