// Team card props
export type TeamCardProps = {
    id: number,
    image: string,
    name: string,
    title: string,
    description: string,
    portfolio: string,
    linkedin: string,
    expanded: number | null;
    setExpanded: React.Dispatch<React.SetStateAction<number | null>>;
}