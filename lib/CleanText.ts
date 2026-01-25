export function cleanResponse(text: string): string {
   return text
      .replace(/\[s\]/gi, '') // removes [s]
      .replace(/\[\/s\]/gi, '') // removes [/s]
      .replace(/<\/?s>/gi, '') // removes <s> </s>
      .trim();
}
