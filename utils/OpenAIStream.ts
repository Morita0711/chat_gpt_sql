import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import axios from "axios";

// export interface OpenAIStreamPayload {
//   model: string;
//   prompt: string;
//   temperature: number;
//   top_p: number;
//   frequency_penalty: number;
//   presence_penalty: number;
//   max_tokens: number;
//   stream: boolean;
//   n: number;
// }

export async function OpenAIStream(prompt: any) {
    const config = {
      messages: [
        { role: 'system', content: 'prompt' },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo'
    };

  const data = await axios
    .post('https://api.openai.com/v1/chat/completions', config, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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',
      },
    });
  console.log('data', data)
}