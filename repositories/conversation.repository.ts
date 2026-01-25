import type { Message } from '@openrouter/sdk/models';
export let messages: Message[] = [
   { role: 'system', content: 'You are a helpful assistant.' },
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
