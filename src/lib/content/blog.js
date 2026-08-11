export const blogPosts = {
  "divi-text-marquee-design": {
    title: "How to create an eye catching marquee with Divi theme",
    description:
      "Create a smooth scrolling text marquee using HTML and CSS in Divi or WordPress.",
    date: "2026-04-21",
    slug: "divi-text-marquee-design",
    youtube: "https://www.youtube.com/watch?v=hsyDw-akLkc",
    content: `
      <h1>How to create an eye catching marquee with Divi theme</h1>

      <p>The <strong>text marquee design</strong> effect is one of the easiest ways to make your website feel dynamic and engaging. In this tutorial, I’ll show you how to create a smooth, continuous scrolling text banner using simple HTML and CSS with no JavaScript required.</p>

      <p>This is perfect for displaying promotions, announcements, or updates across your Divi or WordPress website. You can also use it to highlight product categories, featured items, or upcoming events.</p>

      <h2>What the Code Does</h2>

      <p>The HTML structure contains a main container called <code>.marquee</code> and an inner <code>.track</code> that moves horizontally across the screen. Inside the track, you can add your custom text or phrases. The CSS then uses a keyframe animation called <code>marquee</code> to smoothly move the content from right to left.</p>

      <p>This <strong>text marquee design</strong> automatically loops, creating a continuous scroll. When users hover over the text, the animation pauses, allowing them to read it easily before it continues.</p>

      <h2>How to Add It</h2>

      <ol>
        <li><strong>Copy the HTML</strong> and place it anywhere inside your Divi Text Module, Code Module, or page section.</li>
        <li><strong>Add the CSS</strong> either in your <strong>Divi Theme Options &gt; Custom CSS</strong>, or in your <strong>child theme stylesheet</strong>.</li>
        <li>Adjust the height and animation speed in the CSS to match your design.</li>
      </ol>

      <p>You can replace the sample text inside the <code>&lt;span&gt;</code> element with your own content. The sample includes:
      <br><br>
      → Our New Arrivals → Best Sellers → Visit Our Shop → Contact Us → Subscribe to Our Newsletter
      </p>

      <h2>Why Use This Text Marquee Design</h2>

      <p>The <strong>text marquee design</strong> adds movement and visual interest without heavy scripts or plugins. It’s lightweight, responsive, and easy to style. Whether you use Divi or any other theme, it works across modern browsers and looks great on both desktop and mobile.</p>

      <p>You can also duplicate the <code>&lt;span&gt;</code> content to make the loop appear seamless and continuous. It’s a quick, professional touch for modern web designs that keeps visitors engaged.</p>

      <h2>Bonus Styling Ideas</h2>

      <ul>
        <li>Change the text color or background to match your brand palette</li>
        <li>Use bold or uppercase styles for promotional messages</li>
        <li>Combine it with icons or emojis for extra flair</li>
        <li>Adjust animation timing for slower or faster scrolling</li>
      </ul>

      <p>If you want to dive deeper into advanced animations, check out the CSS Animations Guide on MDN Web Docs or explore more Divi design tips on the Elegant Themes Blog.</p>

      <h2>Video Tutorial</h2>

      <p><a href="https://www.youtube.com/watch?v=hsyDw-akLkc" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>

      <h2>Full Code</h2>

      <pre><code>&lt;style&gt;
.marquee {
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.track {
  display: flex;
  white-space: nowrap;
  animation: marquee 20s linear infinite;
}

.track &gt; span {
  flex-shrink: 0;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee:hover .track {
  animation-play-state: paused;
}
&lt;/style&gt;

&lt;div class="marquee"&gt;
  &lt;div class="track"&gt;
    &lt;span&gt;
      → Our New Arrivals → Best Sellers → Visit Our Shop → Contact Us → Subscribe to Our Newsletter →
      Our New Arrivals → Best Sellers → Visit Our Shop → Contact Us → Subscribe to Our Newsletter
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
    `,
  },

  "divi-author-box-shortcode": {
    title: "How to add editor photo to Divi blog page (codes)",
    description:
      "Add an author photo and name to Divi blog posts using a shortcode with simple PHP and CSS.",
    date: "2026-04-21",
    slug: "divi-author-box-shortcode",
    youtube: "https://www.youtube.com/watch?v=_fAdLNmkWN4&t=40s",
    content: `
      <h1>How to add editor photo to Divi blog page (codes)</h1>

      <p>The <strong>Divi author box shortcode</strong> is an easy way to display your editor’s photo and name on blog posts. In my <strong><a href="https://www.youtube.com/watch?v=_fAdLNmkWN4&t=40s" target="_blank" rel="noopener noreferrer">YouTube tutorial</a></strong>, I explain how to set it up using simple PHP and CSS. You don’t need any extra plugins to make it work.</p>

      <p>With the <strong>Divi author box shortcode</strong>, you can add a personal touch to every post. It helps readers connect with the person behind the content and makes your site look more professional.</p>

      <p>To start, paste the PHP code into your <strong>Code Snippets plugin</strong> or your theme’s <code>functions.php</code> file. Then, add the optional CSS to style the author section. After that, insert the shortcode <code>[author_box]</code> into your <strong>Divi Theme Builder</strong> layout.</p>

      <p>Your author box will now appear automatically under each post. It shows the author’s profile image and name in a clean and modern layout. The CSS adds a soft top border, a round photo, and a neat alignment that fits perfectly with Divi’s design.</p>

      <p>Using this <strong>Divi author box shortcode</strong> is a small change with a big impact. It improves your blog’s design, adds credibility, and gives your readers a reason to trust your content.</p>

      <p>If you’re new to Divi, explore its features on the <strong><a href="https://www.elegantthemes.com/" target="_blank" rel="noopener noreferrer">Elegant Themes website</a></strong>. For a full video guide, watch my <strong><a href="https://www.youtube.com/watch?v=_fAdLNmkWN4&t=40s" target="_blank" rel="noopener noreferrer">YouTube tutorial</a></strong> where I walk through each step of adding and styling the shortcode.</p>

      <p>Try it today and make your Divi blog posts more personal, engaging, and professional.</p>

      <h2>PHP Code</h2>

      <pre><code>function custom_author_box() {
    ob_start();
    ?&gt;
    &lt;div class="custom-author-box"&gt;
        &lt;div class="author-avatar"&gt;
            &lt;?php echo get_avatar(get_the_author_meta('ID'), 96); ?&gt;
        &lt;/div&gt;
        &lt;div class="author-name"&gt;
            &lt;p&gt;Written by &lt;strong&gt;&lt;?php the_author(); ?&gt;&lt;/strong&gt;&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;?php
    return ob_get_clean();
}
add_shortcode('author_box', 'custom_author_box');</code></pre>

      <h2>CSS Code (optional)</h2>

      <pre><code>.custom-author-box {
  display: flex;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #fb3365;
}
.custom-author-box .author-avatar {
  margin-right: 15px;
}
.custom-author-box img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
}
.custom-author-box .author-name {
  font-size: 16px;
}</code></pre>
    `,
  },

  "hamburger-menu-desktop-mobile": {
    title: "Hamburger menu desktop/mobile",
    description:
      "Build one slick Divi hamburger menu for desktop and mobile using a shortcode, Bootstrap 5, JavaScript, and lightweight CSS.",
    date: "2026-04-21",
    slug: "hamburger-menu-desktop-mobile",
    youtube: "",
    content: `
      <h1>Hamburger menu desktop/mobile</h1>

      <h2>Download JSON zipped Theme header</h2>
      <p><a href="https://zorawebdesign.com/wp-content/uploads/2025/04/Hamburger-desktop-menu.zip" target="_blank" rel="noopener noreferrer">DOWNLOAD HERE</a></p>

      <p><strong>Hamburger menu desktop mobile</strong> is the goal of this guide. You want one menu. It should look slick on desktop. It should feel smooth on mobile. This tutorial shows how to do that in Divi with a shortcode, Bootstrap 5, and lightweight CSS.</p>

      <p>In my video, I walk through the full setup. The code is below that video on the article. You’ll paste it where noted. Then you’ll style it in Divi. No extra heavy plugins are needed.</p>

      <h2>What You’ll Build</h2>

      <p>You’ll add a toggle button that opens a right-side offcanvas panel. The panel holds your main WordPress menu. On desktop, submenus open on click. On mobile, submenus use simple +/– toggles. It’s fast, clean, and easy to edit.</p>

      <p>This is the <strong>hamburger menu desktop mobile</strong> pattern done right. One layout. Two behaviors tailored to screen size.</p>

      <h2>How It Works (High Level)</h2>

      <ol>
        <li><strong>Shortcode for the menu.</strong><br>The PHP snippet registers <code>[hamburger]</code>. It outputs your “hamburger” menu from WordPress Menus. You can rename the menu if yours has a different title.</li>
        <li><strong>Bootstrap offcanvas layout.</strong><br>The HTML adds the toggle button and the offcanvas panel. You drop this in your Divi Theme Builder header. The shortcode sits inside the panel and prints your menu items.</li>
        <li><strong>Desktop and mobile logic.</strong><br>The JS uses Bootstrap 5 for the offcanvas. It also adds click-to-open submenus on desktop widths. On mobile, the script enhances the default Divi mobile menu with +/– toggles.</li>
        <li><strong>Polished CSS.</strong><br>The CSS styles the panel, links, nested lists, and social icons. It also handles spacing, hover states, and scroll behavior. The result is professional and consistent.</li>
      </ol>

      <h2>Where to Paste Each Piece</h2>

      <ul>
        <li><strong>PHP</strong> → Use the <em>Code Snippets</em> plugin. Activate the snippet site-wide.</li>
        <li><strong>Bootstrap link + script + JS</strong> → Add in Divi <strong>Integration &gt; Head</strong>.</li>
        <li><strong>Offcanvas HTML</strong> → Add to your <strong>Divi Theme Builder header</strong> using a Code or Text module. Place <code>[hamburger]</code> inside the offcanvas body.</li>
        <li><strong>CSS</strong> → Add in <strong>Divi Theme Options &gt; Custom CSS</strong> or your child theme.</li>
      </ul>

      <h2>Setup Tips</h2>

      <ul>
        <li>In <strong>Appearance &gt; Menus</strong>, create a menu named <strong>hamburger</strong>. Or update the snippet to match your menu name.</li>
        <li>Keep labels short. It avoids wrapping in narrow panels.</li>
        <li>Test nested levels. The CSS already indents deeper submenus.</li>
        <li>Add your social icons right inside the offcanvas. Links are included in the code.</li>
      </ul>

      <h2>Why This Pattern</h2>

      <p>The <strong>hamburger menu desktop mobile</strong> approach gives you one code path. It avoids maintaining separate headers. Bootstrap handles the offcanvas mechanics. Your shortcode keeps the menu dynamic. Divi’s Theme Builder makes placement simple.</p>

      <h2>Troubleshooting</h2>

      <ul>
        <li><strong>Offcanvas won’t open?</strong> Make sure the Bootstrap CSS and bundle JS are loaded once.</li>
        <li><strong>Submenus not toggling on desktop?</strong> Confirm the custom JS is in place and widths are above 980px.</li>
        <li><strong>Mobile menu overlapping content?</strong> Keep the provided CSS for fixed positioning and scroll.</li>
        <li><strong>Icons not showing?</strong> Ensure Font Awesome is loaded, or switch to Divi icons.</li>
      </ul>

      <h2>Helpful Resources (Outbound)</h2>

      <ul>
        <li>Divi Theme by Elegant Themes: <a href="https://www.elegantthemes.com/gallery/divi/" target="_blank" rel="noopener noreferrer">https://www.elegantthemes.com/gallery/divi/</a></li>
        <li>Bootstrap 5 Offcanvas Docs: <a href="https://getbootstrap.com/docs/5.3/components/offcanvas/" target="_blank" rel="noopener noreferrer">https://getbootstrap.com/docs/5.3/components/offcanvas/</a></li>
        <li>WordPress Menus Guide: <a href="https://wordpress.org/support/article/appearance-menus-screen/" target="_blank" rel="noopener noreferrer">https://wordpress.org/support/article/appearance-menus-screen/</a></li>
        <li>Font Awesome Icons: <a href="https://fontawesome.com" target="_blank" rel="noopener noreferrer">https://fontawesome.com</a></li>
        <li>Code Snippets Plugin: <a href="https://wordpress.org/plugins/code-snippets/" target="_blank" rel="noopener noreferrer">https://wordpress.org/plugins/code-snippets/</a></li>
      </ul>

      <h2>PHP Code (Place in new code on Code Snippets plugin)</h2>

      <pre><code>function main_menu_shortcode() {
  ob_start();
  wp_nav_menu([
    'menu' =&gt; 'hamburger',
    'container' =&gt; false,
    'menu_class' =&gt; 'nav flex-column',
    'fallback_cb' =&gt; false,
    'items_wrap' =&gt; '&lt;ul class="%2$s"&gt;%3$s&lt;/ul&gt;',
  ]);
  return ob_get_clean();
}
add_shortcode('hamburger', 'main_menu_shortcode');</code></pre>

      <h2>Bootstrap HTML code (place on menu in Theme Builder)</h2>

      <pre><code>&lt;!-- Menu Toggle Button --&gt;
&lt;button class="menu-toggle-btn ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"&gt;
  &lt;svg class="menu-icon" viewBox="0 0 100 100" width="50" height="50"&gt;
    &lt;rect y="20" width="100" height="7" rx="3"&gt;&lt;/rect&gt;
    &lt;rect y="45" width="100" height="7" rx="3"&gt;&lt;/rect&gt;
    &lt;rect y="70" width="100" height="7" rx="3"&gt;&lt;/rect&gt;
  &lt;/svg&gt;
&lt;/button&gt;

&lt;div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"&gt;
  &lt;div class="offcanvas-header"&gt;
    &lt;h5 class="offcanvas-title" id="offcanvasNavbarLabel"&gt;&lt;/h5&gt;
    &lt;button class="custom-close-btn" type="button" data-bs-dismiss="offcanvas" aria-label="Close"&gt;
      &lt;i class="fas fa-times"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;

  &lt;div class="offcanvas-body"&gt;
    &lt;div class="offcanvas-inner"&gt;

      [hamburger]

    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

      <h2>JS Code (Place on Integration - Head)</h2>

      <pre><code>&lt;!-- Bootstrap 5 CSS --&gt;
&lt;link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/&gt;

&lt;!-- Bootstrap 5 Bundle JS --&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"&gt;&lt;/script&gt;

&lt;script&gt;
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("#offcanvasNavbar .offcanvas-body");

  if (nav &amp;&amp; window.innerWidth &gt; 980) {
    const dropdowns = nav.querySelectorAll(".menu-item-has-children");

    dropdowns.forEach(item =&gt; {
      const trigger = item.querySelector("a");

      if (trigger) {
        trigger.addEventListener("click", function (e) {
          e.preventDefault();

          const submenu = item.querySelector(".sub-menu");

          dropdowns.forEach(other =&gt; {
            if (
              other !== item &amp;&amp;
              !item.contains(other) &amp;&amp;
              !other.contains(item)
            ) {
              other.classList.remove("open");
              const otherSub = other.querySelector(".sub-menu");
              if (otherSub) otherSub.style.display = "none";
            }
          });

          item.classList.toggle("open");
          if (submenu) {
            submenu.style.display = item.classList.contains("open")
              ? "block"
              : "none";
          }
        });
      }
    });
  }

  function initMobileMenuToggles() {
    const menu = document.querySelector("ul.et_mobile_menu");
    if (!menu) return;

    const dropdownItems = menu.querySelectorAll(
      "li.menu-item-has-children, li.page_item_has_children"
    );

    dropdownItems.forEach(item =&gt; {
      if (!item.querySelector(".mobile-toggle")) {
        const toggle = document.createElement("a");
        toggle.href = "#";
        toggle.className = "mobile-toggle";
        toggle.textContent = "+";
        item.appendChild(toggle);

        toggle.addEventListener("click", function (e) {
          e.preventDefault();
          item.classList.toggle("dt-open");

          const submenu = item.querySelector("ul.children, ul.sub-menu");
          if (submenu) submenu.classList.toggle("visible");

          toggle.textContent = item.classList.contains("dt-open") ? "-" : "+";
        });
      }
    });
  }

  const hamburger = document.querySelector(".mobile_menu_bar");
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      document.body.classList.toggle("menu-opened");

      if (document.body.classList.contains("menu-opened")) {
        setTimeout(initMobileMenuToggles, 100);
      }
    });
  }
});
&lt;/script&gt;</code></pre>

      <h2>Menu social code</h2>

      <pre><code>&lt;a href="https://facebook.com/yourpage" target="_blank"&gt;&lt;i class="fab fa-facebook-f"&gt;&lt;/i&gt;&lt;/a&gt;
&lt;a href="https://instagram.com/yourusername" target="_blank"&gt;&lt;i class="fab fa-instagram"&gt;&lt;/i&gt;&lt;/a&gt;
&lt;a href="https://youtube.com/yourchannel" target="_blank"&gt;&lt;i class="fab fa-twitter"&gt;&lt;/i&gt;&lt;/a&gt;</code></pre>

      <h2>CSS Code</h2>

      <pre><code>/* ===================================================================
   TABLE OF CONTENTS
   -------------------------------------------------------------------
   1. General Offcanvas Menu Styling
      1.1. Offcanvas Container &amp; Layout
      1.2. Offcanvas Header
      1.3. Offcanvas Body &amp; Inner Content
      1.4. Offcanvas Width Settings
   2. Menu Toggle Button (Hamburger Icon)
   3. General Menu Link Styling
      3.1. Main Menu Links
      3.2. Submenu Links
      3.3. Hover States
      3.4. List Reset
   4. Dropdown Menus (Hover &amp; Click-Based Behavior)
      4.1. Parent Item Styling
      4.2. Arrow Symbols
      4.3. Submenu Container Styling
      4.4. Submenu Indentation
      4.5. Submenu Visibility (JS Controlled)
   5. Social Icons
      5.1. Offcanvas Social Icons
      5.2. Mobile Menu Social Icons
   6. Mobile Menu Styling (Divi Specific)
      6.1. Mobile Menu Container
      6.2. Mobile Menu Links
      6.3. Mobile Menu Toggle Icon (+/-)
      6.4. Mobile Submenu Visibility
      6.5. Mobile Submenu Link Styling
   7. Divi Specific Fixes
=================================================================== */

:root {
  grayish-black: #333333;
}

#offcanvasNavbar.offcanvas-end {
  width: 650px;
  max-width: 90%;
}

#offcanvasNavbar .offcanvas-header {
  padding-top: 50px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#offcanvasNavbar .offcanvas-title,
#offcanvasNavbarLabel {
  color: black;
  font-size: 40px;
  text-align: left;
}

#offcanvasNavbar .custom-close-btn {
  font-size: 40px;
  font-weight: thin;
  color: black;
  background: none;
  border: none;
}

#offcanvasNavbar .custom-close-btn:hover {
  color: var(--grayish-black);
}

#offcanvasNavbar .offcanvas-body {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#offcanvasNavbar .offcanvas-inner {
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-left: 25px;
  padding-right: 25px;
}

#offcanvasNavbar .offcanvas-inner::-webkit-scrollbar {
  width: 0px;
  background: transparent;
  display: none;
}

@media (max-width: 767px) {
  #offcanvasNavbar.offcanvas-end {
    width: 100vw;
    max-width: 100vw;
  }
}

.menu-toggle-btn {
  background: none;
  border: none;
  padding: 0;
}

.menu-toggle-btn svg rect {
  fill: black;
  transition: fill 0.3s;
}

.menu-toggle-btn:hover svg rect {
  fill: var(--grayish-black);
}

#offcanvasNavbar .offcanvas-body .menu-item a {
  font-size: 24px;
  font-weight: 700;
  color: black;
  padding: 10px 0;
  margin-bottom: 4px;
  display: block;
  text-decoration: none !important;
  text-align: left;
  transition: color 0.3s;
  width: 100%;
  background: transparent !important;
}

#offcanvasNavbar .offcanvas-body .menu-item &gt; a {
  color: black;
}

#offcanvasNavbar .offcanvas-body .sub-menu a {
  padding: 0.5px;
  margin: 1.5px;
  line-height: 1.3;
  font-weight: 600;
  font-size: 22px;
  color: black;
}

#offcanvasNavbar .offcanvas-body .sub-menu .sub-menu a {
  color: black;
  font-size: 20px;
}

#offcanvasNavbar .offcanvas-body .sub-menu .sub-menu .sub-menu a {
  color: black;
  font-size: 20px;
}

#offcanvasNavbar .offcanvas-body .sub-menu .sub-menu .sub-menu .sub-menu a {
  color: black;
}

#offcanvasNavbar .offcanvas-body .menu-item &gt; a:hover {
  color: var(--grayish-black);
}

#offcanvasNavbar .offcanvas-body .sub-menu a:hover {
  color: var(--grayish-black);
}

#offcanvasNavbar .offcanvas-body .sub-menu .sub-menu a:hover {
  color: var(--grayish-black);
}

#offcanvasNavbar .offcanvas-body .sub-menu .sub-menu .sub-menu a:hover {
  color: var(--grayish-black);
}

#offcanvasNavbar .offcanvas-body .sub-menu .sub-menu .sub-menu .sub-menu a:hover {
  color: var(--grayish-black);
}

#offcanvasNavbar .offcanvas-body ul,
#offcanvasNavbar .offcanvas-body li {
  list-style: none;
  margin: 0;
  padding: 0;
}

#offcanvasNavbar .offcanvas-body .menu-item-has-children {
  position: relative;
}

#offcanvasNavbar .offcanvas-body .menu-item-has-children &gt; a {
  position: relative;
  padding-right: 30px;
}

#offcanvasNavbar .offcanvas-body .menu-item-has-children &gt; a::after {
  content: "⌵";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: black;
  transition: transform 0.3s ease;
}

#offcanvasNavbar .offcanvas-body .menu-item-has-children.open &gt; a::after {
  transform: translateY(-50%) rotate(90deg);
}

#offcanvasNavbar .offcanvas-body .sub-menu .menu-item-has-children &gt; a::after {
  content: "+";
  font-size: 30px;
  color: black;
  transform: translateY(-50%);
}

#offcanvasNavbar .offcanvas-body .sub-menu .menu-item-has-children.open &gt; a::after {
  content: "–";
  font-size: 30px;
}

#offcanvasNavbar .offcanvas-body ul.sub-menu {
  display: none;
  opacity: 0;
  visibility: hidden;
  position: absolute !important;
  top: 100%;
  left: 0;
  z-index: 999;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
  background: white;
  box-shadow: none !important;
  transition: opacity 0.3s ease;
}

#offcanvasNavbar .offcanvas-body ul.sub-menu ul.sub-menu {
  padding-left: 0 !important;
  margin-left: 0 !important;
  width: 100% !important;
  position: static !important;
  background: white;
  box-shadow: none !important;
}

#offcanvasNavbar .offcanvas-body .menu-item-has-children &gt; .sub-menu {
  margin-left: 5px !important;
  padding-left: 5px !important;
  width: calc(100% - 5px) !important;
}

#offcanvasNavbar .offcanvas-body ul.sub-menu &gt; .menu-item-has-children &gt; .sub-menu {
  margin-left: 20px !important;
  padding-left: 10px !important;
  width: calc(100% - 20px) !important;
}

#offcanvasNavbar .offcanvas-body ul.sub-menu ul.sub-menu &gt; .menu-item-has-children &gt; .sub-menu {
  margin-left: 30px !important;
  padding-left: 10px !important;
  width: calc(100% - 30px) !important;
}

#offcanvasNavbar .offcanvas-body ul.sub-menu ul.sub-menu ul.sub-menu &gt; .menu-item-has-children &gt; .sub-menu {
  margin-left: 40px !important;
  padding-left: 10px !important;
  width: calc(100% - 40px) !important;
}

#offcanvasNavbar .offcanvas-body .menu-item-has-children &gt; .sub-menu {
  display: none;
  opacity: 1 !important;
  visibility: visible !important;
  position: static !important;
  margin-top: 10px;
}

#offcanvasNavbar .offcanvas-body .menu-item-has-children.open &gt; .sub-menu {
  display: block;
  position: static !important;
}

#offcanvasNavbar .offcanvas-social {
  text-align: left;
  margin-top: 15px !important;
  margin-bottom: 20px;
}

#offcanvasNavbar .offcanvas-social a {
  color: black;
  font-size: 24px;
  margin-right: 12px;
  transition: color 0.3s ease;
}

#offcanvasNavbar .offcanvas-social a:hover {
  color: var(--grayish-black);
}

@media only screen and (max-width: 980px) {
  .et_mobile_menu .menu-item.social-icons {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .et_mobile_menu .menu-item.social-icons a {
    display: inline-flex;
    align-items: center;
    font-size: 20px;
    color: white !important;
  }
}

.et_mobile_menu .menu-item.socials {
  display: flex;
  justify-content: flex-start;
  align-items: left;
  gap: 10px;
  padding: 10px 15px 25px 25px;
  width: 100%;
  margin: 20px;
  margin-left: -63px;
  box-sizing: border-box;
}

.et_mobile_menu .menu-item.socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  font-size: 30px;
  color: black !important;
  text-decoration: none !important;
  transition: background 0.3s ease;
  margin: 0;
  padding: 0;
}

.et_mobile_menu {
  width: 100% !important;
  max-width: 100vw !important;
  left: 0 !important;
  right: 0 !important;
  position: fixed !important;
  top: 90px !important;
  z-index: 9999;
  background-color: black;
  padding-top: 20px;
  box-sizing: border-box;
  display: none;
  overflow-y: auto;
  max-height: calc(100vh - 80px);
}

body.menu-opened {
  overflow-x: hidden;
}

.menu-opened .et_mobile_menu {
  display: block;
}

.et_mobile_menu ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
}

.et_pb_menu_0.et_pb_menu .et_mobile_menu,
.et_pb_menu_0.et_pb_menu .et_mobile_menu ul {
  background-color: white !important;
  border-radius: 10px;
}

.et_mobile_menu a {
  text-decoration: none !important;
}

.et_mobile_menu a,
.et_mobile_menu .menu-item-has-children &gt; a {
  background-color: white !important;
  color: black !important;
}

ul.et_mobile_menu &gt; li.menu-item-has-children,
ul.et_mobile_menu &gt; li.page_item_has_children {
  position: relative;
}

ul.et_mobile_menu li.menu-item-has-children &gt; a::after,
ul.et_mobile_menu li.page_item_has_children &gt; a::after {
  content: none !important;
}

.mobile_menu_bar {
  font-size: 40px;
  color: black;
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 2px;
  z-index: 10001;
}

.mobile_menu_bar::before {
  content: '\\61';
  font-family: 'ETModules';
  transition: content 0.3s ease;
}

.menu-opened .mobile_menu_bar::before {
  content: '\\4d';
  color: black !important;
}

ul.et_mobile_menu li.menu-item-has-children .mobile-toggle,
ul.et_mobile_menu li.page_item_has_children .mobile-toggle {
  width: 44px;
  height: 100%;
  padding: 0 !important;
  max-height: 44px;
  border: none;
  position: absolute;
  right: 0;
  top: 16px;
  z-index: 999;
  background-color: transparent;
  font-family: Arial, sans-serif;
  font-size: 30px;
  color: black !important;
  display: inline-block;
  text-align: center;
  opacity: 1;
}

ul.et_mobile_menu .menu-item-has-children .sub-menu {
  display: none !important;
  visibility: hidden !important;
}

ul.et_mobile_menu .menu-item-has-children .sub-menu.visible {
  display: block !important;
  visibility: visible !important;
}

ul.et_mobile_menu .sub-menu .sub-menu {
  display: none !important;
  visibility: hidden !important;
}

ul.et_mobile_menu .sub-menu.visible .sub-menu {
  display: block !important;
  visibility: visible !important;
}

ul.et_mobile_menu .sub-menu a {
  background-color: white !important;
  color: black !important;
  padding-left: 4px;
  font-weight: normal;
}

ul.et_mobile_menu .sub-menu .sub-menu a {
  padding-left: 10px;
}

ul.et_mobile_menu .sub-menu .sub-menu .sub-menu a {
  padding-left: 20px;
}

.et_pb_button,
.et_pb_promo_button,
.et_pb_more_button,
button.et_pb_button,
a.et_pb_button {
  text-decoration: none !important;
}

#offcanvasNavbar .offcanvas-body ul.sub-menu {
  border: none !important;
  border-radius: 0;
  box-shadow: none !important;
}

.et_pb_text sup {
  font-size: 75%;
}</code></pre>
    `,
  },
 "create-stunning-divi-button-hover-animations": {
  title: "Create Stunning Divi Button Hover Animations",
  description:
    "Style Divi buttons with lightweight CSS hover effects like wave, pulse, diagonal expand, neon glow, and more.",
  date: "2026-04-21",
  slug: "create-stunning-divi-button-hover-animations",
  youtube: "https://www.youtube.com/watch?v=TRKVmVQreUA&t=9s",
  content: `
    <h1>How to Style Your Divi Theme Buttons with Hover Animations</h1>

    <p><a href="https://zorawebdesign.com/wp-content/uploads/2024/11/Divi-button-animations-3-2-1.json" target="_blank" rel="noopener noreferrer">Download Divi Button Animations JSON</a></p>

    <p><a href="https://www.youtube.com/watch?v=TRKVmVQreUA&t=9s" target="_blank" rel="noopener noreferrer">Watch the video tutorial on YouTube</a></p>

    <p><strong>Divi button hover animations</strong> are an easy win for engagement. With a few CSS classes, your calls-to-action feel lively, modern, and deliberate. Moreover, you keep full control in the Button Module editor.</p>

    <p>In this tutorial, you’ll apply ready-made effects to any Divi button. First, import or copy the CSS. Then, assign a class name like <code>wave-button</code>, <code>pulse</code>, or <code>expand-diagonal</code> to the button. Finally, preview the result and refine colors, timing, and sizing to match your brand.</p>

    <h2>Part 1: Style One Button First</h2>

    <p>To start, use the <strong>Wave Button</strong> as your base. This effect slides a color wave across the button on hover. As a result, your primary CTA stands out without distracting from the layout. Additionally, you can change the wave color and speed for a perfect fit.</p>

    <h2>Part 2: Add the CSS in Divi</h2>

    <p>Next, open <strong>Page Settings → Advanced → Custom CSS</strong>. Paste the CSS for the effect you want. After saving, test the button on the front end. If needed, adjust timing, for example <code>0.6s</code>, for a snappier feel. Likewise, verify contrast so text remains readable.</p>

    <h2>Part 3: Assign a Class to the Button</h2>

    <p>Then open your <strong>Button Module → Advanced → CSS Class</strong>. Enter the class that matches the effect, for example <code>wave-button</code>, <code>pulse</code>, or <code>expand-vertical</code>. Save and exit. Subsequently, hover the button to confirm the animation triggers cleanly.</p>

    <h2>Additional Effects You Can Use</h2>

    <p>Beyond the basic wave, try these <strong>Divi button hover animations</strong> to diversify your CTAs:</p>

    <ul>
      <li><strong>Wave with Icon (<code>wave-button1</code>)</strong> — A subtle slide that pairs well with iconography.</li>
      <li><strong>Wave Right-to-Left (<code>wave-button-rtl</code>)</strong> — Motion originates from the right for visual variety.</li>
      <li><strong>Pulse (<code>pulse</code>, <code>pulse-contract</code>)</strong> — Gentle scale up or down to signal interactivity.</li>
      <li><strong>Diagonal Expand (<code>expand-diagonal</code>, <code>expand-diagonal-top-left</code>)</strong> — Color grows across the button at an angle.</li>
      <li><strong>Vertical Expand (<code>expand-vertical</code>)</strong> — A smooth sweep from top to bottom.</li>
      <li><strong>Box Shadow Variants (<code>box-shadow</code>, <code>box-shadow-left-bottom</code>)</strong> — Offset glow that reinforces depth.</li>
      <li><strong>Neon Glow (<code>neon-glow</code>)</strong> — A bold highlight for high-impact CTAs.</li>
      <li><strong>Horizontal Expand (<code>expand-horizontal</code>)</strong> — Fills from center to edges for a crisp reveal.</li>
    </ul>

    <p>Importantly, these effects are CSS-only. Therefore, they’re lightweight, responsive, and compatible with standard Divi layouts.</p>

    <h2>Pro Tips for Best Results</h2>

    <ul>
      <li><strong>Disable button icons.</strong> Otherwise, some animations may not display as intended.</li>
      <li><strong>Keep labels short.</strong> Consequently, the effect remains smooth on smaller screens.</li>
      <li><strong>Test contrast.</strong> In addition, ensure sufficient color contrast for accessibility.</li>
      <li><strong>Mix strategically.</strong> For example, reserve bolder effects for primary CTAs and use subtler ones for secondary actions.</li>
    </ul>

    <h2>Why These Animations Help</h2>

    <p>Well-timed motion guides attention. Consequently, visitors notice key actions like <strong>Buy Now</strong>, <strong>Sign Up</strong>, or <strong>Learn More</strong>. Furthermore, tasteful micro-interactions elevate brand polish without adding heavy scripts or plugins. In short, <strong>Divi button hover animations</strong> improve clarity, focus, and conversions.</p>

    <p><img src="https://zorawebdesign.com/wp-content/uploads/2024/11/botton-ani.png" alt="Divi button animations overview" width="1100" height="395"></p>

    <h2>Part 1: Styling the Button</h2>

    <p>We'll use the <strong>Wave Button Animation</strong> as an example for this tutorial. This animation makes a vibrant wave of color slide over the button when hovered.</p>

    <p><img src="https://zorawebdesign.com/wp-content/uploads/2024/11/wave-left.png" alt="Wave button hover effect" width="260" height="129"></p>

    <h3>Part 2: Adding the CSS to Your Divi Theme</h3>

    <ol>
      <li>Navigate to your page settings.</li>
      <li>Go to <strong>Page settings &gt; Advance &gt; Custom CSS</strong>.</li>
      <li>Paste the CSS code into the Custom CSS box and save your changes.</li>
    </ol>

    <p><img src="https://zorawebdesign.com/wp-content/uploads/2024/11/Wave-css.png" alt="Divi custom CSS panel" width="477" height="423"></p>

    <h2>Copy CSS to clipboard</h2>

    <p><strong>Class name:</strong> <code>wave-button</code></p>

    <pre><code>/* Wave Button Animation */
.wave-button {
position: relative;
overflow: hidden;
color: #ffffff;
z-index: 1;
transition: color 0.3s ease-in-out;
}

.wave-button::after {
content: "";
position: absolute;
top: 0;
left: -100%;
width: 100%;
height: 100%;
background-color: #e09900;
transition: left 0.6s ease-in-out;
z-index: -1;
}

.wave-button:hover::after {
left: 0;
}

.wave-button:hover {
color: #ffffff;
}</code></pre>

    <h3>Part 3: Assign the CSS Class to Your Button</h3>

    <ol>
      <li>Open the <strong>button Settings</strong> on the page.</li>
      <li>Edit the button and navigate to the <strong>Advanced &gt; CSS Class</strong> field.</li>
      <li>Add the class <code>wave-button</code> to the CSS Class field and save your changes.</li>
    </ol>

    <p><code>wave-button</code></p>

    <p><img src="https://zorawebdesign.com/wp-content/uploads/2024/11/wave-css-class.png" alt="Assign wave-button class in Divi" width="460" height="492"></p>

    <h2>Other Animations CSS and Class</h2>

    <h3>Wave Button with icon</h3>
    <p><strong>Class name:</strong> <code>wave-button1</code></p>

    <pre><code>/* Wave Button1 */
.wave-button1 {
position: relative;
overflow: hidden;
background-color: transparent;
display: inline-flex;
align-items: center;
justify-content: center;
color: #ffffff;
z-index: 1;
transition: background-color 0.3s ease, color 0.3s ease;
}

.wave-button1::after {
content: "";
position: absolute;
top: 0;
bottom: 0;
right: -40px;
width: 40px;
background-color: #e09900;
transition: all 0.6s ease-in-out;
z-index: -1;
opacity: 0;
}

.wave-button1:hover {
background-color: #e09900;
color: #ffffff;
}

.wave-button1:hover::after {
right: 0;
opacity: 1;
}

.wave-button1 {
position: relative;
z-index: 1;
}</code></pre>

    <h3>Wave Button Animation (Right to Left)</h3>
    <p><strong>Class name:</strong> <code>wave-button-rtl</code></p>

    <pre><code>.wave-button-rtl {
    position: relative;
    overflow: hidden;
    color: #ffffff;
    z-index: 1;
    transition: color 0.3s ease-in-out;
}

.wave-button-rtl::after {
    content: "";
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    background-color: #e09900;
    transition: left 0.6s ease-in-out;
    z-index: -1;
}

.wave-button-rtl:hover::after {
    left: 0;
}

.wave-button-rtl:hover {
    color: #ffffff;
}</code></pre>

    <h3>Pulse (Expand)</h3>
    <p><strong>Class name:</strong> <code>pulse</code></p>

    <pre><code>/* Hover effect: Only apply scaling on hover */
.et_pb_button.pulse:hover {
transform: scale(1.1);
}

.et_pb_button.pulse:active {
transform: scale(1);
}</code></pre>

    <h3>Pulse (Contract)</h3>
    <p><strong>Class name:</strong> <code>pulse-contract</code></p>

    <pre><code>.et_pb_button.pulse-contract {
    position: relative;
    overflow: visible;
    display: inline-block;
    transition: transform 0.4s ease-in-out;
}

.et_pb_button.pulse-contract:hover {
    transform: scale(0.9);
}

.et_pb_button.pulse-contract:active {
    transform: scale(1);
}</code></pre>

    <h3>Diagonal (Bottom Top)</h3>
    <p><strong>Class name:</strong> <code>expand-diagonal</code></p>

    <pre><code>.expand-diagonal {
    position: relative;
    overflow: hidden;
    color: #ffffff;
    z-index: 1;
    transition: color 0.3s ease-in-out;
}

.expand-diagonal::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20%;
    height: 20%;
    background-color: #e09900;
    transition: width 0.6s ease-in-out, height 0.6s ease-in-out, top 0.6s ease-in-out, left 0.6s ease-in-out;
    z-index: -1;
}

.expand-diagonal:hover::after {
    width: 200%;
    height: 200%;
    top: 0;
    left: 0;
}

.expand-diagonal:hover {
    color: #ffffff;
}</code></pre>

    <h3>Diagonal (Top Bottom)</h3>
    <p><strong>Class name:</strong> <code>expand-vertical</code></p>

    <pre><code>.expand-vertical {
    position: relative;
    overflow: hidden;
    color: #ffffff;
    z-index: 1;
    transition: color 0.3s ease-in-out;
}

.expand-vertical::after {
    content: "";
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e09900;
    transition: top 0.6s ease-in-out;
    z-index: -1;
}

.expand-vertical:hover::after {
    top: 0;
}

.expand-vertical:hover {
    color: #ffffff;
}</code></pre>

    <h3>Box Shadow (right)</h3>
    <p><strong>Class name:</strong> <code>box-shadow</code></p>

    <pre><code>.box-shadow {
position: relative;
overflow: hidden;
color: #ffffff;
background: #1a1a1a;
border: 2px solid transparent;
box-shadow: 10px 10px 0px 0px rgba(224, 153, 0, 0);
transition: box-shadow 0.6s ease-in-out, color 0.3s ease-in-out;
}

.box-shadow:hover {
box-shadow: 10px 10px 0px 0px rgba(224, 153, 0, 0.8);
background: #e09900;
color: #ffffff;
}</code></pre>

    <h3>Box Shadow (left)</h3>
    <p><strong>Class name:</strong> <code>box-shadow-left-bottom</code></p>

    <pre><code>.box-shadow-left-bottom {
    position: relative;
    overflow: hidden;
    color: #ffffff;
    background: #1a1a1a;
    border: 2px solid transparent;
    box-shadow: 10px 10px 0px 0px rgba(224, 153, 0, 0);
    transition: box-shadow 0.6s ease-in-out, color 0.3s ease-in-out;
}

.box-shadow-left-bottom:hover {
    box-shadow: -10px 10px 0px 0px rgba(224, 153, 0, 0.8);
    background: #e09900;
    color: #ffffff;
}</code></pre>

    <h3>Diagonal Expand from Top-Left</h3>
    <p><strong>Class name:</strong> <code>expand-diagonal-top-left</code></p>

    <pre><code>.expand-diagonal-top-left {
    position: relative;
    overflow: hidden;
    color: #ffffff;
    z-index: 1;
    transition: color 0.6s ease-in-out;
}

.expand-diagonal-top-left::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 20%;
    background-color: #e09900;
    transition: width 1.7s ease-in-out, height 1.7s ease-in-out, top 1.7s ease-in-out, left 1.7s ease-in-out;
    z-index: -1;
}

.expand-diagonal-top-left:hover::after {
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
}

.expand-diagonal-top-left:hover {
    color: #ffffff;
}</code></pre>

    <h3>Neon Glow</h3>
    <p><strong>Class name:</strong> <code>neon-glow</code></p>

    <pre><code>.neon-glow {
    position: relative;
    overflow: hidden;
    color: #ffffff;
    background: #1a1a1a;
    border: 2px solid transparent;
    box-shadow: 0 0 0 rgba(224, 153, 0, 0);
    transition: box-shadow 0.6s ease-in-out, color 0.3s ease-in-out;
}

.neon-glow:hover {
    box-shadow: 0 0 15px rgba(224, 153, 0, 0.8), 0 0 30px rgba(224, 153, 0, 0.6);
    background: #e09900;
    color: #ffffff;
}</code></pre>

    <h3>Horizontal Expand from Center</h3>
    <p><strong>Class name:</strong> <code>expand-horizontal</code></p>

    <pre><code>.expand-horizontal {
    position: relative;
    overflow: hidden;
    color: #ffffff;
    z-index: 1;
    transition: color 0.3s ease-in-out;
}

.expand-horizontal::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 100%;
    background-color: #e09900;
    transition: width 0.6s ease-in-out, left 0.6s ease-in-out;
    z-index: -1;
}

.expand-horizontal:hover::after {
    width: 100%;
    left: 0;
}

.expand-horizontal:hover {
    color: #ffffff;
}</code></pre>

    <h3>Important Note</h3>

    <p>The hover animations will work best if <strong>button icons are turned off</strong> in the Divi Button Module. If button icons are enabled, the hover animation may not display as intended.</p>
  `,
},
};