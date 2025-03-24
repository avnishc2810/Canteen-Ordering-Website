function generateRandomAlphanumeric(length = 10){
    const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ''

    for(let i = 0;i < length;i++){
        const RandomIndex = Math.floor(Math.random() * character.length)
        result += character[RandomIndex]
    }
    return result
}

export const randomValue = generateRandomAlphanumeric()