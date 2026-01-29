"use client";

import { useRouter, useSearchParams } from "next/navigation";
import InterviewSetup from "@/components/InterviewSetup";

export default function InterviewSetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") as "resume" | "role";
  const role = searchParams.get("role") || undefined;

  return (
    <div className="max-w-xl mx-auto p-8">
      <InterviewSetup
        type={type}
        role={role}
        onSubmit={(data) => {
          console.log("SUBMITTED:", data);

          router.push("/interview/session/test-id");
        }}
      />
    </div>
  );
}
