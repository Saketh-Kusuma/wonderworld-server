import fs from 'fs';
import path from 'path';
import template from '../prompts/chatbots.txt';
import type { Message } from '@openrouter/sdk/models';
const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const date = new Date().getDate();
const instructions =
   template.replace('{{parkInfo}}', parkInfo) +
   template.replace('{{date}}', date.toLocaleString());
export let messages: Message[] = [
   { role: 'system', content: instructions },
   { role: 'user', content: 'Hello!' },
];
const chatMap = new Map<string, Message[]>();

export const conversationRepository = {
   setMessages(conversationId: string, mesage: Message) {
      chatMap.get(conversationId)?.push(mesage);
   },
   setCoversations(conversationId: string) {
      chatMap.set(conversationId, messages);
   },
   getCoversations(conversationId: string) {
      return chatMap?.get(conversationId);
   },
};
