import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ModelPerformanceModel } from '../../interfaces/ModelPerformance';

@Component({
  selector: 'app-model-performance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './model-performance.component.html'
})
export class ModelPerformanceComponent implements OnInit {
  models: ModelPerformanceModel[] = [];
  loading = false;
  showModal = false;
  editingModel: ModelPerformanceModel | null = null;
  currentModel: Partial<ModelPerformanceModel> = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadModels();
  }

  loadModels() {
    this.loading = true;
    this.apiService.getModelPerformances().subscribe({
      next: (models) => {
        this.models = models;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading models:', error);
        this.loading = false;
      }
    });
  }

  openModal(model?: ModelPerformanceModel) {
    this.editingModel = model || null;
    this.currentModel = model ? { ...model } : {
      nombre: '',
      formato: '',
      score: 0,
      precision: 0,
      recall: 0,
      dataset: '',
      optimizado: false
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingModel = null;
    this.currentModel = {};
  }

  saveModel() {
    if (this.editingModel) {
      this.apiService.updateModelPerformance(this.editingModel.id, this.currentModel).subscribe({
        next: () => {
          this.loadModels();
          this.closeModal();
        },
        error: (error) => console.error('Error updating model:', error)
      });
    } else {
      this.apiService.createModelPerformance(this.currentModel).subscribe({
        next: () => {
          this.loadModels();
          this.closeModal();
        },
        error: (error) => console.error('Error creating model:', error)
      });
    }
  }

  deleteModel(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este modelo?')) {
      this.apiService.deleteModelPerformance(id).subscribe({
        next: () => this.loadModels(),
        error: (error) => console.error('Error deleting model:', error)
      });
    }
  }

  getScoreColor(score: number): string {
    if (score >= 0.9) return 'text-green-600';
    if (score >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  }

  getScoreBadgeColor(score: number): string {
    if (score >= 0.9) return 'bg-green-100 text-green-800';
    if (score >= 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }
}