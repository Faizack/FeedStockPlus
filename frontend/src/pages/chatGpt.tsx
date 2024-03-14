import React, { useState, useRef, useEffect } from "react";
import { Fragment } from "react";

import { MarkdownRenderer } from "../components/mardownFormat";
import RobotIcon from "../assets/robotIcon";
import Rocket from "../assets/rocket";
import Menu from "../components/chatMenu";
import { useAddchatMutation, useNewchatMutation } from "../redux/api/chatAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api";
import toast from "react-hot-toast";

interface ChatMessage {
  prompt: string;
  content: string;
}

const Chat: React.FC = () => {
  const [NewChat] = useNewchatMutation();
  const [AddChat] = useAddchatMutation();

  const [chatId, setChatId] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const acc: string = "F";

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (chatId === "") {
      const res = await NewChat({ prompt: inputValue });

      if ("data" in res) {
        const message = (res.data as MessageResponse).message || "";
        const data = res.data.data;
        const newMessage: ChatMessage = {
          prompt: inputValue,
          content: data.content,
        };
        setChatMessages([...chatMessages, newMessage]);
        console.log(data.chatId);

        setChatId(data.chatId);
        toast.success(message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message || "";
        toast.error(message);
      }
    } else {
      const res = await AddChat({ chatId: chatId, prompt: inputValue });
      if ("data" in res) {
        const message = (res.data as MessageResponse).message || "";
        const data = res.data.data;
        const newMessage: ChatMessage = {
          prompt: inputValue,
          content: data.content,
        };
        console.log(data.chatId);
        setChatMessages([...chatMessages, newMessage]);
        toast.success(message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message || "";
        toast.error(message);
      }
    }
    setInputValue("");
  };

  // Scroll to bottom of chat container
  const scrollToBottom = (): void => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ( e.key === "Enter") {
      handleSubmit(e);
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
        {chatMessages.length === 0 ? (
          <div className="New"><h1>FeedStock Plus</h1> </div>
        ) : (
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
        )}

        <div className="flexBody">
          <form onSubmit={handleSubmit}>
            <div className="box">
              <textarea
                placeholder="Press Enter To Submit..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type="submit">{<Rocket />}</button>{" "}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chat;
