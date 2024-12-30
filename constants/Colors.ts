/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#b22222';
const tintColorDark = '#FDBF50';

export const Colors = {
  light: {
    text: "#4b2e2e",          // Marrone caldo e profondo, elegante e leggibile
    background: "#fff8f0",   // Beige chiaro, richiama la luce naturale e l'accoglienza
    gray: "#d1c9c6",
    tint: "#d84315",         // Arancione bruciato, caldo e invitante
    icon: "#e64a19",         // Arancione profondo, per evidenziare elementi
    tabIconDefault: "#9e9e9e", // Grigio tenue per icone inattive
    tabIconSelected: "#d84315", // Arancione bruciato per icone attive
  },
  dark: {
    text: "#f5f5f5",          // Bianco tenue per contrasto su sfondi scuri
    background: "#1e1e1e",   // Grigio scuro, elegante e rilassante
    gray: "#2d2c2c",
    tint: "#ff7043",         // Arancione caldo per un tocco di energia
    icon: "#ff8c00",         // Arancione vivace, richiama spezie e calore
    tabIconDefault: "#757575", // Grigio medio per icone inattive
    tabIconSelected: "#ff7043", // Arancione caldo per icone attive
  },
};


/*

CHATGPT PROPOSAL

const Colors = {
  light: {
    primary: {
      a0: "#8b0000",  // Rosso scuro, richiama il vino o i condimenti ricchi
      a10: "#b22222", // Rosso maturo, ricorda i pomodori
      a20: "#dc4c4c",
      a30: "#e57373",
      a40: "#f09898",
      a50: "#f5c6c6", // Rosato tenue
    },
    surface: {
      a0: "#ffffff",  // Bianco puro, per sfondi puliti
      a10: "#fdf7f2", // Beige chiaro, richiama tovaglie e pane
      a20: "#f5e4d2",
      a30: "#ecd2b8",
      a40: "#e2bfa0",
      a50: "#d4a487", // Tonalità calde per accenti naturali
    },
    surfaceTonal: {
      a0: "#faf3eb",  // Beige rosato tenue, crea calore
      a10: "#f3e0cf",
      a20: "#e9c8aa",
      a30: "#dcb48f",
      a40: "#c89e78",
      a50: "#a97d59", // Marrone caldo, richiama legno e tavoli rustici
    },
    accent: {
      a0: "#ff9900",  // Arancione vivido, richiama agrumi e energia
      a10: "#ffc34d",
      a20: "#ffeb99",
      a30: "#ffe4b5",
      a40: "#ffedcc",
      a50: "#fff8e1", // Tinte chiare per accentuare
    },
    success: {
      a0: "#388e3c",  // Verde scuro, fresco come erbe e ingredienti sani
      a10: "#66bb6a",
      a20: "#81c784",
      a30: "#a5d6a7",
      a40: "#c8e6c9",
      a50: "#e8f5e9", // Verde pallido rilassante
    },
    warning: {
      a0: "#ff6f00",  // Arancione profondo, richiama spezie e calore
      a10: "#ffa000",
      a20: "#ffb74d",
      a30: "#ffcc80",
      a40: "#ffe0b2",
      a50: "#fff3e0", // Tonalità chiare per avvisi o notifiche
    },
  },
  dark: {
    primary: {
      a0: "#8b0000",  // Rosso vino intenso
      a10: "#a10c0c",
      a20: "#b71d1d",
      a30: "#cc3838",
      a40: "#e05757",
      a50: "#f28a8a", // Rosso tenue per contrasto
    },
    surface: {
      a0: "#121212",  // Nero profondo, per lo sfondo principale
      a10: "#1e1e1e",
      a20: "#2a2a2a",
      a30: "#353535",
      a40: "#424242",
      a50: "#616161", // Grigi caldi per elementi secondari
    },
    surfaceTonal: {
      a0: "#1b1210",  // Marrone molto scuro, richiama il legno lucido
      a10: "#2b1e1a",
      a20: "#3d2b25",
      a30: "#4e3933",
      a40: "#604940",
      a50: "#7c665f", // Marrone caldo per tonalità naturali
    },
    accent: {
      a0: "#ff8c00",  // Arancione brillante, per pulsanti o highlights
      a10: "#ff9f33",
      a20: "#ffb566",
      a30: "#ffcc99",
      a40: "#ffe1cc",
      a50: "#fff2e6", // Toni più chiari per un leggero contrasto
    },
    success: {
      a0: "#2e7d32",  // Verde scuro per freschezza e conferme
      a10: "#4caf50",
      a20: "#66bb6a",
      a30: "#81c784",
      a40: "#a5d6a7",
      a50: "#dcedc8", // Verde pallido per dettagli positivi
    },
    warning: {
      a0: "#ff6d00",  // Arancione intenso, evoca calore e spezie
      a10: "#ff8a33",
      a20: "#ffa566",
      a30: "#ffbf99",
      a40: "#ffd9cc",
      a50: "#ffefe6", // Tinte calde per notifiche
    },
  },
};

*/