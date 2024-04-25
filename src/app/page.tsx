"use client";

import React, {useEffect} from "react";
import {BotMessageSquare, Send} from "lucide-react";
import {messageClaude} from "@/actions";
import Markdown from 'react-markdown'
import {OdysseyApp} from "@/components/portfolio/odysseyApp";
import {RedeemersApp} from "@/components/portfolio/redeemersApp";
import {BidManagement} from "@/components/portfolio/BidManagement";
import {IlaLantern} from "@/components/portfolio/IlaLantern";

type Message = {
  type: 'text' | 'tool'
  body: string
  author: string
  input?: any
}

const COMPONENTS = {
  ul: props => <ul className="list-none" {...props} />,
  li: props => <li className="my-2" {...props} />,
  p: props => <p className="mb-2" {...props} />
}

function ChatResponse(props: { showProject: any, message: Message }) {
  const showProject = React.useCallback(() => {
    if (props.message.type === 'tool') {
      console.info('Calling tool', props.message.input.project)
      props.showProject(props.message.input.project)
    }
  }, [props.showProject, props.message.input?.project])

  if (props.message.type === 'tool') {
    return (
      <div
        className={`my-3 text-white text-sm font-mono flex ${props.message.author === "assistant" ? "justify-start" : "justify-end"}`}>
        <button onMouseDown={showProject} className="cursor-pointer rounded-3xl p-3 bg-amber-400 bg-opacity-70 text-xs">
          {`Click here to show ${props.message.input.project}`}
        </button>
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
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatboxRef = React.useRef<HTMLInputElement>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const scrollChatbox = React.useCallback(function scrollChatbox() {
    console.info('Scrolling Chatbox');
    chatboxRef.current?.scrollTo({left: 0, top: chatboxRef.current.scrollHeight, behavior: 'smooth'});
  }, [chatboxRef]);

  React.useEffect(() => {
    setTimeout(() => {
      scrollChatbox();
    }, 50);
  }, [chatboxRef.current, messages])

  const handleNewMessage = React.useCallback(async function handleNewMessage() {
    if (inputRef.current !== null) {
      const newMessages = messages.concat({body: inputRef.current.value, author: 'user', type: 'text' })
      setMessages(newMessages);
      inputRef.current.value = '';

      setLoading(true);
      console.info('Sending Messages to Claude', newMessages)
      const response = await messageClaude(newMessages.filter(m => m.type === 'text'));
      console.info('Claudes Response', response)
      setMessages(state => state.concat(response));
      setLoading(false);
    }
  }, [inputRef.current, messages, chatboxRef, scrollChatbox]);


  const handleEnterKey = React.useCallback(function handleEnterKey(e) {
    if (e.key === 'Enter') {
      handleNewMessage();
    }
  }, [handleNewMessage])

  console.info(messages);

  function handleMinimize(e) {
    if (e.target !== backdropRef.current) {
      return;
    }
    props.toggleVisibility(true);
  }

  if (props.minimized) {
    return (
      <button
        className="z-50 fixed bottom-7 right-7 p-4 h-20 w-20 rounded-full bg-black bg-opacity-70 flex items-center justify-center text-white "
        onClick={() => props.toggleVisibility(false)}
      >
        <BotMessageSquare className="text-orange-300" size={120} />
      </button>
    )
  }
  return (
    <div ref={backdropRef} onMouseDown={handleMinimize} className={`z-50 bottom-0 fixed top-0 left-0 right-0 flex justify-center items-center h-full w-full backdrop-blur-sm bg-opacity-20 bg-white`}>
      <div className="w-1/2 h-1/2 flex flex-col px-3 pt-3 py-3 rounded-3xl bg-black bg-opacity-40 backdrop-blur-md">
          <div ref={chatboxRef} className="flex-1 bg-black rounded-2xl bg-opacity-40  p-5 flex flex-col overflow-scroll">
            {messages.map((message, i) => (
              <ChatResponse key={i} message={message} showProject={props.showProject}/>
            ))}
          </div>
          <div className="mt-3 h-12 bg-black rounded-2xl bg-opacity-40 drop-shadow-2xl">
            <div className="flex flex-row h-full w-full items-center bg-transparent rounded-2xl">
              <input
                ref={inputRef}
                disabled={loading}
                className="flex-1 text-gray-50 h-full w-full bg-transparent rounded-tl-2xl rounded-bl-2xl px-4 py-1 outline-0"
                autoFocus
                placeholder="ask meemo a question"
                onKeyDown={handleEnterKey}
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

function Backdrop() {
  return (
    <section
      className="min-h-screen w-full flex flex-row bg-cover bg-center bg-sunset">
    </section>
  )
}

function HeroSection(props) {
  const [activeComponent, setActiveComponent] = React.useState(<Backdrop />);
  const [meemoIsMinimized, setMeemoVisibility] = React.useState(false);

  const showProject = React.useCallback(function showProject(projectToShow: string) {
    const project = PROJECTS[projectToShow];
    console.info('showProject', projectToShow, project);
    if (project) {
      setActiveComponent(project.component);
      setMeemoVisibility(true);
    }
  }, [PROJECTS, setActiveComponent, setMeemoVisibility])

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
