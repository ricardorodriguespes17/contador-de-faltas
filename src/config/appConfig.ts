type themeConfigProps = {
    appBackground: string,
    textAppColor: string,
    primaryColor: string,
    textPrimaryColor: string,
    statusBarTheme: "inverted" | "auto" | "light" | "dark",
    accentColor: string,
}

export const darkMode: themeConfigProps = {
    appBackground: "#222",
    textAppColor: "#fff",
    primaryColor: "#134e4a",
    textPrimaryColor: "#fff",
    statusBarTheme: "light",
    accentColor: "#FF5A5F",
}

export const lightMode: themeConfigProps = {
    appBackground: "#fff",
    textAppColor: "#000",
    primaryColor: "#0d9488",
    textPrimaryColor: "#fff",
    statusBarTheme: "light",
    accentColor: "#FF5A5F",
}