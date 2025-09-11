"use client";

import { z } from "zod";
import * as React from "react";
import { useTamboComponentState } from "@tambo-ai/react";
import {
  MessageInput,
  MessageInputTextarea,
  MessageInputToolbar,
  MessageInputSubmitButton,
  MessageInputError,
  MessageInputMcpConfigButton,
} from "@/components/tambo/message-input";
import type { messageVariants } from "@/components/tambo/message";
import type { VariantProps } from "class-variance-authority";

const ChatModal = () => (
  <div className="p-4">
    <MessageInput>
      <MessageInputTextarea />
      <MessageInputToolbar>
        <MessageInputMcpConfigButton />
        <MessageInputSubmitButton />
      </MessageInputToolbar>
      <MessageInputError />
    </MessageInput>
  </div>
) 

export default ChatModal