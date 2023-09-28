export interface PinListData {
    title: string;
    image: { name: string, url: string };
    collaborators: { id: number, name: string }[];
    privacy: string;
}