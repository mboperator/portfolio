"use client";

import React from "react";
import {BidManagement} from "@/components/portfolio/BidManagement";
import {IlaLantern} from "@/components/portfolio/IlaLantern";
import {MeemoChat} from "@/components/meemo";
import {OdysseyJournal} from "@/components/portfolio/OdysseyJournal";
import {RedeemersChurch} from "@/components/portfolio/RedeemersChurch";
import {useVisibilityKeyboardShortcut} from "@/utils/useVisibilityKeyboardShortcut";

function Backdrop() {
  return (
    <section
      className="min-h-screen w-full flex flex-row bg-cover bg-center bg-sunset">
    </section>
  )
}

const PROJECTS:{ [key: string]: any } = {
  'Ila Lantern': {
    description: `A page that contains graphs representing Ila's performance numbers.`,
    component: <IlaLantern />
  },
  'Odyssey Journal': {
    description: `A page that showcases Odyssey Journal.`,
    component:<OdysseyJournal />
  },
  "Redeemer's App": {
    description: `A page that showcases Redeemer's App.`,
    component: <RedeemersChurch />
  },
  "Bid Management": {
    description: `A page that showcases Redeemer's App.`,
    component: <BidManagement />
  }
}

function HeroSection() {
  const [activeComponent, setActiveComponent] = React.useState(<Backdrop />);
  const { isMinimized, setVisibility } = useVisibilityKeyboardShortcut();

  const showProject = React.useCallback(function showProject(projectToShow: string): void {
    const project = PROJECTS[projectToShow];
    console.info('showProject', projectToShow, project);
    if (project) {
      setActiveComponent(project.component);
      setTimeout(() => {
        setVisibility(true);
      }, 10);
    }
  }, [PROJECTS, setActiveComponent, setVisibility])


  return (
    <section
      className="min-h-screen w-full relative flex flex-row">
      <MeemoChat
        minimized={isMinimized}
        showProject={showProject}
        toggleVisibility={() => setVisibility(visibility => !visibility)}
      />
      {activeComponent}
    </section>
  )
}

function Contact() {
  return (
    <section className="h-screen flex flex-col p-12 justify-center items-center">
      <a href="mailto:hello@marcusbernal.es">
        <h1 className="text-white text-7xl underline">email me</h1>
      </a>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col w-screen bg-black">
      <HeroSection />
      <Contact />
    </main>
  );
}
