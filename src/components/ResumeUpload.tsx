"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ResumeUpload() {
  const router = useRouter();

  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>Resume-Based Interview</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Upload your resume and get interviewed based on your skills and experience.
        </p>

        <Button
          variant="outline"
          onClick={() => router.push("/interview/setup?type=resume")}
        >
          Upload Resume & Start
        </Button>
      </CardContent>
    </Card>
  );
}
