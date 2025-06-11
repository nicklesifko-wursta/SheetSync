import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Cog, FileText, DatabaseZap, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  const features = [
    {
      title: "Configure Destinations",
      description: "Set up your Google Drive folders and BigQuery tables for synchronization.",
      link: "/configure",
      icon: Cog,
      cta: "Configure Now",
    },
    {
      title: "Dynamic Schema Mapping",
      description: "Let AI analyze your sheet data and suggest a BigQuery schema.",
      link: "/schema-mapping",
      icon: DatabaseZap,
      cta: "Map Schema",
    },
    {
      title: "View Transfer Reports",
      description: "Monitor the status and history of your data transfers.",
      link: "/reports",
      icon: BarChart3,
      cta: "View Reports",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to SheetSync!</CardTitle>
          <CardDescription className="text-lg">
            Effortlessly synchronize your Google Sheets data to BigQuery.
            Automate your data pipelines and keep your analytics up-to-date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Get started by configuring your data sources and destinations, or explore our AI-powered schema mapping.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <feature.icon className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-center">{feature.title}</CardTitle>
              <CardDescription className="text-center min-h-[3em]">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href={feature.link} passHref>
                <Button>
                  {feature.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold text-muted-foreground">Google Drive Link</h3>
            <p className="text-2xl font-bold text-green-400">Connected</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold text-muted-foreground">Folder Monitoring</h3>
            <p className="text-2xl font-bold text-green-400">Active</p>
            <p className="text-xs text-muted-foreground">Monitoring 'My Data Folder'</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold text-muted-foreground">Last Sync</h3>
            <p className="text-2xl font-bold">2 hours ago</p>
            <p className="text-xs text-muted-foreground">Next sync: in 4 hours</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
