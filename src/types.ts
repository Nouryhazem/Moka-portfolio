export interface Project {
  id: number;
  title: string;
  category: string;
  video: string;
  aspectRatio: 'square' | 'portrait' | 'wide';
}

export interface CategoryData {
  title: string;
  projects: Project[];
}
