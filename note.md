description for whatever social media
title on google might be wrong
do google maps thing
check 301 - 200 - 307 requests on network
refactor components in html
facebook: no metadata
form, when i scroll down, the footer is not stable

for small screen with low height, we cannot see the button continue

improvement:
Make a 100% done in the download process?


SEO
├── Metadata
│   ├── title
│   ├── description
│   ├── canonical URL
│   └── Open Graph / Twitter metadata
│
├── Structured data (Schema.org)
│   ├── LocalBusiness
│   ├── Service
│   ├── WebSite
│   └── WebPage
│
└── Technical SEO
    ├── robots.txt
    ├── sitemap.xml
    └── Crawlability / indexability


I want to break down the component card-grid into:
- card-grid
- card

The card grid display the card list with a grid 1 column, many lines. 
The card width should cover the width of the section.

card is composed of:
- card-header
 (for instance)
<h2>
    <span className="sr-only">{heading}</span>
    <img
        src={logo.src}
        alt=""
        aria-hidden="true"
        width={logo.width}
        height={logo.height}
        className="card-heading-logo"
    />
</h2>

className should not be sr-only anymore, it should be card-header

- card-content
with descriptions

By default, the card is closed. That means we can only see the header.
in the card header:
- on the left side, i want the heading
- in the right side, i want a button to open the card.

If the user click on this button, the card "drop down" and we can see the descriptions of the card.

If the user click on the button again, the card closes. that means we only see the header again.


In dictionary, for service and workshop, for each card:
- i want the heading
- i want descriptions instead of items. 


Do it first for service, i validate and commit. 
then you do workshop
Dont try web server.


perfect. however, 
in the card header, i can see the {heading} and the image. i just want to see the image. 
also just in case, the image/header cannot overlap on the button, if it is the case:
- the image should be smaller.
- if the image should be smaller, the other image should also be smaller proportionally
- also i dont want  <li className="card-item" key={description}>, i want: card-content-item