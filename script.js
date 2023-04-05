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
                `<a icon-name="${button.icon}" onclick="navigate('${button.link}')" class="button"><p class="alt">${button.name}</p></a>`
            }else{
                break;
            }
        }
    }    

    if (settings.layout.notes != true) {
        document.getElementById("notes").style.display = "none"
    }

    document.getElementById('listbox').innerHTML += `<a icon-name="${settings.listContainer.icon}" class="icon"></a><div id="list"></div>`

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
    if (settings.layout.time == true || settings.layout.date == true || settings.layout.greeting == true) {
        date = new Date()
        hour = date.getHours()
        if (settings.layout.time == true) {
            minutes = date.getMinutes()
            if (minutes < 10) { minutes = "0" + minutes }
            document.getElementById('time').innerHTML = hour + ':' + minutes
        }
        if (settings.layout.date == true) {
            month = date.getMonth() + 1
            document.getElementById('date').innerHTML = date.getDate() + '.' + month + '.' + date.getFullYear()
        }
        if (settings.layout.greeting == true) {
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

function navigate(link) {
    window.open(link, target);
}