import { fetchSupportedLanguages } from "@/lib/sanity/httpSanity";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Language {
  id: string;
  title: string;
  isDefault: boolean;
}

interface INITIAL_CONTEXT {
  selectedLanguage: Language | null;
  allSupportedLanguages: Language[];
  setSelectedLanguage: Dispatch<SetStateAction<Language | null>>;
}

const INITIAL_CONTEXT: INITIAL_CONTEXT = {
  selectedLanguage: null,
  allSupportedLanguages: [],
  setSelectedLanguage: () => {}, // Funzione vuota
};

const LanguageContext = createContext(INITIAL_CONTEXT);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  const [allSupportedLanguages, setAllSupportedLanguages] = useState<
    Language[]
  >([]);

  useEffect(() => {
    fetchSupportedLanguages().then((res: Language[]) => {
      setAllSupportedLanguages(res);
      const defaultLanguage = res.find((lang) => lang.isDefault)!;
      setSelectedLanguage(defaultLanguage);
    });
  }, []);

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, setSelectedLanguage, allSupportedLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): {
  selectedLanguage: Language | null;
  allSupportedLanguages: Language[];
  setSelectedLanguage: React.Dispatch<SetStateAction<Language | null>>;
} => {
  return useContext(LanguageContext);
};
