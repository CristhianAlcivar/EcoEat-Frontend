import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageModel, UserModel } from '../../interfaces/Image';
import { ModelPerformanceModel } from '../../interfaces/ModelPerformance';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit {
  images: ImageModel[] = [];
  filteredImages: ImageModel[] = [];
  loading = false;
  searchTelefono = '';
  users: { [key: string]: UserModel } = {};
  models: { [key: string]: ModelPerformanceModel } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    this.loading = true;
    this.apiService.getImages().subscribe({
      next: (images) => {
        this.images = images;
        this.filteredImages = images;
        this.loadRelatedData();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading images:', error);
        this.loading = false;
      }
    });
  }

  loadRelatedData() {
    // Cargar datos de usuarios y modelos
    const userIds = [...new Set(this.images.map(img => img.usuario_id))];
    const modelIds = [...new Set(this.images.map(img => img.modelo_id))];

    userIds.forEach(userId => {
      this.apiService.getUserById(userId).subscribe({
        next: (user) => this.users[userId] = user,
        error: (error) => console.error('Error loading user:', error)
      });
    });

    modelIds.forEach(modelId => {
      this.apiService.getModelById(modelId).subscribe({
        next: (model) => this.models[modelId] = model,
        error: (error) => console.error('Error loading model:', error)
      });
    });
  }

  filterByTelefono() {
    if (!this.searchTelefono.trim()) {
      this.filteredImages = this.images;
      return;
    }

    this.loading = true;
    this.apiService.getImages({ telefono: this.searchTelefono }).subscribe({
      next: (images) => {
        this.filteredImages = images;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error filtering images:', error);
        this.loading = false;
      }
    });
  }

  clearFilter() {
    this.searchTelefono = '';
    this.filteredImages = this.images;
  }

  getUserName(userId: string): string {
    return this.users[userId]?.nombre || 'Cargando...';
  }

  getUserPhone(userId: string): string {
    return this.users[userId]?.telefono || 'Cargando...';
  }

  getModelName(modelId: string): string {
    return this.models[modelId]?.nombre || 'Cargando...';
  }
}