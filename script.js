const generateButton = document.getElementById("generate")
const wisdom = document.getElementById("wisdom")

generateButton.addEventListener("click",async () => {
    await fetch("http://localhost:3000/wisdom")
            .then(res => res.json())
            .then(data => {
                wisdom.innerHTML = ""
                const newSaying = document.createElement("span");
                newSaying.textContent = data.message
                wisdom.appendChild(newSaying)
            })
            .catch(error => console.error('Error fetching wisdom:', error))
})