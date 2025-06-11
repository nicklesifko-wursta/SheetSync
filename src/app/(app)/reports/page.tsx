"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, LoaderCircle, BarChart3 } from "lucide-react";
import { format } from "date-fns";

type TransferLog = {
  id: string;
  timestamp: Date;
  fileName: string;
  status: 'Success' | 'Failure' | 'Processing';
  details: string;
};

const mockLogs: TransferLog[] = [
  { id: '1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), fileName: 'Q4_Sales_Data.xlsx', status: 'Success', details: '1500 rows transferred.' },
  { id: '2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), fileName: 'User_Feedback_Jan.csv', status: 'Failure', details: 'Error: Column mismatch. Expected 5 columns, got 4.' },
  { id: '3', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), fileName: 'Inventory_Update_Mar.gsheet', status: 'Success', details: '872 rows appended.' },
  { id: '4', timestamp: new Date(Date.now() - 1000 * 60 * 30), fileName: 'Upcoming_Campaigns.xlsx', status: 'Processing', details: 'Transfer initiated, awaiting completion.' },
  { id: '5', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), fileName: 'Archived_Leads.csv', status: 'Success', details: '5301 rows transferred.' },
  { id: '6', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), fileName: 'Website_Analytics_Feb.gsheet', status: 'Failure', details: 'API rate limit exceeded. Will retry.' },
];

const StatusIcon = ({ status }: { status: TransferLog['status'] }) => {
  switch (status) {
    case 'Success':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'Failure':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'Processing':
      return <LoaderCircle className="h-5 w-5 text-blue-500 animate-spin" />;
    default:
      return null;
  }
};

export default function ReportsPage() {
  // State for logs, filtering, pagination can be added here
  const [logs] = React.useState<TransferLog[]>(mockLogs);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Transfer Reports</CardTitle>
          </div>
          <CardDescription>
            Monitor the history and status of your data transfers from Google Sheets to BigQuery.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Transfer Logs</CardTitle>
          <CardDescription>Showing the latest {logs.length} transfer attempts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge 
                      variant={log.status === 'Success' ? 'default' : log.status === 'Failure' ? 'destructive' : 'secondary'}
                      className={`flex items-center gap-2 w-fit whitespace-nowrap ${
                        log.status === 'Success' ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30' : 
                        log.status === 'Failure' ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30' : 
                        'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30'
                      }`}
                    >
                      <StatusIcon status={log.status} /> 
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(log.timestamp, 'MMM d, yyyy HH:mm:ss')}</TableCell>
                  <TableCell className="font-medium">{log.fileName}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {logs.length === 0 && (
            <p className="py-8 text-center text-muted-foreground">No transfer logs available yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
