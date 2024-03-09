import React, { useState, useRef, useEffect } from "react";
import { Fragment } from "react";

import { MarkdownRenderer } from "../components/mardownFormat";
import RobotIcon from "../assets/robotIcon";
import Rocket from "../assets/rocket";
import Menu from "../components/chatMenu";

interface ChatMessage {
  prompt: string;
  content: string;
}

const Chat: React.FC = () => {
  const initialdata = [
    {
      prompt: "Hello world",
      content: "Do you want to program in hello world?",
    },
    {
      prompt: "How are you?",
      content: "I'm good, thank you!",
    },
  ];
  const initialChatMessages: ChatMessage[] = initialdata;

  const [inputValue, setInputValue] = useState<string>(""); // State to hold user input
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(initialChatMessages); // State to hold chat messages
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref to access chat container element

  const acc: string = "F";

  // Function to handle form submission
  const handleSubmit = (): void => {
    const newMessage: ChatMessage = {
      prompt: inputValue,
      content: "Dummy content for user input",
    };
    setChatMessages([...chatMessages, newMessage]);
    // Clear input field
    setInputValue("");
  };

  // Scroll to bottom of chat container
  const scrollToBottom = (): void => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when chat messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="chatGpt">
      <aside>
        <Menu />
      </aside>
      <main>
        <div className="Chat" ref={chatContainerRef}>
          {/* Render existing chat messages */}
          {chatMessages.map((message, index) => (
            <Fragment key={index}>
              <div className="qs">
                <div className="acc">{acc}</div>
                <div className="txt">
                  <MarkdownRenderer content={message.prompt} />
                </div>
              </div>

              <div className="res">
                <div className="icon">
                  <RobotIcon />
                </div>
                <div className="txt">
                  <div className="blink">
                    <MarkdownRenderer content={message.content} />
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        <div className="flexBody">
          <div className="box">
            <textarea
              placeholder="Press Ctrl+Enter To Submit..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSubmit}>{<Rocket />}</button>{" "}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
