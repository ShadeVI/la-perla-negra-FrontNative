import { fetchSupportedLanguages } from "@/lib/sanity/httpSanity";
import {
  createContext,
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

export const LanguageContext = createContext({});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    id: "es",
    isDefault: true,
    title: "Español",
  });
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
  selectedLanguage?: Language;
  allSupportedLanguages?: Language[];
  setSelectedLanguage?: React.Dispatch<SetStateAction<Language | null>>;
} => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Cannot use useLanguage outside of the Provider");
  }
  return context;
};
