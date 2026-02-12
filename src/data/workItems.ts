import workData from './work.json';

export interface WorkItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail?: string;
  tags: string[];
  featured?: boolean;
}

export const PLACEHOLDER_IMAGE = '/work/placeholder.svg';

export const workItems: WorkItem[] = workData;
