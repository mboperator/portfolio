"use client";

import React, {SyntheticEvent} from "react";
import {OdysseyApp} from "@/components/portfolio/odysseyApp";
import {RedeemersApp} from "@/components/portfolio/redeemersApp";
import {BidManagement} from "@/components/portfolio/BidManagement";
import {IlaLantern} from "@/components/portfolio/IlaLantern";
import {MeemoChat} from "@/components/meemo";
import {OdysseyJournal} from "@/components/portfolio/OdysseyJournal";
import {RedeemersChurch} from "@/components/portfolio/RedeemersChurch";

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
  const [meemoIsMinimized, setMeemoVisibility] = React.useState(false);

  const showProject = React.useCallback(function showProject(projectToShow: string): void {
    const project = PROJECTS[projectToShow];
    console.info('showProject', projectToShow, project);
    if (project) {
      setActiveComponent(project.component);
      setTimeout(() => {
        setMeemoVisibility(true);
      }, 10);
    }
  }, [PROJECTS, setActiveComponent, setMeemoVisibility])

  const toggleMeemoVisibility = React.useCallback(function toggleMeemoVisibility() {
      setMeemoVisibility(!meemoIsMinimized);

  }, [setMeemoVisibility, meemoIsMinimized]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        toggleMeemoVisibility();
      } else if (event.key === "Escape") {
        setMeemoVisibility(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleMeemoVisibility, meemoIsMinimized, setMeemoVisibility]);


  return (
    <section
      className="min-h-screen w-full relative flex flex-row">
      <MeemoChat
        minimized={meemoIsMinimized}
        showProject={showProject}
        toggleVisibility={() => setMeemoVisibility(visibility => !visibility)}
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
