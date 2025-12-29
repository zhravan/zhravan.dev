import { redirect } from 'next/navigation';

export default function Work() {
  redirect('/projects');
  return null;
}
