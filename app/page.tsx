import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera } from "lucide-react";
import { AccordionDemo } from "./acc";
import { DataTable } from "./table";
import { payments, columns } from "./db-table";
import { AlertDemo } from "./alert-test";
import { ModeToggle } from "./Theme";
import { SonnerDemo } from "./sonnar";

export default function Home() {
  return (
    <div>
      <SonnerDemo />

      <AlertDemo />
      <ModeToggle />
      <div>
        <DataTable columns={columns} data={payments} />
        <AccordionDemo />
        <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-2xl">
          <div className="absolute inset-0 z-30 aspect-video bg-black/35 rounded-2xl" />
          <img
            src="https://i1.sndcdn.com/artworks-eMLFARDBI6sXZImn-ShHDXw-t500x500.jpg"
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover object-top brightness-60 grayscale dark:brightness-40 rounded-2xl"
          />
          <CardHeader>
            <CardAction>
              <Badge variant="thug">Thug</Badge>
            </CardAction>
            <CardTitle>
              <Camera />
              DreamyBullXXX
            </CardTitle>
            <CardDescription>
              Lets see The best of the best cum professer, Will help you edging
              to ultimate the gooning technical.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Register</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
