import { Calendar, MapPin, Building2, Presentation } from 'lucide-react';

interface TalkMetadataProps {
  organization?: string;
  event?: string;
  location?: string;
  date?: string;
}

export function TalkMetadata({ organization, event, location, date }: TalkMetadataProps) {
  return (
    <div className="not-prose my-5 flex flex-wrap items-center gap-2 text-xs">
      {organization && (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
          <Building2 className="h-3 w-3" />
          <span>{organization}</span>
        </div>
      )}
      {event && (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
          <Presentation className="h-3 w-3" />
          <span>{event}</span>
        </div>
      )}
      {location && (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
      )}
      {date && (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
        </div>
      )}
    </div>
  );
}
