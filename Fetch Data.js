const API_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://www.wired.com/feed/rss";

async function fetchArticles() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Filter articles published after January 1, 2022
        const articles = data.items.filter(article => {
            const publishedDate = new Date(article.pubDate);
            return publishedDate >= new Date("2022-01-01");
        });

        // Sort articles by date in descending order
        articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        // Display articles on the webpage
        const articlesList = document.getElementById("articles");
        articles.forEach(article => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${article.link}" target="_blank">${article.title}</a> - ${new Date(article.pubDate).toDateString()}`;
            articlesList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
}

fetchArticles();
