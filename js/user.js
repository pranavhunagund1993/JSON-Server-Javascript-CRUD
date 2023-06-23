let URL = 'http://localhost:5000';
let users =[];

// create logic
// DOM Element

const form = document.getElementById('myForm');
let user = document.getElementById('user');
let email = document.getElementById('email');
let result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();     // To avoid page refresh
    
    let newUser = {
        username: user.value,
        email: email.value
    };
    console.log('new user =', newUser);

    let extUser = users.find((item) => item.email === newUser.email);
    console.log('extUser =', extUser);
    
    if(extUser) {
        alert('User email already registered');
    } else {
        await fetch(`${URL}/users`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(out => {
            alert('New user created successfully');
            window.location.reload();
        }).catch(err => console.log(err.message));
    }
});

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
        printData(out);
    }).catch(err => console.log(err.message));
})();

// print data
function printData(data) {
    data.forEach(item => {
        result.innerHTML += `
        <tr>
            <td> ${ item.id } </td>
            <td> ${ item.username } </td>
            <td> ${ item.email } </td>
            <td>
                <a href="update.html?id=${item.id}" class="btn btn-success">Edit</a>
                <button onclick="deleteUser(${item.id})" class="btn btn-warning">Delete</button>
            </td>
        </tr>`
    });
}

// Delete User Details
function deleteUser(id) {
    if(confirm(`Are you sure to delete an id = ${id}?`)) {
        fetch(`${URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(out => out.json())
            .then(res => {
                alert('User Deleted successfully');
                window.location.reload();
            }).catch(err => console.log(err.message));
    } else {
        alert('Delete Terminated');
    }
}