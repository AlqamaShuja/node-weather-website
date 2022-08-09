const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    document.getElementById("msg-1").textContent = "Loading...";
    const address = document.getElementById("address").value;
    e.preventDefault();
    fetch("/weather?location=" + address)
        .then((data) => {
            return data.json();
        })
        .then(data => {
            if (data.error) {
                document.getElementById("msg-1").textContent = data.error;
            }
            else {
                document.getElementById("msg-1").textContent = data.forecast;
                document.getElementById("msg-2").textContent = data.location;
            }
        });
});