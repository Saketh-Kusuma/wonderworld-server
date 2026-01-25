import fs from 'fs';
import { fromChatMessages, OpenRouter, toChatMessage } from '@openrouter/sdk';
import { conversationRepository } from '../repositories/conversation.repository';
import type {
   AssistantMessage,
   OpenResponsesNonStreamingResponse,
} from '@openrouter/sdk/models';
import { extractTextContent } from '../lib/ResEditor';
import { cleanResponse } from '../lib/CleanText';
import template from '../prompts/chatbots.txt';
import path from 'path';
const openRouter = new OpenRouter({
   apiKey: process.env.OPENROUTER_API_KEY3,
});
type ChatMessage = {
   role: 'system' | 'user' | 'assistant';
   content: string;
};

export const chatService = {
   async sendMessage(converSationId: string, prompt: string) {
      conversationRepository.setCoversations(converSationId);
      let res = await openRouter.chat.send({
         model: 'nvidia/nemotron-nano-12b-v2-vl:free',

         messages: conversationRepository.getCoversations(converSationId) || [],
         stream: false,
      });
      let assistantMsg: ChatMessage = {
         role: 'assistant',
         content: extractTextContent(res.choices[0]?.message?.content),
      };
      conversationRepository.setMessages(converSationId, assistantMsg);
      conversationRepository.setMessages(converSationId, {
         role: 'user',
         content: prompt,
      });
      res = await openRouter.chat.send({
         model: 'nvidia/nemotron-nano-12b-v2-vl:free',
         messages: conversationRepository.getCoversations(converSationId) || [],
         stream: false,
      });
      return res.choices[0]?.message.content;
   },
};
