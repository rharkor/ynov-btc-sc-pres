import { useContext, useEffect, useState } from "react";
import CodeBlock from "../components/CodeBlock";
import { SlideContext } from "../contexts/slide/SlideContext";
import MultiSlideElement from "../components/MultiSlideElement";
import { cn } from "@nextui-org/react";

export default function Variables() {
  const { slide } = useContext(SlideContext);

  const [variablesDef, setVariablesDef] = useState("");
  const [constructorDef, setConstructorDef] = useState("");
  const [functionDef, setFunctionDef] = useState("");

  const deleteAllChars: (
    toDelete: string,
    setString: (newValue: string) => void,
    speed?: number
  ) => {
    wait: () => Promise<boolean>;
    interval: NodeJS.Timeout;
  } = (toDelete, setString, speed) => {
    let interval: NodeJS.Timeout = null as unknown as NodeJS.Timeout;
    let stringCopy = toDelete;
    const innerPromise = new Promise<boolean>((resolve) => {
      interval = setInterval(() => {
        if (stringCopy.length > 0) {
          stringCopy = stringCopy.slice(0, stringCopy.length - 1);
          setString(stringCopy);
        } else {
          if (interval) clearInterval(interval);
          resolve(true);
        }
      }, speed || 40);
    });
    return {
      wait: async () => {
        return innerPromise;
      },
      interval,
    };
  };

  const addAllChars: (
    word: string,
    acutalWord: string,
    setWord: (newValue: string) => void,
    speed?: number
  ) => {
    wait: () => Promise<boolean>;
    interval: NodeJS.Timeout;
  } = (word, acutalWord, setWord, speed) => {
    let interval: NodeJS.Timeout = null as unknown as NodeJS.Timeout;
    const innerPromise = new Promise<boolean>((resolve) => {
      interval = setInterval(() => {
        if (acutalWord.length < word.length) {
          acutalWord = acutalWord + word[acutalWord.length];
          setWord(acutalWord);
        } else {
          if (interval) clearInterval(interval);
          resolve(true);
        }
      }, speed || 80);
    });
    return {
      wait: async () => {
        return innerPromise;
      },
      interval,
    };
  };

  const handleVariablesDef = (
    allIntervals: NodeJS.Timeout[],
    variablesDef: string,
    setVariablesDef: (newValue: string) => void
  ) => {
    let variablesDefToWrite: string = "";
    if (slide > 22)
      variablesDefToWrite = `\tuint public storedData;    // State variable`;
    else if (slide > 21)
      variablesDefToWrite = `\tuint8 public myUint8; // Between 0 and 255
\tuint256 public myUint256; // uint is an alias of uint256
\tint public myInt; // Between -2^255 and 2^255 - 1
\tbool public myBool; // true or false
\taddress public myAddress; // Web3 address
\tstring public myString; // UTF-8 string

\tmapping(address => uint256) public myMapping; // Mapping from address to uint256
\tstruct MyStruct {
\t\tuint256 myUint;
\t\tstring myString;
\t}
\tMyStruct public myStruct; // Struct with myUint and myString
\tMyStruct[] public myStructArray; // Array of MyStruct
\tenum MyEnum {
\t\tVALUE_1,
\t\tVALUE_2,
\t}`;

    if (variablesDef === variablesDefToWrite) return;
    //? First delete all characters from the subtitle one by one
    if (!variablesDefToWrite.startsWith(variablesDef)) {
      const res = deleteAllChars(variablesDef, setVariablesDef, 5);
      allIntervals.push(res.interval);
      const wait = res.wait;

      wait().then(() => {
        //? Then add all characters from the subtitle one by one
        allIntervals.push(
          addAllChars(variablesDefToWrite, "", setVariablesDef, 20).interval
        );
      });
    } else {
      //? Then add all characters from the subtitle one by one
      allIntervals.push(
        addAllChars(variablesDefToWrite, variablesDef, setVariablesDef, 20)
          .interval
      );
    }
  };

  const handleConstructorDef = (
    allIntervals: NodeJS.Timeout[],
    constructorDef: string,
    setConstructorDef: (newValue: string) => void
  ) => {
    let constructorDefToWrite: string = "";
    if (slide > 22)
      constructorDefToWrite = `\t\tstoredData = 10;       // Using State variable`;

    if (constructorDef === constructorDefToWrite) return;
    //? First delete all characters from the subtitle one by one
    if (!constructorDefToWrite.startsWith(constructorDef)) {
      const res = deleteAllChars(constructorDef, setConstructorDef, 5);
      allIntervals.push(res.interval);
      const wait = res.wait;

      wait().then(() => {
        //? Then add all characters from the subtitle one by one
        allIntervals.push(
          addAllChars(constructorDefToWrite, "", setConstructorDef, 20).interval
        );
      });
    } else {
      //? Then add all characters from the subtitle one by one
      allIntervals.push(
        addAllChars(
          constructorDefToWrite,
          constructorDef,
          setConstructorDef,
          20
        ).interval
      );
    }
  };

  const handleFunctionDef = (
    allIntervals: NodeJS.Timeout[],
    functionDef: string,
    setFunctionDef: (newValue: string) => void
  ) => {
    let functionDefToWrite: string = "";
    if (slide > 23)
      functionDefToWrite = `\tfunction set(uint x) public {
\t\tstoredData = x; // Assign memory variable to the state variable
\t}`;

    if (functionDef === functionDefToWrite) return;
    //? First delete all characters from the subtitle one by one
    if (!functionDefToWrite.startsWith(functionDef)) {
      const res = deleteAllChars(functionDef, setFunctionDef, 5);
      allIntervals.push(res.interval);
      const wait = res.wait;

      wait().then(() => {
        //? Then add all characters from the subtitle one by one
        allIntervals.push(
          addAllChars(functionDefToWrite, "", setFunctionDef, 20).interval
        );
      });
    } else {
      //? Then add all characters from the subtitle one by one
      allIntervals.push(
        addAllChars(functionDefToWrite, functionDef, setFunctionDef, 20)
          .interval
      );
    }
  };

  useEffect(() => {
    const allIntervals: NodeJS.Timeout[] = [];

    handleVariablesDef(allIntervals, variablesDef, setVariablesDef);
    handleConstructorDef(allIntervals, constructorDef, setConstructorDef);
    handleFunctionDef(allIntervals, functionDef, setFunctionDef);

    return () => {
      allIntervals.forEach((interval) => clearInterval(interval));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  const maxSlide = 25;

  return (
    <MultiSlideElement>
      <div
        className={cn(
          "absolute top-0 w-screen h-screen flex flex-col justify-center items-center transition-all duration-300 py-14 px-14 gap-8",
          {
            "!-left-[100vw]": slide >= maxSlide,
          },
          slide >= 21 ? "left-0" : "left-[100vw]"
        )}
      >
        <CodeBlock
          code={`pragma solidity ^0.8.0;

contract Variables {
${variablesDef}

\tconstructor() {
${constructorDef}
\t}

${functionDef}
}`}
          className="text-lg [&>span]:!p-4 w-[1000px] max-w-[90vw]"
        />
      </div>
    </MultiSlideElement>
  );
}
