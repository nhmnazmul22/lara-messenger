"use client";

import React from 'react';
import {PanelSheet} from "@/components/settings/panel-sheet";
import {ProfileForm} from "@/components/settings/profile-form";
import {SettingsContent} from "@/components/settings/settings-content";
import {usePanel} from "@/contexts/PanelContext";


const Panels = () => {
    const { panel, setPanel } = usePanel();

    return (
        <>
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
        </>
    );
};

export default Panels;