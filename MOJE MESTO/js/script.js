

// HAMBURGER MENU
 function hamburgerMenu() {
    let nav = document.getElementById("navigacija");

        nav.classList.toggle("prikazi");

}

////////////////////////FOOTER LINKOVI
document.addEventListener('DOMContentLoaded', function() {
    // Inicijalizacija najposećenijih stranica
    initializeMostVisited();

    // Dodavanje event listenera na linkove da prate klikove
    var links = document.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            trackClick(link.pathname); 
        });
    });
});

function initializeMostVisited() {
    // Uzimanje podataka iz localStorage
    var mostVisitedPages = JSON.parse(localStorage.getItem('mostVisited')) || [];

    // Sortiranje stranica prema broju klikova
    mostVisitedPages.sort(function(a, b) {
        return b.clicks - a.clicks;
    });

    // Prikazivanje maksimalno 3 stranice
    var topThree = mostVisitedPages.slice(0, 3);

    // Prikazivanje stranica u footeru
    var mostVisitedList = document.getElementById('mostVisitedList');
    topThree.forEach(function(page) {
        var listItem = document.createElement('li');
        var pageName = getPageName(page.url);
        // Kreiranje linka
    var link = document.createElement('a');
    link.href = page.url;  // Postavljanje href atributa na URL stranice
    link.textContent = getCustomPageName(page.url);

    // Dodavanje linka u list item
    listItem.appendChild(link);

    // Dodavanje list itema u listu
    mostVisitedList.appendChild(listItem);
    });
}

function trackClick(url) {
    // Uzimanje podataka iz localStorage
    var mostVisitedPages = JSON.parse(localStorage.getItem('mostVisited')) || [];

    // Provera da li stranica već postoji u listi
    var existingPage = mostVisitedPages.find(function(page) {
        return page.url === url;
    });

    if (existingPage) {
        // Ako postoji, povećaj broj klikova
        existingPage.clicks++;
    } else {
        // Ako ne postoji, dodaj je u listu sa jednim klikom
        mostVisitedPages.push({ url: url, clicks: 1 });
    }

    // Čuvanje ažurirane liste u localStorage
    localStorage.setItem('mostVisited', JSON.stringify(mostVisitedPages));

    // Ažuriranje prikaza u footeru
    initializeMostVisited();
}

// naziv stranice iz putanje
function getPageName(pathname) {
    var pathArray = pathname.split('/');
    return pathArray[pathArray.length - 1];
}

function getCustomPageName(pathname) {
    if (pathname.includes('index.html')) {
        return 'Početna';
    } else if (pathname.includes('destinacije.html')) {
        return 'Destinacije';
    } else if (pathname.includes('manifestacije.html')) {
        return 'Manifestacije';
    }else if (pathname.includes('gallery.html')) {
        return 'Galerija';
    }else if (pathname.includes('kontakt.html')) {
        return 'Kontakt';
    }
    else {
        // vraca celu putanju ako nema naziva
        return pathname.split('/').pop();
    }
}


