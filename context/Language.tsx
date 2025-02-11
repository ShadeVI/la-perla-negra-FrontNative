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

interface LanguageContext {
  selectedLanguage: Language | null;
  allSupportedLanguages: Language[];
  setSelectedLanguage: Dispatch<SetStateAction<Language | null>>;
}

const INITIAL_CONTEXT: LanguageContext = {
  selectedLanguage: null,
  allSupportedLanguages: [],
  setSelectedLanguage: () => {},
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
      console.log("FETCHING: LANGUAGES");
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

export const useLanguage = (): LanguageContext => {
  return useContext(LanguageContext);
};
