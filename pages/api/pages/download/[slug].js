import { connectToDatabase } from "../../../../lib/mongodb";
import Page from "../../../../models/Page";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { slug } = req.query;

    try {
        await connectToDatabase();
        const page = await Page.findOne({ slug });

        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        // Create HTML content
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.pageTitle}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        /* Navbar Styles */
        .navbar {
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 1rem 0;
        }
        .navbar-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo a {
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
        }
        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        .nav-links a {
            text-decoration: none;
            color: #333;
        }
        .contact-btn {
            background-color: #007bff;
            color: white !important;
            padding: 0.5rem 1rem;
            border-radius: 4px;
        }
        .menu-icon {
            display: none;
        }

        /* Main Content Styles */
        .hero-section {
            background-image: url('${page.bannerImage}');
            background-size: cover;
            background-position: center;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
        }
        .hero-overlay {
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
        }
        .content-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 0 20px;
        }
        .card-container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 20px;
        }
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .card {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }

        /* Footer Styles */
        .footer {
            background-color: #333;
            color: white;
            padding: 3rem 0 1rem;
        }
        .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        .footer-section {
            padding: 1rem;
        }
        .footer-section h4 {
            margin-bottom: 1rem;
        }
        .footer-section ul {
            list-style: none;
            padding: 0;
        }
        .footer-section ul li {
            margin-bottom: 0.5rem;
        }
        .footer-section a {
            color: white;
            text-decoration: none;
        }
        .social-icons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        .social-icons a {
            color: white;
            font-size: 1.2rem;
        }
        .copyright {
            text-align: center;
            padding-top: 2rem;
            margin-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        .copyright a {
            color: white;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="logo">
                <a href="/">🌀 Tecblic</a>
            </div>
            <div class="nav-links">
                <a href="/what-we-do">What We Do</a>
                <a href="/industries">Industries</a>
                <a href="/case-studies">Case Studies</a>
                <a href="/who-we-are">Who We Are</a>
                <a href="/contact" class="contact-btn">Contact Us</a>
            </div>
        </div>
    </nav>

    <section class="hero-section">
        <div class="hero-overlay">
            <h1>${page.pageTitle}</h1>
            <p>${page.bannerDescription}</p>
        </div>
    </section>
    
    <div class="content-container">
        ${page.content}
    </div>

    <div class="card-container">
        <div class="card-grid">
            ${page.cards.map(card => `
                <div class="card">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                    ${card.link ? `<a href="${card.link}">Learn More</a>` : ''}
                </div>
            `).join('')}
        </div>
    </div>

    <footer class="footer">
        <div class="footer-container">
            <div class="footer-section about">
                <div class="logo">
                    <img src="/logo.png" alt="Tecblic Logo" />
                    <span><strong>Tecblic</strong></span>
                </div>
                <h4>An innovation-driven company</h4>
                <p>
                    We are passionate about creating your success story by transforming the organization's digital identity.
                </p>
                <div class="social-icons">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-x-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-dribbble"></i></a>
                </div>
            </div>

            <div class="footer-section">
                <h4>Menu</h4>
                <ul>
                    <li><a href="#">SERVICES</a></li>
                    <li><a href="#">TECHNOLOGY</a></li>
                    <li><a href="#">ABOUT US</a></li>
                    <li><a href="#">BLOG</a></li>
                    <li><a href="#">CONTACT US</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h4>Registerd Office:</h4>
                <p><strong>India</strong></p>
                <p>510/511, Shivalik Shilp II,<br />
                    Opp. ITC Narmada<br />
                    Judges Bungalow Road,<br />
                    Ahmedabad, Gujarat - 380054.
                </p>
                <p>Tel : +91-7777907777</p>
            </div>
        </div>
        <hr />
        <p class="copyright">
            © Copyright <a href="#">Tecblic</a> 2025
        </p>
    </footer>
</body>
</html>
        `;

        // Set headers for file download
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', `attachment; filename=${slug}.html`);
        
        // Send the HTML content
        res.send(htmlContent);
    } catch (error) {
        console.error('Error downloading page:', error);
        res.status(500).json({ message: 'Error downloading page' });
    }
} 