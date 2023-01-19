loadall()

try {
    if (settings.other.openinnewpage == 'true') {
        target = "_blank"
    } else {
        target = "_self"
    }

    for (let a = 0; a < settings.layout.rows; a++) {
        document.getElementById('grid').innerHTML += `<div class="row" id="row-${a}"></div>`
        for (let b = 0; b < settings.layout.columns; b++) {
            if(a * settings.layout.columns + b < settings.ButtonsContainer.length){
                button = settings.ButtonsContainer[a * settings.layout.columns + b];
                document.getElementById(`row-${a}`).innerHTML += 
                `<i icon-name="${button.icon}" onclick="navigate('${button.link}')" class="button"></i>`
            }else{
                break;
            }
        }
    }    

    if (settings.layout.notes != 'true') {
        document.getElementById("notes").style.display = "none"
    }

    document.getElementById('listbox').innerHTML += `<i icon-name="${settings.listContainer.icon}" class="icon"></i><div id="list"></div>`

    document.getElementById('note').innerText = localStorage.getItem('note');

    for (let c = 0; c < settings.listContainer.links.length; c++) {
        const list = settings.listContainer.links[c];
        if (list.name.toLowerCase() == 'github') {
            document.getElementById('list').innerHTML += 
            `<p onclick="navigate('${list.link}')" class="link" id="github">${list.name}</p>`
        } else {
            document.getElementById('list').innerHTML += 
            `<p onclick="navigate('${list.link}')" class="link">${list.name}</p>`
        }
    }

    lucide.createIcons()
    document.documentElement.style.setProperty('--primary', settings.styling.primary);
    document.documentElement.style.setProperty('--secondary', settings.styling.secondary);
    document.documentElement.style.setProperty('--background', settings.styling.background);
    document.documentElement.style.setProperty('--foreground', settings.styling.foreground);
    document.documentElement.style.setProperty('--roundness', settings.styling.roundness);
    document.documentElement.style.setProperty('--listlength', settings.ButtonsContainer.length);
} catch (error) {
    console.error(error);
}

clock()

async function clock() {
    if (settings.layout.time == 'true' || settings.layout.date == 'true' || settings.layout.greeting == 'true') {
        date = new Date()
        hour = date.getHours()
        if (settings.layout.time == 'true') {
            minutes = date.getMinutes()
            if (minutes < 10) { minutes = "0" + minutes }
            document.getElementById('time').innerHTML = hour + ':' + minutes
        }
        if (settings.layout.date == 'true') {
            month = date.getMonth() + 1
            document.getElementById('date').innerHTML = date.getDate() + '.' + month + '.' + date.getFullYear()
        }
        if (settings.layout.greeting == 'true') {
            if (hour >= 23 || hour < 6) {
                document.getElementById('greeting').innerText = "Good Night, " + settings.other.name;
            } else if (hour >= 6 && hour < 12) {
                document.getElementById('greeting').innerText = "Good Morning, " + settings.other.name;
            } else if (hour >= 12 && hour < 17) {
                document.getElementById('greeting').innerText = "Good Afternoon, " + settings.other.name;
            } else {
                document.getElementById('greeting').innerText = "Good Evening, " + settings.other.name;
            }
        }
    }
    setTimeout(clock, 1000);
}

function save() {
    localStorage.setItem('note', `${document.getElementById('note').value}`)
}

function navigate(link) {
    window.open(link, target);
}

async function getNotificationCount() {
    const headers = new Headers({
        'Authorization': `Token ${settings.other.token}`,
        'Accept': 'application/vnd.github+json'
    });
    const response = await fetch('https://api.github.com/notifications', { headers });
    const data = await response.json();
    const notificationCount = data.length;
    document.getElementById('github').innerHTML += 
    `<span class="notification">${notificationCount}</span>`
}

if (settings.other.notifications == 'true') {
    getNotificationCount()
}   

function savesettings(setting, value) {
    if (value == 'input') {
        if (document.getElementById(setting).value.length > 0) {
            localStorage.setItem(setting, document.getElementById(setting).value)
            console.log('saved', setting)
        } else {
            localStorage.removeItem(setting)
            console.log('removed', setting)
            console.log(localStorage.getItem(setting))
        }
    } else if (value == 'true') {
        localStorage.setItem(setting, true)
        console.log('saved', setting)
    } else if (value == 'false') {
        localStorage.setItem(setting, false)
        console.log('saved', setting)
    } else {
        localStorage.setItem(setting, document.getElementById(setting).value)
        console.log('saved', setting)
    }
    loadall()
}

function load(name, category) {
    if (localStorage.getItem(name) != undefined){
        settings[category][name] = localStorage.getItem(name)
        if (localStorage.getItem(name) == 'true') {
            onid = name + 'on'
            offid = name + 'off'
            document.getElementById(onid).style.backgroundColor = '#4ead42'
            document.getElementById(offid).style.backgroundColor = 'var(--background)'
        } else if (localStorage.getItem(name) == 'false') {
            onid = name + 'on'
            offid = name + 'off'
            document.getElementById(offid).style.backgroundColor = '#ad4742'
            document.getElementById(onid).style.backgroundColor = 'var(--background)'
        }
    }
}
function loadall() {
    load('background', 'styling')
    load('primary', 'styling')
    load('secondary', 'styling')
    load('foreground', 'styling')
    load('roundness', 'styling')
    load('columns', 'layout')
    load('rows', 'layout')
    load('lists', 'layout')
    load('time', 'layout')
    load('date', 'layout')
    load('greeting', 'layout')
    load('notes', 'layout')
    load('name', 'other')
    load('openinnewpage', 'other')
    load('notifications', 'other')
    load('token', 'other')
}