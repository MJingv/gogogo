//promise封装ajax
const ajax = (type, url, data) => new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()
    xhr.open(type, url, true)
    xhr.onreadystatechange(() => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            res(JSON.parse(xhr.responseText))
        } else {
            rej(xhr)
        }
    })
    if (type === 'GET') {
        xhr.send()
    } else if (type === 'POST') {
        xhr.setRequestHeader("Content-type", 'application/x-wwww-form-urlencoded')
        xhr.send(formate(data))
    }
})
