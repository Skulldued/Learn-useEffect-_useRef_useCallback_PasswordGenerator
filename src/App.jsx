import React from "react";
import { useState, useCallback ,useEffect,useRef  } from "react";

const App = () => {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+|}{>?:*-.~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  const copyPsswordClipboard = useCallback(()=>{
    passwordRef.current ?. select();
    // passwordRef.current?.setSelectionRange(0,3);
          window.navigator.clipboard.writeText(password)
  },[password]);
  return (
    <div className="bg-black h-screen ">
      <div className="py-32">
        <div className="max-w-xl mx-auto px-4  bg-slate-700 rounded-lg shadow-xl">
          <h3 className="text-center text-white py-5 text-3xl">
            Password Generator
          </h3>
          <input
            type="text"
            className="outline-none my-3 py-1 w-full  px-3"
            placeholder="Password"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button onClick={copyPsswordClipboard} className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0">
            Copy
          </button>
          <div className="my-6 flex">
            <div className="flex items-center py-6 pap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />
              {/* { console.log(length)} */}
              <label htmlFor="" className="text-orange-600 px-4 text-xl">
                Length {length}
              </label>
            </div>
            <div className="flex  py-6">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="" className="text-orange-600 px-4 text-xl">
                Numbers
              </label>
            </div>
            <div className="flex  py-6">
              <input
                type="checkbox"
                id="characterInput"
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="" className="text-orange-600 px-4 text-xl">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
