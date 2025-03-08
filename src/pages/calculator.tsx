import { useState } from 'react';
import Display from '@/components/calculator/Display';
import Keypad from '@/components/calculator/Keypad';
import Scientific from '@/components/calculator/Scientific';
import UnitConverter from '@/components/calculator/UnitConverter';
import History from '@/components/calculator/History';
import { useCalculator } from '@/hooks/use-calculator';

export default function Calculator() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const calculator = useCalculator();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2">Scientific Calculator</h1>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              Dark Mode
            </label>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <Display 
                expression={calculator.expression}
                result={calculator.result}
                memory={calculator.memory}
              />

              <ul className="nav nav-tabs mb-3" role="tablist">
                <li className="nav-item">
                  <button 
                    className="nav-link active" 
                    data-bs-toggle="tab" 
                    data-bs-target="#standard"
                    type="button"
                  >
                    Standard
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link" 
                    data-bs-toggle="tab" 
                    data-bs-target="#scientific"
                    type="button"
                  >
                    Scientific
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link" 
                    data-bs-toggle="tab" 
                    data-bs-target="#converter"
                    type="button"
                  >
                    Converter
                  </button>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane fade show active" id="standard">
                  <Keypad onInput={calculator.handleInput} />
                </div>
                <div className="tab-pane fade" id="scientific">
                  <Scientific onInput={calculator.handleInput} />
                </div>
                <div className="tab-pane fade" id="converter">
                  <UnitConverter />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <History history={calculator.history} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}