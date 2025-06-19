export interface MaterialModel {
  id: string;
  nombre_material: string;
  tipo_material: string;
  renovable: boolean;
  reciclable: boolean;
  confianza: number;
  impacto_ambiental: string;
  imagen?: string;
  optimizado: boolean
}