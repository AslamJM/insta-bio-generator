"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import { generateBio } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pronouns, setPronouns] = useState("");
  const [profession, setProfession] = useState("");
  const [birthday, setBirthday] = useState("");
  const [place, setPlace] = useState("");
  const [hobbies, setHobbies] = useState("");

  const [choises, setChoises] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    const promptText = `Write a short and crisp Instagram bio for me with emojis. My pronouns are ${pronouns}. I am a ${profession}. My birthday is ${birthday}. I live in ${place}. My hobbies are ${hobbies
      .split(" ")
      .join(" and ")}`;
    setLoading(true);

    try {
      const response = await generateBio(promptText);

      const texts = response.choices.map((ch: any) => ch.text) as string[];
      setChoises(texts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={inter.className}>
      <div className="max-w-2xl mx-auto mt-5 ">
        <h2 className="text-center underline underline-offset-3 mb-2 text-2xl font-bold text-slate-900">
          Instagram Bio Generator v1.0
        </h2>
      </div>
      <div className="p-2 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-4 my-1">
          <div className="w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Your Pronouns
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="They / Them"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Your Profession
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Doctor"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 my-1">
          <div className="w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Your Birthday
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="DD / MM"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Place You Live
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Berlin"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </div>
        <div className="my-1 flex items-center flex-col">
          <label className="block mb-2 text-md font-medium text-gray-900">
            Your Hobbies (use space for seperation)
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
            placeholder="Photograpy Cycling etc."
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center mt-2 mb-2">
          <button
            className="px-4 py-2 border-gray-900 bg-slate-300 hover:bg-slate-500 hover:text-black"
            onClick={generatePrompt}
          >
            {loading ? "Generating...." : "Generate"}
          </button>
        </div>
        <div>
          {choises.map((c, i) => (
            <div key={i} className="my-2 py-2 px-2 bg-slate-300 rounded-sm">
              <p className="text-md">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
