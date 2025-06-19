import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MaterialModel } from '../../interfaces/Material';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materials.component.html'
})
export class MaterialsComponent implements OnInit {
  materials: MaterialModel[] = [];
  loading = false;
  showModal = false;
  editingMaterial: MaterialModel | null = null;
  currentMaterial: Partial<MaterialModel> = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.loading = true;
    this.apiService.getMaterials().subscribe({
      next: (materials) => {
        this.materials = materials;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading materials:', error);
        this.loading = false;
      }
    });
  }

  openModal(material?: MaterialModel) {
    this.editingMaterial = material || null;
    this.currentMaterial = material ? { ...material } : {
      nombre_material: '',
      tipo_material: '',
      renovable: false,
      reciclable: false,
      confianza: 0,
      impacto_ambiental: '',
      optimizado: false
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingMaterial = null;
    this.currentMaterial = {};
  }

  saveMaterial() {
    if (this.editingMaterial) {
      this.apiService.updateMaterial(this.editingMaterial.id, this.currentMaterial).subscribe({
        next: () => {
          this.loadMaterials();
          this.closeModal();
        },
        error: (error) => console.error('Error updating material:', error)
      });
    } else {
      this.apiService.createMaterial(this.currentMaterial).subscribe({
        next: () => {
          this.loadMaterials();
          this.closeModal();
        },
        error: (error) => console.error('Error creating material:', error)
      });
    }
  }

  deleteMaterial(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este material?')) {
      this.apiService.deleteMaterial(id).subscribe({
        next: () => this.loadMaterials(),
        error: (error) => console.error('Error deleting material:', error)
      });
    }
  }

  getImpactColor(impacto: string): string {
    switch (impacto?.toLowerCase()) {
      case 'bajo': return 'text-green-600 bg-green-100';
      case 'medio': return 'text-yellow-600 bg-yellow-100';
      case 'alto': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  getConfidenceColor(confianza: number): string {
    if (confianza >= 0.8) return 'text-green-600';
    if (confianza >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  }
}