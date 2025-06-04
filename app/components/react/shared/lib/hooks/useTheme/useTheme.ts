import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localstorage';
import { Theme } from '../../../const/theme';
import { ThemeContext } from '../../context/ThemeContext';

// import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
    toogleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toogleTheme = () => {
        // const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        // setTheme(newTheme);
        // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        let newTheme: Theme;
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.ORANGE;
            break;
        case Theme.ORANGE:
            newTheme = Theme.DARK;
            break;
        default:
            newTheme = Theme.LIGHT;
        }
        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toogleTheme,
    };
}
