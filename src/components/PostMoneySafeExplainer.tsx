'use client'
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, id }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
    <Input
      id={id}
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
  </div>
);

const PostMoneySafeExplainer: React.FC = () => {
  const [valuation, setValuation] = useState<number>(5000000);
  const [investment, setInvestment] = useState<number>(500000);
  const [outstandingShares, setOutstandingShares] = useState<number>(1000000);
  const [outstandingOptions, setOutstandingOptions] = useState<number>(100000);
  const [promisedOptions, setPromisedOptions] = useState<number>(50000);
  const [unissuedOptionPool, setUnissuedOptionPool] = useState<number>(150000);
  const [convertingSecurities, setConvertingSecurities] = useState<number>(0);
  const [includeProRata, setIncludeProRata] = useState<boolean>(false);
  const [liquidityEventProceeds, setLiquidityEventProceeds] = useState<number>(10000000);

  const ownershipPercentage = useMemo(() => {
    return (investment / valuation) * 100;
  }, [investment, valuation]);

  const calculateLiquidityPayout = useMemo(() => {
    const liquidityCapitalization = outstandingShares + outstandingOptions + promisedOptions + convertingSecurities;
    const liquidityPrice = valuation / liquidityCapitalization;
    const conversionAmount = (investment / liquidityPrice) * (liquidityEventProceeds / liquidityCapitalization);
    return Math.max(investment, conversionAmount);
  }, [outstandingShares, outstandingOptions, promisedOptions, convertingSecurities, valuation, investment, liquidityEventProceeds]);

  const pieChartData = useMemo(() => [
    { name: 'Your Investment', value: investment },
    { name: 'Company Valuation', value: valuation - investment },
  ], [investment, valuation]);

  const COLORS = ['#0088FE', '#00C49F'];

  const Overview: React.FC = () => (
    <Card>
      <CardHeader>
        <CardTitle>What is a Post-Money SAFE?</CardTitle>
        <CardDescription>Simple Agreement for Future Equity</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">A post-money SAFE (Simple Agreement for Future Equity) is a financial instrument used for early-stage startup funding. Unlike the original SAFE, the post-money version provides immediate transparency on the amount of ownership sold to investors.</p>
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Valuation cap is stated in terms of post-money valuation</li>
              <li>Simplifies ownership calculations</li>
              <li>Designed to better match the reality of independent financing rounds</li>
              <li>Excludes new money raised in equity financing from cap calculations</li>
              <li>Treats SAFEs as an independent financing round</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
  const Calculator: React.FC = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-xl">Advanced Ownership Calculator</CardTitle>
        <CardDescription>Estimate ownership based on detailed company capitalization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <InputField label="Post-Money Valuation Cap ($)" value={valuation} onChange={setValuation} id="valuation" />
          <div className="space-y-2">
            <Label htmlFor="investment-slider" className="text-sm font-medium">Investment Amount ($): {investment}</Label>
            <Slider
              id="investment-slider"
              min={0}
              max={valuation}
              step={10000}
              value={[investment]}
              onValueChange={(value) => setInvestment(value[0])}
            />
          </div>
          <InputField label="Outstanding Shares" value={outstandingShares} onChange={setOutstandingShares} id="outstandingShares" />
          <InputField label="Outstanding Options" value={outstandingOptions} onChange={setOutstandingOptions} id="outstandingOptions" />
          <InputField label="Promised Options" value={promisedOptions} onChange={setPromisedOptions} id="promisedOptions" />
          <InputField label="Unissued Option Pool" value={unissuedOptionPool} onChange={setUnissuedOptionPool} id="unissuedOptionPool" />
          <InputField label="Converting Securities" value={convertingSecurities} onChange={setConvertingSecurities} id="convertingSecurities" />
          <div className="font-semibold text-lg">Estimated Ownership: {ownershipPercentage.toFixed(2)}%</div>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LiquidityEvents: React.FC = () => (
    <Card>
      <CardHeader>
        <CardTitle>Liquidity Events</CardTitle>
        <CardDescription>Understand SAFE holder payouts in liquidity events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>In a liquidity event (e.g., acquisition or IPO), SAFE holders are entitled to receive the greater of:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Their original investment amount (Purchase Amount)</li>
            <li>The amount they would receive if the SAFE converted to common stock</li>
          </ol>
          <InputField label="Liquidity Event Proceeds ($)" value={liquidityEventProceeds} onChange={setLiquidityEventProceeds} id="liquidityEventProceeds" />
          <p className="font-semibold text-lg">Estimated Payout: ${calculateLiquidityPayout.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );

  const ProRata: React.FC = () => (
    <Card>
      <CardHeader>
        <CardTitle>Pro Rata Rights</CardTitle>
        <CardDescription>Optional rights for SAFE holders to participate in future rounds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Pro rata rights allow SAFE holders to participate in future financing rounds to maintain their ownership percentage. These rights are not included in the post-money SAFE by default but can be granted via a separate side letter.</p>
          <div className="flex items-center space-x-2">
            <Switch
              id="prorata-switch"
              checked={includeProRata}
              onCheckedChange={setIncludeProRata}
            />
            <Label htmlFor="prorata-switch">Include Pro Rata Rights</Label>
          </div>
          {includeProRata && (
            <div>
              <p className="font-semibold">Considerations for granting pro rata rights:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>May require a minimum investment amount</li>
                <li>Can be granted to all SAFE holders or selectively</li>
                <li>May impact future round dynamics and dilution</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const Glossary: React.FC = () => (
    <Card>
      <CardHeader>
        <CardTitle>Glossary</CardTitle>
        <CardDescription>Key terms related to Post-Money SAFEs</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>SAFE</AccordionTrigger>
            <AccordionContent>
              Simple Agreement for Future Equity. A financing instrument used by early-stage startups to raise capital.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Post-Money Valuation</AccordionTrigger>
            <AccordionContent>
              The companys value after receiving the investment, including the new funds.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Liquidity Event</AccordionTrigger>
            <AccordionContent>
              An event that allows company shareholders to cash out some or all of their ownership, such as an acquisition or IPO.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Pro Rata Rights</AccordionTrigger>
            <AccordionContent>
              The right of an investor to participate in future funding rounds to maintain their ownership percentage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Conversion</AccordionTrigger>
            <AccordionContent>
              The process of a SAFE turning into equity (typically preferred stock) during a priced funding round.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
  const FAQ: React.FC = () => (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Does a SAFE convert in a round of equity financing?</CardTitle>
            </CardHeader>
            <CardContent>
              Yes, when the company sells preferred stock in a priced round, outstanding SAFEs will convert into shares of preferred stock. This conversion is automatic and does not require a threshold amount to be raised.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What happens if the company is acquired?</CardTitle>
            </CardHeader>
            <CardContent>
              In a Change of Control event, SAFE holders are entitled to receive the greater of their Purchase Amount or the amount they would receive if the SAFE converted to common stock at the Post-Money Valuation Cap.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Do SAFE holders get pro-rata rights?</CardTitle>
            </CardHeader>
            <CardContent>
              Pro-rata rights are not included in the post-money SAFE by default. They can be granted via a separate side letter at the companys discretion. This allows for more flexibility in allocating these rights based on factors like investment amount or strategic importance.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How does the post-money SAFE differ from the original SAFE?</CardTitle>
            </CardHeader>
            <CardContent>
              The main differences are: 1) It uses a post-money valuation cap, 2) It simplifies ownership calculations, 3) It excludes new money raised in equity financing from cap calculations, 4) It treats SAFEs as an independent financing round, and 5) Pro-rata rights are optional and provided via a separate side letter.
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Post-Money SAFE Explainer</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="flex flex-nowrap space-x-1 p-1 bg-gray-100 rounded-lg min-w-max">
            <TabsTrigger value="overview" className="flex-shrink-0 px-3 py-2 text-sm">Overview</TabsTrigger>
            <TabsTrigger value="calculator" className="flex-shrink-0 px-3 py-2 text-sm">Calculator</TabsTrigger>
            <TabsTrigger value="liquidity" className="flex-shrink-0 px-3 py-2 text-sm">Liquidity</TabsTrigger>
            <TabsTrigger value="prorata" className="flex-shrink-0 px-3 py-2 text-sm">Pro Rata</TabsTrigger>
            <TabsTrigger value="faq" className="flex-shrink-0 px-3 py-2 text-sm">FAQ</TabsTrigger>
            <TabsTrigger value="glossary" className="flex-shrink-0 px-3 py-2 text-sm">Glossary</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview"><Overview /></TabsContent>
        <TabsContent value="calculator"><Calculator /></TabsContent>
        <TabsContent value="liquidity"><LiquidityEvents /></TabsContent>
        <TabsContent value="prorata"><ProRata /></TabsContent>
        <TabsContent value="faq"><FAQ /></TabsContent>
        <TabsContent value="glossary"><Glossary /></TabsContent>
      </Tabs>
    </div>
  );
};

export default PostMoneySafeExplainer;