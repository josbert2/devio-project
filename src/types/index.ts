export type Task = {
  task_id: number;
  description: string;
  status: string;
};

export type Module = {
  id: number;
  title: string;
  status: string;
  assigned_to?: string;
  tasks: Task[];
};

export type Project = {
  id: number;
  name: string;
  image: string;
  description: string;
  status: string;
  link?: string;
  start_date: string;
  end_date: string;
  modules: Module[];
};

export type ProjectStore = {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addModule: (projectId: number, module: Omit<Module, 'id'>) => void;
  updateModule: (projectId: number, moduleId: number, module: Partial<Module>) => void;
  deleteModule: (projectId: number, moduleId: number) => void;
  updateModuleStatus: (projectId: number, moduleId: number, status: string) => void;
  importData: (data: { projects: Project[] }) => void;
  exportData: () => { projects: Project[] };
};