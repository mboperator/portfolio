"use client";

import React from "react";
import {BidManagement} from "@/components/portfolio/BidManagement/BidManagement";
import {IlaLantern} from "@/components/portfolio/IlaLantern/IlaLantern";
import {MeemoChat} from "@/components/meemo";
import {OdysseyJournal} from "@/components/portfolio/OdysseyJournal/OdysseyJournal";
import {RedeemersChurch} from "@/components/portfolio/RedeemersChurch/RedeemersChurch";
import {useVisibilityKeyboardShortcut} from "@/utils/useVisibilityKeyboardShortcut";
import {Prequalification} from "@/components/portfolio/Prequalification";

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
    component: IlaLantern
  },
  'Odyssey Journal': {
    description: `A page that showcases Odyssey Journal.`,
    component:OdysseyJournal
  },
  "Redeemer's Church Ventura": {
    description: `A page that showcases the Redeemer's Church Ventura App.`,
    component: RedeemersChurch
  },
  "Bid Management": {
    description: `A page that showcases Bid Management.`,
    component: BidManagement
  },
  "Prequalification": {
    description: `A page that showcases Prequalification.`,
    component: Prequalification
  }
}

function HeroSection() {
  const [activeComponent, setActiveComponent] = React.useState([<Backdrop key="backdrop" />]);
  const { isMinimized, setVisibility } = useVisibilityKeyboardShortcut();
  const [projectsVisible, setProjectsVisible] = React.useState(true);

  const showProject = React.useCallback(function showProject(projectsToShow: string[]): void {
    const projects = projectsToShow.map(project => {
      const Component = PROJECTS[project]?.component;
      return <Component key={project} />;
    });
    if (projects.length) {
      setProjectsVisible(false);
      setActiveComponent(projects);
      setTimeout(() => {
        setProjectsVisible(true);
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
      <section className={`flex flex-col w-full ${projectsVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        {activeComponent}
      </section>
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
