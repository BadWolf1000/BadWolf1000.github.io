document.addEventListener("DOMContentLoaded", function ()
{
    // ===== DOM Elements =====
    var navTabs = document.querySelectorAll(".nav-tab");
    var views = document.querySelectorAll(".view");
    var blogView = document.getElementById("blog-view");
    var commandsView = document.getElementById("commands-view");
    var postView = document.getElementById("post-view");
    var blogPostsContainer = document.getElementById("blog-posts");
    var postContent = document.getElementById("post-content");
    var backBtn = document.getElementById("back-to-blog");

    // Commands elements
    var cmdTabs = document.querySelectorAll(".cmd-tab");
    var cmdHomeContainer = document.getElementById("cmd-home-container");
    var cmdSectionsGrid = document.getElementById("cmd-sections-grid");

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
    var blogPosts = [];

    // ===== View Switching =====
    function switchView(viewName)
    {
        views.forEach(function (view)
        {
            view.classList.remove("active");
        });

        navTabs.forEach(function (tab)
        {
            tab.classList.remove("active");
        });

        if (viewName === "blog")
        {
            blogView.classList.add("active");
            document.querySelector('[data-view="blog"]').classList.add("active");
        }
        else if (viewName === "commands")
        {
            commandsView.classList.add("active");
            document.querySelector('[data-view="commands"]').classList.add("active");
            loadCmdHome();
        }
        else if (viewName === "post")
        {
            postView.classList.add("active");
        }
    }

    navTabs.forEach(function (tab)
    {
        tab.addEventListener("click", function ()
        {
            var view = tab.getAttribute("data-view");
            switchView(view);
        });
    });

    // ===== Blog Functionality =====
    function loadBlogPosts()
    {
        fetch("posts/posts.json")
            .then(function (response)
            {
                return response.json();
            })
            .then(function (data)
            {
                blogPosts = data.posts;
                renderBlogCards();
            })
            .catch(function (error)
            {
                console.log("No blog posts found or error loading:", error);
                blogPostsContainer.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center;">No posts yet. Add your first post to the posts/ folder!</p>';
            });
    }

    function renderBlogCards()
    {
        if (blogPosts.length === 0)
        {
            blogPostsContainer.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center;">No posts yet. Add your first post to the posts/ folder!</p>';
            return;
        }

        var html = blogPosts.map(function (post)
        {
            return '<div class="blog-card" data-slug="' + post.slug + '">' +
                '<div class="blog-card-image">' + post.icon + '</div>' +
                '<div class="blog-card-content">' +
                '<div class="blog-card-meta">' +
                '<span class="blog-card-date">' + post.date + '</span>' +
                '<span class="blog-card-tag">' + post.tag + '</span>' +
                '</div>' +
                '<h3>' + post.title + '</h3>' +
                '<p>' + post.excerpt + '</p>' +
                '</div>' +
                '</div>';
        }).join("");

        blogPostsContainer.innerHTML = html;

        // Add click handlers
        var cards = blogPostsContainer.querySelectorAll(".blog-card");
        cards.forEach(function (card)
        {
            card.addEventListener("click", function ()
            {
                var slug = card.getAttribute("data-slug");
                loadBlogPost(slug);
            });
        });
    }

    function loadBlogPost(slug)
    {
        fetch("posts/" + slug + ".html")
            .then(function (response)
            {
                return response.text();
            })
            .then(function (html)
            {
                postContent.innerHTML = html;
                switchView("post");
            })
            .catch(function (error)
            {
                console.log("Error loading post:", error);
            });
    }

    backBtn.addEventListener("click", function ()
    {
        switchView("blog");
    });

    // ===== Commands Functionality =====
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

    function loadCmdHome()
    {
        fetchSection("home").then(function (html)
        {
            cmdHomeContainer.innerHTML = html;
            cmdHomeContainer.classList.remove("hidden");
            cmdSectionsGrid.classList.add("hidden");

            var homeCards = cmdHomeContainer.querySelectorAll(".home-card");
            homeCards.forEach(function (card)
            {
                card.addEventListener("click", function ()
                {
                    var target = card.getAttribute("data-target");
                    activateCmdFilter(target);
                });
            });
        });
    }

    function loadCmdSection(name)
    {
        cmdHomeContainer.classList.add("hidden");
        cmdSectionsGrid.classList.remove("hidden");

        fetchSection(name).then(function (html)
        {
            cmdSectionsGrid.innerHTML = html;
        });
    }

    function activateCmdFilter(filter)
    {
        cmdTabs.forEach(function (t)
        {
            t.classList.remove("active");
        });

        var matchingTab = document.querySelector('.cmd-tab[data-filter="' + filter + '"]');
        if (matchingTab)
        {
            matchingTab.classList.add("active");
        }

        if (filter === "cmd-home")
        {
            loadCmdHome();
        }
        else
        {
            loadCmdSection(filter);
        }
    }

    cmdTabs.forEach(function (tab)
    {
        tab.addEventListener("click", function ()
        {
            var filter = tab.getAttribute("data-filter");
            activateCmdFilter(filter);
        });
    });

    // Preload all command sections in the background
    sectionNames.forEach(function (name)
    {
        fetchSection(name);
    });

    // ===== Initialize =====
    loadBlogPosts();
});
