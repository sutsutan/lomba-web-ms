import React from 'react';

export interface NavItem {
  key: string;
  label: string;
  icon: string;
  badge?: number;
}

export type ActivePage =
  | 'dashboard' | 'hero' | 'achievements' | 'partnerships' | 'testimonies'
  | 'majors' | 'facilities' | 'activity-gallery' | 'student-works'
  | 'teachers' | 'extracurriculars' | 'organizations' | 'news'
  | 'explore-gallery' | 'alumni';