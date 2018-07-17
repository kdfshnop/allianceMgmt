import apiUrl from '@/configs/api';
export function getEnv() {
    let host = location.host;
    let env = host.indexOf('localhost') > -1 ? "dev" : "prod";
    for(let key in apiUrl.baseUrl){
        if(host.indexOf(key) > -1){
            env = key;
            break;
        }
    }

    return env;
};