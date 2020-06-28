const users = [
    {id: 0, name: "Carlos Emanuel", email: "carlos@mail.com", password: "carlos123"},
    {id: 1, name: "Arthur", email: "arthur@mail.com", password: "arthur123"}
];

let items = [
    {"id": 1,"name": "carne", "done": false, userId: 0 },
    {"id": 2,"name": "leite", "done": false, userId: 0 },
    {"id": 1,"name": "pão", "done": false, userId: 1 },
];

function addItem(item, user) {
    let userItems = listItems(user)

    let last = userItems[userItems.length - 1];
    item.id = last.id + 1;
    item.userId = user.id;
    items.push(item);
    userItems.push(item);

    return userItems
}

function deleteItem(id, user) {

    let index = -1
    items.forEach((item, i) => {
            if (item.id == id && item.userId == user.id) {
                index = i;
            }
        });
    
    if (index > -1) {
        items.splice(index, 1)
    }
    
    return listItems(user)
}

function listItems(user) {
    return items.filter((item) => {
        return item.userId == user.id
    });
}

function findItem(id, user) {
    let item = items
        .filter((item) => {
            return item.userId == user.id
        }).filter((item) => {
            return item.id == id
        });
    if (item.length > 0)
        return item[0]
    return null;
}

function toogleCheckItem(id, user) {
    let item = items
        .filter((value) => {
            return value.userId == user.id
        })
        .filter((value) => {
            return value.id == id;
        })[0];
    item.done = !item.done;
    return item;
}

function addUser(user) {
    user.id = users.length + 1;
    users.push(user);
    return user;
}

function listUsers() {
    return users;
}

function findUserByEmail(email) {
    let find = users.filter((user) => {
        return user.email === email
    });
    if (find.length > 0)
        return find[0]
    return null;
}

function findUserById(id) {
    let find = users.filter((user) => {
        return user.id === id
    });
    if (find.length > 0)
        return find[0]
    return null;
}

module.exports = {
    addItem, 
    deleteItem, 
    listItems, 
    findItem,
    toogleCheckItem, 
    addUser, 
    listUsers,
    findUserByEmail, 
    findUserById
};