"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const exampleText = `Five days after a deadly three-train crash killed 288 people in India, more than 80 bodies remain unclaimed.
The crash on Friday evening in the state of Odisha involved two passenger trains and a stationary goods train.
More than 1,000 injured were taken to hospitals for treatment. Many families say they are still looking for loved ones.
The deadly collision is India's worst rail accident this century.
On Tuesday, Odisha's chief secretary Pradeep Jen said the official death toll rose to 288 from the previous figure of 275 while 83 bodies remained unidentified.
The crash saw a passenger train derail after wrongly entering into a loop track by the side of the main line and colliding with a stationary goods train that was parked there. Its derailed carriages then struck the rear coaches of a second passenger train going in the opposite direction.`;

  const [text, setText] = useState(exampleText);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getResponse = async () => {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://gpt-summarization.p.rapidapi.com/summarize",
        {
          text,
          num_sentences: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "gpt-summarization.p.rapidapi.com",
          },
        }
      );
      setResponse(data.summary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:px-12 px-4 items-center min-h-screen">
      <h1 className="head_text mt-16 orange_gradient">
        Text <span className="text-active">Summarizer</span>
      </h1>
      <h2 className="text-primary text-2xl font-light mt-6">
        Summarise your text into a shorter length.
      </h2>
      <form
        className="flex md:flex-row flex-col justify-between mt-20 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          getResponse();
        }}
      >
        <div className="md:w-2/5 w-full">
          <label htmlFor="text" className="blue_gradient text-sm font-medium">
            Enter your text
          </label>
          <textarea
            rows={14}
            name="text"
            id="text"
            className="glassmorphism focus:outline-none focus:ring-4 w-full focus:ring-active text-base p-6 rounded-md text-justify"
            defaultValue={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center md:mt-0 mt-4">
          <button
            className="outline_btn w-full rounded-lg px-5 py-3 bg-active font-bold text-background hover:bg-primary sm:px-10"
            type="submit"
          >
            {loading ? (
              <span className="animate-pulse">Loading..</span>
            ) : (
              <>Summarize</>
            )}
          </button>
        </div>
        <div className="md:w-2/5 w-full">
          <label
            htmlFor="summary"
            className="blue_gradient text-sm font-medium mb-2"
          >
            Summarized text
          </label>
          <textarea
            readOnly
            type="text"
            rows={14}
            name="summary"
            id="summary"
            className="glassmorphism focus:outline-none focus:ring-4 w-full focus:ring-active text-base p-4 rounded-md text-justify"
            value={response}
          />
        </div>
      </form>
    </div>
  );
}
