import { connectToDatabase } from '../../lib/mongodb';
import Page from '../../models/Page';

export default async function handler(req, res) {
    const { slug } = req.query;

    await connectToDatabase();
    const page = await Page.findOne({ slug }).lean();

    if (!page) {
        return res.status(404).send("Page not found");
    }

    const navLinks = [
        { name: 'What We Do', path: '/what-we-do' },
        { name: 'Industries', path: '/industries' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Who We Are', path: '/who-we-are' },
    ];

    // Build the HTML string manually
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preload" as="image" href="../../images/data.svg" />
  <link rel="stylesheet" href="/_next/static/css/d498c84e4ab246b3.css" data-precedence="next" />
  <link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/webpack-6606ec453dea4e98.js" />
  <script src="/_next/static/chunks/4bd1b696-16026021b14e14fc.js" async=""></script>
  <script src="/_next/static/chunks/684-62b8d356b5870c0c.js" async=""></script>
  <script src="/_next/static/chunks/main-app-2c66a4461dbce4ce.js" async=""></script>
  <script src="/_next/static/chunks/874-31e78f94752fcf65.js" async=""></script>
  <script src="/_next/static/chunks/75-db8a9dce7b775a11.js" async=""></script>
  <script src="/_next/static/chunks/app/layout-9594e42511b65a6d.js" async=""></script>
  <script src="/_next/static/chunks/app/core/%5Bslug%5D/page-deb6fd7f41799b7b.js" async=""></script>
  <link rel="preload" href="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=67b57737a75f5a8de08fea55" as="script" crossorigin="" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" />
  <link rel="preload" href="../../js/data.js" as="script" />
  <link rel="preload" href="../../js/webflow.js" as="script" />
  <link rel="preload" href="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" as="script" />
  <title>${page.title || 'Tecblic'}</title>
  <meta content="${page.metaTitle || 'Tecblic'}" property="og:title" />
  <meta content="${page.metaTitle || 'Tecblic'}" property="twitter:title" />
  <meta content="Webflow" name="generator" />
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous" />
  <link href="../../images/favicon.png" rel="shortcut icon" type="image/x-icon" />
  <link href="../../images/webclip.png" rel="apple-touch-icon" />
  <link rel="icon" href="images/favicon.ico" type="image/x-icon" sizes="16x16" />
  <script type="text/javascript">WebFont.load({ google: { families: ["Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic", "Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic", "Outfit:300,regular,500,600,700,800,900"] } });</script>
  <script type="text/javascript">!function (o, c) { var n = c.documentElement, t = " w-mod-"; n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch") }(window, document);</script>
  <link href="../../css/normalize.css" rel="stylesheet" type="text/css" />
  <link href="../../css/webflow.css" rel="stylesheet" type="text/css" />
  <link href="../../css/tecblic.webflow.css" rel="stylesheet" type="text/css" />
  <script>(self.__next_s = self.__next_s || []).push([0, { "children": "\n            (function(o,c){\n              var n=c.documentElement,t=\" w-mod-\";\n              n.className+=t+\"js\";\n              (\"ontouchstart\" in o || (o.DocumentTouch && c instanceof DocumentTouch)) && (n.className+=t+\"touch\");\n            })(window, document);\n          ", "id": "detect-touch-js" }])</script>
  <style>
    @media (min-width: 992px) {
      html.w-mod-js:not(.w-mod-ix) [data-w-id="eab26bf6-b013-f171-0afa-a7cf3990d2c4"] {
        display: none;
      }

      html.w-mod-js:not(.w-mod-ix) [data-w-id="eab26bf6-b013-f171-0afa-a7cf3990d2c5"] {
        transform: translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
        opacity: 0;
        width: 0%;
        height: 0%;
      }

      html.w-mod-js:not(.w-mod-ix) [data-w-id="eab26bf6-b013-f171-0afa-a7cf3990d2c0"] {
        color: rgb(14, 14, 14);
      }
    }
  </style>
  <script>(self.__next_s = self.__next_s || []).push(["https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=67b57737a75f5a8de08fea55", { "integrity": "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=", "crossOrigin": "anonymous" }])</script>
  <script src="/_next/static/chunks/polyfills-42372ed130431b0a.js" noModule=""></script>
</head>

<body class="__variable_4d318d __variable_ea5f4b antialiased">
  <div data-animation="over-left" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease"
  data-doc-height="1" role="banner" class="navbar w-nav">
  <div class="nav-container w-container">
    <div class="nav-menu-wrapper">
      <a href="/" aria-current="page" class="brand w-nav-brand w--current"><img src="images/TB-LOGO.svg"
          loading="lazy" alt="" height="36" class="logo"></a>
      <nav role="navigation" class="nav-menu w-nav-menu">
        <div class="tablet-menu">
          <a href="home-1.html" aria-current="page" class="brand-tablet w-nav-brand w--current"><img
              src="images/TB-LOGO.svg" loading="lazy" alt="" height="38" class="logo"></a>
          <div class="close-menu-button w-nav-button"><img src="images/close-btn.svg" loading="lazy" alt="icon"
              class="nav-close-icon"></div>
        </div>
        <div class="menu-wrap">
          ${navLinks.map(link => `
            <div data-hover="false" data-delay="0" class="nav-dropdown w-dropdown">
              <div class="nav-dropdown-toggle w-dropdown-toggle">
                <div class="nav-dropdown-icon w-icon-dropdown-toggle"></div>
                <div class="nav-item-title">${link.name}</div>
              </div>
            </div>
          `).join('')}
          <div class="nav-button-wrap">
            <a href="contact-us.html" class="primary-button hover-dark w-button">Contact Us</a>
          </div>
        </div>
      </nav>
      <a href="contact-us.html">
        <div class="search-shop-con">
          <p class="primary-button w-button">Contact Us</p>
        </div>
      </a>
      <div class="menu-button w-nav-button"><img src="images/menu-btn.svg" loading="lazy" alt="icon" height="16"
          class="image-burger white"></div>
    </div>
  </div>
</div>
  <div class="home-banner-section-two-copy">
    <img src="${page.bannerImage || '../../images/core-aiconsulting.webp'}" alt="Banner Background" class="banner-background">
    <div data-w-id="ccf014cb-9e35-d3f9-888f-3271d69adf4e" class="banner-two-column-wrapper">
      <div data-w-id="ccf014cb-9e35-d3f9-888f-3271d69adf4f" class="column-one-banner service-details">
        <div class="service-name-wrapper">
          <h1 class="banner-title service-details">${page.bannerTitle || 'AI Consulting'}</h1>
        </div>
        <p class="banner-description text-white">
          ${page.bannerDescription || 'Whether you\'re just starting with AI or looking to enhance existing AI capabilities, Tecblic is your trusted partner for AI consulting. Let us help you turn AI into a competitive advantage.'}
        </p>
      </div>
    </div>
  </div>

  <div class="section top-extra-bottom-round">
    <div class="base-container w-container">
      <div class="rich-text-style negative-spaces w-richtext">
        ${page.content || ''}
      </div>
    </div>
  </div>
  <div id="Testimonials" class="section dark-background-top-bottom-extra">
    <div class="base-container w-container">
      <div data-w-id="8f915bf7-1723-21f6-ed84-d759ea467ebf" style="opacity: 1;"
        class="section-two-side-title-wrapp info-style">
        <div class="column-one">
          <h2 class="section-title-with-space text-white">Other Services</h2>
        </div>
        <div class="column-two">
          <div class="button-wrapper-main solo-side-button-style"><a href="/services-1"
              class="primary-button w-button">Show more</a></div>
        </div>
      </div>
      <div class="works-collection w-dyn-list">
        <div role="list" class="collection-list-service _4-items w-dyn-items">
          ${page.cards ? page.cards.map((card, index) => `
            <div role="listitem" class="collection-item w-dyn-item">
              <div data-w-id="13695d38-b99e-1484-6372-136fe9a1e3b3"
                style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
                class="services-cards">
                <a href="${card.link || '#'}">
                  <div class="icon-service-home bottom-space"
                    style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
                    <img loading="lazy" src="${card.icon || 'https://cdn.prod.website-files.com/67b57737a75f5a8de08feb77/67b57737a75f5a8de08fec85_languages.svg'}" alt="">
                  </div>
                  <p class="heading-services-white-smaller">${card.title || ''}</p>
                  <p class="no-margin text-white">${card.description || ''}</p>
                </a>
              </div>
            </div>
          `).join('') : ''}
        </div>
      </div>
    </div>
  </div>
  <div class="footer round-top">
    <div class="base-container w-container">
      <div data-w-id="daf981fd-9b17-a0fb-7466-2c35634f2c75" class="footer-wrapper">
        <div class="footer-brand-wrapper">
          <div class="footer-logo-wrapper">
            <a href="/" aria-current="page" class="footer-brand w-nav-brand w--current"><img
                src="images/TB-LOGO-1.svg" loading="lazy" width="Auto" height="70" alt="" class="footer-logo"></a>
            <p class="paragraph-text">An innovation-driven company</p>
            <p class="footer-brand-description">We are passionate about creating your success storyby transforming the
              organization's digital identity.</p>
            <div class="footer-social-icons-wrapper">
              <a href="https://www.linkedin.com/company/tecblic" target="_blank" class="footer-social-icon"><img
                  src="images/linkdin.svg" alt=""></a>
              <a href="https://x.com/tecblic" target="_blank" class="footer-social-icon"><img src="images/twitter.svg"
                  alt=""></a>
              <a href="https://www.instagram.com/tecblic/" target="_blank" class="footer-social-icon"><img
                  src="images/instagram.svg" alt=""></a>
              <a href="https://wa.me/917777907777" target="_blank" class="footer-social-icon">
                <img src="images/watsup.svg" alt="WhatsApp">
              </a>
            </div>
          </div>
        </div>
        <div class="links-footer">
          <div class="footer-links-wrapper">
            <h4 class="heading-8">Menu</h4>
          </div>
          <div class="footer-links-wrapper">
            <a href="coreViewAll.html" aria-current="page" class="footer-link w--current">Core Expertise</a>
            <a href="index.html#sectionTechnology" class="footer-link">Technology</a>
            <a class="footer-link" href="about-us-2.html">About us</a>
            <a href="contact-us.html" class="footer-link">Contact us</a>
          </div>
        </div>
        <div class="div-block-8">
          <div class="div-block-7">
            <h4 class="heading-8">Registerd Office:</h4>
            <p class="footer-brand-description"><strong>India</strong><br>510/511, Shivalik Shilp II,<br>Opp.
              ITC Narmada<br>Judges Bunglow Road,<br>Ahmedabad, Gujarat - 380054.<br><br>Tel : +91-7777907777</p>
          </div>
        </div>
      </div>
      <div data-w-id="daf981fd-9b17-a0fb-7466-2c35634f2ca5" class="footer-bottom-wrapper">
        <div class="footer-copyright">© Copyright<a href="/">Tecblic</a>2025</div>
      </div>
    </div>
  </div>
  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=67b57737a75f5a8de08fea55" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="js/webflow.js" type="text/javascript"></script>
  <script src="/_next/static/chunks/webpack-6606ec453dea4e98.js" async=""></script>
  <script>(self.__next_f = self.__next_f || []).push([0])</script>
  <script>self.__next_f.push([1, "1:\"$Sreact.fragment\"\n2:I[4970,[],\"ClientSegmentRoot\"]\n3:I[4492,[\"874\",\"static/chunks/874-31e78f94752fcf65.js\",\"75\",\"static/chunks/75-db8a9dce7b775a11.js\",\"177\",\"static/chunks/app/layout-9594e42511b65a6d.js\"],\"default\"]\n4:I[7555,[],\"\"]\n5:I[1295,[],\"\"]\n8:I[9665,[],\"OutletBoundary\"]\nb:I[9665,[],\"ViewportBoundary\"]\nd:I[9665,[],\"MetadataBoundary\"]\nf:I[6614,[],\"\"]\n:HL[\"/_next/static/css/d498c84e4ab246b3.css\",\"style\"]\n"])</script>
</body>
</html>
    `;

    res.setHeader('Content-disposition', `attachment; filename="${slug}.html"`);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
}
