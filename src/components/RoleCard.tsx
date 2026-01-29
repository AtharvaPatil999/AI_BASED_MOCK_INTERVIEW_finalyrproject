"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface RoleCardProps {
  id: string;
  title: string;
  description: string;
}

export default function RoleCard({
  id,
  title,
  description,
}: RoleCardProps) {
  const router = useRouter();

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{description}</p>

        <Button
          onClick={() =>
            router.push(`/interview/setup?type=role&role=${id}`)
          }
        >
          Start Interview
        </Button>
      </CardContent>
    </Card>
  );
}
