import { useState } from 'react';

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
    <div className="row g-3">
      <div className="col-12">
        <select
          className="form-select"
          value={category}
          onChange={(e) => {
            const newCategory = e.target.value;
            setCategory(newCategory);
            setFromUnit(CONVERSIONS[newCategory as keyof typeof CONVERSIONS].units[0]);
            setToUnit(CONVERSIONS[newCategory as keyof typeof CONVERSIONS].units[1]);
          }}
        >
          {Object.keys(CONVERSIONS).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="col-6">
        <select
          className="form-select mb-2"
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
        >
          {CONVERSIONS[category as keyof typeof CONVERSIONS].units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="col-6">
        <select
          className="form-select mb-2"
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
        >
          {CONVERSIONS[category as keyof typeof CONVERSIONS].units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control"
          value={convert(value, fromUnit, toUnit)}
          readOnly
        />
      </div>
    </div>
  );
}