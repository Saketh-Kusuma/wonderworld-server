import type {
   ChatMessageContentItem,
   ChatMessageContentItemText,
} from '@openrouter/sdk/models';

export function extractTextContent(
   content: string | ChatMessageContentItem[] | null | undefined
): string {
   if (!content) return '';

   if (typeof content === 'string') {
      return content;
   }

   return content
      .filter(
         (item): item is ChatMessageContentItemText => item.type === 'text'
      )
      .map((item) => item.text)
      .join('');
}
