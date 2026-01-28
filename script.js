document.addEventListener("DOMContentLoaded", function ()
{
    var tabs = document.querySelectorAll(".tab");
    var homeContainer = document.getElementById("home-container");
    var sectionsGrid = document.getElementById("sections-grid");

    var sectionNames =
    [
        "file-dir", "file-ops", "permissions", "disk", "process",
        "network", "shortcuts", "must-know", "archive", "ssh",
        "sysinfo", "text", "recon", "scanning", "webexp",
        "exploitation", "password", "privesc", "revshell", "forensics",
        "stealth", "smb", "encoding", "wireless", "transfer",
        "tunneling", "osint"
    ];

    var cache = {};

    function fetchSection(name)
    {
        if (cache[name])
        {
            return Promise.resolve(cache[name]);
        }

        return fetch("sections/" + name + ".html")
            .then(function (response)
            {
                return response.text();
            })
            .then(function (html)
            {
                cache[name] = html;
                return html;
            });
    }

    function loadHome()
    {
        fetchSection("home").then(function (html)
        {
            homeContainer.innerHTML = html;
            homeContainer.classList.remove("hidden");
            sectionsGrid.classList.add("hidden");

            var homeCards = homeContainer.querySelectorAll(".home-card");
            homeCards.forEach(function (card)
            {
                card.addEventListener("click", function ()
                {
                    var target = card.getAttribute("data-target");
                    activateFilter(target);
                });
            });
        });
    }

    function loadSection(name)
    {
        homeContainer.classList.add("hidden");
        sectionsGrid.classList.remove("hidden");

        fetchSection(name).then(function (html)
        {
            sectionsGrid.innerHTML = html;
        });
    }

    function activateFilter(filter)
    {
        tabs.forEach(function (t)
        {
            t.classList.remove("active");
        });

        var matchingTab = document.querySelector('.tab[data-filter="' + filter + '"]');
        if (matchingTab)
        {
            matchingTab.classList.add("active");
        }

        if (filter === "home")
        {
            loadHome();
        }
        else
        {
            loadSection(filter);
        }
    }

    tabs.forEach(function (tab)
    {
        tab.addEventListener("click", function ()
        {
            var filter = tab.getAttribute("data-filter");
            activateFilter(filter);
        });
    });

    // Preload all sections in the background
    sectionNames.forEach(function (name)
    {
        fetchSection(name);
    });

    // Load home page on start
    loadHome();
});
