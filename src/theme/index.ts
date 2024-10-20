// Color Tokens and Theme Settings for MUI

/**
 * Interface representing color tokens for the theme.
 * This defines the structure of the color values used in the theme.
 */
interface ColorTokens {
  grey: {
    [key: number]: string;
  };
  primary: {
    [key: number]: string;
  };
}

/**
 * Color tokens that define a consistent color palette for the application.
 * These color codes will be used in both light and dark themes.
 */
export const colorTokens: ColorTokens = {
  grey: {
    0: "#FFFFFF", // White
    10: "#F6F6F6", // Lightest grey
    50: "#F0F0F0", // Slightly darker grey
    100: "#E0E0E0", // Light grey
    200: "#C2C2C2", // Mid grey
    300: "#A3A3A3", // Darker grey
    400: "#858585", // Dark grey
    500: "#666666", // Standard grey
    600: "#4D4D4D", // Darker grey
    700: "#333333", // Darker grey
    800: "#1A1A1A", // Almost black
    900: "#0A0A0A", // Near-black
    1000: "#000000", // Black
  },
  primary: {
    50: "#E6FBFF", // Lightest primary color
    100: "#CCF7FE", // Light primary color
    200: "#99EEFD", // Light-medium primary color
    300: "#66E6FC", // Medium primary color
    400: "#33DDFB", // Darker primary color
    500: "#00D5FA", // Standard primary color
    600: "#00A0BC", // Darker primary color
    700: "#006B7D", // Dark primary color
    800: "#00353F", // Darker primary color
    900: "#001519", // Darkest primary color
  },
};

/**
 * Interface representing the structure of the theme settings.
 * This is used to configure the Material-UI theme settings such as palette and typography.
 */
export interface ThemeSettings {
  palette: {
    mode: string; // Light or dark mode
    primary: {
      dark: string; // Dark shade of the primary color
      main: string; // Main shade of the primary color
      light: string; // Light shade of the primary color
    };
    neutral: {
      dark: string; // Dark shade of the neutral color
      main: string; // Main shade of the neutral color
      mediumMain: string; // Medium shade of the neutral color
      medium: string; // Another medium shade of the neutral color
      light: string; // Light shade of the neutral color
    };
    background: {
      default: string; // Default background color
      alt: string; // Alternative background color
    };
  };
  typography: {
    fontFamily: string; // Font family for the application
    fontSize: number; // Base font size
    h1: {
      fontFamily: string; // Font family for header 1
      fontSize: number; // Font size for header 1
    };
    h2: {
      fontFamily: string; // Font family for header 2
      fontSize: number; // Font size for header 2
    };
    h3: {
      fontFamily: string; // Font family for header 3
      fontSize: number; // Font size for header 3
    };
    h4: {
      fontFamily: string; // Font family for header 4
      fontSize: number; // Font size for header 4
    };
    h5: {
      fontFamily: string; // Font family for header 5
      fontSize: number; // Font size for header 5
    };
    h6: {
      fontFamily: string; // Font family for header 6
      fontSize: number; // Font size for header 6
    };
  };
}

/**
 * Function to generate theme settings based on the mode ('light' or 'dark').
 * @param mode - The theme mode, either 'light' or 'dark'.
 * @returns An object representing the theme settings.
 */
export const themeSettings = (mode: string): object => {
  return {
    palette: {
      mode: mode, // Use the provided mode
      ...(mode === "dark"
        ? {
            // Dark mode settings
            primary: {
              dark: colorTokens.primary[200], // Dark shade for primary color
              main: colorTokens.primary[500], // Main primary color
              light: colorTokens.primary[800], // Light shade for primary color
            },
            neutral: {
              dark: colorTokens.grey[100], // Dark shade for neutral
              main: colorTokens.grey[200], // Main neutral color
              mediumMain: colorTokens.grey[300], // Medium neutral color
              medium: colorTokens.grey[400], // Another medium neutral color
              light: colorTokens.grey[700], // Light neutral color
            },
            background: {
              default: colorTokens.grey[900], // Default dark background
              alt: colorTokens.grey[800], // Alternative dark background
            },
          }
        : {
            // Light mode settings
            primary: {
              dark: colorTokens.primary[700], // Dark shade for primary color
              main: colorTokens.primary[500], // Main primary color
              light: colorTokens.primary[50], // Light shade for primary color
            },
            neutral: {
              dark: colorTokens.grey[700], // Dark neutral color
              main: colorTokens.grey[500], // Main neutral color
              mediumMain: colorTokens.grey[400], // Medium neutral color
              medium: colorTokens.grey[300], // Another medium neutral color
              light: colorTokens.grey[50], // Light neutral color
            },
            background: {
              default: colorTokens.grey[10], // Default light background
              alt: colorTokens.grey[0], // Alternative light background
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","), // Use Rubik as the default font
      fontSize: 12, // Base font size
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // Font for header 1
        fontSize: 40, // Font size for header 1
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // Font for header 2
        fontSize: 32, // Font size for header 2
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // Font for header 3
        fontSize: 24, // Font size for header 3
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // Font for header 4
        fontSize: 20, // Font size for header 4
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // Font for header 5
        fontSize: 16, // Font size for header 5
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","), // Font for header 6
        fontSize: 14, // Font size for header 6
      },
    },
  };
};
