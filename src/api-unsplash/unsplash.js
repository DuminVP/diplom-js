import Unsplash from 'unsplash-js';
import { getCookie, setCookie } from '../helpers';


const DEFS = {
    accessKey: "316ed90315124b7ec9db00e4dbb62e6134b5d20a5da2eae7ab8684ad31a1ea18",
    secretkey: "217937c8b2305f7ffcbea989403886e56bae2ce2b3c6a220a0387c09f1ed8e05",
    callbackUrl: "http://momentinlife.ru/"
}

// Инициализация
export const unsplash = new Unsplash({
    applicationId: DEFS.accessKey,
    secret: DEFS.secretkey,
    callbackUrl: DEFS.callbackUrl
});

export const authenticationUnsplash = (unsplash) => {
    // Генерирует ссылку для авторизации с указанными правами
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
        "public",
        "write_likes"
    ]);

    window.location.assign(authenticationUrl); // Перенапревление на авторизацию в unsplash
    
}

export const getToken = (unsplash, code) => {
    console.log(code);
    if (getCookie("token")) {
        return unsplash.auth.setBearerToken(getCookie("token"));
    } else if (code) {
        return unsplash.auth.userAuthentication(code)
            .then(res => res.text())
            .then(res => {
                if (res && res != "Rate Limit Exceeded") {
                    window.localStorage['keycode'] = code;
                    let date = new Date;
                    date.setDate(date.getDate() + 1);
                    setCookie("token", JSON.parse(res).access_token, {
                        expires: date.toUTCString()
                    });
                    unsplash.auth.setBearerToken(JSON.parse(res).access_token);
                } else { console.error("Лимит запросов исчерпан!"); }
        });
    }
}