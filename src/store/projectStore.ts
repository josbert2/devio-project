import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProjectStore, Project, Module } from '../types';

import Gourm from '../assets/Gourm.jpg'

const sampleData: Project[] = [
  {
    id: 1,
    name: "Gourm - Restaurant",
    image: Gourm,
    description: "Plataforma para gestion de restaurant, Coffee, Bar etc",
    status: "En Progreso",
    link: "https://github.com/proyecto-saas",
    start_date: "2025-02-16",
    end_date: "2025-06-30",
    modules:[
      {
        "id": 201,
        "title": "Ventas",
        "status": "En Desarrollo",
        "assigned_to": "Equipo de Ventas",
        "tasks": [
          { "task_id": 1, "description": "Implementar Carta QR", "status": "Pendiente" },
          { "task_id": 2, "description": "Habilitar ventas por mostrador", "status": "En Progreso" },
          { "task_id": 3, "description": "Asignación de clientes sobre ventas", "status": "Pendiente" }
        ]
      },
      {
        "id": 202,
        "title": "Tienda Online",
        "status": "En Desarrollo",
        "assigned_to": "Equipo de E-commerce",
        "tasks": [
          { "task_id": 1, "description": "Integración con WhatsApp para confirmación de pedidos", "status": "Pendiente" },
          { "task_id": 2, "description": "Implementación de múltiples medios de pago", "status": "En Progreso" }
        ]
      },
      {
        "id": 203,
        "title": "Control de Caja",
        "status": "En Desarrollo",
        "assigned_to": "Equipo de Finanzas",
        "tasks": [
          { "task_id": 1, "description": "Implementación de arqueo de caja", "status": "Pendiente" },
          { "task_id": 2, "description": "Implementación de arqueo ciego", "status": "Pendiente" },
          { "task_id": 3, "description": "Registro de movimientos de caja", "status": "En Progreso" }
        ]
      },
      {
        "id": 204,
        "title": "Facturación Electrónica",
        "status": "Planificación",
        "assigned_to": "Equipo Legal y Contable",
        "tasks": [
          { "task_id": 1, "description": "Integración con Bsale y Open Factura", "status": "Pendiente" },
          { "task_id": 2, "description": "Integración con el SII", "status": "Pendiente" }
        ]
      },
      {
        "id": 205,
        "title": "Gestión de Productos",
        "status": "En Desarrollo",
        "assigned_to": "Equipo de Inventario",
        "tasks": [
          { "task_id": 1, "description": "Implementación de categorías y subcategorías", "status": "En Progreso" },
          { "task_id": 2, "description": "Carga de recetas y control de stock", "status": "Pendiente" },
          { "task_id": 3, "description": "Notificaciones por falta de stock", "status": "Pendiente" }
        ]
      },
      {
        "id": 206,
        "title": "Gestión de Clientes",
        "status": "Planificación",
        "assigned_to": "Equipo de Atención al Cliente",
        "tasks": [
          { "task_id": 1, "description": "Implementación de base de datos de clientes", "status": "Pendiente" },
          { "task_id": 2, "description": "Desarrollo de cuentas corrientes para clientes", "status": "Pendiente" }
        ]
      },
      {
        "id": 207,
        "title": "Gestión de Proveedores",
        "status": "En Desarrollo",
        "assigned_to": "Equipo de Compras",
        "tasks": [
          { "task_id": 1, "description": "Creación de base de datos de proveedores", "status": "En Progreso" },
          { "task_id": 2, "description": "Implementación de cuentas corrientes de proveedores", "status": "Pendiente" }
        ]
      },
      {
        "id": 208,
        "title": "Gestión de Usuarios",
        "status": "Planificación",
        "assigned_to": "Equipo de Seguridad",
        "tasks": [
          { "task_id": 1, "description": "Creación de múltiples roles de usuarios", "status": "Pendiente" },
          { "task_id": 2, "description": "Asignación de cajas por usuario", "status": "Pendiente" }
        ]
      },
      {
        "id": 209,
        "title": "Reportes e Indicadores",
        "status": "En Desarrollo",
        "assigned_to": "Equipo de Análisis",
        "tasks": [
          { "task_id": 1, "description": "Generación de reportes gráficos de ventas", "status": "En Progreso" },
          { "task_id": 2, "description": "Implementación de descarga de registros en Excel", "status": "Pendiente" }
        ]
      },
      {
        "id": 210,
        "title": "Ventas por Delivery",
        "status": "Planificación",
        "assigned_to": "Equipo de Integraciones",
        "tasks": [
          { "task_id": 1, "description": "Integración con apps de delivery (Uber Eats, Rappi, Justo, PedidosYa)", "status": "Pendiente" },
          { "task_id": 2, "description": "Configuración de tienda online para delivery", "status": "Pendiente" }
        ]
      },
      {
        "id": 211,
        "title": "Monitor de Cocina (KDS)",
        "status": "En Desarrollo",
        "assigned_to": "Equipo de Operaciones",
        "tasks": [
          { "task_id": 1, "description": "Implementación de comandas digitales", "status": "En Progreso" },
          { "task_id": 2, "description": "Configuración de alertas sonoras", "status": "Pendiente" }
        ]
      }
    ]
    
  },
  {
    id: 2,
    name: "App Móvil de Delivery",
    description: "Aplicación móvil para servicio de entrega de comida a domicilio",
    status: "Pendiente",
    link: "https://github.com/delivery-app",
    start_date: "2025-03-01",
    end_date: "2025-07-15",
    modules: [
      {
        id: 201,
        title: "Geolocalización en tiempo real",
        status: "Pendiente",
        assigned_to: "Ana Silva",
        tasks: [
          { task_id: 5, description: "Integrar Google Maps SDK", status: "Pendiente" },
          { task_id: 6, description: "Implementar tracking en tiempo real", status: "Pendiente" }
        ]
      },
      {
        id: 202,
        title: "Sistema de pagos",
        status: "En Desarrollo",
        assigned_to: "Carlos Ruiz",
        tasks: [
          { task_id: 7, description: "Integrar pasarela de pagos", status: "En Progreso" },
          { task_id: 8, description: "Implementar wallet digital", status: "Pendiente" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Portal de Educación Online",
    description: "Plataforma de cursos online con sistema de videoconferencias integrado",
    status: "Finalizado",
    link: "https://github.com/edu-portal",
    start_date: "2024-11-01",
    end_date: "2025-02-28",
    modules: [
      {
        id: 301,
        title: "Sistema de videoconferencias",
        status: "Finalizado",
        assigned_to: "Laura Martínez",
        tasks: [
          { task_id: 9, description: "Integración con WebRTC", status: "Finalizado" },
          { task_id: 10, description: "Implementar chat en vivo", status: "Finalizado" }
        ]
      },
      {
        id: 302,
        title: "Gestión de contenido",
        status: "Finalizado",
        assigned_to: "Diego Sánchez",
        tasks: [
          { task_id: 11, description: "Sistema de upload de videos", status: "Finalizado" },
          { task_id: 12, description: "Editor de contenido rico", status: "Finalizado" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Portal de Educación Online 2",
    description: "Plataforma de cursos online con sistema de videoconferencias integrado",
    status: "Finalizado",
    link: "https://github.com/edu-portal",
    start_date: "2024-11-01",
    end_date: "2025-02-28",
    modules: [
      {
        id: 301,
        title: "Sistema de videoconferencias",
        status: "Finalizado",
        assigned_to: "Laura Martínez",
        tasks: [
          { task_id: 4, description: "Integración con WebRTC", status: "Finalizado" },
          { task_id: 10, description: "Implementar chat en vivo", status: "Finalizado" }
        ]
      },
      {
        id: 301,
        title: "Sistema de videoconferencias",
        status: "Finalizado",
        assigned_to: "Laura Martínez",
        tasks: [
          { task_id: 4, description: "Integración con WebRTC", status: "Finalizado" },
          { task_id: 10, description: "Implementar chat en vivo", status: "Finalizado" }
        ]
      },
      {
        id: 301,
        title: "Sistema de videoconferencias",
        status: "Finalizado",
        assigned_to: "Laura Martínez",
        tasks: [
          { task_id: 4, description: "Integración con WebRTC", status: "Finalizado" },
          { task_id: 10, description: "Implementar chat en vivo", status: "Finalizado" }
        ]
      },
      {
        id: 301,
        title: "Sistema de videoconferencias",
        status: "Finalizado",
        assigned_to: "Laura Martínez",
        tasks: [
          { task_id: 4, description: "Integración con WebRTC", status: "Pendiente" },
          { task_id: 10, description: "Implementar chat en vivo", status: "Finalizado" }
        ]
      },
      {
        id: 302,
        title: "Gestión de contenido",
        status: "Finalizado",
        assigned_to: "Diego Sánchez",
        tasks: [
          { task_id: 11, description: "Sistema de upload de videos", status: "Finalizado" },
          { task_id: 12, description: "Editor de contenido rico", status: "Finalizado" }
        ]
      }
    ]
  }
  
];

const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: sampleData,
      
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: Date.now() }]
      })),
      
      updateProject: (id, project) => set((state) => ({
        projects: state.projects.map((p) => 
          p.id === id ? { ...p, ...project } : p
        )
      })),
      
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      })),
      
      addModule: (projectId, module) => set((state) => ({
        projects: state.projects.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              modules: [...project.modules, { ...module, id: Date.now() }]
            };
          }
          return project;
        })
      })),
      
      updateModule: (projectId, moduleId, module) => set((state) => ({
        projects: state.projects.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              modules: project.modules.map((m) =>
                m.id === moduleId ? { ...m, ...module } : m
              )
            };
          }
          return project;
        })
      })),
      
      deleteModule: (projectId, moduleId) => set((state) => ({
        projects: state.projects.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              modules: project.modules.filter((m) => m.id !== moduleId)
            };
          }
          return project;
        })
      })),
      
      updateModuleStatus: (projectId, moduleId, status) => set((state) => ({
        projects: state.projects.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              modules: project.modules.map((m) =>
                m.id === moduleId ? { ...m, status } : m
              )
            };
          }
          return project;
        })
      })),
      
      importData: (data) => set(() => ({ projects: data.projects })),
      
      exportData: () => ({ projects: get().projects }),
    }),
    {
      name: 'project-storage',
    }
  )
);

export default useProjectStore;