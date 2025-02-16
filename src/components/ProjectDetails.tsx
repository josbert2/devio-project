import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Project, Module } from '../types';
import { Link2, Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en progreso':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'finalizado':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getProgressPercentage = (module: Module) => {
    if (!module.tasks || module.tasks.length === 0) return 0;
    const completedTasks = module.tasks.filter(task => task.status.toLowerCase() === 'finalizado').length;
    return Math.round((completedTasks / module.tasks.length) * 100);
  };

  const getModuleIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'finalizado':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'en desarrollo':
      case 'en progreso':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <span className="sr-only">Cerrar</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm">
                  {format(new Date(project.start_date), 'dd MMM yyyy', { locale: es })} - 
                  {format(new Date(project.end_date), 'dd MMM yyyy', { locale: es })}
                </span>
              </div>
              {project.link && (
                <div className="flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-gray-500" />
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Repositorio del proyecto
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Roadmap y Progreso</h3>
            <div className="space-y-6">
              {project.modules.map((module, index) => (
                <div key={module.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getModuleIcon(module.status)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{module.title}</h4>
                          {module.assigned_to && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Asignado a: {module.assigned_to}
                            </p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(module.status)}`}>
                          {module.status}
                        </span>
                      </div>
                      
                      {module.tasks && module.tasks.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <div className="bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-blue-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${getProgressPercentage(module)}%` }}
                            />
                          </div>
                          <div className="space-y-2">
                            {module.tasks.map((task) => (
                              <div
                                key={task.task_id}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span className={`w-2 h-2 rounded-full ${
                                  task.status.toLowerCase() === 'finalizado'
                                    ? 'bg-green-500'
                                    : task.status.toLowerCase() === 'en progreso'
                                    ? 'bg-blue-500'
                                    : 'bg-gray-500'
                                }`} />
                                <span>{task.description}</span>
                                <span className={`ml-auto text-xs ${getStatusColor(task.status)}`}>
                                  {task.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;