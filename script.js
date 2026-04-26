// Tool modal functions
function openTool(toolName) {
    const modal = document.getElementById(`${toolName}-tool`);
    if(modal) modal.style.display = 'flex';
    else alert(`${toolName} tool coming soon!`);
}

function closeTool(toolName) {
    const modal = document.getElementById(`${toolName}-tool`);
    if(modal) modal.style.display = 'none';
}

// Load blog posts dynamically (AUTOMATIC)
async function loadBlogPosts() {
    try {
        const response = await fetch('blog-data.json');
        const posts = await response.json();
        
        const blogGrid = document.querySelector('.blog-grid');
        if(blogGrid) {
            blogGrid.innerHTML = posts.map(post => `
                <article class="blog-card">
                    <div class="blog-card-content">
                        <h3>${post.title}</h3>
                        <div class="blog-meta">${post.date} • ${post.readTime} min read</div>
                        <p>${post.excerpt}</p>
                        <a href="post.html?id=${post.id}" class="read-more">Read More →</a>
                    </div>
                </article>
            `).join('');
        }
    } catch(e) {
        console.log('Blog loading:', e);
    }
}

// Load single blog post
async function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if(postId && window.location.pathname.includes('post.html')) {
        try {
            const response = await fetch('blog-data.json');
            const posts = await response.json();
            const post = posts.find(p => p.id == postId);
            
            if(post) {
                document.title = `${post.title} | ToolHub Blog`;
                document.querySelector('.post-title').innerText = post.title;
                document.querySelector('.post-date').innerHTML = `<i class="far fa-calendar"></i> ${post.date} • ${post.readTime} min read`;
                document.querySelector('.post-content').innerHTML = post.content;
                
                // Update SEO meta
                let metaDesc = document.querySelector('meta[name="description"]');
                if(metaDesc) metaDesc.setAttribute('content', post.excerpt);
            }
        } catch(e) {
            console.log('Post loading:', e);
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.blog-grid')) loadBlogPosts();
    if(window.location.pathname.includes('post.html')) loadBlogPost();
});