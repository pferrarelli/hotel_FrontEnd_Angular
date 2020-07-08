export class Cliente {
  id: number;
  nome: string;
  cognome: string;
  cellulare: string;
  indirizzo: string;
  email: string;

  constructor(id?: number, nome?: string, cognome?: string, cellulare?: string, indirizzo?: string, email?: string){
    this.id = id;
    this.nome = nome;
    this.cognome = cognome;
    this.cellulare = cellulare;
    this.indirizzo = indirizzo;
    this.email = email;
  }

  setId(id: number){
    this.id = id;
  }

  getId(): number{
    return this.id;
  }

  getNome(): string{
    return this.nome;
  }

  getCognome(): string{
    return this.cognome;
  }

  getIndirizzo(): string{
    return this.indirizzo;
  }

  getEmail(): string{
    return this.email;
  }

  getCellulare(): string{
    return this.cellulare;
  }

}
