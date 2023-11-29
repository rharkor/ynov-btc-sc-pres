import { useContext, useState } from "react";
import { RootContext } from "../contexts/root/RootContext";
import { SlideContext } from "../contexts/slide/SlideContext";
import MultiSlideElement from "../components/MultiSlideElement";
import { Button, cn } from "@nextui-org/react";

const questions: {
  title: string;
  answers: {
    title: string;
    correct: boolean;
  }[];
}[] = [
  {
    title: "Qu'est-ce que Solidity ?",
    answers: [
      {
        title: "Une cryptomonnaie",
        correct: false,
      },
      {
        title: "Un langage de programmation pour les contrats intelligents",
        correct: true,
      },
      {
        title: "Un protocole de blockchain",
        correct: false,
      },
      {
        title: "Une bourse décentralisée",
        correct: false,
      },
    ],
  },
  {
    title: "Pour quelle blockchain Solidity est-elle principalement utilisée ?",
    answers: [
      {
        title: "Bitcoin",
        correct: false,
      },
      {
        title: "Ripple",
        correct: false,
      },
      {
        title: "Ethereum",
        correct: true,
      },
      {
        title: "Litecoin",
        correct: false,
      },
    ],
  },
  {
    title:
      "Quel est le but d'une fonction de constructeur dans un contrat intelligent Solidity ?",
    answers: [
      {
        title: "Détruire le contrat",
        correct: false,
      },
      {
        title: "Envoyer de l'Ether au contrat",
        correct: false,
      },
      {
        title: "Initialiser les variables d'état du contrat",
        correct: true,
      },
      {
        title: "Exécuter la fonction principale du contrat",
        correct: false,
      },
    ],
  },
  {
    title:
      "En quoi les variables d'état diffèrent-elles des variables locales en Solidity ?",
    answers: [
      {
        title:
          "Les variables d'état sont temporaires, tandis que les variables locales sont permanentes",
        correct: false,
      },
      {
        title:
          "Les variables d'état ne sont utilisées que dans les fonctions, tandis que les variables locales sont utilisées globalement",
        correct: false,
      },
      {
        title:
          "Les variables locales ne peuvent pas être modifiées après leur déclaration",
        correct: false,
      },
      {
        title:
          "Les variables d'état sont stockées de manière permanente sur la blockchain",
        correct: true,
      },
    ],
  },
  {
    title: "Quel est le but du mot-clé 'view' dans une fonction Solidity ?",
    answers: [
      {
        title: "Indiquer que la fonction ne modifie pas l'état",
        correct: true,
      },
      {
        title: "Spécifier que la fonction modifie l'état",
        correct: false,
      },
      {
        title: "Indiquer que la fonction est payable",
        correct: false,
      },
      {
        title: "Spécifier la visibilité de la fonction",
        correct: false,
      },
    ],
  },
  {
    title: "Que gère la fonction 'receive' dans un contrat Solidity ?",
    answers: [
      {
        title: "Les transactions avec des frais de gaz incorrects",
        correct: false,
      },
      {
        title: "Les événements et erreurs inattendus",
        correct: false,
      },
      {
        title: "Les Ether entrants sans signature de fonction correspondante",
        correct: true,
      },
      {
        title: "Les surcharges de fonction dans le contrat",
        correct: false,
      },
    ],
  },
  {
    title: "Comment les données sont-elles stockées dans un mapping Solidity ?",
    answers: [
      {
        title: "Dans un tableau",
        correct: false,
      },
      {
        title: "Sous forme de paires clé-valeur",
        correct: true,
      },
      {
        title: "Dans une liste chaînée",
        correct: false,
      },
      {
        title: "Dans une pile",
        correct: false,
      },
    ],
  },
  {
    title: "Quel est le but de l'instruction 'require' en Solidity ?",
    answers: [
      {
        title: "Déclarer une nouvelle variable",
        correct: false,
      },
      {
        title: "Effectuer des opérations arithmétiques",
        correct: false,
      },
      {
        title:
          "Vérifier une condition et annuler la transaction si elle est fausse",
        correct: true,
      },
      {
        title: "Transférer de l'Ether entre des comptes",
        correct: false,
      },
    ],
  },
  {
    title: "Quel est le rôle de 'msg.sender' dans un contrat Solidity ?",
    answers: [
      {
        title: "Il représente le contrat lui-même",
        correct: false,
      },
      {
        title: "Il fait référence au réseau Ethereum",
        correct: false,
      },
      {
        title: "C'est un mot-clé réservé sans but spécifique",
        correct: false,
      },
      {
        title: "Il est l'expéditeur de la transaction actuelle",
        correct: true,
      },
    ],
  },
  {
    title:
      "Que définit la norme ERC-20 dans le contexte de Solidity et d'Ethereum ?",
    answers: [
      {
        title: "Une norme pour les bourses décentralisées",
        correct: false,
      },
      {
        title: "Un protocole pour la communication inter-bloc",
        correct: false,
      },
      {
        title: "Une interface standard pour les jetons fongibles",
        correct: true,
      },
      {
        title: "Un algorithme de consensus pour Ethereum",
        correct: false,
      },
    ],
  },
  {
    title: "Combien de wei y a-t-il dans un Ether ? (pour les jetons ERC20)",
    answers: [
      {
        title: "10^12",
        correct: false,
      },
      {
        title: "10^16",
        correct: false,
      },
      {
        title: "10^18",
        correct: true,
      },
      {
        title: "10^21",
        correct: false,
      },
    ],
  },
  {
    title: "Pourquoi les fonctions view et pure ne coûtent-elles pas de gaz ?",
    answers: [
      {
        title:
          "Parce que les mineurs Ethereum exemptent ces fonctions des frais de gaz pour promouvoir l'efficacité.",
        correct: false,
      },
      {
        title:
          "En raison d'un bug dans le protocole Ethereum qui permet aux développeurs de contourner les frais de gaz pour ces fonctions.",
        correct: false,
      },
      {
        title:
          "Les fonctions view et pure coûtent en réalité du gaz ; c'est une idée fausse courante qu'elles n'en coûtent pas.",
        correct: false,
      },
      {
        title:
          "Elles ne modifient pas l'état de la blockchain, donc il n'est pas nécessaire d'obtenir un consensus entre les mineurs.",
        correct: true,
      },
    ],
  },
];

