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
    modules: [
      {
        id: 101,
        title: "Autenticación de usuarios",
        status: "En Desarrollo",
        assigned_to: "Juan Pérez",
        tasks: [
          { task_id: 1, description: "Implementar login con Google", status: "Pendiente" },
          { task_id: 2, description: "Agregar recuperación de contraseña", status: "En Progreso" }
        ]
      },
      {
        id: 102,
        title: "Integración con Facturación Electrónica",
        status: "Pendiente",
        assigned_to: "María Gómez",
        tasks: [
          { task_id: 3, description: "Configurar endpoints de API", status: "Pendiente" },
          { task_id: 4, description: "Implementar firma digital", status: "Pendiente" }
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