import { Button, Input, useDisclosure } from "@nextui-org/react";
import { Eye, EyeOff, KeyRound, LogOut, MonitorUp } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import { RootContext } from "../contexts/root/RootContext";
import { RemoteContext } from "../contexts/remote/RemoteContext";
import Remote from "./Remote";

export default function AdminLogin() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { admin, setAdmin } = useContext(RootContext);
  const { isRemote, toggleIsRemote } = useContext(RemoteContext);

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: React.DOMAttributes<HTMLFormElement>["onSubmit"] = async (
    e
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    const worked = await fetch(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
      .then((res) => res?.ok)
      .catch(() => false);
    if (worked) {
      localStorage.setItem("adminPassword", password);
      setAdmin(true);
      setPassword("");
      setError("");
      onClose();
    } else {
      setError("Incorrect password");
    }
    setIsSubmitting(false);
  };

  const handleDisconnect = () => {
    setAdmin(false);
    if (isRemote) toggleIsRemote();
    localStorage.removeItem("adminPassword");
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      {!admin ? (
        <Button
          className="min-w-0 p-3 h-[unset]"
          color="primary"
          onPress={onOpen}
        >
          <KeyRound />
        </Button>
      ) : (
        <>
          <Button
            className="min-w-0 p-3 h-[unset]"
            color="danger"
            onPress={handleDisconnect}
          >
            <LogOut />
          </Button>
          <Button
            className="min-w-0 p-3 h-[unset]"
            color="primary"
            onPress={toggleIsRemote}
          >
            {isRemote ? <MonitorUp /> : <Remote />}
          </Button>
        </>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Login to the root account
              </ModalHeader>
              <ModalBody>
                <Input
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  errorMessage={error}
                  isInvalid={error !== ""}
                  label="Password"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