export default function QCM() {
  const { admin } = useContext(RootContext);
  const { slide } = useContext(SlideContext);
  const [selected, setSelected] = useState<(number | null)[]>([]);

  const questionsIndex = Math.max(0, slide - 30);

  return (
    <MultiSlideElement>
      <div
        className={cn(
          "absolute top-0 w-screen h-screen flex flex-col justify-center items-center transition-all duration-300 gap-8 overflow-hidden",
          {
            "hidden opacity-0": slide < 29 || slide > 30 + questions.length,
            "!-translate-x-[100vw]": slide >= 30 + questions.length,
          },
          slide >= 30 ? "left-0" : "left-[100vw]"
        )}
      >
        <div
          className="w-max h-full flex flex-row absolute left-0 transition-all duration-300"
          style={{
            transform: `translateX(-${questionsIndex * 100}vw)`,
          }}
        >
          {questions.map((question, index) => (
            <Item
              key={index}
              question={question}
              index={index}
              outOf={questions.length}
              selected={selected[index]}
              select={(index) => {
                setSelected((selected) => {
                  const newSelected = [...selected];
                  newSelected[questionsIndex] = index;
                  return newSelected;
                });
              }}
              isAdmin={admin}
            />
          ))}
        </div>
      </div>
    </MultiSlideElement>
  );
}

function Item({
  question,
  index,
  outOf,
  selected,
  select,
  isAdmin,
}: {
  question: (typeof questions)[number];
  index: number;
  outOf: number;
  selected: number | null;
  select: (index: number) => void;
  isAdmin?: boolean;
}) {
  return (
    <div className="w-screen h-screen py-14 px-14 flex justify-center items-center">
      <div className="max-w-[80%] w-[750px] flex flex-col justify-center items-center gap-2">
        <Question title={question.title} index={index} outOf={outOf} />
        <ul className="list-none text-xl lg:text-2xl mt-4 flex flex-col gap-2 w-full">
          {question.answers.map((answer, index) => (
            <Answer
              key={index}
              title={answer.title}
              selected={selected === index}
              select={() => select(index)}
              isValid={
                selected === index && isAdmin ? answer.correct : undefined
              }
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function Question({
  title,
  index,
  outOf,
}: {
  title: string;
  index: number;
  outOf: number;
}) {
  return (
    <h3 className="text-xl lg:text-2xl text-center p-6 px-8 rounded-medium bg-primary/20 w-full border border-primary relative">
      {title}
      <span className="text-foreground-500 absolute bottom-0 right-0 p-2 text-sm">
        {index + 1} / {outOf}
      </span>
    </h3>
  );
}

function Answer({
  title,
  selected,
  select,
  isValid,
}: {
  title: string;
  selected: boolean;
  select: () => void;
  isValid?: boolean;
}) {
  return (
    <li className="w-full">
      <Button
        color={
          isValid !== undefined ? (isValid ? "success" : "danger") : "primary"
        }
        variant={selected ? "solid" : "ghost"}
        className="w-full text-lg whitespace-normal h-max py-2"
        size="lg"
        onPress={select}
      >
        {title}
      </Button>
    </li>
  );
}
