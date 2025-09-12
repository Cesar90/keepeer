// CookieService.ts
class CookieService {
    // Get a cookie by name with a type-safe return
    static getCookie(cookieName: string): string | null {
        const name = `${cookieName}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i += 1) {
            const cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }

    static getCookieValueJson<T>(name: string): T | null {
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
            ?.split('=')[1];
        const jsonData = cookieValue ? decodeURIComponent(cookieValue) : null;
        return jsonData ? JSON.parse(jsonData) as T : null;
    }

    // Set a cookie with expiration time in days
    static setCookie(name: string, value: string, days: number): void {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value || ''}${expires}; path=/`;
    }

    // Delete a cookie by setting max age to a negative value
    static deleteCookie(name: string): void {
        document.cookie = `${name}=; Max-Age=-99999999;`;
    }
}

export default CookieService;
