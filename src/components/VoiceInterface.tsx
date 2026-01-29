"use client";

import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi";
import { Button } from "@/components/ui/button";

interface Props {
  prompt: string;
  onEnd: () => void;
}

export default function VoiceInterface({ prompt, onEnd }: Props) {
  const [isActive, setIsActive] = useState(false);

  const startInterview = async () => {
    setIsActive(true);
     console.log("START INTERVIEW CLICKED");

    await vapi.start({
      model: {
        provider: "openai",
         model: "gpt-4o-realtime-preview" as any,
        messages: [
          {
            role: "system",
            content: prompt,
          },
        ],
      },
      voice: {
        provider: "11labs",
        voiceId: "Rachel",
      },
    });
  };

  const stopInterview = async () => {
    await vapi.stop();
    setIsActive(false);
    onEnd();
  };

  useEffect(() => {
    const handleCallEnd = () => {
      setIsActive(false);
      onEnd();
    };

    vapi.on("call-end", handleCallEnd);

    return () => {
      vapi.off("call-end", handleCallEnd);
    };
  }, [onEnd]);

  return (
    <div className="space-y-4">
      {!isActive ? (
        <Button onClick={startInterview}>
          Start Voice Interview
        </Button>
      ) : (
        <Button variant="destructive" onClick={stopInterview}>
          End Interview
        </Button>
      )}
    </div>
  );
}
