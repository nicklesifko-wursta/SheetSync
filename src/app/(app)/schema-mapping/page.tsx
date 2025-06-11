"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { handleSuggestSchema } from "./actions";
import { Wand2, FileSpreadsheet, Loader2, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

export default function SchemaMappingPage() {
  const [csvData, setCsvData] = useState("");
  const [suggestedSchema, setSuggestedSchema] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setError(null);
    setSuggestedSchema("");

    if (!csvData.trim()) {
      setError("CSV data input cannot be empty.");
      toast({
        title: "Input Error",
        description: "CSV data input cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const result = await handleSuggestSchema({ spreadsheetData: csvData });
      if (result.schema) {
        setSuggestedSchema(result.schema);
        toast({
          title: "Schema Suggested",
          description: "AI has successfully suggested a schema.",
        });
      } else {
        setError(result.error || "An unknown error occurred.");
        toast({
          title: "Error Suggesting Schema",
          description: result.error || "An unknown error occurred.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wand2 className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Dynamic Schema Mapping</CardTitle>
          </div>
          <CardDescription>
            Paste your Google Sheet data (in CSV format) below. Our AI will analyze it and suggest a BigQuery schema.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-6 w-6 text-primary" />
              <CardTitle>Input Google Sheet Data (CSV)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Label htmlFor="csvData">Paste CSV Data Here</Label>
            <Textarea
              id="csvData"
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              placeholder="Example:\nname,age,city\nAlice,30,New York\nBob,24,San Francisco"
              rows={15}
              className="mt-2 font-code text-xs"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isPending || !csvData.trim()}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Suggest Schema
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
               <DatabaseZapIcon className="h-6 w-6 text-primary" />
              <CardTitle>Suggested BigQuery Schema (JSON)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-md border border-destructive bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}
            {suggestedSchema && !error && (
              <ScrollArea className="h-[350px] w-full rounded-md border p-4 bg-muted/30">
                <pre className="text-xs font-code whitespace-pre-wrap break-all">
                  {JSON.stringify(JSON.parse(suggestedSchema), null, 2)}
                </pre>
              </ScrollArea>
            )}
            {!suggestedSchema && !error && !isPending && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Wand2 className="h-12 w-12 mb-2" />
                <p>Your suggested schema will appear here.</p>
              </div>
            )}
             {isPending && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-12 w-12 mb-2 animate-spin text-primary" />
                <p>AI is thinking...</p>
              </div>
            )}
          </CardContent>
          {suggestedSchema && !error && (
            <CardFooter className="flex justify-end">
               <Button variant="outline" onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(JSON.parse(suggestedSchema), null, 2));
                  toast({ title: "Schema Copied!", description: "The JSON schema has been copied to your clipboard." });
                }}>
                Copy Schema
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}

// Helper icon component as DatabaseZap might not be available in all lucide versions
function DatabaseZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 12 22A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 12 15A9 3 0 0 0 21 12" />
      <path d="m13 12-3 10 5.5-5-3.5-5Z" />
    </svg>
  );
}
