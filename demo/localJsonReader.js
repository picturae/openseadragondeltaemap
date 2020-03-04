const loadLocalJSON = function(input, callback) {
    const file = input.files[0]
    let reader = new FileReader()
    reader.onload = event => {
        const json = JSON.parse(event.target.result)
        callback(json)
    }
    reader.readAsText(file)
}
