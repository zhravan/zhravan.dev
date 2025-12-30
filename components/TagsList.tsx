import Link from 'next/link';
import { Tag } from 'lucide-react';

interface TagsListProps {
  tags: string[];
  showIcon?: boolean;
}

function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function TagsList({ tags, showIcon = true }: TagsListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
      {showIcon && <Tag size={11} className="opacity-50" />}
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${slugifyTag(tag)}/`}
          className="px-1.5 py-0.5 rounded bg-opacity-10 border border-current opacity-50 hover:opacity-100 transition-opacity"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
