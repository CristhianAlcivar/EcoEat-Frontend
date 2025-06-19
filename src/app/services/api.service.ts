import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageModel, UserModel } from '../interfaces/Image';
import { MaterialModel } from '../interfaces/Material';
import { ModelPerformanceModel } from '../interfaces/ModelPerformance';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  // Servicios para Imágenes
  getImages(filters?: { telefono?: string }): Observable<ImageModel[]> {
    let params = new HttpParams();
    if (filters?.telefono) {
      params = params.set('telefono', filters.telefono);
    }
    return this.http.get<ImageModel[]>(`${this.baseUrl}/imagenes/`, { params });
  }

  getImageById(id: string): Observable<ImageModel> {
    return this.http.get<ImageModel>(`${this.baseUrl}/imagenes/${id}`);
  }

  getUserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/usuarios/${id}`);
  }
  

  getModelById(id: string): Observable<ModelPerformanceModel> {
    return this.http.get<ModelPerformanceModel>(`${this.baseUrl}/modelos/${id}`);
  }

  // Servicios para Materiales
  getMaterials(): Observable<MaterialModel[]> {
    return this.http.get<MaterialModel[]>(`${this.baseUrl}/materiales`);
  }

  getMaterialById(id: string): Observable<MaterialModel> {
    return this.http.get<MaterialModel>(`${this.baseUrl}/materiales/${id}`);
  }

  createMaterial(material: Partial<MaterialModel>): Observable<MaterialModel> {
    return this.http.post<MaterialModel>(`${this.baseUrl}/materiales`, material);
  }

  updateMaterial(id: string, material: Partial<MaterialModel>): Observable<MaterialModel> {
    return this.http.put<MaterialModel>(`${this.baseUrl}/materiales/${id}`, material);
  }

  deleteMaterial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/materiales/${id}`);
  }

  // Servicios para Rendimiento de Modelos
  getModelPerformances(): Observable<ModelPerformanceModel[]> {
    return this.http.get<ModelPerformanceModel[]>(`${this.baseUrl}/modelos`);
  }

  getModelPerformanceById(id: string): Observable<ModelPerformanceModel> {
    return this.http.get<ModelPerformanceModel>(`${this.baseUrl}/modelos/${id}`);
  }

  createModelPerformance(model: Partial<ModelPerformanceModel>): Observable<ModelPerformanceModel> {
    return this.http.post<ModelPerformanceModel>(`${this.baseUrl}/modelos`, model);
  }

  updateModelPerformance(id: string, model: Partial<ModelPerformanceModel>): Observable<ModelPerformanceModel> {
    return this.http.put<ModelPerformanceModel>(`${this.baseUrl}/modelos/${id}`, model);
  }

  deleteModelPerformance(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/modelos/${id}`);
  }
}