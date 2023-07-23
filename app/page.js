"use client";

import Image from "next/image";
import axios from "axios";
import React, { useState } from "react";
import copyIcon from "./images/copy.svg";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./parts/header";
// import SEO from "./parts/seo";

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [excludeNumbers, setExcludeNumbers] = useState(false);
  const [excludeSpecialChars, setExcludeSpecialChars] = useState(false);
  const notify = () =>
    toast("Copied!", {
      position: "bottom-right",
      autoClose: 300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const generatePassword = async () => {
    try {
      const response = await axios.get(
        "https://password-generator-by-api-ninjas.p.rapidapi.com/v1/passwordgenerator",
        {
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_ENV_VARIABLE,
            "X-RapidAPI-Host":
              "password-generator-by-api-ninjas.p.rapidapi.com",
          },
          params: {
            length,
            exclude_numbers: excludeNumbers,
            exclude_special_chars: excludeSpecialChars,
          },
        }
      );

      setPassword(response.data.random_password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <SEO /> */}
      <Header />

      {/* container  */}
      <div className="hero">
        <div className="hero-content text-center">
          <div>
            {/* Pass length */}
            <label>Password length</label>
            <div>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                style={{ textAlign: "center", height: "50px", width: 150 }}
                placeholder="Pass length"
                className="input input-bordered input-info w-full max-w-xs"
              />
            </div>
            {/* Exclude numbers */}
            <label>Exclude Numbers</label>
            {/* <div className="form-control"> */}
            <label className="cursor-pointer label inline-block">
              {/* <span className="label-text">Remember me</span> */}
              <input
                type="checkbox"
                checked={excludeNumbers}
                onChange={(e) => setExcludeNumbers(e.target.checked)}
                className="checkbox checkbox-info"
              />
            </label>
            <br />
            {/* </div> */}
            {/* Exclude Numbers selection */}
            <label>Exclude Special Characters</label>
            <div className="form-control inline-block">
              <label className="cursor-pointer label">
                {/* <span className="label-text">Remember me</span> */}
                <input
                  type="checkbox"
                  className="checkbox checkbox-info"
                  checked={excludeSpecialChars}
                  onChange={(e) => setExcludeSpecialChars(e.target.checked)}
                />
              </label>
            </div>
            <br />
            <button
              className="btn btn-outline btn-info"
              onClick={generatePassword}
            >
              Generate
            </button>
            <br />
            <br />

            {/* password generated */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <textarea
                id="password-textarea"
                className="textarea textarea-bordered textarea-sm w-full max-w-xs textarea-info"
                placeholder="Password"
                value={password}
                readOnly={true}
              ></textarea>
              <button
                className="btn btn-outline btn-info "
                onClick={() => {
                  navigator.clipboard.writeText(password);
                  document.getElementById("password-textarea").select();
                  notify();
                }}
                // onClick={notify}
                style={{ marginLeft: "10px" }}
              >
                {/* {paster} */}
                <Image src={copyIcon} alt="Copy icon" height={25} />
              </button>
              <ToastContainer
                position="bottom-right"
                autoClose={10}
                limit={1}
                transition={Zoom}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
