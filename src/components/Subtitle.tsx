// title is prop that we have to pass to Subtitle component


interface SubtitleProps {
  title: string;
}
export function Subtitle({title}: SubtitleProps) {
    return <p className="text-lg">{title}</p>;
}