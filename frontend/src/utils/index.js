// const timeElapsed = [
//     {
//         "addCookie": 87
//     },
//     {
//         "FuncTwo": 5004
//     },
//     {
//         "FuncThree": 3002
//     },
//     {
//         "addCookie": 140
//     },
//     {
//         "FuncTwo": 5002
//     },
//     {
//         "FuncThree": 3004
//     },
//     {
//         "addCookie": 180
//     },
//     {
//         "FuncTwo": 5000
//     },
//     {
//         "FuncThree": 3004
//     },
//     {
//         "addCookie": 181
//     },
//     {
//         "FuncTwo": 5002
//     },
//     {
//         "FuncThree": 3004
//     }
// ]

// let sum1 = 0, sum2 = 0, sum3 = 0
// let keys = new Set()

// timeElapsed.map(i => {
//     keys.add(Object.keys(i)[0])
//     //console.log(Object.keys(i))
//     switch (Object.keys(i)[0]) {
//         case 'addCookie':
//             //console.log(Object.values(i))
//             sum1 += Number(Object.values(i))
//             break
//         case 'FuncTwo':
//             sum2 += Number(i[Object.keys(i)])
//             break
//         case 'FuncThree':
//             sum3 += Number(i[Object.keys(i)])
//             break
//         default:
//             //console.log(i)
//             break
//     }

// })
// let sums = [sum1, sum2, sum3]
// let vals = [...keys]
// console.log([...keys])
// console.log(sums)
// let res = {sums, vals}
// console.log(res)

export const parseData = (data) => {
    let res = {
        'addCookie': {
            'gasSpent': 0,
            'timeTaken': 0,
            'errorCount': 0
        },
        'FuncTwo': {
            'gasSpent': 0,
            'timeTaken': 0,
            'errorCount': 0
        },
        'FuncThree': {
            'gasSpent': 0,
            'timeTaken': 0,
            'errorCount': 0
        }
    }

    // let arr = [{
    //     'addCookie': {
    //         'gasSpent': 0,
    //         'timeTaken': 0,
    //         'hasError': false
    //     },
    //     'FuncTwo': {
    //         'gasSpent': 0,
    //         'timeTaken': 0,
    //         'hasError': false
    //     },
    //     'FuncThree': {
    //         'gasSpent': 0,
    //         'timeTaken': 0,
    //         'hasError': true
    //     }
    // },
    // {
    //     'addCookie': {
    //         'gasSpent': 0,
    //         'timeTaken': 0,
    //         'hasError': true
    //     },
    //     'FuncTwo': {
    //         'gasSpent': 0,
    //         'timeTaken': 1,
    //         'hasError': false
    //     },
    //     'FuncThree': {
    //         'gasSpent': 0,
    //         'timeTaken': 0,
    //         'hasError': false
    //     }
    // },
    // {
    //     'addCookie': {
    //         'gasSpent': 12,
    //         'timeTaken': 0,
    //         'hasError': true
    //     },
    //     'FuncTwo': {
    //         'gasSpent': 80,
    //         'timeTaken': 0,
    //         'hasError': false
    //     },
    //     'FuncThree': {
    //         'gasSpent': 0,
    //         'timeTaken': 23,
    //         'hasError': false
    //     }
    // }]


    // parse subscription to create response into the state
    data.forEach((element) => {
        const keys = Object.keys(element)

        keys.forEach(funcName => {
            console.log(funcName)
            const funcStats = element[funcName]
            res[funcName].timeTaken += funcStats.timeTaken
            console.log(res[funcName])
            res[funcName].gasSpent += funcStats.gasSpent
            funcStats.hasError && res[funcName].errorCount++
        })
    })

    console.log(res)
    return res
}


const getValues = (key, obj) => {
    return Object.keys(obj).map(i => obj[i][key])
}


// total gas, time, errors for all functions
export const getTotalSum = (res, param) => getValues(param, res).reduce((a, b) => a + b, 0)
// console.log(getSum(res, 'gasSpent'))
// console.log(getSum(res, 'timeTaken'))
// console.log(getSum(res, 'errorCount'))



// slowest func
// Object.keys(res).map(i => {
//     console.log(i)
// })



const findTarget = (target, result, type) => {
    // console.log(target)
    for (const iterator in target) {
        // console.log(iterator)
        if (target[iterator][type] === result)
            return iterator
    }

}



export const getTransactionStat = (res, param) => {

    const times = getValues(param, res)

    const max = Math.max(...times)
    const min = Math.min(...times)

    const maxFn = findTarget(res, max, param)
    const minFn = findTarget(res, min, param)

    return [{ [maxFn]: max }, { [minFn]: min }]
}

export const getErrorRate = (numUsers, numFunctions, res) => {
    const errors = getValues('errorCount', res)
    return (errors.reduce((a, b) => a + b, 0) / (numFunctions * numUsers)) * numUsers
}


// console.log(findTarget(res, Math.min(...times), 'timeTaken')) // fastest func

// cheapest func
// const gases = getValues('gasSpent', res)
// console.log(gases)
// console.log(findTarget(res, Math.min(...gases), 'gasSpent'))

// // expensive func
// console.log(findTarget(res, Math.max(...gases), 'gasSpent'))


// // errorRate

// const errors = getValues('errorCount', res)
// console.log(errors)
// console.log(findTarget(res, Math.max(...errors), 'errorCount'))

// console.log(((errors.reduce((a, b) => a + b, 0)) / 300 * 100))