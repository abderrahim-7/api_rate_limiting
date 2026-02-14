const generateButton = document.getElementById("generate")
const wisdom = document.getElementById("wisdom")

generateButton.addEventListener("click",async () => {
    await fetch("http://localhost:3000/wisdom")
            .then(res => res.json())
            .then(data => {
                if (data.success){
                    wisdom.innerHTML = ""
                    const newSaying = document.createElement("span");
                    newSaying.textContent = data.message
                    wisdom.appendChild(newSaying)
                }
                else{
                    alert(data.message)
                }
                
            })
            .catch(error => console.error('Error fetching wisdom:', error))
})