export const ADDPLACE = 'ADDPLACE'

export const addPlace = (title, image) => {
    return {
        type: ADDPLACE,
        placeData: {
            title:title,
            image: image
        }
    }
}