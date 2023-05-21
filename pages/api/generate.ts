import useSharedStore from '../store/index';
const myVariable = useSharedStore.getState().myVariable;

console.log("myVariable=", useSharedStore.getState())

type RequestData = {
  messageText: string;
};


if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

let prompt = '';
let message_junk = ``;

const handler = async (req: Request) => {
  
  const { messageText } = (await req.json()) as RequestData;

  message_junk += `please provide me sql statement below \n${messageText} \n` ;

  if (!messageText) {
    return new Response(``, { status: 400 });
  }

  const config = {
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: message_junk },
    ],
    model: 'gpt-3.5-turbo'
  };
  
  const data = await fetch("https://api.openai.com/v1/chat/completions", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify(config)
  })
  return data;
};

export default handler;
