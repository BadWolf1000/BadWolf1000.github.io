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

    // Search elements
    var searchInput = document.getElementById("command-search");
    var searchResults = document.getElementById("search-results");
    var searchResultsList = document.getElementById("search-results-list");
    var searchResultsCount = document.getElementById("search-results-count");
    var clearSearchBtn = document.getElementById("clear-search");

    // Theme toggle
    var themeToggle = document.getElementById("theme-toggle");
    var themeIcon = themeToggle.querySelector(".theme-icon");

    // Sort dropdown
    var sortBtn = document.getElementById("sort-btn");
    var sortMenu = document.getElementById("sort-menu");
    var sortItems = sortMenu.querySelectorAll(".dropdown-item");

    // Quiz elements
    var quizModal = document.getElementById("quiz-modal");
    var openQuizBtn = document.getElementById("open-quiz");
    var closeQuizBtn = document.getElementById("quiz-close");
    var quizCategories = document.getElementById("quiz-categories");
    var quizSettings = document.getElementById("quiz-settings");
    var quizContent = document.getElementById("quiz-content");
    var quizResults = document.getElementById("quiz-results");
    var quizStartBtn = document.getElementById("quiz-start");
    var quizNextBtn = document.getElementById("quiz-next");
    var quizRestartBtn = document.getElementById("quiz-restart");

    var sectionNames =
    [
        "file-dir", "file-ops", "permissions", "disk", "process",
        "network", "shortcuts", "must-know", "archive", "ssh",
        "sysinfo", "text", "recon", "scanning", "webexp",
        "exploitation", "password", "privesc", "revshell", "forensics",
        "stealth", "smb", "encoding", "wireless", "transfer",
        "tunneling", "osint"
    ];

    var sectionLabels = {
        "file-dir": "File & Directory",
        "file-ops": "File Operations",
        "permissions": "Permissions",
        "disk": "Disk & Memory",
        "process": "Process",
        "network": "Network",
        "shortcuts": "Shortcuts",
        "must-know": "Must Know",
        "archive": "Archive",
        "ssh": "SSH & Remote",
        "sysinfo": "System Info",
        "text": "Text Processing",
        "recon": "Reconnaissance",
        "scanning": "Scanning",
        "webexp": "Web Exploit",
        "exploitation": "Exploitation",
        "password": "Passwords",
        "privesc": "Priv Esc",
        "revshell": "Rev Shells",
        "forensics": "Forensics",
        "stealth": "Stealth",
        "smb": "SMB & Windows",
        "encoding": "Encoding",
        "wireless": "Wireless",
        "transfer": "File Transfer",
        "tunneling": "Tunneling",
        "osint": "OSINT"
    };

    var cache = {};
    var blogPosts = [];
    var allCommands = [];
    var currentSort = "default";

    // Quiz state
    var quizState = {
        selectedCategories: [],
        questions: [],
        currentQuestion: 0,
        score: 0,
        answered: false
    };

    // ===== Theme Toggle =====
    function initTheme()
    {
        var savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light")
        {
            document.body.classList.add("light-mode");
            themeIcon.textContent = "🌙";
        }
    }

    function toggleTheme()
    {
        document.body.classList.toggle("light-mode");
        var isLight = document.body.classList.contains("light-mode");
        themeIcon.textContent = isLight ? "🌙" : "☀️";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    }

    themeToggle.addEventListener("click", toggleTheme);
    initTheme();

    // ===== URL Hash Routing =====
    function navigate(hash)
    {
        if (window.location.hash !== hash)
        {
            window.location.hash = hash;
        }
        else
        {
            handleRoute();
        }
    }

    function handleRoute()
    {
        var hash = window.location.hash || "#blog";
        var parts = hash.substring(1).split("/");
        var route = parts[0];
        var param = parts[1] || null;

        if (route === "blog" || route === "")
        {
            showView("blog");
        }
        else if (route === "commands")
        {
            showView("commands");
            if (param)
            {
                activateCmdFilter(param);
            }
            else
            {
                loadCmdHome();
            }
        }
        else if (route === "post" && param)
        {
            loadBlogPost(param);
        }
        else
        {
            showView("blog");
        }
    }

    window.addEventListener("hashchange", handleRoute);

    // ===== View Switching =====
    function showView(viewName)
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
            navigate("#" + view);
        });
    });

    // ===== Blog Functionality =====
    function loadBlogPosts()
    {
        fetch("blog-posts/posts.json")
            .then(function (response)
            {
                return response.json();
            })
            .then(function (data)
            {
                blogPosts = data.posts;
                renderBlogCards();
                handleRoute();
            })
            .catch(function (error)
            {
                console.log("No blog posts found or error loading:", error);
                blogPostsContainer.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center;">No posts yet. Add your first post to the blog-posts/ folder!</p>';
                handleRoute();
            });
    }

    function renderBlogCards()
    {
        if (blogPosts.length === 0)
        {
            blogPostsContainer.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center;">No posts yet. Add your first post to the blog-posts/ folder!</p>';
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
                navigate("#post/" + slug);
            });
        });
    }

    function loadBlogPost(slug)
    {
        fetch("blog-posts/" + slug + ".html")
            .then(function (response)
            {
                return response.text();
            })
            .then(function (html)
            {
                postContent.innerHTML = html;
                showView("post");
                window.scrollTo(0, 0);
                // Apply syntax highlighting
                applySyntaxHighlighting(postContent);
            })
            .catch(function (error)
            {
                console.log("Error loading post:", error);
                navigate("#blog");
            });
    }

    backBtn.addEventListener("click", function ()
    {
        navigate("#blog");
    });

    // ===== Syntax Highlighting =====
    function applySyntaxHighlighting(container)
    {
        var codeBlocks = container.querySelectorAll("pre code");
        codeBlocks.forEach(function (block)
        {
            hljs.highlightElement(block);
        });
    }

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

    function parseCommandsFromHTML(html, category)
    {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        var items = doc.querySelectorAll(".command-item");
        var commands = [];

        items.forEach(function (item)
        {
            var cmdEl = item.querySelector(".cmd");
            var descEl = item.querySelector(".desc");
            var exampleEl = item.querySelector(".example");

            if (cmdEl && descEl)
            {
                commands.push({
                    cmd: cmdEl.textContent.trim(),
                    desc: descEl.textContent.trim(),
                    example: exampleEl ? exampleEl.innerHTML : "",
                    category: category
                });
            }
        });

        return commands;
    }

    function loadAllCommands()
    {
        var promises = sectionNames.map(function (name)
        {
            return fetchSection(name).then(function (html)
            {
                return parseCommandsFromHTML(html, name);
            });
        });

        Promise.all(promises).then(function (results)
        {
            allCommands = results.flat();
        });
    }

    function loadCmdHome()
    {
        cmdTabs.forEach(function (t)
        {
            t.classList.remove("active");
        });
        var homeTab = document.querySelector('.cmd-tab[data-filter="cmd-home"]');
        if (homeTab)
        {
            homeTab.classList.add("active");
        }

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
                    navigate("#commands/" + target);
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
            addCopyButtons(cmdSectionsGrid);
            applySortToSection(cmdSectionsGrid);
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
            if (filter === "cmd-home")
            {
                navigate("#commands");
            }
            else
            {
                navigate("#commands/" + filter);
            }
        });
    });

    // ===== Copy Button Functionality =====
    function addCopyButtons(container)
    {
        var examples = container.querySelectorAll(".example");
        examples.forEach(function (example)
        {
            // Skip if already wrapped
            if (example.parentElement.classList.contains("example-wrapper"))
            {
                return;
            }

            var wrapper = document.createElement("div");
            wrapper.className = "example-wrapper";
            example.parentNode.insertBefore(wrapper, example);
            wrapper.appendChild(example);

            var copyBtn = document.createElement("button");
            copyBtn.className = "copy-btn";
            copyBtn.textContent = "Copy";
            wrapper.appendChild(copyBtn);

            copyBtn.addEventListener("click", function ()
            {
                // Extract text content (remove HTML)
                var text = example.textContent;
                // Remove leading $ and output lines for cleaner copy
                var lines = text.split("\n").filter(function (line)
                {
                    return line.startsWith("$") || (!line.startsWith("/") && !line.startsWith("-") && !line.startsWith(" ") && line.trim() !== "");
                });
                var cmdText = lines.map(function (line)
                {
                    return line.replace(/^\$\s*/, "");
                }).join("\n");

                navigator.clipboard.writeText(cmdText).then(function ()
                {
                    copyBtn.textContent = "Copied!";
                    copyBtn.classList.add("copied");
                    setTimeout(function ()
                    {
                        copyBtn.textContent = "Copy";
                        copyBtn.classList.remove("copied");
                    }, 2000);
                });
            });
        });
    }

    // ===== Search Functionality =====
    function searchCommands(query)
    {
        if (!query || query.length < 2)
        {
            searchResults.classList.add("hidden");
            return;
        }

        var lowerQuery = query.toLowerCase();
        var results = allCommands.filter(function (cmd)
        {
            return cmd.cmd.toLowerCase().includes(lowerQuery) ||
                   cmd.desc.toLowerCase().includes(lowerQuery);
        });

        if (results.length === 0)
        {
            searchResultsCount.textContent = "No results found";
            searchResultsList.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; padding: 20px;">Try a different search term</p>';
        }
        else
        {
            searchResultsCount.textContent = results.length + " result" + (results.length === 1 ? "" : "s") + " found";
            searchResultsList.innerHTML = results.map(function (cmd)
            {
                return '<div class="search-result-item" data-category="' + cmd.category + '">' +
                    '<span class="search-result-category">' + (sectionLabels[cmd.category] || cmd.category) + '</span>' +
                    '<span class="search-result-cmd">' + escapeHTML(cmd.cmd) + '</span>' +
                    '<span class="search-result-desc">' + escapeHTML(cmd.desc) + '</span>' +
                    '</div>';
            }).join("");

            // Add click handlers to results
            var resultItems = searchResultsList.querySelectorAll(".search-result-item");
            resultItems.forEach(function (item)
            {
                item.addEventListener("click", function ()
                {
                    var category = item.getAttribute("data-category");
                    clearSearch();
                    navigate("#commands/" + category);
                });
            });
        }

        searchResults.classList.remove("hidden");
    }

    function clearSearch()
    {
        searchInput.value = "";
        searchResults.classList.add("hidden");
    }

    function escapeHTML(str)
    {
        var div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    var searchTimeout;
    searchInput.addEventListener("input", function ()
    {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function ()
        {
            searchCommands(searchInput.value);
        }, 200);
    });

    clearSearchBtn.addEventListener("click", clearSearch);

    // Keyboard shortcut: / to focus search
    document.addEventListener("keydown", function (e)
    {
        if (e.key === "/" && document.activeElement !== searchInput)
        {
            var hash = window.location.hash || "#blog";
            if (hash.startsWith("#commands"))
            {
                e.preventDefault();
                searchInput.focus();
            }
        }
        if (e.key === "Escape" && document.activeElement === searchInput)
        {
            clearSearch();
            searchInput.blur();
        }
    });

    // ===== Sort Functionality =====
    sortBtn.addEventListener("click", function (e)
    {
        e.stopPropagation();
        sortMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", function ()
    {
        sortMenu.classList.add("hidden");
    });

    sortItems.forEach(function (item)
    {
        item.addEventListener("click", function ()
        {
            sortItems.forEach(function (i) { i.classList.remove("active"); });
            item.classList.add("active");
            currentSort = item.getAttribute("data-sort");
            sortMenu.classList.add("hidden");

            // Re-apply sort to current section
            applySortToSection(cmdSectionsGrid);
        });
    });

    function applySortToSection(container)
    {
        var commandList = container.querySelector(".command-list");
        if (!commandList) return;

        var items = Array.from(commandList.querySelectorAll(".command-item"));
        if (items.length === 0) return;

        if (currentSort === "alpha-asc")
        {
            items.sort(function (a, b)
            {
                var cmdA = a.querySelector(".cmd").textContent.toLowerCase();
                var cmdB = b.querySelector(".cmd").textContent.toLowerCase();
                return cmdA.localeCompare(cmdB);
            });
        }
        else if (currentSort === "alpha-desc")
        {
            items.sort(function (a, b)
            {
                var cmdA = a.querySelector(".cmd").textContent.toLowerCase();
                var cmdB = b.querySelector(".cmd").textContent.toLowerCase();
                return cmdB.localeCompare(cmdA);
            });
        }

        // Re-append in sorted order
        items.forEach(function (item)
        {
            commandList.appendChild(item);
        });
    }

    // ===== Quiz Functionality =====
    function initQuizCategories()
    {
        var html = sectionNames.map(function (name)
        {
            return '<button class="quiz-category-btn" data-category="' + name + '">' +
                (sectionLabels[name] || name) + '</button>';
        }).join("");
        quizCategories.innerHTML = html;

        var categoryBtns = quizCategories.querySelectorAll(".quiz-category-btn");
        categoryBtns.forEach(function (btn)
        {
            btn.addEventListener("click", function ()
            {
                btn.classList.toggle("selected");
                var category = btn.getAttribute("data-category");
                var idx = quizState.selectedCategories.indexOf(category);
                if (idx > -1)
                {
                    quizState.selectedCategories.splice(idx, 1);
                }
                else
                {
                    quizState.selectedCategories.push(category);
                }
            });
        });
    }

    function generateQuizQuestions(count)
    {
        var filteredCommands = allCommands;
        if (quizState.selectedCategories.length > 0)
        {
            filteredCommands = allCommands.filter(function (cmd)
            {
                return quizState.selectedCategories.includes(cmd.category);
            });
        }

        if (filteredCommands.length < 4)
        {
            alert("Please select categories with at least 4 commands");
            return false;
        }

        // Shuffle and pick questions
        var shuffled = filteredCommands.slice().sort(function () { return Math.random() - 0.5; });
        var questionCount = Math.min(count, shuffled.length);
        var questions = [];

        for (var i = 0; i < questionCount; i++)
        {
            var correctCmd = shuffled[i];

            // Get wrong answers from other commands
            var wrongAnswers = filteredCommands
                .filter(function (cmd) { return cmd.cmd !== correctCmd.cmd; })
                .sort(function () { return Math.random() - 0.5; })
                .slice(0, 3)
                .map(function (cmd) { return cmd.desc; });

            // Randomly decide question type (0 = what does X do, 1 = which command does Y)
            var questionType = Math.random() > 0.5 ? 0 : 1;

            if (questionType === 0)
            {
                // What does this command do?
                var answers = [correctCmd.desc].concat(wrongAnswers).sort(function () { return Math.random() - 0.5; });
                questions.push({
                    type: "cmd-to-desc",
                    question: "What does this command do?",
                    code: correctCmd.cmd,
                    answers: answers,
                    correct: correctCmd.desc,
                    category: correctCmd.category
                });
            }
            else
            {
                // Which command does this?
                var wrongCmds = filteredCommands
                    .filter(function (cmd) { return cmd.cmd !== correctCmd.cmd; })
                    .sort(function () { return Math.random() - 0.5; })
                    .slice(0, 3)
                    .map(function (cmd) { return cmd.cmd; });

                var cmdAnswers = [correctCmd.cmd].concat(wrongCmds).sort(function () { return Math.random() - 0.5; });
                questions.push({
                    type: "desc-to-cmd",
                    question: "Which command does this?",
                    code: correctCmd.desc,
                    answers: cmdAnswers,
                    correct: correctCmd.cmd,
                    category: correctCmd.category
                });
            }
        }

        quizState.questions = questions;
        return true;
    }

    function showQuestion()
    {
        var q = quizState.questions[quizState.currentQuestion];
        var questionEl = document.getElementById("quiz-question");
        var answersEl = document.getElementById("quiz-answers");
        var feedbackEl = document.getElementById("quiz-feedback");
        var progressText = document.getElementById("quiz-progress-text");
        var progressFill = document.getElementById("quiz-progress-fill");

        progressText.textContent = "Question " + (quizState.currentQuestion + 1) + " of " + quizState.questions.length;
        progressFill.style.width = ((quizState.currentQuestion + 1) / quizState.questions.length * 100) + "%";

        questionEl.innerHTML = '<p class="quiz-question-text">' + q.question + '</p>' +
            '<div class="quiz-question-code">' + escapeHTML(q.code) + '</div>';

        answersEl.innerHTML = q.answers.map(function (answer)
        {
            return '<button class="quiz-answer-btn" data-answer="' + escapeHTML(answer) + '">' +
                escapeHTML(answer) + '</button>';
        }).join("");

        feedbackEl.classList.add("hidden");
        quizNextBtn.classList.add("hidden");
        quizState.answered = false;

        var answerBtns = answersEl.querySelectorAll(".quiz-answer-btn");
        answerBtns.forEach(function (btn)
        {
            btn.addEventListener("click", function ()
            {
                if (quizState.answered) return;
                handleAnswer(btn.getAttribute("data-answer"), answerBtns);
            });
        });
    }

    function handleAnswer(selected, buttons)
    {
        quizState.answered = true;
        var q = quizState.questions[quizState.currentQuestion];
        var isCorrect = selected === q.correct;
        var feedbackEl = document.getElementById("quiz-feedback");

        buttons.forEach(function (btn)
        {
            btn.disabled = true;
            var answer = btn.getAttribute("data-answer");
            if (answer === q.correct)
            {
                btn.classList.add("correct");
            }
            else if (answer === selected && !isCorrect)
            {
                btn.classList.add("incorrect");
            }
        });

        if (isCorrect)
        {
            quizState.score++;
            feedbackEl.className = "quiz-feedback correct";
            feedbackEl.textContent = "Correct! Well done.";
        }
        else
        {
            feedbackEl.className = "quiz-feedback incorrect";
            feedbackEl.innerHTML = "Incorrect. The correct answer is: <strong>" + escapeHTML(q.correct) + "</strong>";
        }

        feedbackEl.classList.remove("hidden");

        if (quizState.currentQuestion < quizState.questions.length - 1)
        {
            quizNextBtn.classList.remove("hidden");
            quizNextBtn.textContent = "Next Question";
        }
        else
        {
            quizNextBtn.classList.remove("hidden");
            quizNextBtn.textContent = "See Results";
        }
    }

    function showResults()
    {
        quizContent.classList.add("hidden");
        quizResults.classList.remove("hidden");

        var scoreEl = document.getElementById("quiz-score");
        var summaryEl = document.getElementById("quiz-summary");
        var percentage = Math.round((quizState.score / quizState.questions.length) * 100);

        scoreEl.innerHTML = '<div class="quiz-score-number">' + percentage + '%</div>' +
            '<div class="quiz-score-label">' + quizState.score + ' out of ' + quizState.questions.length + ' correct</div>';

        var message;
        if (percentage === 100) message = "Perfect score! You're a Linux master!";
        else if (percentage >= 80) message = "Excellent work! Keep it up!";
        else if (percentage >= 60) message = "Good job! Room for improvement.";
        else if (percentage >= 40) message = "Not bad, keep practicing!";
        else message = "Keep studying, you'll get there!";

        summaryEl.innerHTML = '<div class="quiz-summary-item"><span>Score</span><span>' + quizState.score + '/' + quizState.questions.length + '</span></div>' +
            '<div class="quiz-summary-item"><span>Percentage</span><span>' + percentage + '%</span></div>' +
            '<div class="quiz-summary-item"><span>Status</span><span>' + message + '</span></div>';
    }

    function resetQuiz()
    {
        quizState.questions = [];
        quizState.currentQuestion = 0;
        quizState.score = 0;
        quizState.answered = false;

        quizSettings.classList.remove("hidden");
        quizContent.classList.add("hidden");
        quizResults.classList.add("hidden");
    }

    openQuizBtn.addEventListener("click", function ()
    {
        quizModal.classList.remove("hidden");
        initQuizCategories();
    });

    closeQuizBtn.addEventListener("click", function ()
    {
        quizModal.classList.add("hidden");
        resetQuiz();
    });

    quizModal.addEventListener("click", function (e)
    {
        if (e.target === quizModal)
        {
            quizModal.classList.add("hidden");
            resetQuiz();
        }
    });

    quizStartBtn.addEventListener("click", function ()
    {
        var count = parseInt(document.getElementById("quiz-count").value);
        if (generateQuizQuestions(count))
        {
            quizSettings.classList.add("hidden");
            quizContent.classList.remove("hidden");
            showQuestion();
        }
    });

    quizNextBtn.addEventListener("click", function ()
    {
        if (quizState.currentQuestion < quizState.questions.length - 1)
        {
            quizState.currentQuestion++;
            showQuestion();
        }
        else
        {
            showResults();
        }
    });

    quizRestartBtn.addEventListener("click", function ()
    {
        resetQuiz();
    });

    // ===== Blog Post Editor =====
    var editorModal = document.getElementById("editor-modal");
    var openEditorBtn = document.getElementById("open-editor");
    var closeEditorBtn = document.getElementById("editor-close");
    var editorForm = document.querySelector(".editor-form");
    var editorPreview = document.getElementById("editor-preview");
    var editorOutput = document.getElementById("editor-output");
    var previewBtn = document.getElementById("preview-post");
    var generateBtn = document.getElementById("generate-post");
    var previewCloseBtn = document.getElementById("preview-close");
    var outputCloseBtn = document.getElementById("output-close");
    var postContentTextarea = document.getElementById("post-content-editor");
    var editorTools = document.querySelectorAll(".editor-tool");
    var emojiBtn = document.getElementById("emoji-btn");
    var emojiDropdown = document.getElementById("emoji-dropdown");

    // Set default date to today
    function setDefaultDate()
    {
        var today = new Date();
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById("post-date").value = today.toLocaleDateString('en-US', options);
    }

    function openEditor()
    {
        editorModal.classList.remove("hidden");
        setDefaultDate();
        document.body.style.overflow = "hidden";
    }

    function closeEditor()
    {
        editorModal.classList.add("hidden");
        document.body.style.overflow = "";
    }

    function resetEditorPanels()
    {
        editorForm.classList.remove("hidden");
        editorPreview.classList.add("hidden");
        editorOutput.classList.add("hidden");
    }

    // Secret key combination to show editor button: Ctrl+Shift+E
    var editorUnlocked = false;
    document.addEventListener("keydown", function (e)
    {
        if (e.ctrlKey && e.shiftKey && e.key === "E")
        {
            e.preventDefault();
            editorUnlocked = true;
            openEditorBtn.classList.remove("hidden");
            openEditorBtn.style.animation = "fadeIn 0.3s ease";
        }
    });

    openEditorBtn.addEventListener("click", openEditor);
    closeEditorBtn.addEventListener("click", closeEditor);
    editorModal.addEventListener("click", function (e)
    {
        if (e.target === editorModal)
        {
            closeEditor();
        }
    });

    // Editor toolbar functionality
    editorTools.forEach(function (tool)
    {
        tool.addEventListener("click", function ()
        {
            var action = tool.getAttribute("data-action");
            insertFormatting(action);
        });
    });

    function insertFormatting(action)
    {
        var textarea = postContentTextarea;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var selected = textarea.value.substring(start, end);
        var before = textarea.value.substring(0, start);
        var after = textarea.value.substring(end);
        var insert = "";

        switch (action)
        {
            case "h2":
                insert = "<h2>" + (selected || "Heading") + "</h2>";
                break;
            case "h3":
                insert = "<h3>" + (selected || "Subheading") + "</h3>";
                break;
            case "bold":
                insert = "<strong>" + (selected || "bold text") + "</strong>";
                break;
            case "italic":
                insert = "<em>" + (selected || "italic text") + "</em>";
                break;
            case "code":
                insert = "<code>" + (selected || "code") + "</code>";
                break;
            case "codeblock":
                insert = "<pre><code>" + (selected || "code here") + "</code></pre>";
                break;
            case "ul":
                insert = "<ul>\n    <li>" + (selected || "Item 1") + "</li>\n    <li>Item 2</li>\n</ul>";
                break;
            case "link":
                var url = prompt("Enter URL:", "https://");
                if (url)
                {
                    insert = '<a href="' + url + '">' + (selected || "link text") + '</a>';
                }
                else
                {
                    return;
                }
                break;
            case "quote":
                insert = "<blockquote>" + (selected || "Quote text here") + "</blockquote>";
                break;
        }

        textarea.value = before + insert + after;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + insert.length;
    }

    // Process content helper function
    function processEditorContent(content)
    {
        if (!content || content.trim() === "") return "";

        // Split by double newlines to find paragraphs
        var blocks = content.split(/\n\n+/);
        var processed = blocks.map(function (block)
        {
            block = block.trim();
            if (!block) return "";

            // Check if already wrapped in HTML tags
            if (block.match(/^<(h[1-6]|p|ul|ol|pre|blockquote|div)/i))
            {
                return block;
            }

            // Wrap in paragraph tags
            return "<p>" + block.replace(/\n/g, "<br>") + "</p>";
        });

        return processed.filter(function (b) { return b; }).join("\n\n");
    }

    // Emoji picker functionality
    var emojiList = ["🎯", "🔐", "💻", "🐧", "🔓", "🌐", "⚡", "🔥", "🚀", "💡", "🛡️", "🔍", "📝", "⚙️", "🎮", "📡", "🔧", "💾", "📁", "🐚"];

    emojiBtn.addEventListener("click", function (e)
    {
        e.stopPropagation();
        emojiDropdown.classList.toggle("hidden");
    });

    // Populate emoji dropdown
    emojiDropdown.innerHTML = emojiList.map(function (emoji)
    {
        return '<button type="button" class="emoji-option" data-emoji="' + emoji + '">' + emoji + '</button>';
    }).join("");

    emojiDropdown.addEventListener("click", function (e)
    {
        if (e.target.classList.contains("emoji-option"))
        {
            var emoji = e.target.getAttribute("data-emoji");
            document.getElementById("post-icon").value = emoji;
            emojiDropdown.classList.add("hidden");
        }
    });

    document.addEventListener("click", function ()
    {
        emojiDropdown.classList.add("hidden");
    });

    // Preview functionality
    previewBtn.addEventListener("click", function ()
    {
        var title = document.getElementById("post-title").value || "Untitled Post";
        var date = document.getElementById("post-date").value || "Date";
        var tag = document.getElementById("post-tag").value;
        var content = postContentTextarea.value;

        // Wrap plain text paragraphs in <p> tags
        content = processEditorContent(content);

        var previewHTML = '<div class="post-header">' +
            '<div class="post-meta">' +
            '<span class="post-date">' + escapeHTML(date) + '</span>' +
            '<span class="post-tag">' + escapeHTML(tag) + '</span>' +
            '</div>' +
            '<h1>' + escapeHTML(title) + '</h1>' +
            '</div>' +
            '<div class="post-body">' + content + '</div>';

        document.getElementById("preview-content").innerHTML = previewHTML;
        editorForm.classList.add("hidden");
        editorPreview.classList.remove("hidden");

        // Apply syntax highlighting to preview
        applySyntaxHighlighting(document.getElementById("preview-content"));
    });

    previewCloseBtn.addEventListener("click", resetEditorPanels);

    // Generate files functionality
    generateBtn.addEventListener("click", function ()
    {
        var title = document.getElementById("post-title").value;
        var date = document.getElementById("post-date").value;
        var tag = document.getElementById("post-tag").value;
        var icon = document.getElementById("post-icon").value || "📝";
        var excerpt = document.getElementById("post-excerpt").value;
        var content = postContentTextarea.value;

        if (!title || !content || content.trim() === "")
        {
            alert("Please fill in at least the title and content.");
            return;
        }

        // Generate slug from title
        var slug = title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 50);

        // Process content
        content = processEditorContent(content);

        // Generate HTML file content
        var htmlContent = '<div class="post-header">\n' +
            '    <div class="post-meta">\n' +
            '        <span class="post-date">' + escapeHTML(date) + '</span>\n' +
            '        <span class="post-tag">' + escapeHTML(tag) + '</span>\n' +
            '    </div>\n' +
            '    <h1>' + escapeHTML(title) + '</h1>\n' +
            '</div>\n\n' +
            '<div class="post-body">\n' +
            '    ' + content.split('\n').join('\n    ') + '\n' +
            '</div>';

        // Generate JSON entry
        var jsonEntry = '{\n' +
            '    "slug": "' + slug + '",\n' +
            '    "title": "' + escapeHTML(title).replace(/"/g, '\\"') + '",\n' +
            '    "date": "' + escapeHTML(date) + '",\n' +
            '    "tag": "' + escapeHTML(tag) + '",\n' +
            '    "icon": "' + icon + '",\n' +
            '    "excerpt": "' + escapeHTML(excerpt).replace(/"/g, '\\"') + '"\n' +
            '}';

        // Display output
        document.getElementById("output-filename").textContent = "blog-posts/" + slug + ".html";
        document.getElementById("output-html").textContent = htmlContent;
        document.getElementById("output-json").textContent = jsonEntry;

        editorForm.classList.add("hidden");
        editorOutput.classList.remove("hidden");
    });

    outputCloseBtn.addEventListener("click", resetEditorPanels);

    // Copy output buttons
    document.querySelectorAll(".copy-output-btn").forEach(function (btn)
    {
        btn.addEventListener("click", function ()
        {
            var targetId = btn.getAttribute("data-target");
            var text = document.getElementById(targetId).textContent;

            navigator.clipboard.writeText(text).then(function ()
            {
                btn.textContent = "Copied!";
                btn.classList.add("copied");
                setTimeout(function ()
                {
                    btn.textContent = "Copy";
                    btn.classList.remove("copied");
                }, 2000);
            });
        });
    });

    // ===== Preload & Initialize =====
    sectionNames.forEach(function (name)
    {
        fetchSection(name);
    });

    // Load all commands for search
    loadAllCommands();

    // ===== Initialize =====
    loadBlogPosts();
});
