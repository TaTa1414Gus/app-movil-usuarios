import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule]
})
export class Tab2Page implements OnInit {
  
  equiposPendientes: number = 0;
  equiposEnMantenimiento: number = 0;
  equiposListos: number = 0;
  equiposRecientes: any[] = [];

  apiUrl = 'http://localhost/api_movil/api_equipos.php';

  constructor(private cdr: ChangeDetectorRef) {}

  // Se ejecuta al cargar la pantalla
  ngOnInit() {
    this.cargarDashboard();
  }

  // Se ejecuta cada vez que el usuario entra a la pestaña
  ionViewWillEnter() {
    this.cargarDashboard();
  }

  async cargarDashboard() {
    try {
      const response = await axios.get(this.apiUrl);
      
      if (response.data.success) {
        // Asignar los conteos a las tarjetas
        this.equiposPendientes = response.data.conteos.pendientes;
        this.equiposEnMantenimiento = response.data.conteos.en_mantenimiento;
        this.equiposListos = response.data.conteos.listos;
        
        // Asignar la lista a la tabla
        this.equiposRecientes = response.data.equipos;
        
        // Forzar actualización visual
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error al cargar datos del servidor:', error);
    }
  }
}