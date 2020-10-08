import { Usuario } from './usuario';
export class Processo {

    id: number
    titulo: string
    descricao: string
    pendenteParecer: boolean
    pendenteParecerString: string
    descricaoParecer: string
    usuarios: Usuario[]
    nomeUsuarios: string
}
