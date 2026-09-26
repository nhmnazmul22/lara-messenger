"use client";

import { PanelSheet } from "@/components/settings/panel-sheet";
import { ProfileForm } from "@/components/settings/profile-form";
import { SettingsContent } from "@/components/settings/settings-content";
import Navbar from "@/components/Layout/Navbar";
import { usePanel } from "@/contexts/PanelContext";
import BlurEffect from "../common/BlurEffect";
import MobileView from "../Layout/MobileView";
import Sidebar from "../Layout/Sidebar";

function Home() {
  const { panel, setPanel } = usePanel();

  return (
    <div className="flex h-svh flex-col overflow-hidden bg-muted/50">
      <main className="mx-auto w-full max-w-[1600px] min-h-0 flex-1 px-3 py-3 sm:px-5 sm:py-4">
        <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-background shadow-lg shadow-black/5 ring-1 ring-border/70">
          <Navbar />
          <MobileView />
          <BlurEffect />

          <Sidebar />
          <PanelSheet
            title="Profile"
            open={panel === "profile"}
            onClose={() => setPanel(null)}
          >
            <ProfileForm />
          </PanelSheet>
          <PanelSheet
            title="Settings"
            open={panel === "settings"}
            onClose={() => setPanel(null)}
          >
            <SettingsContent />
          </PanelSheet>
        </div>
      </main>
    </div>
  );
}

export default Home;
