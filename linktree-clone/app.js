const shareButtons = document.querySelectorAll('.tile-share-button')
console.log(shareButtons)

async function copytext(e) {
//prevent button going to the site
    e.preventDefault()
    const link = this.getAttribute('link')
    console.log(link)
    try {
        await navigator.clipboard.writeText(link)
        alert("Copied the text: " + link)
    } catch (err) {
        console.log(err)
    }
}

shareButtons.forEach(shareButton => 
    shareButton.addEventListener('click', copytext))