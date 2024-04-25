"use client";

import React, {useEffect} from "react";
import {Send} from "lucide-react";
import {messageClaude} from "@/actions";
import Markdown from 'react-markdown'
import {IlaImplementation} from "@/components/portfolio/ilaImplementation";
import {IlaSpecs} from "@/components/portfolio/ilaSpecs";
import {OdysseyApp} from "@/components/portfolio/odysseyApp";
import {RedeemersApp} from "@/components/portfolio/redeemersApp";
import {BidManagement} from "@/components/portfolio/BidManagement";
import {IlaLantern} from "@/components/portfolio/IlaLantern";

type Message = {
  body: string
  author: string
}

const COMPONENTS = {
  ul: props => <ul className="list-none" {...props} />,
  li: props => <li className="my-2" {...props} />,
  p: props => <p className="mb-2" {...props} />
}

function ChatResponse(props: { message: Message }) {
  React.useEffect(() => {
    if (props.message.type === 'tool') {
      console.info('Calling tool', props.message.input.project)
      props.showProject(props.message.input.project)
    }
  }, [props.message])
  if (props.message.type === 'tool') {
    return (
      <div
        className={`my-3 text-white text-sm font-mono flex ${props.message.author === "assistant" ? "justify-start" : "justify-end"}`}>
        <div>
          Calling tool
          <pre>
          <code>
            {JSON.stringify(props.message, null, 2)}
          </code>
        </pre>
        </div>
      </div>
    )
  }
  return (
    <div
      className={`my-3 text-white text-lg flex ${props.message.author === "assistant" ? "justify-start" : "justify-end"}`}>
      <div>
        <Markdown components={COMPONENTS}>{props.message.body}</Markdown>
      </div>
    </div>
  );
}

function MeemoChat(props) {
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatboxRef = React.useRef<HTMLInputElement>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const handleNewMessage = React.useCallback(async function handleNewMessage() {
    if (inputRef.current !== null) {
      const newMessages = messages.concat({body: inputRef.current.value, author: 'user', type: 'text' })
      setMessages(newMessages);
      inputRef.current.value = '';
      setTimeout(() => {
        chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
      }, 0)
      setLoading(true);
      console.info('Sending Messages to Claude', newMessages)
      const response = await messageClaude(newMessages.filter(m => m.type === 'text'));
      console.info('Claudes Response', response)
      setMessages(state => state.concat(response));
      chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
    }
  }, [inputRef.current, messages, chatboxRef.current])

  console.info(messages);
  return (
    <div className={`${props.className} flex justify-center h-full w-1/4`}>
      <div className={`w-full h-full bg-gray-700 rounded-3xl backdrop-blur-sm bg-opacity-40 drop-shadow-2xl flex flex-col p-5 `}>
        <div className="flex-1 bg-black rounded-2xl bg-opacity-40 backdrop-blur-md p-5 flex flex-col overflow-scroll">
          <div className={`my-2 text-white text-lg flex justify-start`}>
            <p className="inline">I'm Marcus</p>
          </div>
          <div className={`my-2 text-white text-lg flex justify-start`}>
            <p className="inline">I am a disciple of Christ, a Husband, and a Product-Focused Engineer.</p>
          </div>
          <div className={`my-2 text-white text-lg flex justify-start`}>
            <p className="inline">I'm not here right now, but my assistant is.</p>
          </div>
          <div className={`my-2 text-white text-lg flex justify-start`}>
            <p className="inline">Feel free to ask them any questions about me you may have.</p>
          </div>
          {messages.map((message, i) => (
            <ChatResponse key={i} message={message} showProject={props.showProject}/>
          ))}
        </div>
        <div className="mt-3 h-12 bg-black rounded-2xl bg-opacity-40 backdrop-blur-md">
          <div className="flex flex-row h-full w-full items-center bg-transparent rounded-2xl">
            <input
              ref={inputRef}
              className="flex-1 text-gray-50 h-full w-full bg-transparent rounded-tl-2xl rounded-bl-2xl px-4 py-1 outline-0"
              autoFocus
            />
            <button className="rounded-full h-12 w-12 flex flex-col items-center justify-center pr-2" onMouseDown={handleNewMessage}>
              <Send className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const PROJECTS = {
  'Ila Lantern': {
    description: `A page that contains graphs representing Ila's performance numbers.`,
    component: <IlaLantern />
  },
  'Odyssey Journal': {
    description: `A page that showcases Odyssey Journal.`,
    component: <OdysseyApp active />
  },
  "Redeemer's App": {
    description: `A page that showcases Redeemer's App.`,
    component: <RedeemersApp active />
  },
  "Bid Management": {
    description: `A page that showcases Redeemer's App.`,
    component: <BidManagement />
  }
}

function HeroSection(props) {
  const [activeComponent, setActiveComponent] = React.useState(null);

  const showProject = React.useCallback(function showProject(projectToShow: string) {
    const project = PROJECTS[projectToShow];
    console.info('showProject', projectToShow, project);
    if (project) {
      setActiveComponent(project.component);
    }
  }, [PROJECTS, setActiveComponent])

  return (
    <section
      className="min-h-screen w-full relative flex flex-row">
      <MeemoChat
        className="bottom-0 fixed top-0 left-0"
        showProject={showProject}
      />
      <div className="w-1/4 h-full" />
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
