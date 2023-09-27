export interface PinListData {
    pin_id: number;
    title: string;
    image: string;
    collaborators: { id: number, name: string }[];
    privacy: string;
}