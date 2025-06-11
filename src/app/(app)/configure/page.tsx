"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FolderKanban, DatabaseZap, Link as LinkIcon, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  driveFolderId: z.string().min(5, "Folder ID must be at least 5 characters"),
  bqProjectId: z.string().min(3, "Project ID must be at least 3 characters"),
  bqDatasetId: z.string().min(1, "Dataset ID is required"),
  bqTableId: z.string().min(1, "Table ID is required"),
});

type ConfigurationFormValues = z.infer<typeof formSchema>;

export default function ConfigurePage() {
  const { toast } = useToast();
  const form = useForm<ConfigurationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driveFolderId: "",
      bqProjectId: "",
      bqDatasetId: "",
      bqTableId: "",
    },
  });

  function onSubmit(values: ConfigurationFormValues) {
    console.log("Configuration submitted:", values);
    // Here you would typically save the configuration to a backend or state management
    toast({
      title: "Configuration Saved",
      description: "Your settings have been successfully saved.",
      variant: "default",
    });
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Configuration</CardTitle>
          <CardDescription>
            Set up your Google Drive and BigQuery connection details.
          </CardDescription>
        </CardHeader>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-6 w-6 text-primary" />
                <CardTitle>Google Drive Authentication</CardTitle>
              </div>
              <CardDescription>
                Authorize SheetSync to access your Google Drive files.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Status: <span className="font-semibold text-green-400">Connected (user@example.com)</span></p>
                <p className="text-xs text-muted-foreground">This is a placeholder. Actual OAuth flow would be implemented here.</p>
              </div>
              <Button type="button" variant="outline">
                <LinkIcon className="mr-2 h-4 w-4" /> Connect to Google Drive
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FolderKanban className="h-6 w-6 text-primary" />
                <CardTitle>Google Drive Configuration</CardTitle>
              </div>
              <CardDescription>
                Specify the Google Drive folder to monitor for new or updated sheets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="driveFolderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Google Drive Folder ID" {...field} />
                    </FormControl>
                    <FormDescription>
                      The ID of the Google Drive folder SheetSync should monitor.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DatabaseZap className="h-6 w-6 text-primary" />
                <CardTitle>BigQuery Destination</CardTitle>
              </div>
              <CardDescription>
                Define the BigQuery table where data will be appended.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="bqProjectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project ID</FormLabel>
                    <FormControl>
                      <Input placeholder="your-gcp-project-id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bqDatasetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dataset ID</FormLabel>
                    <FormControl>
                      <Input placeholder="your_dataset_id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bqTableId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Table ID</FormLabel>
                    <FormControl>
                      <Input placeholder="your_table_id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              <Save className="mr-2 h-5 w-5" /> Save Configuration
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
