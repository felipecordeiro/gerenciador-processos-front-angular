import { sha256 } from 'js-sha256';

export class Utils {

    static getSHA256(valor: string): string{
        return sha256(valor)
    }
}