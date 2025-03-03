import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Display from '@/components/calculator/Display';
import Keypad from '@/components/calculator/Keypad';
import Scientific from '@/components/calculator/Scientific';
import UnitConverter from '@/components/calculator/UnitConverter';
import History from '@/components/calculator/History';
import { useCalculator } from '@/hooks/use-calculator';
import { Moon, Sun } from 'lucide-react';

export default function Calculator() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const calculator = useCalculator();
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Scientific Calculator</h1>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <Display 
                expression={calculator.expression}
                result={calculator.result}
                memory={calculator.memory}
              />
              
              <Tabs defaultValue="standard" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="standard" className="flex-1">Standard</TabsTrigger>
                  <TabsTrigger value="scientific" className="flex-1">Scientific</TabsTrigger>
                  <TabsTrigger value="converter" className="flex-1">Converter</TabsTrigger>
                </TabsList>
                
                <TabsContent value="standard">
                  <Keypad onInput={calculator.handleInput} />
                </TabsContent>
                
                <TabsContent value="scientific">
                  <Scientific onInput={calculator.handleInput} />
                </TabsContent>
                
                <TabsContent value="converter">
                  <UnitConverter />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <History history={calculator.history} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
