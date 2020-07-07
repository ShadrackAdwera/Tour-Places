export const ADDPLACE = 'ADDPLACE'

export const addPlace = (title) => {
    return {
        type: ADDPLACE,
        placeData: {
            title:title
        }
    }
}