import { RightPanel } from "@/components/settings/right-panel";
import { ProfileForm } from "@/components/settings/profile-form";

export default function ProfilePanel() {
  return (
    <RightPanel title="Profile">
      <ProfileForm />
    </RightPanel>
  );
}