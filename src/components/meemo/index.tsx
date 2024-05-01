import React, {HTMLProps, KeyboardEventHandler} from "react";
import {BotMessageSquare, Send} from "lucide-react";
import Markdown from "react-markdown";
import { useChat } from 'ai/react';
import {create} from "zustand";
import {debounce} from "next/dist/server/utils";

type Message = {
  content: string
  role: string
  input?: any
}

const COMPONENTS = {
  ul: (props: HTMLProps<HTMLUListElement>) => <ul className="list-none" {...props} />,
  li: (props: HTMLProps<HTMLLIElement>) => <li className="list-none leading-loose" {...props} />,
  p: (props: HTMLProps<HTMLParagraphElement>) => <p className="" {...props} />,
  h1: (props: HTMLProps<HTMLHeadingElement>) => <h1 className="leading-loose text-xl font-bold" {...props} />,
  h2: (props: HTMLProps<HTMLHeadingElement>) => <h2 className="leading-loose font-bold" {...props} />
}

async function retrieveRelevantProjects(message: Message) {
  try {
    const response = await fetch('/api/tools',{
      method: 'POST',
      body: JSON.stringify({messages: [ message ]})
    })
    const data = await response.json()
    return data.content[0].input.projects;
  } catch(e: any) {
    console.error('Error retrieving relevant tools', e.message)
    return [];
  }
}

function Response(props: { scrollResponses: () => void, showProject: any, message: Message }) {
  const queriedToolsMutex = React.useRef(false);
  const [relevantProjects, setRelevantProjects] = React.useState([]);
  const isResponding = useMeemoStore(state => state.isResponding);

  const showProjects = React.useCallback(() => {
    props.showProject(relevantProjects);
  }, [props.showProject, relevantProjects, props.scrollResponses])

  React.useEffect(() => {
    if (props.message.role === 'assistant' && !isResponding && !queriedToolsMutex.current) {
      retrieveRelevantProjects(props.message).then(setRelevantProjects).then(props.scrollResponses);
      queriedToolsMutex.current = true;
    }
  }, [props.message, isResponding, queriedToolsMutex])

  return (
    <div
      className={`my-3 text-white text-lg flex flex-col ${props.message.role === "assistant" ? "justify-start" : "justify-end text-right"}`}>
      <Markdown components={COMPONENTS}>{props.message.content}</Markdown>
      <div className={`mt-3 ${relevantProjects.length > 0 ? 'h-12' : 'h-0' } overflow-hidden transition-all duration-300`}>
        <button onPointerUp={showProjects} className="cursor-pointer rounded-3xl p-3 border-2 border-orange-300 hover:bg-orange-300 transition-colors bg-opacity-70 text-xs">
          {`Click here to show ${relevantProjects.length} projects.`}
        </button>
      </div>
    </div>
  );
}

const scrollNodeToEnd = debounce((node: HTMLElement) => {
  node.scrollTo({left: 0, top: node.scrollHeight, behavior: 'smooth'});
}, 300);

type ResponsesProps = {
  messages: Message[]
  showProject: (projects: string[]) => void
}
const Responses = function Responses(props: ResponsesProps) {
  const responsesRef = React.useRef<HTMLInputElement>(null);

  const scrollResponses = React.useCallback(function scrollResponses() {
    console.info('Scrolling Responses');
    if (responsesRef.current) {
      scrollNodeToEnd(responsesRef.current);
    }
  }, [responsesRef]);

  React.useEffect(() => {
    setTimeout(() => {
      scrollResponses();
    }, 50);
  }, [responsesRef, props.messages, scrollResponses])

  return (
    <div ref={responsesRef} className="flex-1 bg-black rounded-2xl bg-opacity-40  p-5 flex flex-col overflow-scroll">
      <div
        className={`my-1 text-white text-lg flex justify-start`}>
        <div>
          <Markdown components={COMPONENTS}>{"👋 Hey, I'm Marcus,"}</Markdown>
        </div>
      </div>
      <div
        className={`my-1 text-white text-lg flex justify-start`}>
        <div>
          <Markdown components={COMPONENTS}>{"Welcome to my portfolio site."}</Markdown>
        </div>
      </div>
      <div
        className={`my-1 text-white text-lg flex justify-start`}>
        <div>
          <Markdown components={COMPONENTS}>{"I'm not here, but my assistant, Meemo is. Feel free to ask it anything."}</Markdown>
        </div>
      </div>
      {props.messages.map((message, i) => (
        <Response key={i} message={message} showProject={props.showProject} scrollResponses={scrollResponses}/>
      ))}
    </div>
  )
}

