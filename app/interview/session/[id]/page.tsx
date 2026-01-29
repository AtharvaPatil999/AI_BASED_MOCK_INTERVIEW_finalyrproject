"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import VoiceInterface from "@/components/VoiceInterface";
import { generateInterviewPrompt } from "@/lib/prompts";
import { auth } from "@/lib/firebase";

export default function InterviewSessionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [prompt, setPrompt] = useState<string | null>(null);

  useEffect(() => {
  const generatedPrompt = generateInterviewPrompt({
    type: "role",
    role: "java",
    difficulty: "easy",
    duration: 25,
  });

  setPrompt(generatedPrompt);
}, []);





  const handleEnd = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid, "interviews", id as string);
    await updateDoc(ref, {
      status: "completed",
      endTime: serverTimestamp(),
    });

    router.push(`/interview/result/${id}`);
  };

  if (!prompt) {
    return <p className="p-8">Loading interview...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Interview in Progress</h1>

      <VoiceInterface prompt={prompt} onEnd={handleEnd} />
    </div>
  );
}

