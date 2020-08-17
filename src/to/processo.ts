import { Usuario } from './usuario';
export class Processo {

    id: number
    titulo: string
    descricao: string
    pendenteParecer: boolean
    pendenteParecerString: string
    usuarios: Usuario[]
    nomeUsuarios: string
}