type PromptInput = {
  loading: boolean,
  value: string,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  onChange: (e: (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)) => void
}
const PromptInput = React.forwardRef(function PromptInput(props: PromptInput, ref: React.ForwardedRef<HTMLInputElement>) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [recommendationsShowing, setRecommendationsVisibility] = React.useState(false);

  const showRecommendations = React.useCallback(function showRecommendations() {
    if (!props.value) {
      setRecommendationsVisibility(true);
    }
  }, [setRecommendationsVisibility, props.value])

  const handleSubmit = React.useCallback(function handleSubmit() {
    if (formRef.current) {
      formRef.current.requestSubmit(buttonRef.current)
    }
  }, [props.onSubmit, formRef, buttonRef])

  const handleSelectRecommendation = React.useCallback(function handleSelectRecommendation(recommendation: string) {
    props.onChange({target: {value: recommendation}} as unknown as React.ChangeEvent<HTMLInputElement>);
    setTimeout(() => {
      handleSubmit();
    }, 100)
  }, [props.onChange, formRef, handleSubmit])

  const handleIgnoredChars = React.useCallback(function handleIgnoredChars(event: KeyboardEvent): any {
    if (event.key === '/') {
      event.preventDefault();
    }
  } as unknown as KeyboardEventHandler<HTMLInputElement>, []) ;

  React.useEffect(() => {
    setTimeout(() => {
      showRecommendations();
    }, 1200);
  }, [showRecommendations])

    return (
      <>
        <Recommendations active={recommendationsShowing} onSelect={handleSelectRecommendation}/>
        <div
          className={`mt-3 h-12 bg-black rounded-full bg-opacity-40 drop-shadow-2xl ${props.loading && "bg-transparent"} transition-colors duration-300`}>
          <form className="flex flex-row h-full w-full items-center bg-transparent rounded-2xl"
                onSubmit={props.onSubmit}
                ref={formRef}>
            <input
              ref={ref}
              disabled={props.loading}
              className="flex-1 text-gray-50 h-full w-full bg-transparent rounded-tl-2xl rounded-bl-2xl px-4 py-1 outline-0 disabled:cursor-not-allowed disabled:placeholder:opacity-0 transition-colors duration-300"
              autoFocus
              placeholder="ask meemo a question"
              value={props.value}
              onKeyDown={handleIgnoredChars}
              onChange={props.onChange}
            />
            <button
              ref={buttonRef}
              type="submit"
              className={`hover:text-orange-300 ${props.value ? 'text-orange-300' : 'text-gray-400'} ${props.loading && 'text-opacity-30'} transition-colors duration-300 rounded-full pt-0.5 pr-0.5 h-10 w-10 flex flex-col items-center justify-center mr-1 ${props.value ? 'border-opacity-70' : 'border-opacity-0' } border-amber-500 border-2 `}>
              <Send size={20}/>
            </button>
          </form>
        </div>
      </>
    );
  }
)

function Modal(props: { children: React.ReactNode, minimized: boolean }) {
  return (
    <div
      className={`relative w-full h-9/10 lg:w-1/2 lg:h-2/3 flex flex-col px-3 pt-3 py-3 lg:max-w-5xl rounded-3xl bg-black bg-opacity-40 backdrop-blur-md ${props.minimized ? '-translate-y-7' : 'translate-y-0'} transition-all duration-300`}>
      {props.children}
    </div>
  )
}

type BackdropProps = {
  children: React.ReactNode
  minimized: boolean
  onMinimize: () => void
}
function Backdrop(props: BackdropProps) {
  const backdropRef = React.useRef<HTMLDivElement>(null);

  function handleMinimize(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target !== backdropRef.current) {
      return;
    }
    props.onMinimize();
  }
  return (
    <div ref={backdropRef} onMouseDown={handleMinimize}
         className={`z-50 bottom-0 fixed top-0 left-0 right-0 flex justify-center items-start lg:items-center h-full w-full backdrop-blur-sm bg-opacity-20 bg-white ${props.minimized ? 'invisible opacity-0' : 'visible opacity-100'} transition-all duration-300`}>
      {props.children}
    </div>
  )
};

function ToggleButton(props: { onClick: () => void }) {
  return (
    <button
      className="z-50 fixed bottom-3 md:bottom-7 right-3 md:right-7 p-4 h-16 md:h-20 w-16 md:w-20 rounded-full bg-black bg-opacity-70 flex items-center justify-center text-white "
      onClick={props.onClick}
    >
      <BotMessageSquare className="text-orange-300" size={120}/>
    </button>
  );
}

const RECOMMENDATIONS = [
  "What's Marcus' work experience?",
  'Write a song about his SaaS experience.',
  'Can you show me a project?',
]

function Recommendations(props: { active: boolean, onSelect: (recommendation: string) => void }) {
  return (
    <div
      className={`w-full ${props.active ? "h-10" : "h-0"} mt-3 transition-all duration-400 overflow-hidden`}>
      <div className="flex flex-row justify-evenly overflow-x-auto">
        {RECOMMENDATIONS.map(recommendation => (
          <button
            key={recommendation}
            onPointerUp={() => props.onSelect(recommendation)}
            className={`mr-1 text-nowrap rounded-2xl border-amber-500 border-2 px-2 py-1 hover:bg-amber-500 transition-all duration-400 ${props.active ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-white text-sm">{recommendation}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

type MeemoState = {
  isResponding: boolean;
  isMinimized: boolean;
  setIsResponding: (isResponding: boolean) => void;
}
const useMeemoStore = create<MeemoState>((set) => ({
  isResponding: false,
  isMinimized: true,
  toggleVisibility: () => set(state => ({isMinimized: !state.isMinimized})),
  setIsResponding: (isResponding: boolean) => set({isResponding})
}));

export function MeemoChat(props: { minimized: boolean, toggleVisibility: () => void, showProject: (projects: string[]) => void }) {
  const { isResponding, setIsResponding } = useMeemoStore();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const {messages, input, handleInputChange, handleSubmit} = useChat({
    initialMessages: [],
    onResponse: () => setIsResponding(true),
    onFinish: () => setIsResponding(false),
  });

  React.useEffect(() => {
    if (props.minimized || isResponding) { return; }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, [inputRef, isResponding, props.minimized])

  const handleSendMessage = React.useCallback(function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    handleSubmit(e);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [inputRef, handleSubmit])

  return (
    <>
      <Backdrop minimized={props.minimized} onMinimize={props.toggleVisibility}>
        <Modal minimized={props.minimized}>
          <Responses
            messages={messages.filter(m => m.role !== 'system')}
            showProject={props.showProject}
          />
          <PromptInput
            ref={inputRef}
            loading={isResponding}
            value={input}
            onSubmit={handleSendMessage}
            onChange={handleInputChange}
          />
        </Modal>
      </Backdrop>
      <ToggleButton onClick={(props.toggleVisibility)}/>
    </>
  );
}
