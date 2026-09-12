import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular'; // <-- Importamos ViewWillEnter
import axios from 'axios';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class Tab1Page implements ViewWillEnter { // <-- Cambiamos OnInit por ViewWillEnter
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  textoBusqueda = '';
  
  isModalOpen = false;
  isEditing = false;
  
  usuarioActual = {
    id: null, nombre: '', apellido: '', username: '', 
    email: '', password: '', rol: '', estado: 'Activo'
  };
  
  apiUrl = 'http://localhost/api_movil/api_usuarios.php';

  constructor() {}

  // Esta función nativa de Ionic garantiza que se ejecute cada vez que abres el Tab
  ionViewWillEnter() {
    console.log("⚡ Entrando al Tab 1, pidiendo datos...");
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    try {
      const response = await axios.get(this.apiUrl);
      console.log("📦 Respuesta cruda de la API:", response.data);

      if (response.data && response.data.success) {
        this.usuarios = response.data.data;
        this.usuariosFiltrados = [...this.usuarios];
        console.log("✅ Usuarios dibujados en tabla:", this.usuariosFiltrados.length);
      } else {
        console.warn("⚠️ La API respondió, pero success no es true");
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
    }
  }

  filtrarUsuarios() {
    const texto = this.textoBusqueda.toLowerCase().trim();
    this.usuariosFiltrados = this.usuarios.filter(u => 
      u.nombre?.toLowerCase().includes(texto) ||
      u.apellido?.toLowerCase().includes(texto) ||
      u.username?.toLowerCase().includes(texto) ||
      u.email?.toLowerCase().includes(texto) ||
      u.rol?.toLowerCase().includes(texto)
    );
  }

  abrirModal(usuario?: any) {
    if (usuario) {
      this.isEditing = true;
      this.usuarioActual = { ...usuario, password: '' };
    } else {
      this.isEditing = false;
      this.usuarioActual = { id: null, nombre: '', apellido: '', username: '', email: '', password: '', rol: '', estado: 'Activo' };
    }
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  async guardarUsuario() {
    try {
      if (this.isEditing) {
        await axios.put(this.apiUrl, this.usuarioActual);
      } else {
        await axios.post(this.apiUrl, this.usuarioActual);
      }
      this.cerrarModal();
      this.cargarUsuarios();
    } catch (error) {
      console.error('Error guardando usuario:', error);
    }
  }

  async eliminarUsuario(id: number, username: string) {
    if (confirm(`¿Deseas eliminar al usuario "${username}"?`)) {
      try {
        await axios.delete(`${this.apiUrl}?id=${id}`);
        this.cargarUsuarios();
      } catch (error) {
        console.error('Error eliminando usuario:', error);
      }
    }
  }
}