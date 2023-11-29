import { useContext, useEffect, useState } from "react";
import { SlideContext } from "../contexts/slide/SlideContext";
import { Chip, cn } from "@nextui-org/react";
import MultiSlideElement from "../components/MultiSlideElement";
import CodeBlock from "../components/CodeBlock";

export default function Slide4() {
  const { slide } = useContext(SlideContext);
  const [subTitle, setSubTitle] = useState("");

  const deleteAllChars: (
    toDelete: string,
    setString: (newValue: string) => void
  ) => {
    wait: () => Promise<boolean>;
    interval: NodeJS.Timeout;
  } = (toDelete, setString) => {
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
      }, 40);
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
    setWord: (newValue: string) => void
  ) => {
    wait: () => Promise<boolean>;
    interval: NodeJS.Timeout;
  } = (word, acutalWord, setWord) => {
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
      }, 80);
    });
    return {
      wait: async () => {
        return innerPromise;
      },
      interval,
    };
  };

  useEffect(() => {
    let toWrite: string = "";
    if (slide > 41) toWrite = " - Links";
    else if (slide > 29) toWrite = " - Quizz";
    else if (slide > 28) toWrite = " - Exemple";
    else if (slide > 27) toWrite = " - Standard";
    else if (slide > 26) toWrite = " - Revert & require";
    else if (slide > 25) toWrite = " - Units";
    else if (slide > 24) toWrite = " - Global variables";
    else if (slide > 20) toWrite = " - Variables";
    else if (slide > 15) toWrite = " - Constructor & receive";
    else if (slide > 8) toWrite = " - State mutability";
    else if (slide > 3) toWrite = " - Visibility";

    if (subTitle === toWrite) return;
    //? First delete all characters from the subtitle one by one
    let interval: NodeJS.Timeout | null = null;
    let interval2: NodeJS.Timeout | null = null;
    if (!toWrite.startsWith(subTitle)) {
      const res = deleteAllChars(subTitle, setSubTitle);
      interval = res.interval;
      const wait = res.wait;

      wait().then(() => {
        //? Then add all characters from the subtitle one by one
        interval2 = addAllChars(toWrite, "", setSubTitle).interval;
      });
    } else {
      //? Then add all characters from the subtitle one by one
      interval2 = addAllChars(toWrite, subTitle, setSubTitle).interval;
    }

    return () => {
      if (interval) clearInterval(interval);
      if (interval2) clearInterval(interval2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  const maxSlide = 21;

  return (
    <MultiSlideElement>
      <div
        className={cn(
          "absolute top-0 w-screen flex flex-col transition-all duration-300 py-14 px-14 gap-8",
          {
            "hidden opacity-0": slide < 2,
            "-left-[100vw]": slide >= maxSlide,
            "h-screen": slide < maxSlide,
          },
          slide >= 3 ? "left-0" : "left-[100vw]"
        )}
      >
        <h2
          className={cn(
            "text-4xl lg:text-7xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex flex-row items-center gap-3",
            {
              "!left-8 !top-12 !translate-x-0 !translate-y-0": slide > 3,
              "!-left-[100vw]": slide >= maxSlide,
            }
          )}
        >
          Solidity{" "}
          <span className="text-primary text-2xl lg:text-4xl">{subTitle}</span>
        </h2>
        {slide > 2 && slide < 10 && (
          <>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all mt-32 -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 5,
                  "!translate-x-0": slide > 3 && slide < 9,
                  "!-translate-x-full": slide > 8,
                }
              )}
            >
              <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                Public{" "}
                <Chip variant="faded" color="primary">
                  plus permissif
                </Chip>
              </div>
              <CodeBlock code={`uint public x = 0;`} className="text-2xl" />
              <p className="text-foreground-500">
                Les variables publiques sont accessibles de partout
              </p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 6,
                  "!translate-x-0": slide > 3 && slide < 9,
                  "!-translate-x-full": slide > 8,
                }
              )}
            >
              <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                Private{" "}
                <Chip variant="faded" color="warning">
                  plus restrictif
                </Chip>
              </div>
              <CodeBlock code={`uint private x = 0;`} className="text-2xl" />
              <p className="text-foreground-500">
                Les variables privées ne sont accessibles qu'à partir du contrat
              </p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 7,
                  "!translate-x-0": slide > 3 && slide < 9,
                  "!-translate-x-full": slide > 8,
                }
              )}
            >
              <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                Internal{" "}
                <Chip variant="faded" color="success">
                  par défaut
                </Chip>
              </div>
              <CodeBlock code={`uint internal x = 0;`} className="text-2xl" />
              <p className="text-foreground-500">
                Les variables internes ne sont accessibles qu'à partir du
                contrat et des contrats qui en héritent
              </p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 8,
                  "!translate-x-0": slide > 3 && slide < 9,
                  "!-translate-x-full": slide > 8,
                }
              )}
            >
              <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                External{" "}
                <Chip variant="faded" color="danger">
                  uniquement pour les fonctions
                </Chip>
              </div>
              <CodeBlock
                code={`function external x() {}`}
                className="text-2xl"
              />
              <p className="text-foreground-500">
                Les fonctions externes ne sont accessibles que depuis
                l'extérieur du contrat
              </p>
            </div>
          </>
        )}
        {slide > 9 && slide < 17 && (
          <>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all mt-32 -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 12,
                  "!translate-x-0": slide > 10 && slide < 16,
                  "!-translate-x-full": slide > 15,
                }
              )}
            >
              <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                Default{" "}
                <Chip variant="faded" color="warning">
                  non spécifié
                </Chip>
              </div>
              <CodeBlock code={`function x() {}`} className="text-2xl" />
              <p className="text-foreground-500">
                Une fonction sans spécificateur de mutabilité peux lire et
                modifier les variables
              </p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 13,
                  "!translate-x-0": slide > 10 && slide < 16,
                  "!-translate-x-full": slide > 15,
                }
              )}
            >
              <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                View{" "}
                <Chip variant="faded" color="primary">
                  non modifiant
                </Chip>
              </div>
              <CodeBlock code={`function x() view {}`} className="text-2xl" />
              <p className="text-foreground-500">
                Les fonctions view ne peuvent pas modifier les variables. Elles
                sont souvent utilisées pour lire des variables ou calculer des
                valeurs
              </p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 14,
                  "!translate-x-0": slide > 10 && slide < 16,
                  "!-translate-x-full": slide > 15,
                }
              )}
            >
              <p className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                Pure
              </p>
              <CodeBlock code={`function x() pure {}`} className="text-2xl" />
              <p className="text-foreground-500">
                Les fonctions pure ne peuvent pas lire ou modifier les
                variables.
              </p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 15,
                  "!translate-x-0": slide > 10 && slide < 16,
                  "!-translate-x-full": slide > 15,
                }
              )}
            >
              <p className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                Payable
              </p>
              <CodeBlock
                code={`function x() payable {}`}
                className="text-2xl"
              />
              <p className="text-foreground-500">
                Les fonctions payable peuvent recevoir des ethers. Elles peuvent
                lire et modifier les variables.
              </p>
            </div>
          </>
        )}
        {slide > 16 && slide < 22 && (
          <>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all mt-32 -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 19,
                  "!translate-x-0": slide > 17 && slide < 21,
                  "!-translate-x-full": slide > 21,
                }
              )}
            >
              <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                Constructor
              </div>
              <CodeBlock
                code={`constructor(bool myVariable) {
  x = myVariable;
}`}
                className="text-2xl"
              />
              <p className="text-foreground-500">
                Le constructeur est appelé lors du déploiement du contrat. Il
                sert principalement à initialiser les variables de celui-ci
              </p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 transition-all -translate-x-full",
                {
                  "opacity-40 blur-sm": slide < 20,
                  "!translate-x-0": slide > 17 && slide < 21,
                  "!-translate-x-full": slide > 21,
                }
              )}
            >
              <div className="text-3xl text-foreground font-bold flex flex-row gap-2 items-center">
                Receive
              </div>
              <CodeBlock code={`receive() payable {}`} className="text-2xl" />
              <p className="text-foreground-500">
                Le receive est appelé lorsqu'un utilisateur envoie des ethers au
                contrat sans appeler une fonction spécifique.
              </p>
            </div>
          </>
        )}
      </div>
    </MultiSlideElement>
  );
}
