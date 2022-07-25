export type EstanteType = {
  id: number,
  qtdPrateleiras: number,
  qtdNichosPorPrateleira: number,
  descricao: string,
  prateleiras: PrateleiraType[]
}

export type CadastroEstanteType = {
  descricao: string,
  qtdNichosPorPrateleira: number,
  qtdPrateleiras: number
}

export type CadastroDispositivoType = {
  idCategoriaDispositivo: number,
  idNicho: number,
  idTipoDispositivo: number,
  value: number
}

export type CategoriaDispositivoType = {
  id: number,
  medida: string,
  nome: string
}

export type TipoDispositivoType = {
  id: number,
  nome: string
}

export type DispositivoType = {
  id: number,
  idEstante?: number;
  categoriaDispositivo: CategoriaDispositivoType,
  tipoDispositivo: TipoDispositivoType,
  value: number,
  idNicho: number,
}

export type CategoriaPlantaType = {
  id: number;
  nome: string;
  tipoTerra: string;
  temperaturaIdeal: number;
  consumoAguaPorDia: number;
}

export type PlantaType = {
  id: number;
  idNicho: number;
  categoriaPlanta: CategoriaPlantaType;
  nome: string;
  dataPlantio: number;
}

export type NichoType = {
  id: number,
  posicaoHorizontal: number,
  idPrateleira: number;
  dispositivos: Array<DispositivoType>,
  plantas: Array<PlantaType>
}

export type PrateleiraType = {
  id: number;
  idEstante: number;
  posicaoVertical: number,
  nichos: Array<NichoType>;
}
