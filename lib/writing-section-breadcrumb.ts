import { getContentTypeById } from '@/lib/content-types';
import type { BreadcrumbItem } from '@/lib/breadcrumbs';

export type WritingSubsectionId = 'blog' | 'thoughts' | 'second-brain' | 'newsletter';

/** Matches `tab` query values in `TabbedWritingView` */
const WRITING_TAB_QUERY: Record<WritingSubsectionId, string> = {
  blog: 'blogs',
  thoughts: 'musings',
  'second-brain': 'second-brain',
  newsletter: 'newsletter',
};

/**
 * Breadcrumb segment under Writing for posts listed on /writing (tab + label).
 * Blog uses "Blogs" because the content-type label is the top-level nav name "Writing".
 */
export function getWritingSubsectionCrumb(
  contentTypeId: WritingSubsectionId
): Pick<BreadcrumbItem, 'name' | 'url'> {
  const tab = WRITING_TAB_QUERY[contentTypeId];
  const ct = getContentTypeById(contentTypeId);
  const name =
    contentTypeId === 'blog' ? 'Blogs' : (ct?.label ?? contentTypeId);
  return {
    name,
    url: `/writing/?tab=${tab}`,
  };
}
