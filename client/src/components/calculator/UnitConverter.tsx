import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CONVERSIONS = {
  length: {
    units: ['meters', 'inches', 'centimeters', 'feet'],
    rates: {
      meters: { inches: 39.3701, centimeters: 100, feet: 3.28084 },
      inches: { meters: 0.0254, centimeters: 2.54, feet: 0.0833333 },
      centimeters: { meters: 0.01, inches: 0.393701, feet: 0.0328084 },
      feet: { meters: 0.3048, inches: 12, centimeters: 30.48 }
    }
  },
  weight: {
    units: ['kilograms', 'pounds'],
    rates: {
      kilograms: { pounds: 2.20462 },
      pounds: { kilograms: 0.453592 }
    }
  },
  temperature: {
    units: ['celsius', 'fahrenheit'],
    rates: {
      celsius: { fahrenheit: (c: number) => (c * 9/5) + 32 },
      fahrenheit: { celsius: (f: number) => (f - 32) * 5/9 }
    }
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [value, setValue] = useState('1');
  
  const convert = (value: string, from: string, to: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    
    const rates = CONVERSIONS[category as keyof typeof CONVERSIONS].rates;
    if (from === to) return value;
    
    if (category === 'temperature') {
      return rates[from][to](num).toFixed(4);
    }
    
    return (num * rates[from][to]).toFixed(4);
  };

  return (
    <div className="space-y-4">
      <Select
        value={category}
        onValueChange={(value) => {
          setCategory(value);
          setFromUnit(CONVERSIONS[value as keyof typeof CONVERSIONS].units[0]);
          setToUnit(CONVERSIONS[value as keyof typeof CONVERSIONS].units[1]);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(CONVERSIONS).map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger>
              <SelectValue placeholder="From unit" />
            </SelectTrigger>
            <SelectContent>
              {CONVERSIONS[category as keyof typeof CONVERSIONS].units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger>
              <SelectValue placeholder="To unit" />
            </SelectTrigger>
            <SelectContent>
              {CONVERSIONS[category as keyof typeof CONVERSIONS].units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="text"
            value={convert(value, fromUnit, toUnit)}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
