// Ao ultilizar cerquilha (#), criamos uma chave privada, a informaçao só sera visivel dentro da classe.


import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map()     // map() é como se fosse um array, porem armazena duas informaçoes= (id, value).


// Metódos para manusear os videos.
    
    list(){                                         // Mostra os videos no banco de dados.
        return Array.from(this.#videos.entries()).map((videoArray) => {     // Array.from => converte uma estrutura de dados que nao é uma array em array.
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,
                ...data
            }
        })   
    }                                               

    create(video) {                                 

        const videoId = randomUUID()                // Cria um id aleatorio unico.
        this.#videos.set(videoId, video)            // Salva dentro do Map() videos.
        return videoId
    }

    update(id, video) {                             // Recebe o id e o video.
        this.#videos.set(id, video)                 // Faz o update no Map() videos.
    }

    delete(id) {
        this.#videos.delete(id)
    }
}