"use client";

import { useEffect, useRef } from "react";
import styles from "./chatbox.module.css"; // Import the CSS module
import OpenAI from "openai";

interface ChatBoxProps {
  messages: OpenAI.Chat.ChatCompletionMessageParam[];
  loading: boolean;
}

function ChatBox({ messages, loading }: ChatBoxProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className={styles.chatBoxContainer}>
      {messages.map((m, i) => (
        <ChatBubble message={m} key={i} />
      ))}
      {loading && <div className={styles.loading} />}
      <div ref={messagesEndRef} />
    </div>
  );
}

interface ChatBubbleProps {
  message: OpenAI.Chat.ChatCompletionMessageParam;
}

function ChatBubble({ message }: ChatBubbleProps) {
  return message.role === "user" ? (
    <div className={styles.userBubbleContainer}>
      <div className={styles.userBubble}>{String(message.content)}</div>
    </div>
  ) : (
    <div className={styles.assistantBubbleContainer}>
      <div className={styles.assistantBubble}>{String(message.content)}</div>
    </div>
  );
}

export default ChatBox;
