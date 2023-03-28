import { NextApiRequest, NextApiResponse } from "next";
import openai from "@/lib/openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({
    choices: "hello",
    status: "success",
  });
};

export default handler;
