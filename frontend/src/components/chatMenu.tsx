import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  LogOut,
  Message,
  Plus,
  Settings,
  Tick,
  Trash,
  Xicon,
} from "../assets";

import toast from "react-hot-toast";
import { resetUser } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";

interface HistoryItem {
  chatId: number;
  prompt: string;
  active: boolean;
}

const Menu: React.FC = () => {
  const path = window.location.pathname;

  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const settingRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [confirm, setConfirm] = useState(false);

  resetUser;

  const logOut = () => {
    toast.success("Logged out successfully");
    dispatch(resetUser());
    localStorage.removeItem("token");

    navigate("/login");
  };

  const clearHistory = (del: boolean) => {
    if (del) {
      setHistory([]);
      setConfirm(false);
      toast.success("Conversations cleared successfully");
      navigate("/chat");
    } else {
      setConfirm(true);
    }
  };

  const showMenuMd = () => {
    if (menuRef.current) {
      menuRef.current.classList.add("showMd");
      document.body.style.overflowY = "hidden";
    }
  };

  const deleteChat = (chatId: number) => {
    const updatedHistory = history.filter((chat) => chat.chatId !== chatId);
    setHistory(updatedHistory);
    toast.success("Chat deleted successfully");
    navigate("user/chat");
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        !menuRef?.current?.contains(e.target as Node) &&
        !btnRef?.current?.contains(e.target as Node)
      ) {
        menuRef?.current?.classList?.remove("showMd");
        document.body.style.overflowY = "auto";
      }
    });

    window.addEventListener("resize", () => {
      if (!window.matchMedia("(max-width:767px)").matches) {
        document.body.style.overflowY = "auto";
      } else {
        if (menuRef?.current?.classList?.contains("showMd")) {
          document.body.style.overflowY = "hidden";
        } else {
          document.body.style.overflowY = "auto";
        }
      }
    });
  }, []);

  useEffect(() => {
    // Simulating fetching history from API
    setHistory([
      { chatId: 1, prompt: "Chat 1", active: true },
      { chatId: 2, prompt: "Chat 2", active: false },
      { chatId: 3, prompt: "Chat 3", active: false },
    ]);
  }, [path]);

  useEffect(() => {
    setConfirm(false);
    let chatId = path.replace("chat/", "");
    chatId = chatId.replace("/", "");
    // Simulating activePage action
  }, [path, history]);

  return (
    <Fragment>
      <header>
        <div className="start">
          <button onClick={showMenuMd} ref={btnRef}>
            <Bar />
          </button>
        </div>

        <div className="title">
          {path.length > 6 ? history[0]?.prompt : "New chat"}
        </div>

        <div className="end">
          <button
            onClick={() => {
              if (path.includes("/chat")) {
                navigate("/");
              } else {
                navigate("/chat");
              }
            }}
          >
            <Plus />
          </button>
        </div>
      </header>

      <div className="menu" ref={menuRef}>
        <div>
          <button
            type="button"
            aria-label="new"
            onClick={() => {
              if (path.includes("/chat")) {
                navigate("/");
              } else {
                navigate("/chat");
              }
            }}
          >
            <Plus />
            New chat
          </button>
        </div>

        <div className="history">
          {history?.map((obj, key) => (
            <div key={key} className="chat-item">
              <button
                className="active"
                onClick={() => {
                  navigate(`/chat/${obj?.chatId}`);
                }}
              >
                <Message />
                {obj?.prompt}
              </button>
              <span
                className="delete-button"
                onClick={() => deleteChat(obj?.chatId)}
              >
                <Trash />
              </span>
            </div>
          ))}
        </div>

        <div className="actions">
          {history?.length > 0 && (
            <>
              {confirm ? (
                <button onClick={() => clearHistory(true)}>
                  <Tick />
                  Confirm clear conversations
                </button>
              ) : (
                <button onClick={() => clearHistory(false)}>
                  <Trash />
                  Clear conversations
                </button>
              )}
            </>
          )}
          <button
            onClick={() => {
              if (settingRef?.current) {
                settingRef.current.classList.add("clicked");
                settingRef.current.style.display = "flex";
              }
            }}
          >
            <Settings />
            Settings
          </button>

          <button onClick={logOut}>
            <LogOut />
            Log out
          </button>
        </div>
      </div>

      <div className="exitMenu">
        <button>
          <Xicon />
        </button>
      </div>
    </Fragment>
  );
};

export default Menu;
