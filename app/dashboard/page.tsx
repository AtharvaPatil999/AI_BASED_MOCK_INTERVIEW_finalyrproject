import RoleCard from "@/components/RoleCard";
import ResumeUpload from "@/components/ResumeUpload";
import { ROLES } from "@/constants/roles";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Mock Interviews</h1>
        <p className="text-muted-foreground mt-1">
          Practice real interviews with voice-based AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResumeUpload />
      </div>

      <div>
        <h2 className="text-xl font-medium mb-4">Interview by Role</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLES.map((role) => (
            <RoleCard
              key={role.id}
              id={role.id}
              title={role.title}
              description={role.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
