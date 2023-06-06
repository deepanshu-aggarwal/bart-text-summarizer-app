"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const exampleText = `Text summarization is a very useful and important part of Natural Language Processing (NLP). First let us talk about what text summarization is. Suppose we have too many lines of text data in any form, such as from articles or magazines or on social media. We have time scarcity so we want only a nutshell report of that text. We can summarize our text in a few lines by removing unimportant text and converting the same text into smaller semantic text form.`;

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
