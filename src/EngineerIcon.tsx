export type EngineerIconName = 'book' | 'layers' | 'virtualization' | 'certificate' | 'hardware' | 'chip' | 'blueprint' | 'strengths' | 'specialist' | 'manager' | 'consultant';
/** Adjacent visible labels carry meaning; decorative symbols stay out of the reading order. */
export function EngineerIcon({ name, className = '' }: { name: EngineerIconName; className?: string }) {
  return <svg className={`engineer-icon ${className}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false"><use href={`${import.meta.env.BASE_URL}assets/engineer-icons.svg#${name}`} /></svg>;
}
