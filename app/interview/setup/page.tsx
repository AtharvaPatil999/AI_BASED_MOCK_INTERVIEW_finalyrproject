"use client";

import { useSearchParams, useRouter } from "next/navigation";
import InterviewSetup from "@/components/InterviewSetup";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase";

export default function InterviewSetupPage() {
  const params = useSearchParams();
  const router = useRouter();

  const type = params.get("type") as "resume" | "role";
  const role = params.get("role");

  const handleStart = async ({
    duration,
    difficulty,
    resumeFile,
  }: {
    duration: number;
    difficulty: string;
    resumeFile?: File;
  }) => {
    const user = auth.currentUser;
    if (!user) return;

    // Resume upload will be implemented next
    let resumeId = null;

    const interviewRef = await addDoc(
      collection(db, "users", user.uid, "interviews"),
      {
        type,
        role: role || null,
        resumeId,
        duration,
        difficulty,
        status: "created",
        startTime: null,
        endTime: null,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/interview/session/${interviewRef.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <InterviewSetup type={type} role={role || undefined} onSubmit={handleStart} />
    </div>
  );
}
