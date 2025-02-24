import { Gender } from '@/types/gender';

export default (gender: string): Gender => {
  switch (gender.toLowerCase()) {
    case 'male':
      return 'male';
    case 'female':
      return 'female';
    case 'other':
      return 'other';
  }

  return 'unkown';
};
