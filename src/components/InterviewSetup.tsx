"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DURATIONS } from "@/constants/duration";
import { DIFFICULTIES } from "@/constants/difficulty";

interface Props {
  type: "resume" | "role";
  role?: string;
  onSubmit: (data: {
    duration: number;
    difficulty: string;
    resumeFile?: File;
  }) => void;
}

export default function InterviewSetup({ type, role, onSubmit }: Props) {
  const [duration, setDuration] = useState<number>(25);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [resume, setResume] = useState<File | null>(null);

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Interview Setup</h2>
        <p className="text-sm text-muted-foreground">
          {type === "resume"
            ? "Interview will be based on your resume"
            : `Role: ${role}`}
        </p>
      </div>

      <div>
        <p className="font-medium mb-2">Duration</p>
        <div className="flex gap-3">
          {DURATIONS.map((d) => (
            <Button
              key={d.value}
              variant={duration === d.value ? "default" : "outline"}
              onClick={() => setDuration(d.value)}
            >
              {d.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">Difficulty</p>
        <div className="flex gap-3">
          {DIFFICULTIES.map((d) => (
            <Button
              key={d.value}
              variant={difficulty === d.value ? "default" : "outline"}
              onClick={() => setDifficulty(d.value)}
            >
              {d.label}
            </Button>
          ))}
        </div>
      </div>

      {type === "resume" && (
        <div>
          <p className="font-medium mb-2">Upload Resume (PDF)</p>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
          />
        </div>
      )}

      <Button
        className="w-full"
        onClick={() =>
          onSubmit({
            duration,
            difficulty,
            resumeFile: resume || undefined,
          })
        }
      >
        Start Interview
      </Button>
    </Card>
  );
}
