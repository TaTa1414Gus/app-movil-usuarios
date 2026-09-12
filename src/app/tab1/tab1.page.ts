import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- 1. Importamos el detector
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class Tab1Page implements OnInit {
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

  // 2. Lo inyectamos en el constructor
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    try {
      const response = await axios.get(this.apiUrl);
      if (response.data && response.data.success) {
        this.usuarios = response.data.data;
        this.usuariosFiltrados = [...this.usuarios];
        
        // 🔥 3. Forzamos a Angular a dibujar la tabla inmediatamente
        this.cdr.detectChanges(); 
      }
    } catch (error) {
      console.error('Error cargando usuarios:', error);
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
    this.cdr.detectChanges(); // Actualiza la vista al buscar
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
    this.cdr.detectChanges(); // Asegura que el modal se abra al instante
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.cdr.detectChanges(); // Asegura que el modal se cierre al instante
  }

  async guardarUsuario() {
    // Validación rápida antes de enviar
    if (!this.usuarioActual.username || !this.usuarioActual.nombre || !this.usuarioActual.email) {
      alert("Por favor completa los campos principales (Nombre, Usuario y Email).");
      return;
    }

    console.log("Datos a enviar a la API:", this.usuarioActual);

    try {
      let response;
      if (this.isEditing) {
        response = await axios.put(this.apiUrl, this.usuarioActual);
      } else {
        response = await axios.post(this.apiUrl, this.usuarioActual);
      }

      console.log("Respuesta del servidor:", response.data);

      // Si PHP y MySQL reportan éxito real:
      if (response.data.success) {
        this.cerrarModal();
        this.cargarUsuarios(); 
      } else {
        // Si MySQL rechaza el dato (ej. usuario duplicado)
        alert("Error en la base de datos: " + response.data.message);
      }
    } catch (error) {
      console.error('Error de conexión al guardar:', error);
      alert("Ocurrió un error al intentar comunicar con el servidor.");
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