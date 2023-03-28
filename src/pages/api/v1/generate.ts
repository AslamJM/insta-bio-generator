import { NextApiRequest, NextApiResponse } from "next";
import openai from "@/lib/openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prompt = req.body.prompt as string;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 128,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return res.status(200).json({
      choices: response.data.choices,
      status: "success",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      status: "fail",
    });
  }
};

export default handler;
