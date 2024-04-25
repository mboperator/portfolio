import React from "react";
import {SYSTEM_PROMPT} from "@/prompts";
import {BotMessageSquare, Send} from "lucide-react";
import Markdown from "react-markdown";
import { useChat } from 'ai/react';


type Message = {
  type: 'text' | 'tool'
  body: string
  role: string
  input?: any
}

const COMPONENTS = {
  ul: props => <ul className="list-none" {...props} />,
  li: props => <li className="my-2" {...props} />,
  p: props => <p className="mb-2" {...props} />
}

function messageIsFunctionCall(message) {
  return message.content.includes('{')
}

function FunctionCall(props: { message: Message }) {

  const showProject = React.useCallback(() => {
    if (messageIsFunctionCall(props.message)) {
      try {
        const content = JSON.parse(props.message.content);
        console.info('Content', content);
        props.showProject(JSON.parse(content.tool_calls[0].function.arguments).project)
      } catch(e) {
      }
    }
  }, [props.message.content, props.showProject])

  React.useEffect(() => {
    if (messageIsFunctionCall(props.message)) {
      try {
        const content = JSON.parse(props.message.content);
        console.info('Content', content);
        //start timer
        setTimeout(() => {
          props.showProject(JSON.parse(content.tool_calls[0].function.arguments).project)
        }, 1200)
      } catch(e) {
      }
    }
  }, [props.message.content, props.showProject])

  try {
    const content = JSON.parse(props.message.content);
    console.info('Content', content);
    const project = JSON.parse(content.tool_calls[0].function.arguments).project
    return (
      <div
        className={`my-3 text-white text-sm font-mono flex ${props.message.role === "assistant" ? "justify-start" : "justify-end"}`}>
        <button onMouseDown={showProject} className="cursor-pointer rounded-3xl p-3 border-2 border-orange-300 hover:bg-orange-300 transition-colors bg-opacity-70 text-xs">
          {`Click here to show ${project}`}
        </button>
      </div>
    )
  } catch(e) {
    console.info(e.message);
    return (
      <div>Loading...</div>
    )
  }
}

function ChatResponse(props: { showProject: any, message: Message }) {
  if (messageIsFunctionCall(props.message)) {
    return (
      <FunctionCall message={props.message} showProject={props.showProject} />
    )
  }
  return (
    <div
      className={`my-3 text-white text-lg flex ${props.message.role === "assistant" ? "justify-start" : "justify-end"}`}>
      <div>
        <Markdown components={COMPONENTS}>{props.message.content}</Markdown>
      </div>
    </div>
  );
}


export function MeemoChat(props) {
  const [loading, setLoading] = React.useState(false);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatboxRef = React.useRef<HTMLInputElement>(null);
  const {messages, input, handleInputChange, handleSubmit} = useChat({
    initialMessages: [
      {content: SYSTEM_PROMPT, role: 'system'}
    ],
    onResponse: () => setLoading(true),
    onFinish: () => setLoading(false),
  });


  const scrollChatbox = React.useCallback(function scrollChatbox() {
    console.info('Scrolling Chatbox');
    chatboxRef.current?.scrollTo({left: 0, top: chatboxRef.current.scrollHeight, behavior: 'smooth'});
  }, [chatboxRef]);

  React.useEffect(() => {
    setTimeout(() => {
      scrollChatbox();
    }, 50);
  }, [chatboxRef, messages])

  React.useEffect(() => {
    if (props.minimized || loading) {
      return;
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, [inputRef, loading, props.minimized])

  function handleMinimize(e) {
    if (e.target !== backdropRef.current) {
      return;
    }
    props.toggleVisibility(true);
  }

  const handleSendMessage = React.useCallback(function handleSendMessage(e) {
    handleSubmit(e);
    inputRef.current.value = '';
  }, [inputRef, handleSubmit])

  const handleIgnoredChars = React.useCallback(function handleIgnoredChars(e) {
    if (e.key === '/') {
      e.preventDefault();
    }
  }, []);

  return (
    <>
      <div ref={backdropRef} onMouseDown={handleMinimize}
           className={`z-50 bottom-0 fixed top-0 left-0 right-0 flex justify-center items-center h-full w-full backdrop-blur-sm bg-opacity-20 bg-white ${props.minimized ? 'invisible opacity-0' : 'visible opacity-100'} transition-all duration-300`}>
        <div className={`w-1/2 h-1/2 flex flex-col px-3 pt-3 py-3 rounded-3xl bg-black bg-opacity-40 backdrop-blur-md ${props.minimized ? '-translate-y-7' : 'translate-y-7'} transition-all duration-300`}>
          <div ref={chatboxRef} className="flex-1 bg-black rounded-2xl bg-opacity-40  p-5 flex flex-col overflow-scroll">
            {messages.filter(a => a.role !== 'system').map((message, i) => (
              <ChatResponse key={i} message={message} showProject={props.showProject}/>
            ))}
          </div>
          <div
            className={`mt-3 h-12 bg-black rounded-2xl bg-opacity-40 drop-shadow-2xl ${loading && 'bg-transparent'} transition-colors duration-300`}>
            <form className="flex flex-row h-full w-full items-center bg-transparent rounded-2xl"
                  onSubmit={handleSendMessage}>
              <input
                ref={inputRef}
                disabled={loading}
                className="flex-1 text-gray-50 h-full w-full bg-transparent rounded-tl-2xl rounded-bl-2xl px-4 py-1 outline-0 disabled:placeholder:opacity-50 disabled:cursor-not-allowed disabled:placeholder:opacity-0 transition-colors duration-300"
                autoFocus
                placeholder="ask meemo a question"
                onKeyDown={handleIgnoredChars}
                onChange={handleInputChange}
              />
              <button type="submit"
                      className="text-white hover:text-orange-300 transition-colors duration-300 rounded-full h-12 w-12 flex flex-col items-center justify-center pr-2">
                <Send className="" size={20}/>
              </button>
            </form>
          </div>
        </div>
      </div>
      <button
        className="z-50 fixed bottom-7 right-7 p-4 h-20 w-20 rounded-full bg-black bg-opacity-70 flex items-center justify-center text-white "
        onClick={() => props.toggleVisibility(false)}
      >
        <BotMessageSquare className="text-orange-300" size={120}/>
      </button>
    </>
  );
}
