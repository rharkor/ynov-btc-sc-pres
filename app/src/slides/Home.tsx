import { Link } from "@nextui-org/react";
import { QRCodeSVG } from "qrcode.react";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold">Your presentation title</h1>
      {import.meta.env.VITE_BASE_URL && (
        <>
          <QRCodeSVG
            value={import.meta.env.VITE_BASE_URL}
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            level="L"
            includeMargin={true}
          />
          <p className="text-center">
            Join this presentation at <br />
            <Link href={import.meta.env.VITE_BASE_URL}>
              {import.meta.env.VITE_BASE_URL}
            </Link>
          </p>
        </>
      )}
    </>
  );
}
