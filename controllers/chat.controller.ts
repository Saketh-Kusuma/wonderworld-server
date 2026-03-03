import { chatService } from "../services/chat.service";
import type { Request, Response } from "express";

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    const { prompt, conversationId } = req.body ?? {};
    if (typeof prompt !== "string" || prompt.trim() === "") {
      return res
        .status(400)
        .json({ error: "Missing or invalid `prompt` in request body" });
    }

    try {
      const result = await chatService.sendMessage(conversationId, prompt);
      return res.json({ botResponse: result });
    } catch (err: any) {
      console.error(
        "chatController.sendMessage error:",
        err?.message ?? err,
        err,
      );
      return res
        .status(500)
        .json({ error: "Failed to generate a response", err });
    }
  },
};
