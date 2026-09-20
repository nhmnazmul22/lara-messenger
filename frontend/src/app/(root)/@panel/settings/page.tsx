import { RightPanel } from "@/components/settings/right-panel";
import { SettingsContent } from "@/components/settings/settings-content";

export default function SettingsPanel() {
  return (
    <RightPanel title="Settings">
      <SettingsContent />
    </RightPanel>
  );
}