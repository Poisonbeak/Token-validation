window.addEventListener("DOMContentLoaded", e => {
    const display = document.getElementById("display");
    const [generateButton, authButton] = document.querySelectorAll("button");
    
    generateButton.addEventListener("click", e => {
        console.log(`You clicked on \"${e.target.innerText}\"`);
        const tmpReq = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }
        fetch("http://localhost:5000/user/generateToken", tmpReq)
            .then(response => response.json())
            .then(message => {
                    // console.log(message);
                    // console.log(typeof(message));
                    display.innerText = message;
                })
            .catch(e => console.error(e.message))
    })

    authButton.addEventListener("click", e => {
        console.log(`You clicked on \"${e.target.innerText}\"`);

        const token = document.getElementById("display").innerText;
        const tmpReq = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                personal_token_header_key: token,
            }
        }
        fetch("http://localhost:5000/user/validateToken", tmpReq)
            .then(response => response.json())
            .then(message => {
                    display.innerHTML = `<b style='color: blue'>${message}</b>`;
                })
            .catch(e => console.error(e.message))
    })
})
