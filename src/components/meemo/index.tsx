import React, {HTMLProps, KeyboardEventHandler} from "react";
import {SYSTEM_PROMPT} from "@/prompts";
import {BotMessageSquare, Send} from "lucide-react";
import Markdown from "react-markdown";
import { useChat } from 'ai/react';

type Message = {
  content: string
  role: string
  input?: any
}

const COMPONENTS = {
  ul: (props: HTMLProps<HTMLUListElement>) => <ul className="list-none" {...props} />,
  li: (props: HTMLProps<HTMLLIElement>) => <li className="my-2" {...props} />,
  p: (props: HTMLProps<HTMLParagraphElement>) => <p className="mb-2" {...props} />
}

function messageIsFunctionCall(message: Message) {
  return message.content.includes('{')
}

function FunctionCall(props: { message: Message, showProject: (project: string) => void }) {
  const showProject = React.useCallback(() => {
    if (messageIsFunctionCall(props.message)) {
      try {
        const content = JSON.parse(props.message.content);
        props.showProject(JSON.parse(content.tool_calls[0].function.arguments).project)
      } catch(e) {
      }
    }
  }, [props.message.content, props.showProject])

  React.useEffect(() => {
    if (messageIsFunctionCall(props.message)) {
      try {
        const content = JSON.parse(props.message.content);
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
        <button onPointerUp={showProject} className="cursor-pointer rounded-3xl p-3 border-2 border-orange-300 hover:bg-orange-300 transition-colors bg-opacity-70 text-xs">
          {`Click here to show ${project}`}
        </button>
      </div>
    )
  } catch(e) {
    return (
      <div>Loading...</div>
    )
  }
}

function Response(props: { showProject: any, message: Message }) {
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

type ResponsesProps = {
  messages: Message[]
  showProject: (project: string) => void
}
const Responses = React.forwardRef(function Responses(props: ResponsesProps, ref: any) {
  return (
    <div ref={ref} className="flex-1 bg-black rounded-2xl bg-opacity-40  p-5 flex flex-col overflow-scroll">
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
        <Response key={i} message={message} showProject={props.showProject}/>
      ))}
    </div>
  )
});

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

  const hideRecommendations = React.useCallback(function showRecommendations() {
    setRecommendationsVisibility(false);
  }, [setRecommendationsVisibility])

  const handleSubmit = React.useCallback(function handleSubmit() {
    console.info(formRef)
    formRef.current.requestSubmit(buttonRef.current)
    console.info('Submit')
  }, [props.onSubmit, formRef, buttonRef])

  const handleSelectRecommendation = React.useCallback(function handleSelectRecommendation(recommendation: string) {
    props.onChange({target: {value: recommendation}});
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
      className={`relative w-full h-9/10 lg:w-1/2 lg:h-1/2 flex flex-col px-3 pt-3 py-3 lg:max-w-5xl rounded-3xl bg-black bg-opacity-40 backdrop-blur-md ${props.minimized ? '-translate-y-7' : 'translate-y-0'} transition-all duration-300`}>
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
  'Can you show me a project?',
  'Write a song about his SaaS experience'
]

function Recommendations(props: { active: boolean }) {
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

export function MeemoChat(props: { minimized: boolean, toggleVisibility: () => void, showProject: (project: string) => void }) {
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const responsesRef = React.useRef<HTMLInputElement>(null);
  const {messages, input, handleInputChange, handleSubmit} = useChat({
    initialMessages: [
      { id: '0', content: SYSTEM_PROMPT, role: 'system' }
    ],
    onResponse: () => setLoading(true),
    onFinish: () => setLoading(false),
  });

  const scrollResponses = React.useCallback(function scrollResponses() {
    console.info('Scrolling Responses');
    responsesRef.current?.scrollTo({left: 0, top: responsesRef.current.scrollHeight, behavior: 'smooth'});
  }, [responsesRef]);


  React.useEffect(() => {
    setTimeout(() => {
      scrollResponses();
    }, 50);
  }, [responsesRef, messages])

  React.useEffect(() => {
    if (props.minimized || loading) { return; }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, [inputRef, loading, props.minimized])

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
            ref={responsesRef}
            messages={messages.filter(m => m.role !== 'system')}
            showProject={props.showProject}
          />
          <PromptInput
            ref={inputRef}
            loading={loading}
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
