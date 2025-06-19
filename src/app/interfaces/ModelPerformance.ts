export interface ModelPerformanceModel {
  id: string;
  nombre: string;
  formato: string;
  score?: number;
  precision?: number;
  recall?: number;
  dataset?: string;
  fecha_entrenamiento?: Date;
  optimizado: boolean;
}