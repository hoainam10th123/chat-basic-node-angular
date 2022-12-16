export function checkIsExist(object1, username) {
    let isExist = false

    for (const [key, value] of Object.entries(object1)) {
        console.log(`${key}: ${value}`);
        if(key === username){
            isExist = true
            break
        }
    }
    return isExist
}

export function getValue(arr, username){
    for(var i in arr){
        if(checkIsExist(i, username)){            
            return i // { ubuntu: [ 'pN2Xb8H0q_QqsV52AAAL' ] }
        }
    }
    return null
}
