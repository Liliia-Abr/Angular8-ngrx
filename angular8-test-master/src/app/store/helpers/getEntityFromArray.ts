export interface Entity {
    id?: string;
}

export function getEntitiesFromArray<T extends Entity>(array: T[], initialEntities: any): {[id: number]: T} {
    return array.reduce(
        ((items, element: T) => ({
            ...items,
            [element.id]: element
        })),
        {...initialEntities}
    );
}
