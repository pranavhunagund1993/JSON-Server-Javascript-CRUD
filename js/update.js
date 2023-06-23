let URL = 'http://localhost:5000';
let users =[];

// Reading id from router parameter
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, props) => searchParams.get(props)
});

console.log('param id =', params.id);

// DOM Elements
const form = document.getElementById('updateForm');
let user = document.getElementById('user');
let email = document.getElementById('email');

// To read the data on page load
(function() {
    fetch(`${URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(out => {
        console.log('users =', out);
        users = out;
        // Seperating single user
        let single = out.find(item => item.id == params.id);
        console.log("Single =", single);
        //Update to form inputs
        user.value = single.username;
        email.value = single.email;
    }).catch(err => console.log(err.message));
})();

// Update
form.addEventListener('submit', async (e) => {
    e.preventDefault();     // To avoid page refresh

    const data = {
        id: params.id,
        username: user.value,
        email: email.value
    };
    console.log('Updated User Data =', data);
    await fetch(`${URL}/users/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()).then(out => {
        alert('User Updated successfully');
    }).catch(err => console.log(err.message));
});