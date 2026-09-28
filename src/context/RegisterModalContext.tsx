import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import RegisterModal, { type CourseTrack } from "../components/RegisterModal";

interface RegisterModalContextType {
  openRegisterModal: (track?: CourseTrack | string) => void;
  closeRegisterModal: () => void;
}

const RegisterModalContext = createContext<RegisterModalContextType>({
  openRegisterModal: () => {},
  closeRegisterModal: () => {},
});

export function useRegisterModal() {
  return useContext(RegisterModalContext);
}

function normalizeTrack(track?: string): CourseTrack {
  if (!track) return "valorant";
  const lower = track.toLowerCase();
  if (lower.includes("bgmi")) return "bgmi";
  if (lower.includes("coach")) return "coaching";
  if (lower.includes("tourn") || lower.includes("ops")) return "tournament-ops";
  return "valorant";
}

export function RegisterModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [track, setTrack] = useState<CourseTrack>("valorant");

  const openRegisterModal = useCallback((t?: CourseTrack | string) => {
    setTrack(normalizeTrack(t));
    setIsOpen(true);
  }, []);

  const closeRegisterModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <RegisterModalContext.Provider value={{ openRegisterModal, closeRegisterModal }}>
      {children}
      <RegisterModal
        isOpen={isOpen}
        onClose={closeRegisterModal}
        initialTrack={track}
      />
    </RegisterModalContext.Provider>
  );
}
