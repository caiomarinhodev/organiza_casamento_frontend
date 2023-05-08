import { Injectable } from "@angular/core";

@Injectable()
export class ChecklistService {
  public activities = [
    { name: "Escolher a data do casamento", completed: false },
    { name: "Definir o local da cerimônia", completed: false },
    { name: "Definir o local da festa", completed: false },
    { name: "Escolher o traje do noivo", completed: false },
    { name: "Escolher o vestido da noiva", completed: false },
    { name: "Contratar o fotógrafo", completed: false },
    { name: "Contratar o DJ ou banda", completed: false },
    { name: "Enviar os convites", completed: false },
    { name: "Definir o cardápio", completed: false },
    { name: "Escolher a decoração", completed: false },
    { name: "Contratar o celebrante", completed: false },
    { name: "Escolher as músicas da cerimônia", completed: false },
    { name: "Escolher as músicas da festa", completed: false },
  ];

  constructor() {}
}
