class User {
    constructor(id, login, password) {
        this.id = id;
        this.login = login;
        this.password = password;
    }
};

class Organization {
    constructor(id, title, src) {
        this.id = id;
        this.title = title;
        this.src = src;
    }
};

class Users_Organizations {
    constructor(user, organization) {
        this.user = user;
        this.organization = organization;
    }
}

var users = [
    new User(1, "login1", "password1"),
    new User(2, "login2", "password2"),
    new User(3, "login3", "password3"),
    new User(4, "login4", "password4"),
    new User(5, "login5", "password5"),
];

var organizations = [
    new Organization(1, "Title1", "https://title/1"),
    new Organization(2, "Title2", "https://title/2"),
    new Organization(3, "Title3", "https://title/3"),
    new Organization(4, "Title4", "https://title/4"),
    new Organization(5, "Title5", "https://title/5"),
];

var users_organizations = [
    new Users_Organizations(users[0], organizations[0]),
    new Users_Organizations(users[0], organizations[4]),
    new Users_Organizations(users[0], organizations[3]),
    new Users_Organizations(users[1], organizations[1]),
    new Users_Organizations(users[2], organizations[1]),
];

let selectU = document.querySelector("#user_select");
let selectO = document.querySelector("#org_select");

UpdateSelector("#user_select", users, "u");
UpdateSelector("#org_select", organizations, "o");

document.querySelector("#userAdd").addEventListener("click", function () {
    let uLogin = document.querySelector("#login");
    let uPassword = document.querySelector("#password");

    if (uLogin.value != "" && uPassword.value != "") {
        users.push(new User(users.length + 1, uLogin.value, uPassword.value));
        uLogin.value = "";
        uPassword.value = "";
        UpdateSelector("#user_select", users, "u");
        console.log(users);
    } else {
        alert("Ошибка в данных пользователя!");
    }
});

document.querySelector("#orgAdd").addEventListener("click", function () {
    let title = document.querySelector("#title");
    let src = document.querySelector("#src");

    if (title.value != "" && src.value != "") {
        organizations.push(new Organization(organizations.length + 1, title.value, src.value));
        title.value = "";
        src.value = "";
        UpdateSelector("#org_select", organizations, "o");
        console.log(organizations);
    } else {
        alert("Ошибка в данных организации!");
    }
});

document.querySelector("#acsAdd").addEventListener("click", function () {
    if (selectU.value != "" && selectO.value != "") {
        
        let link = users_organizations.some(e => e.user.id === Number(selectU.value) &&
        e.organization.id === Number(selectO.value));
        
        if (!link) {
            users_organizations.push(new Users_Organizations(
                users[selectU.value - 1],
                organizations[selectO.value - 1],
            ));
            console.log(users_organizations);
        } else {
            alert("У данного пользователя уже есть доступ к этому ресурсу!");
        }
    }

});

function UpdateSelector(_id, table, param) {
    let select = document.querySelector(_id);
    select.innerHTML = "";

    for (let elem of table) {
        let _option = document.createElement("option");
        _option.value = elem.id;
        switch (param) {
            case "u":
                _option.textContent = elem.login;
                break;
            case "o":
                _option.textContent = elem.title;
                break;
        }
        select.appendChild(_option);
    }
}

function CheckLink() {

    const _alert = document.querySelector("#alert");
    const authLogin = document.querySelector("#login_auth");
    const authPassword = document.querySelector("#password_auth");
    const authSrc = document.querySelector("#src_auth");

    let link = users_organizations.some(e => e.user.login == authLogin.value &&
        e.user.password == authPassword.value &&
        e.organization.src === authSrc.value);

    if(link) {
        _alert.classList = "true";
        _alert.textContent = "Доступ разрешён!";
    } else {
        _alert.classList = "false";
        _alert.textContent = `Доступ запрещён!`;
    }
};

console.log(users);
console.log(organizations);
console.log(users_organizations);