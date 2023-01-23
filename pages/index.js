import Head from "next/head";
import Image from "next/image";
// import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import copyIcon from "./images/clip.svg";

const Home = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [excludeNumbers, setExcludeNumbers] = useState(false);
  const [excludeSpecialChars, setExcludeSpecialChars] = useState(false);

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
      <Head>
        <title>PassGen</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* start nav bar */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            Password Generator
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src="https://placeimg.com/80/80/people"
                  alt="people"
                  width={80}
                  height={80}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  className="justify-between"
                  href="https://github.com/mikeyhodl/passgen"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                  <span className="badge">New</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* container */}
      <div className={styles.container}>
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
        <button className="btn btn-outline btn-info" onClick={generatePassword}>
          Generate
        </button>
        <br />
        <br />
        {/* password generated */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <textarea
            id="password-textarea"
            className="textarea textarea-info"
            placeholder="Password"
            style={{
              textAlign: "center",
              height: "40px",
              flex: 0.7,
              marginLeft: 160,
            }}
            value={password}
            readOnly={true}
          ></textarea>
          <button
            className="btn btn-outline btn-info "
            onClick={() => {
              navigator.clipboard.writeText(password);
              document.getElementById("password-textarea").select();
            }}
            style={{ marginLeft: "10px" }}
          >
            {/* {paster} */}
            <Image src={copyIcon} alt="Copy icon" height={25} />
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;
