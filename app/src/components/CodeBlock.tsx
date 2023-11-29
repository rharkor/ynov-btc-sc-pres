import { cn } from "@nextui-org/react";
import { Code as OCodeBlock, dracula } from "react-code-blocks";
import { Theme } from "react-code-blocks/dist/types";

export default function CodeBlock(
  {
    code,
    language,
    showLineNumbers,
    startingLineNumber,
    className,
  }: {
    code?: string;
    language?: string;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    theme?: Theme;
    className?: string;
  } = {
    code: "",
    language: "javascript",
    showLineNumbers: true,
    startingLineNumber: 1,
  }
) {
  return (
    <div className={cn("auto-select [&>span]:!block w-max", className)}>
      <OCodeBlock
        text={code || ""}
        language={language || "javascript"}
        showLineNumbers={showLineNumbers}
        startingLineNumber={startingLineNumber}
        theme={dracula}
      />
    </div>
  );
}
